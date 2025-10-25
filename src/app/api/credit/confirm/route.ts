import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { addCredits } from '@/lib/credits'
import {
  createPublicClient,
  http,
  parseAbiItem,
  getAddress,
  decodeEventLog,
} from 'viem'
import { base, baseSepolia } from 'viem/chains'
import gatewaySpec from '@/abis/T3PaymentGateway.json' // keep if used elsewhere

// Price table (adjust as needed)
const PRICE_TABLE: Record<string, { minWei?: bigint; erc20Min?: bigint; credits: number }> = {
  SEC_AUDIT:    { minWei: 1_000_000_000_000_000n,   erc20Min: 2_000_000n,   credits: 5  }, // 0.001 ETH | 2 USDC (6 dp)
  TOKEN_LAUNCH: { minWei: 20_000_000_000_000_000n,  erc20Min: 50_000_000n,  credits: 20 } // 0.02 ETH | 50 USDC
}

function getClient() {
  const chainId = Number(process.env.NEXT_PUBLIC_T3_CHAIN_ID || 84532)
  const rpc = process.env.NEXT_PUBLIC_T3_RPC_URL!
  const chain = chainId === 8453 ? base : baseSepolia
  return { chainId, client: createPublicClient({ chain, transport: http(rpc) }) }
}

// Replace with real auth: map user to a wallet or session
function getMockUserId() {
  return 'demo-user-id'
}

export async function POST(req: Request) {
  try {
    const { txHash, usageTag } = await req.json() as { txHash: `0x${string}`, usageTag: string }
    const uid = getMockUserId()
    const price = PRICE_TABLE[usageTag]
    if (!price) {
      return NextResponse.json({ ok: false, error: 'UNKNOWN_USAGE_TAG' }, { status: 400 })
    }

    const gateway = getAddress(process.env.NEXT_PUBLIC_T3_PAYMENT_GATEWAY as `0x${string}`)
    const { client } = getClient()

    // 1) Fetch receipt + logs
    const receipt = await client.getTransactionReceipt({ hash: txHash })
    if (!receipt || receipt.status !== 'success') {
      return NextResponse.json({ ok: false, error: 'TX_NOT_SUCCESS' }, { status: 400 })
    }

    // 2) Filter for Paid event from gateway
    const PaidEvent = parseAbiItem(
      'event Paid(address indexed payer, address indexed token, uint256 amount, bytes32 usageTag)'
    )

    const paidLogs = receipt.logs
      // some providers add `removed`; skip removed logs
      .filter((l: any) => !('removed' in l && l.removed))
      .filter(l => l.address.toLowerCase() === gateway.toLowerCase())
      .map(l => {
        try {
          // topics can be readonly; clone to mutable and assert tuple type
          const rawTopics = (l as any).topics as readonly `0x${string}`[] | undefined
          if (!rawTopics || rawTopics.length === 0) return null

          const topicsTuple = [rawTopics[0], ...rawTopics.slice(1)] as [
            `0x${string}`,
            ...`0x${string}`[]
          ]

          return decodeEventLog({
            abi: [PaidEvent],
            data: (l as any).data as `0x${string}`,
            topics: topicsTuple,
          })
        } catch {
          return null
        }
      })
      .filter(Boolean) as Array<{ eventName: 'Paid', args: any }>

    if (paidLogs.length === 0) {
      // No Paid event? As a fallback, accept native transfer directly to gateway (for manual sends).
      const tx = await client.getTransaction({ hash: txHash })
      if (!tx || (tx.to || '').toLowerCase() !== gateway.toLowerCase()) {
        return NextResponse.json({ ok: false, error: 'NO_PAID_EVENT_OR_DIRECT_PAYMENT' }, { status: 400 })
      }
      if (price.minWei && tx.value < price.minWei) {
        return NextResponse.json({ ok: false, error: 'NATIVE_VALUE_TOO_SMALL' }, { status: 400 })
      }
    } else {
      // Validate any Paid event matches our min and usageTag
      const match = paidLogs.find(log => {
        const u = log.args.usageTag as `0x${string}`
        const amt = BigInt(log.args.amount)
        // Compare usageTag bytes32 by left-padded ASCII (right-pad hex with zeros)
        const desired = '0x' + Buffer.from(usageTag, 'utf8').toString('hex').padEnd(64, '0')
        const tagOk = u.toLowerCase() === (desired as string).toLowerCase()
        const amtOk = !price.erc20Min || amt >= price.erc20Min
        return tagOk && amtOk
      })
      if (!match) {
        return NextResponse.json({ ok: false, error: 'PAID_EVENT_NOT_MATCHING_PRICE_OR_TAG' }, { status: 400 })
      }
    }

    // Idempotency
    const existing = await prisma.payment.findUnique({ where: { txHash } })
    if (existing?.credited) {
      return NextResponse.json({ ok: true, credited: false, reason: 'ALREADY_CREDITED' })
    }

    await prisma.payment.upsert({
      where: { txHash },
      update: { credited: true },
      create: {
        chainId: Number(process.env.NEXT_PUBLIC_T3_CHAIN_ID || 84532),
        txHash,
        usageTag,
        amount: (price.erc20Min ?? price.minWei ?? 0n).toString(),
        credited: true
      }
    })

    await addCredits(uid, price.credits)
    return NextResponse.json({ ok: true, credited: true, creditsAdded: price.credits })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
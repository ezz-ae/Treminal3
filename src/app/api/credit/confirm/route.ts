import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { addCredits } from '@/lib/credits'
import { createPublicClient, http, parseAbiItem, getAddress } from 'viem'
import { base, baseSepolia } from 'viem/chains'
import gatewaySpec from '@/abis/T3PaymentGateway.json'

// Price table (adjust as needed)
const PRICE_TABLE: Record<string, { minWei?: bigint; erc20Min?: bigint; credits: number }> = {
  SEC_AUDIT:   { minWei: 1000000000000000n,     erc20Min: 2_000_000n, credits: 5 },   // 0.001 ETH | 2 USDC (6 dp)
  TOKEN_LAUNCH:{ minWei: 20000000000000000n,    erc20Min: 50_000_000n, credits: 20 }, // 0.02 ETH | 50 USDC
}

function getClient() {
  const chainId = Number(process.env.NEXT_PUBLIC_T3_CHAIN_ID || 84532)
  const rpc = process.env.NEXT_PUBLIC_T3_RPC_URL!
  const chain = chainId === 8453 ? base : baseSepolia
  return { chainId, client: createPublicClient({ chain, transport: http(rpc) }) }
}

// Replace with real auth: map user to a wallet or session
function getMockUserId() { return 'demo-user-id' }

export async function POST(req: Request) {
  try {
    const { txHash, usageTag } = await req.json() as { txHash: `0x${string}`, usageTag: string }
    const uid = getMockUserId()
    const price = PRICE_TABLE[usageTag]
    if (!price) return NextResponse.json({ ok:false, error:'UNKNOWN_USAGE_TAG' }, { status:400 })

    const gateway = getAddress(process.env.NEXT_PUBLIC_T3_PAYMENT_GATEWAY as `0x${string}`)
    const { client } = getClient()

    // 1) Fetch receipt + logs
    const receipt = await client.getTransactionReceipt({ hash: txHash })
    if (!receipt || receipt.status !== 'success') {
      return NextResponse.json({ ok:false, error:'TX_NOT_SUCCESS' }, { status:400 })
    }

    // 2) Filter for Paid event from gateway
    const PaidEvent = parseAbiItem({
      type: 'event',
      name: 'Paid',
      inputs: [
        { indexed: true,  name: 'payer',    type: 'address' },
        { indexed: true,  name: 'token',    type: 'address' },
        { indexed: false, name: 'amount',   type: 'uint256' },
        { indexed: false, name: 'usageTag', type: 'bytes32' },
      ]
    })

    const paidLogs = receipt.logs
      .filter(l => l.address.toLowerCase() === gateway.toLowerCase())
      .map(l => {
        try { return client.decodeEventLog({ abi: [PaidEvent], data: l.data, topics: l.topics }) }
        catch { return null }
      })
      .filter(Boolean) as Array<{ eventName: 'Paid', args: any }>

    if (paidLogs.length === 0) {
      // No Paid event? As a fallback, accept native transfer directly to gateway (for manual sends).
      const tx = await client.getTransaction({ hash: txHash })
      if (!tx || (tx.to || '').toLowerCase() !== gateway.toLowerCase()) {
        return NextResponse.json({ ok:false, error:'NO_PAID_EVENT_OR_DIRECT_PAYMENT' }, { status:400 })
      }
      if (price.minWei && tx.value < price.minWei) {
        return NextResponse.json({ ok:false, error:'NATIVE_VALUE_TOO_SMALL' }, { status:400 })
      }
    } else {
      // Validate any Paid event matches our min and usageTag
      const match = paidLogs.find(log => {
        const u = log.args.usageTag as `0x${string}`
        const amt = BigInt(log.args.amount)
        // Compare usageTag bytes32 by left-padded ASCII
        const desired = '0x' + Buffer.from(usageTag, 'utf8').toString('hex').padEnd(64, '0')
        const tagOk = u.toLowerCase() === (desired as string).toLowerCase()
        const amtOk = !price.erc20Min || amt >= price.erc20Min
        return tagOk && amtOk
      })
      if (!match) {
        return NextResponse.json({ ok:false, error:'PAID_EVENT_NOT_MATCHING_PRICE_OR_TAG' }, { status:400 })
      }
    }

    // Idempotency
    const existing = await prisma.payment.findUnique({ where: { txHash } })
    if (existing?.credited) return NextResponse.json({ ok:true, credited:false, reason:'ALREADY_CREDITED' })

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
    return NextResponse.json({ ok:true, credited:true, creditsAdded: price.credits })
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e.message }, { status:500 })
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { addCredits } from '@/lib/credits'
import { isTxPaid } from '@/lib/onchain'

// replace this mapping however you like
const PRICE_TABLE: Record<string, { minWei?: string; credits: number }> = {
  SEC_AUDIT:   { minWei: '1000000000000000', credits: 5 },   // 0.001 ETH as example
  TOKEN_LAUNCH:{ minWei: '20000000000000000', credits: 20 }, // 0.02 ETH
}

function getMockUserId(req: Request) { return 'demo-user-id' }

export async function POST(req: Request) {
  try {
    const { chainId, txHash, usageTag } = await req.json() as { chainId:number, txHash:`0x${string}`, usageTag:string }
    const uid = getMockUserId(req)

    const addr = process.env.NEXT_PUBLIC_T3_PAYMENT_GATEWAY as `0x${string}`
    const price = PRICE_TABLE[usageTag]
    if (!price) return NextResponse.json({ ok:false, error:'UNKNOWN_USAGE_TAG' }, { status:400 })

    // naive check for native payments; for ERC20, parse gateway logs (Paid event) instead
    const ok = await isTxPaid(txHash, addr, price.minWei ? BigInt(price.minWei) : undefined)
    if (!ok) return NextResponse.json({ ok:false, error:'TX_NOT_VALIDATED' }, { status:400 })

    // idempotency: ensure we only credit once per tx
    const existing = await prisma.payment.findUnique({ where: { txHash } })
    if (existing?.credited) return NextResponse.json({ ok:true, credited:false, reason:'ALREADY_CREDITED' })
    await prisma.payment.upsert({
      where: { txHash },
      update: { credited: true },
      create: { chainId, txHash, usageTag, amount: price.minWei ?? '0', credited: true }
    })

    await addCredits(uid, price.credits)
    return NextResponse.json({ ok:true, credited:true, creditsAdded: price.credits })
  } catch (e:any) {
    return NextResponse.json({ ok:false, error:e.message }, { status:500 })
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const launch = await prisma.launch.findUnique({ where: { slug: params.slug }, include: { trust: true } })
  if (!launch) return NextResponse.json({ ok:false, error:'NOT_FOUND' }, { status:404 })
  // increment views
  await prisma.launch.update({ where: { id: launch.id }, data: { views: { increment: 1 } } })
  return NextResponse.json({
    ok: true,
    data: {
      name: launch.name,
      symbol: launch.symbol,
      chainId: launch.chainId,
      tokenAddr: launch.tokenAddr,
      trust: launch.trust
    }
  })
}

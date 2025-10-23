import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request){
  const { slug, ref } = await req.json() as { slug:string, ref:string }
  if(!slug || !ref) return NextResponse.json({ ok:false, error:'BAD_INPUT' }, { status:400 })
  const launch = await prisma.launch.findUnique({ where: { slug } })
  if(!launch) return NextResponse.json({ ok:false, error:'LAUNCH_NOT_FOUND' }, { status:404 })
  await prisma.referral.upsert({
    where: { launchId_referrer: { launchId: launch.id, referrer: ref } },
    update: { count: { increment: 1 } },
    create: { launchId: launch.id, referrer: ref, count: 1 }
  })
  return NextResponse.json({ ok:true })
}

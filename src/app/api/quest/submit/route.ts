import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

function currentUserId(){ return 'demo-user-id' }

export async function POST(req: Request){
  const { questKey, launchSlug, proofUrl } = await req.json() as { questKey:string, launchSlug?:string, proofUrl?:string }
  const quest = await prisma.quest.findFirst({ where: { key: questKey, active: true } })
  if(!quest) return NextResponse.json({ ok:false, error:'QUEST_NOT_FOUND' }, { status:404 })

  let launchId: string | undefined = undefined
  if(launchSlug){
    const l = await prisma.launch.findUnique({ where: { slug: launchSlug } })
    if(!l) return NextResponse.json({ ok:false, error:'LAUNCH_NOT_FOUND' }, { status:404 })
    launchId = l.id
  }

  const sub = await prisma.questSubmission.create({
    data: { userId: currentUserId(), questId: quest.id, launchId, proofUrl: proofUrl ?? null, points: quest.points }
  })

  return NextResponse.json({ ok:true, submissionId: sub.id, points: quest.points })
}

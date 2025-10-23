import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(){
  const quests = await prisma.quest.findMany({ where: { active: true } })
  return NextResponse.json({ ok:true, quests })
}

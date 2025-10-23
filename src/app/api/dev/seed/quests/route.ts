import { prisma } from '@/lib/db'

export async function POST(){
  await prisma.quest.createMany({
    data: [
      { key: 'FOLLOW_X', title: 'Follow project on X', points: 10 },
      { key: 'TWEET_LINK', title: 'Tweet your launch link', points: 20 },
      { key: 'JOIN_TG', title: 'Join Telegram', points: 5 }
    ],
    skipDuplicates: true
  })
  return new Response(JSON.stringify({ ok:true }), { headers: { 'Content-Type': 'application/json' } })
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { fetchPriceAndHolders } from '@/lib/chain-readers'

export async function POST(req: Request){
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  if(process.env.TELEGRAM_SECRET && secret !== process.env.TELEGRAM_SECRET){
    return NextResponse.json({ ok:false, error:'UNAUTHORIZED' }, { status:401 })
  }
  const body = await req.json() as any
  const msg = body?.message?.text || ''
  const chatId = body?.message?.chat?.id

  async function reply(text:string){
    if(!process.env.TELEGRAM_BOT_TOKEN || !chatId) return
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`
    await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ chat_id: chatId, text }) })
  }

  if(msg.startsWith('/start')){
    await reply('T3 Bot online. Use /status <slug> or /holders <tokenAddr>')
    return NextResponse.json({ ok:true })
  }

  if(msg.startsWith('/status ')){
    const slug = msg.split(' ')[1]
    const launch = await prisma.launch.findUnique({ where: { slug }, include: { trust: true } })
    if(!launch){ await reply('Launch not found'); return NextResponse.json({ ok:true }) }
    const t = launch.trust
    await reply(`• ${launch.name} (${launch.symbol})\nLP Locked: ${!!t?.lpLocked}\nRenounced: ${!!t?.renounced}\nTax: buy ${t?.buyTaxBps ?? 0} / sell ${t?.sellTaxBps ?? 0} bps\nViews: ${launch.views}`)
    return NextResponse.json({ ok:true })
  }

  if(msg.startsWith('/holders ')){
    const addr = msg.split(' ')[1]
    const r = await fetchPriceAndHolders(0, addr) // fill chainId as needed
    await reply(`Holders: ${r.holders} | Price: $${r.priceUsd} | MC: $${r.marketCapUsd}`)
    return NextResponse.json({ ok:true })
  }

  await reply('Unknown command. Try /status <slug>')
  return NextResponse.json({ ok:true })
}

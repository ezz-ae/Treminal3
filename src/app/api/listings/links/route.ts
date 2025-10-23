import { NextResponse } from 'next/server'

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const address = searchParams.get('address') || ''
  const symbol = searchParams.get('symbol') || ''
  // NOTE: These are helper URLs; replace with real submit endpoints when available.
  const links = {
    dexScreener: `https://dexscreener.com/search?q=${address}`,
    birdeye: `https://birdeye.so/token/${address}`,
    geckoRequest: `https://support.coingecko.com/hc/en-us/requests/new?ticket_form_id=...&token_contract=${address}&symbol=${symbol}`
  }
  return NextResponse.json({ ok:true, links })
}

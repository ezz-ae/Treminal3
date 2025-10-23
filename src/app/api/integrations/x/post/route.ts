import { NextResponse } from 'next/server'

export async function POST(req: Request){
  // TODO: call your gateway/lambda to post to X with creator-signed token
  // body: { slug, text, imageUrl? }
  return NextResponse.json({ ok:true, note: 'X post stub. Wire your poster here.' })
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

function slugify(s:string){
  return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') + '-' + Math.random().toString(36).slice(2,6)
}

// TODO: replace with real auth/session; for now demo id
function currentUserId(){ return 'demo-user-id' }

export async function POST(req: Request){
  const body = await req.json() as { name:string, symbol:string, chainId:number }
  if(!body?.name || !body?.symbol || !body?.chainId) {
    return NextResponse.json({ ok:false, error:'INVALID_INPUT' }, { status:400 })
  }
  const slug = slugify(body.name)
  const launch = await prisma.launch.create({
    data: {
      slug, name: body.name.trim(), symbol: body.symbol.trim().toUpperCase(), chainId: body.chainId,
      creatorId: currentUserId()
    }
  })
  // seed trust row
  await prisma.trust.create({ data: { launchId: launch.id } })
  return NextResponse.json({ ok:true, slug, id: launch.id })
}

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewLaunchPage(){
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [chainId, setChainId] = useState(84532)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function create(){
    setLoading(true)
    const r = await fetch('/api/launch/create', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, symbol, chainId }) })
    const j = await r.json()
    setLoading(false)
    if(j.ok){ router.push(`/launch/${j.slug}/trust`) } else { alert(j.error || 'Failed') }
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create Launch</h1>
      <input className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-700" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-700" placeholder="Symbol" value={symbol} onChange={e=>setSymbol(e.target.value.toUpperCase())} />
      <input className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-700" placeholder="Chain ID" type="number" value={chainId} onChange={e=>setChainId(Number(e.target.value))} />
      <button className="px-4 py-2 rounded bg-white text-black" onClick={create} disabled={loading || !name || !symbol}>{loading?'Creating...':'Create'}</button>
    </div>
  )
}

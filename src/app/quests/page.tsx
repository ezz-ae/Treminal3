'use client'
import useSWR from 'swr'
import { useState } from 'react'

export default function QuestsPage(){
  const { data } = useSWR('/api/quest/list', async(u)=> (await fetch(u)).json(), { refreshInterval: 10000 })
  const [proof, setProof] = useState('')

  async function submit(key:string){
    const r = await fetch('/api/quest/submit', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ questKey: key, proofUrl: proof || undefined }) })
    const j = await r.json(); alert(j.ok ? `+${j.points} points` : j.error)
  }

  const qs = data?.quests || []
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Quests</h1>
      <input className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-700" placeholder="Proof URL (tweet link, screenshot URL…)" value={proof} onChange={e=>setProof(e.target.value)} />
      <div className="grid gap-3">
        {qs.map((q:any)=> (
          <div key={q.id} className="rounded-xl border p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{q.title}</div>
              <div className="text-xs opacity-70">{q.key} • {q.points} pts</div>
            </div>
            <button className="px-3 py-1 rounded bg-white text-black" onClick={()=>submit(q.key)}>Submit</button>
          </div>
        ))}
      </div>
    </div>
  )
}

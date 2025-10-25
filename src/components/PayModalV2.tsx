'use client'
import { useState } from 'react'

export function PayModalV2({ usageTag }: { usageTag: 'SEC_AUDIT' | 'TOKEN_LAUNCH' | 'SOLANA_TOOL' | 'SOLANA_CLOSE_ACCOUNT' }) {
  const [txHash, setTxHash] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="p-4 rounded-2xl border max-w-lg w-full bg-black/40">
      <div className="text-lg font-semibold mb-2">Unlock: {usageTag}</div>
      <p className="text-sm opacity-80 mb-3">
        Pay with <b>native</b> (send to <code>{process.env.NEXT_PUBLIC_T3_PAYMENT_GATEWAY}</code>) OR use our <b>gateway&apos;s ERC‑20 method</b> to pay USDC/USDT.
        After broadcast, paste the tx hash here to confirm and mint credits.
      </p>
      <input
        className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-700 mb-3"
        placeholder="0xTxHash…"
        value={txHash}
        onChange={e => setTxHash(e.target.value)}
      />
      <button
        className="px-4 py-2 rounded bg-white text-black disabled:opacity-50"
        disabled={loading || txHash.length < 10}
        onClick={async()=>{
          setLoading(true); setStatus(null);
          try{
            const r = await fetch('/api/credit/confirm', {
              method:'POST', headers:{'Content-Type':'application/json'},
              body: JSON.stringify({ txHash, usageTag })
            })
            const j = await r.json()
            setStatus(JSON.stringify(j, null, 2))
          }catch(e:any){ setStatus(e.message) } finally{ setLoading(false) }
        }}
      >
        {loading ? 'Confirming…' : 'Confirm Payment'}
      </button>
      {status && <pre className="mt-3 text-xs bg-neutral-900 p-3 rounded">{status}</pre>}
    </div>
  )
}

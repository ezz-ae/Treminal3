'use client'

import { useState } from 'react'

export function PayModal({ usageTag }: { usageTag: 'SEC_AUDIT' | 'TOKEN_LAUNCH' }) {
  const [txHash, setTxHash] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  async function confirm() {
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch('/api/credit/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chainId: Number(process.env.NEXT_PUBLIC_T3_CHAIN_ID || 84532),
          txHash,
          usageTag,
        })
      })
      const j = await res.json()
      setStatus(JSON.stringify(j, null, 2))
    } catch (e:any) {
      setStatus(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 rounded-2xl border max-w-lg w-full bg-black/40">
      <div className="text-lg font-semibold mb-2">Pay to unlock: {usageTag}</div>
      <p className="text-sm opacity-80 mb-3">
        Send the required amount to the <code>T3PaymentGateway</code> contract address<br/>
        <code>{process.env.NEXT_PUBLIC_T3_PAYMENT_GATEWAY}</code>, then paste your tx hash here.
      </p>
      <input
        className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-700 mb-3"
        placeholder="0xTxHash..."
        value={txHash}
        onChange={e => setTxHash(e.target.value)}
      />
      <button
        className="px-4 py-2 rounded bg-white text-black disabled:opacity-50"
        onClick={confirm}
        disabled={loading || txHash.length < 10}
      >
        {loading ? 'Confirming...' : 'Confirm payment'}
      </button>
      {status && (
        <pre className="mt-3 text-xs bg-neutral-900 p-3 rounded">{status}</pre>
      )}
    </div>
  )
}

'use client'
import useSWR from 'swr'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

function useLaunch(slug: string){
  const { data, isLoading } = useSWR(`/api/launch/${slug}/status`, async (u)=> (await fetch(u)).json())
  return { data, isLoading }
}

export default function TrustBadgePage({ params }: { params: { slug: string } }){
  const { slug } = params
  const sp = useSearchParams()
  const ref = sp.get('ref')

  useEffect(()=>{
    if(ref){
      fetch('/api/referral/track', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ slug, ref }) })
    }
  }, [slug, ref])

  const { data, isLoading } = useLaunch(slug)
  const d = data?.data

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Trust Badge — {d?.name} ({d?.symbol})</h1>
      {isLoading && <p>Loading…</p>}
      {d && (
        <div className="rounded-xl border p-4 bg-black/40">
          <table className="w-full text-sm">
            <tbody>
              <tr><td className="py-1 opacity-70">Chain</td><td>{d.chainId}</td></tr>
              <tr><td className="py-1 opacity-70">Token</td><td><code>{d.tokenAddr || '—'}</code></td></tr>
              <tr><td className="py-1 opacity-70">LP Locked</td><td>{d.trust?.lpLocked ? 'Yes' : 'No'}</td></tr>
              <tr><td className="py-1 opacity-70">Renounced</td><td>{d.trust?.renounced ? 'Yes' : 'No'}</td></tr>
              <tr><td className="py-1 opacity-70">Blacklist</td><td>{d.trust?.hasBlacklist ? 'Present' : 'None detected'}</td></tr>
              <tr><td className="py-1 opacity-70">Taxes (bps)</td><td>Buy {d.trust?.buyTaxBps ?? 0} / Sell {d.trust?.sellTaxBps ?? 0}</td></tr>
            </tbody>
          </table>
          <p className="mt-3 text-xs opacity-70">Note: live verifications are stubs—wire your chain readers.</p>
        </div>
      )}
      <div className="rounded-xl border p-4">
        <h2 className="font-semibold mb-2">Share</h2>
        <p>Share this page to prove fairness. Include your referral like: <code>?ref=0xYourWallet</code></p>
      </div>
    </div>
  )
}

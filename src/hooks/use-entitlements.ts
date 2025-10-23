'use client'
import useSWR from 'swr'

async function fetcher(url:string){ const r = await fetch(url); return r.json() }

export function useEntitlements(){
  const { data, isLoading, mutate } = useSWR('/api/me/entitlements', fetcher, { refreshInterval: 12000 })
  return {
    plan: data?.plan ?? 'free',
    credits: data?.credits ?? 0,
    proUntil: data?.proUntil ?? null,
    loading: isLoading,
    refresh: mutate
  }
}

'use client'
import { useEntitlements } from '@/hooks/use-entitlements'

export function CreditsBadge(){
  const { credits, loading } = useEntitlements()
  return (
    <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm">
      {loading ? '…' : `Credits: ${credits}`}
    </div>
  )
}


'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { XCircle, Loader2, CheckCircle } from 'lucide-react'

export function PayModal({ usageTag, onPaymentConfirmed }: { usageTag: 'SEC_AUDIT' | 'TOKEN_LAUNCH', onPaymentConfirmed: () => void }) {
  const [txHash, setTxHash] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [isConfirmed, setIsConfirmed] = useState(false);

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
      if (res.ok) {
          setIsConfirmed(true);
          onPaymentConfirmed(); // Call the callback on successful confirmation
      }
      setStatus(JSON.stringify(j, null, 2))
    } catch (e:any) {
      setStatus(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-xl max-w-lg w-full">
      <div className="text-2xl font-bold font-headline mb-4">Unlock Feature: {usageTag.replace('_', ' ')}</div>
      
      {isConfirmed ? (
          <div className="flex flex-col items-center justify-center p-8 text-green-500">
              <CheckCircle className="w-16 h-16 mb-4" />
              <p className="text-xl font-semibold mb-2">Payment Confirmed!</p>
              <p className="text-muted-foreground text-center">You can now proceed with your {usageTag.replace('_', ' ').toLowerCase()}.</p>
          </div>
      ) : (
          <>
              <p className="text-sm text-muted-foreground mb-6">
                To proceed, send the required amount to the <code className="text-primary">T3PaymentGateway</code> contract address below, then paste your transaction hash.
                <br/><br/>
                <strong className="block font-mono text-xs p-2 bg-muted/20 rounded-md break-all overflow-auto">
                    {process.env.NEXT_PUBLIC_T3_PAYMENT_GATEWAY || '[T3_PAYMENT_GATEWAY_ADDRESS]'}
                </strong>
              </p>
              <div className="space-y-4">
                  <Label htmlFor="tx-hash" className="sr-only">Transaction Hash</Label>
                  <Input
                    id="tx-hash"
                    className="w-full px-3 py-2 rounded-md bg-input text-foreground border border-border focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="0xTxHash..."
                    value={txHash}
                    onChange={e => setTxHash(e.target.value)}
                  />
                  <Button
                    className="w-full group"
                    onClick={confirm}
                    disabled={loading || txHash.length < 10}
                  >
                    {loading ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Confirming...</>
                    ) : (
                        <>
                            Confirm Payment 
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </>
                    )}
                  </Button>
              </div>
          </>
      )}

      {status && !isConfirmed && (
        <pre className="mt-6 text-xs bg-destructive/10 text-destructive-foreground p-3 rounded-md overflow-auto">Error: {status}</pre>
      )}
    </div>
  )
}

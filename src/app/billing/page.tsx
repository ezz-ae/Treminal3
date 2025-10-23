export default function BillingPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Billing (Crypto)</h1>
      <p className="opacity-80 mb-4">
        This workspace uses crypto-only payments. Connect your wallet and pay on-chain to unlock Pro or buy credits.
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Contract: <code>{process.env.NEXT_PUBLIC_T3_PAYMENT_GATEWAY}</code></li>
        <li>Chain ID: <code>{process.env.NEXT_PUBLIC_T3_CHAIN_ID}</code></li>
      </ul>
    </div>
  )
}

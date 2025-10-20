
'use client';

import { CircleDollarSign } from 'lucide-react';

export default function SolanaMarketingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="p-6 bg-primary/10 rounded-full text-primary mb-4">
        <CircleDollarSign className="w-16 h-16" />
      </div>
      <h1 className="text-4xl font-bold font-headline">Solana Token Marketing</h1>
      <p className="text-muted-foreground max-w-lg mx-auto mt-2">
        Manage your token's market presence. Create liquidity pools, set up market makers, and run promotional campaigns.
      </p>
      <p className="text-sm text-muted-foreground mt-4">(Coming Soon)</p>
    </div>
  );
}

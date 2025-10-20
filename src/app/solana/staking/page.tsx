
'use client';

import { Sprout } from 'lucide-react';

export default function SolanaStakingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="p-6 bg-primary/10 rounded-full text-primary mb-4">
        <Sprout className="w-16 h-16" />
      </div>
      <h1 className="text-4xl font-bold font-headline">Solana Staking</h1>
      <p className="text-muted-foreground max-w-lg mx-auto mt-2">
        Stake your SOL with trusted validators, manage your delegations, and track your rewards.
      </p>
      <p className="text-sm text-muted-foreground mt-4">(Coming Soon)</p>
    </div>
  );
}


'use client';

import { AreaChart } from 'lucide-react';

export default function SolanaTradingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="p-6 bg-primary/10 rounded-full text-primary mb-4">
        <AreaChart className="w-16 h-16" />
      </div>
      <h1 className="text-4xl font-bold font-headline">Solana Trading</h1>
      <p className="text-muted-foreground max-w-lg mx-auto mt-2">
        A high-performance trading interface for the Solana ecosystem. Execute trades, manage positions, and set up advanced orders.
      </p>
      <p className="text-sm text-muted-foreground mt-4">(Coming Soon)</p>
    </div>
  );
}

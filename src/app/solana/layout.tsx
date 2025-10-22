
'use client';
import { ReactNode } from 'react';
import SolanaHeader from '@/components/layout/solana-header';

export default function SolanaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <SolanaHeader />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

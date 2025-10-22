'use client';
import { ReactNode } from 'react';
import SolanaHeader from '@/components/layout/solana-header';

export default function SolanaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SolanaHeader />
      <main className="flex-1 bg-black">
        {children}
      </main>
    </>
  );
}

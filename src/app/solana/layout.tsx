'use client';
import { ReactNode } from 'react';
import SolanaHeader from '@/components/layout/solana-header';
import Footer from '@/components/layout/footer';

export default function SolanaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <SolanaHeader />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

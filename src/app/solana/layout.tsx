'use client';
import { ReactNode } from 'react';

export default function SolanaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex-1 flex flex-col bg-black">
        {children}
      </main>
    </>
  );
}

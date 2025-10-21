'use client';
import { ReactNode } from 'react';

export default function SolanaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

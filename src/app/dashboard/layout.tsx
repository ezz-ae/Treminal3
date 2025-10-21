'use client';
import { ReactNode } from 'react';
import { useWallet } from '@/hooks/use-wallet';
import AuthPage from '@/app/auth/page';

export default function DashboardAppLayout({ children }: { children: ReactNode }) {
  const { wallet } = useWallet();

  if (!wallet) {
    return <AuthPage />;
  }

  return (
    <div className="container mx-auto py-8">
        {children}
    </div>
  );
}


'use client';

import { useWallet } from '@/hooks/use-wallet';
import DashboardPage from '@/app/dashboard/page';
import Home from '@/app/page';

export function MainContent() {
  const { wallet } = useWallet();

  if (wallet) {
    return <DashboardPage />;
  }

  return <Home />;
}

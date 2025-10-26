'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import DashboardPage from '@/app/dashboard/page';
import { LandingPage } from '@/components/landing-page';

export function MainContent() {
  const { connected } = useWallet();

  if (connected) {
    return <DashboardPage />;
  }

  return <LandingPage />;
}

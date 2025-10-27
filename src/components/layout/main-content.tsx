
'use client';

import { useEffect, useState } from 'react';
import DashboardPage from '@/app/dashboard/page';
import { LandingPage } from '@/components/landing-page';
import { CashflowSetupPage } from '@/components/cashflow-setup/CashflowSetupPage'; // Import the new setup page
import { useWallet } from '@/hooks/use-wallet'; // Use our custom useWallet hook
import { usePathname, useRouter } from 'next/navigation';

export function MainContent() {
  const { wallet } = useWallet(); // Use our combined wallet state
  const connected = !!wallet?.ethereum?.address || !!wallet?.solana?.address;
  const [isCashflowSetupComplete, setIsCashflowSetupComplete] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const setupStatus = localStorage.getItem('isCashflowSetupComplete');
      setIsCashflowSetupComplete(setupStatus === 'true');
    }
  }, []);

  // Redirect logic for cashflow pages if setup is not complete
  useEffect(() => {
    const cashflowPages = [
      '/solana-cash-machine',
      '/cashbot-03',
      '/t03-aircash',
      '/sniper-03',
      '/solana/trading',
      '/solana/tokens',
      '/solana/liquidity-pools', // New page added to list
      '/dashboard/dev-advanced', // New page added to list
    ];

    if (connected && !isCashflowSetupComplete && cashflowPages.includes(pathname)) {
      // Only redirect if trying to access a cashflow page without setup
      router.push('/cashflow-setup'); // Redirect to setup page
    } else if (connected && isCashflowSetupComplete && pathname === '/cashflow-setup') {
      // If connected and setup is complete, and somehow on setup page, redirect to dashboard
      router.push('/dashboard');
    }
  }, [connected, isCashflowSetupComplete, pathname, router]);


  if (!connected) {
    return <LandingPage />;
  }

  // If connected, but setup is not complete, show the setup page
  if (connected && !isCashflowSetupComplete && pathname !== '/cashflow-setup') {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-foreground">
            <p className="text-lg mb-4">Redirecting to AI Cashflow Setup...</p>
            <Link href="/cashflow-setup" className="text-primary hover:underline">Click here to start setup</Link>
        </div>
    );
  }

  if (pathname === '/cashflow-setup') {
    return <CashflowSetupPage />;
  }

  // If connected and setup is complete, render the dashboard or specific page
  return <DashboardPage />;
}

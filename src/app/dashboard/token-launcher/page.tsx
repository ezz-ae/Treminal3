
'use client';

import { TokenLauncher } from '@/components/dashboard/token-launcher';
import { Gem } from 'lucide-react';

export default function TokenLauncherPage() {
  return (
    <div className="container mx-auto py-12">
        <div className="text-center">
            <h1 className="text-4xl font-bold font-headline flex items-center justify-center gap-3"><Gem className="w-10 h-10 text-primary" /> Token Launcher</h1>
            <p className="text-muted-foreground text-lg mt-4 max-w-3xl mx-auto">
                Create and launch your own SPL token on the Solana network in just a few clicks. No code required.
            </p>
        </div>
        
        <div className="mt-8">
            <TokenLauncher />
        </div>
   </div>
  );
}

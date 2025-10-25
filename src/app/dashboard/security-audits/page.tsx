
'use client';

import { SecurityAudit } from '@/components/dashboard/security-audit';
import { ShieldCheck } from 'lucide-react';

export default function SecurityAuditsPage() {
  return (
    <div className="container mx-auto py-12">
        <div className="text-center">
            <h1 className="text-4xl font-bold font-headline flex items-center justify-center gap-3"><ShieldCheck className="w-10 h-10 text-primary" /> Security Audits</h1>
            <p className="text-muted-foreground text-lg mt-4 max-w-3xl mx-auto">
                Run automated security audits on your smart contracts to identify vulnerabilities and ensure the safety of your dApp.
            </p>
        </div>
        
        <div className="mt-8">
            <SecurityAudit />
        </div>
   </div>
  );
}

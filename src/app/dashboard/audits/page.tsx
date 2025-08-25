
'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AuditsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline">Security Audits</h1>
      <p className="text-muted-foreground mb-6">Describe the smart contract you want to audit.</p>
      <div className="space-y-4 max-w-2xl">
          <Textarea 
            placeholder="e.g., 'Run a full security audit on the smart contract located at 0x456...def on the Ethereum mainnet. Check for reentrancy, integer overflow, and other common vulnerabilities.'"
            className="min-h-[150px]"
          />
          <Button>Run Audit</Button>
        </div>
    </div>
  );
}

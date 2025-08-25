
'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TransactionsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline">Manual Transactions</h1>
      <p className="text-muted-foreground mb-6">Describe the transaction you want to execute.</p>
       <div className="space-y-4 max-w-2xl">
          <Textarea 
            placeholder="e.g., 'Send 1.5 ETH from my primary wallet to address 0x123...abc on the Sepolia testnet.'"
            className="min-h-[150px]"
          />
          <Button>Execute</Button>
        </div>
    </div>
  );
}

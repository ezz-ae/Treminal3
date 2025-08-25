
'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function WalletsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline">Custom Wallets</h1>
      <p className="text-muted-foreground mb-6">Describe the custom wallet you want to build for your users.</p>
       <div className="space-y-4 max-w-2xl">
          <Textarea 
            placeholder="e.g., 'A secure, multi-signature wallet for a DAO that requires 3 out of 5 signatories to approve a transaction. It should support ETH and all ERC-20 tokens.'"
            className="min-h-[150px]"
          />
          <Button>Generate</Button>
        </div>
    </div>
  );
}

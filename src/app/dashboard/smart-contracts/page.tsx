
'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function SmartContractsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline">Smart Contracts</h1>
      <p className="text-muted-foreground mb-6">Describe the smart contract you want to create from a template.</p>
       <div className="space-y-4 max-w-2xl">
          <Textarea 
            placeholder="e.g., 'A vesting contract for team tokens that releases 25% of tokens every 6 months over a 2-year period. The beneficiary address should be updatable by the owner.'"
            className="min-h-[150px]"
          />
          <Button>Generate</Button>
        </div>
    </div>
  );
}


'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function GovernancePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline">DAO Governance</h1>
      <p className="text-muted-foreground mb-6">Describe the governance action you want to take.</p>
       <div className="space-y-4 max-w-2xl">
          <Textarea 
            placeholder="e.g., 'Create a new proposal to partner with Project X. The proposal should include a transfer of 10,000 governance tokens from the treasury to their multisig wallet.'"
            className="min-h-[150px]"
          />
          <Button>Submit</Button>
        </div>
    </div>
  );
}

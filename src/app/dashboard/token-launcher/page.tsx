
'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TokenLauncherPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline">Token Launcher</h1>
      <p className="text-muted-foreground mb-6">Describe the cryptocurrency token you want to create.</p>
      <div className="space-y-4 max-w-2xl">
          <Textarea 
            placeholder="e.g., 'Create an ERC-20 utility token named 'Starlight' (STAR) with a total supply of 100 million. It should have features for burning and minting.'"
            className="min-h-[150px]"
          />
          <Button>Generate</Button>
        </div>
    </div>
  );
}

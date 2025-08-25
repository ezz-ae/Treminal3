
'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function DappBuilderPage() {
  return (
    <div>
        <h1 className="text-3xl font-bold font-headline">dApp Builder</h1>
        <p className="text-muted-foreground mb-6">Describe the decentralized application you want to build.</p>
        <div className="space-y-4 max-w-2xl">
          <Textarea 
            placeholder="e.g., 'An NFT marketplace for digital art with a 5% royalty fee and a lazy minting feature.'"
            className="min-h-[150px]"
          />
          <Button>Generate</Button>
        </div>
    </div>
  );
}

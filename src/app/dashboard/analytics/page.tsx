
'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline">On-chain Analytics</h1>
      <p className="text-muted-foreground mb-6">Describe the on-chain data you want to query.</p>
       <div className="space-y-4 max-w-2xl">
          <Textarea 
            placeholder="e.g., 'Show me the top 10 largest swaps on Uniswap v3 on the Polygon network in the last 24 hours.'"
            className="min-h-[150px]"
          />
          <Button>Query</Button>
        </div>
    </div>
  );
}

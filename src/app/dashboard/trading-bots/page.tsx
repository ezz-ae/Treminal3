
'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TradingBotsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline">Trading Bots</h1>
      <p className="text-muted-foreground mb-6">Describe the trading strategy you want to automate.</p>
       <div className="space-y-4 max-w-2xl">
          <Textarea 
            placeholder="e.g., 'An arbitrage bot that monitors Uniswap V2 and Sushiswap for price differences in the ETH/DAI pair and executes a trade if the profit is greater than 0.5%.'"
            className="min-h-[150px]"
          />
          <Button>Generate</Button>
        </div>
    </div>
  );
}

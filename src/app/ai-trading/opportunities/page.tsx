'use client';
import { TrendingUp, Shield, Zap, Info, PlayCircle, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const highYieldOpportunities = [
    { pair: 'ETH/USDC', strategy: 'Volatility Scalp', projectedRoi: '22.1%', risk: 'High', confidence: 94.8, href: '/dashboard/bot-creator/volatility-scalper-eth', minCapital: '2,500 USDC' },
    { pair: 'BTC/USDC', strategy: 'Momentum Breakout', projectedRoi: '15.2%', risk: 'Medium', confidence: 98.2, href: '/dashboard/bot-creator/momentum-master-btc', minCapital: '5,000 USDC' },
];

const arbitrageOpportunities = [
    { pair: 'SOL/USDC', strategy: 'DEX Arbitrage', projectedRoi: '1.8%', risk: 'Low', confidence: 99.9, href: '/dashboard/bot-creator/arbitrage-bot-sol', minCapital: '10,000 USDC', description: 'Exploits price differences for SOL/USDC between Raydium and Orca.' },
];

const riskStyles: Record<string, string> = {
    'Low': 'text-green-400 border-green-500/50 bg-green-500/10',
    'Medium': 'text-orange-400 border-orange-500/50 bg-orange-500/10',
    'High': 'text-red-400 border-red-500/50 bg-red-500/10',
};


export default function OpportunitiesPage() {
    return (
        <div className="flex-1 flex flex-col p-4 md:p-8 space-y-12 container mx-auto">
            
             <section>
                <div className="mb-6">
                    <h2 className="text-2xl font-headline font-bold flex items-center gap-2"><Zap className="text-primary"/> High-Yield Opportunities</h2>
                    <p className="text-muted-foreground">Strategies with higher potential returns, suitable for more active risk management.</p>
                </div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {highYieldOpportunities.map(opp => <OpportunityCard key={opp.strategy} {...opp} />)}
                </div>
            </section>

             <section>
                <div className="mb-6">
                    <h2 className="text-2xl font-headline font-bold flex items-center gap-2"><Shield className="text-primary"/> Low-Risk Arbitrage</h2>
                    <p className="text-muted-foreground">Strategies designed to capture near risk-free profit from market inefficiencies.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     {arbitrageOpportunities.map(opp => <OpportunityCard key={opp.strategy} {...opp} />)}
                </div>
            </section>
        </div>
    );
}

const OpportunityCard = ({ pair, strategy, projectedRoi, risk, confidence, href, minCapital, description }: typeof highYieldOpportunities[0] & {description?: string}) => (
    <Card className="bg-card/60 backdrop-blur-sm flex flex-col">
        <CardHeader>
            <div className="flex justify-between items-start">
                 <CardTitle className="text-lg">{strategy} ({pair})</CardTitle>
                 <Badge variant="outline" className={cn(riskStyles[risk])}>{risk} Risk</Badge>
            </div>
           {description && <CardDescription className="pt-2">{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
             <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-sm text-muted-foreground font-semibold">Projected ROI</p>
                    <p className="text-2xl font-bold font-mono text-green-400">{projectedRoi}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground font-semibold">AI Confidence</p>
                    <p className="text-2xl font-bold font-mono">{confidence}%</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground font-semibold">Min. Capital</p>
                    <p className="text-2xl font-bold font-mono">{minCapital}</p>
                </div>
            </div>
        </CardContent>
        <CardFooter className="flex gap-2">
             <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                    <Button className="w-full" size="lg">
                        <PlayCircle className="w-4 h-4 mr-2"/> Auto-Execute
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Simulate a one-click execution of this strategy.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
             <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full" size="lg" asChild>
                        <Link href={href}>
                            <SlidersHorizontal className="w-4 h-4 mr-2"/> Advanced Setup
                        </Link>
                    </Button>
                 </TooltipTrigger>
                <TooltipContent>
                  <p>View the underlying bot and customize its parameters.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        </CardFooter>
    </Card>
);

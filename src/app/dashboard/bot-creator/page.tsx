
'use client';

import { Bot, BrainCircuit, SlidersHorizontal, ArrowRight, TrendingUp, BarChartHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BarChart2 } from 'lucide-react';

const tradingBots = [
    {
        slug: 'momentum-master-btc',
        name: 'Momentum Master (BTC)',
        description: 'A trend-following bot that capitalizes on major price movements using Golden Cross and Death Cross signals (50/200-day moving averages).',
        tradingPair: 'BTC/USDC',
        complexity: 'Medium',
        idealFor: 'Long-term trend followers.',
        icon: TrendingUp,
    },
    {
        slug: 'volatility-scalper-eth',
        name: 'Volatility Scalper (ETH)',
        description: 'This bot thrives on market volatility, using Bollinger Bands to execute frequent, small-profit trades when the price touches upper or lower bands.',
        tradingPair: 'ETH/USDC',
        complexity: 'High',
        idealFor: 'Active traders in choppy markets.',
        icon: BarChartHorizontal,
    },
     {
        slug: 'mean-reversion-sol',
        name: 'Mean Reversion (SOL)',
        description: 'A bot that operates on the principle that prices revert to their mean. It buys when the RSI is low (oversold) and sells when it\'s high (overbought).',
        tradingPair: 'SOL/USDC',
        complexity: 'Medium',
        idealFor: 'Traders in range-bound markets.',
        icon: BarChart2,
    },
];

const complexityStyles: Record<string, string> = {
    'Low': 'bg-green-500/20 text-green-400 border-green-500/20',
    'Medium': 'bg-orange-500/20 text-orange-400 border-orange-500/20',
    'High': 'bg-red-500/20 text-red-400 border-red-500/20',
}


export default function BotMarketplacePage() {
  return (
    <div className="container mx-auto py-12 space-y-8">
        <div>
            <h1 className="text-4xl font-bold font-headline flex items-center gap-3"><BrainCircuit className="w-10 h-10 text-primary"/> AI Bot Marketplace</h1>
            <p className="text-muted-foreground text-lg mt-2">
                Deploy institutional-grade, pre-built trading bots with a single click. Each bot is backtested and fully analyzed by our AI.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradingBots.map((bot) => {
                const Icon = bot.icon;
                return (
                     <Card key={bot.slug} className="flex flex-col group bg-card/50 hover:border-primary/50 transition-colors">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl font-bold font-headline group-hover:text-primary transition-colors pr-4">{bot.name}</CardTitle>
                                <div className="p-2 bg-primary/10 rounded-lg text-primary w-fit h-fit">
                                    <Icon className="w-5 h-5 shrink-0"/>
                                </div>
                            </div>
                             <div className="flex items-center gap-2 pt-2">
                                <Badge variant="outline">{bot.tradingPair}</Badge>
                                <Badge variant="outline" className={cn(complexityStyles[bot.complexity])}>{bot.complexity} Complexity</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription>{bot.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={`/dashboard/bot-creator/${bot.slug}`}>
                                    View Details & Deploy <ArrowRight className="ml-2 w-4 h-4"/>
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>
   </div>
  );
}

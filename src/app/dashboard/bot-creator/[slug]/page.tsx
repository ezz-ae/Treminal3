
'use client';

import { useState } from 'react';
import { generateTradingBot } from '@/ai/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, SlidersHorizontal, BarChart2, BarChartHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// This would typically come from a database or API
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
        icon: SlidersHorizontal,
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
    {
        slug: 'arbitrage-bot-sol',
        name: 'Arbitrageur (SOL)',
        description: 'A low-latency bot that monitors price discrepancies for SOL pairs between Raydium and Orca, executing trades to capture risk-free profit.',
        tradingPair: 'SOL/USDC',
        complexity: 'Low',
        idealFor: 'Capitalizing on market inefficiencies.',
        icon: BarChartHorizontal,
    },
];

const complexityStyles: Record<string, string> = {
    'Low': 'bg-green-500/20 text-green-400 border-green-500/20',
    'Medium': 'bg-orange-500/20 text-orange-400 border-orange-500/20',
    'High': 'bg-red-500/20 text-red-400 border-red-500/20',
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function BotCreatorPage({ params }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [botResult, setBotResult] = useState<any | null>(null);

  const bot = tradingBots.find(b => b.slug === params.slug);

  if (!bot) {
    return <div>Bot not found</div>;
  }

  const Icon = bot.icon;

  const handleDeploy = async () => {
    setIsLoading(true);
    setError(null);
    setBotResult(null);

    try {
      const result = await generateTradingBot({
        trading_pair: bot.tradingPair,
        strategy: bot.name,
        risk_level: bot.complexity,
      });
      setBotResult(result);
    } catch (e: any) {
        setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="text-2xl font-bold font-headline">{bot.name}</CardTitle>
                <div className="p-2 bg-primary/10 rounded-lg text-primary w-fit h-fit">
                    <Icon className="w-6 h-6 shrink-0"/>
                </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
                <Badge variant="outline">{bot.tradingPair}</Badge>
                <Badge variant="outline" className={cn(complexityStyles[bot.complexity])}>{bot.complexity} Complexity</Badge>
            </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg">{bot.description}</CardDescription>
          <p className="mt-4"><strong>Ideal for:</strong> {bot.idealFor}</p>

          <Button onClick={handleDeploy} disabled={isLoading} className="mt-6">
            {isLoading ? 'Generating Bot...' : 'Deploy Bot'}
          </Button>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {botResult && (
            <div className="mt-6">
                <h3 className="text-xl font-bold">Bot Generation Result</h3>
                <pre className="bg-gray-800 p-4 rounded-md mt-2">
                    {JSON.stringify(botResult, null, 2)}
                </pre>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}

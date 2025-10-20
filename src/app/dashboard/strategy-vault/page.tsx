
'use client';

import { Library, Zap, TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const strategies = [
    {
        name: 'Solana "First Mover" Token Launch',
        description: 'Launch a new SPL token, generate professional marketing assets, and create the initial liquidity pool on Raydium. A complete A-to-Z flow for new token launches.',
        cost: '2 SOL + Liquidity',
        roi: '150-300% (Projected 7-day)',
        risk: 'High',
        riskColor: 'text-red-400',
        href: '/solana/launch'
    },
    {
        name: 'ETH/Stablecoin Arbitrage Bot',
        description: 'Deploy an automated trading bot that capitalizes on small price differences for ETH between Uniswap and Sushiswap. Operates within a defined budget.',
        cost: '0.5 ETH',
        roi: '5-12% APY (Simulated)',
        risk: 'Medium',
        riskColor: 'text-orange-400',
        href: '/dashboard/bot-creator'
    },
     {
        name: 'Cross-Chain Governance Play',
        description: 'Identify and participate in key governance proposals across multiple protocols. This flow automatically acquires the necessary tokens to vote on high-impact proposals.',
        cost: 'Variable',
        roi: 'N/A (Influence-based)',
        risk: 'Low',
        riskColor: 'text-green-400',
        href: '/dashboard/dao-governance'
    },
     {
        name: 'NFT Wash Trade Detection',
        description: 'Analyze NFT marketplace transactions to identify and report on potential wash trading activity. A flow for on-chain analysts and security researchers.',
        cost: '0.2 SOL per collection',
        roi: 'N/A (Data product)',
        risk: 'Low',
        riskColor: 'text-green-400',
        href: '/dashboard/analytics'
    },
]

/**
 * A page that displays available "Crypto Flows" or investment strategies.
 * @returns {JSX.Element} The Strategy Vault page component.
 */
export default function StrategyVaultPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-headline tracking-tight flex items-center gap-3"><Library className="w-10 h-10 text-primary"/> Strategy Vault</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Browse, select, and execute pre-packaged intelligent flows designed to generate outcomes. This is your bank for Web3.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {strategies.map((strategy) => (
            <Card key={strategy.name} className="flex flex-col bg-card/50 hover:border-primary/50 transition-colors group">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold font-headline group-hover:text-primary transition-colors">{strategy.name}</CardTitle>
                    <CardDescription className="pt-2">{strategy.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                     <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" />
                        <div>
                            <p className="text-sm font-semibold">Execution Cost</p>
                            <p className="text-sm text-muted-foreground">{strategy.cost}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <div>
                            <p className="text-sm font-semibold">Projected ROI</p>
                            <p className="text-sm text-muted-foreground">{strategy.roi}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2">
                        <ShieldAlert className={`w-5 h-5 ${strategy.riskColor}`} />
                        <div>
                            <p className="text-sm font-semibold">Risk Level</p>
                            <Badge variant="outline" className={strategy.riskColor}>{strategy.risk}</Badge>
                        </div>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={strategy.href}>
                            View & Execute Strategy <ArrowRight className="ml-2 w-4 h-4"/>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}

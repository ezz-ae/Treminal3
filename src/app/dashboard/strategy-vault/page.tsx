
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Library, Zap, TrendingUp, ShieldAlert, ArrowRight, Bot, AppWindow, Gem, FileJson, X, Megaphone, BrainCircuit, Wind, Rocket, AreaChart, Sprout } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StrategyCard } from '@/components/dashboard/strategy-card';
import { useCommandMenu } from '@/contexts/command-menu-context';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const allStrategies = [
    // DeFi
    {
        name: 'ETH/Stablecoin Arbitrage Bot',
        description: 'Deploy an automated trading bot that capitalizes on small price differences for ETH between Uniswap and Sushiswap. Operates within a defined budget.',
        cost: '0.5 ETH',
        roi: '5-12% APY (Simulated)',
        risk: 'Medium',
        category: 'DeFi',
        icon: Bot,
        href: '/dashboard/bot-creator'
    },
    {
        name: 'Yield Farming Aggregator',
        description: 'Automatically move stablecoins between Aave, Compound, and Yearn Finance to always capture the highest lending APY.',
        cost: 'Gas Fees',
        roi: '7-15% APY',
        risk: 'Medium',
        category: 'DeFi',
        icon: TrendingUp,
        href: '/dashboard/bot-creator'
    },
    {
        name: 'Uniswap V3 LP Optimizer',
        description: 'Monitors your Uniswap V3 positions and automatically rebalances liquidity to keep it in range, maximizing fee collection.',
        cost: '0.3 ETH + Gas',
        roi: '15-40% APY (Simulated)',
        risk: 'High',
        category: 'DeFi',
        icon: Bot,
        href: '/dashboard/bot-creator'
    },
    {
        name: 'Gas Price Arbitrage',
        description: 'Execute large, non-urgent transactions (e.g., portfolio rebalancing) only when gas prices on the target network fall below a specified Gwei threshold.',
        cost: 'Low',
        roi: 'Gas Savings',
        risk: 'Low',
        category: 'DeFi',
        icon: Zap,
        href: '/dashboard/bot-creator'
    },
    {
        name: 'Impermanent Loss Hedger',
        description: 'A complex strategy that automatically takes out a small, leveraged short position to hedge against potential impermanent loss in your LP positions.',
        cost: 'Trading Fees',
        roi: 'Loss Mitigation',
        risk: 'High',
        category: 'DeFi',
        icon: TrendingUp,
        href: '/dashboard/bot-creator'
    },
    {
        name: 'New Token Sniper',
        description: 'A high-risk bot that scans mempools for new liquidity pool creations and attempts to be one of the first buyers of a new token.',
        cost: 'Variable',
        roi: '0-10,000%',
        risk: 'Very High',
        category: 'DeFi',
        icon: Bot,
        href: '/dashboard/bot-creator'
    },
    {
        name: 'Portfolio Rebalancer',
        description: 'Automatically rebalances your portfolio across a set of tokens to maintain a desired allocation (e.g., 50% BTC, 30% ETH, 20% SOL).',
        cost: 'Trading Fees',
        roi: 'Risk Management',
        risk: 'Medium',
        category: 'DeFi',
        icon: Bot,
        href: '/dashboard/bot-creator'
    },

    // Solana
    {
        name: 'Solana "First Mover" Token Launch',
        description: 'Launch a new SPL token, generate professional marketing assets, and create the initial liquidity pool on Raydium. A complete A-to-Z flow for new token launches.',
        cost: '2 SOL + Liquidity',
        roi: '150-300% (Projected 7-day)',
        risk: 'High',
        category: 'Solana',
        icon: Rocket,
        href: '/solana/launch'
    },
    {
        name: 'Solana DEX Trading Bot',
        description: 'Deploy a trading bot on a Solana DEX like Jupiter or Orca to execute a specific strategy (e.g., grid trading, DCA).',
        cost: '0.5 SOL',
        roi: 'Variable',
        risk: 'High',
        category: 'Solana',
        icon: Bot,
        href: '/solana/trading'
    },
    {
        name: 'Solana Staking Optimizer',
        description: 'Automatically delegate your SOL to a basket of top-performing validators, rebalancing periodically to maximize staking rewards.',
        cost: '0.1 SOL',
        roi: '~7% APY',
        risk: 'Low',
        category: 'Solana',
        icon: Sprout,
        href: '/solana/staking'
    },

    // NFT
    {
        name: 'NFT Minting Bot',
        description: 'Automatically mint NFTs from a specified collection the moment it drops. This flow includes gas optimization and multiple transaction attempts.',
        cost: '0.1 ETH + Mint Cost',
        roi: 'Variable',
        risk: 'High',
        category: 'NFT',
        icon: Bot,
        href: '/dashboard/bot-creator'
    },
    {
        name: 'NFT Collection Floor Sweeper',
        description: 'An automated bot that "sweeps the floor" by buying the cheapest NFTs in a collection when the floor price drops below a set threshold.',
        cost: 'Variable',
        roi: 'Variable',
        risk: 'High',
        category: 'NFT',
        icon: Bot,
        href: '/dashboard/bot-creator'
    },
    {
        name: 'NFT Trait Sniper',
        description: 'A bot that monitors NFT marketplaces and automatically purchases a listed NFT if it has a specific rare trait for a price below a set value.',
        cost: 'Variable',
        roi: 'Variable',
        risk: 'High',
        category: 'NFT',
        icon: Bot,
        href: '/dashboard/bot-creator'
    },
    {
        name: 'NFT Metadata Backup',
        description: 'Finds all NFTs in your wallet, downloads their metadata and images, and backs them up to decentralized storage like Arweave.',
        cost: 'Storage Fees',
        roi: 'N/A (Security)',
        risk: 'Low',
        category: 'NFT',
        icon: AppWindow,
        href: '/dashboard/dapp-builder'
    },

    // Development
    {
        name: 'Smart Contract Deployment Suite',
        description: 'A complete CI/CD pipeline for smart contracts. Compile, test, and deploy your contracts to a testnet, then mainnet, with a single command.',
        cost: 'Gas Fees',
        roi: 'N/A (Dev Tool)',
        risk: 'Low',
        category: 'Development',
        icon: FileJson,
        href: '/dashboard/tools'
    },
    {
        name: 'Front-End dApp Generator',
        description: 'Provide a smart contract address and ABI, and the AI will generate a complete React/Next.js front-end to interact with it.',
        cost: 'Free',
        roi: 'N/A (Dev Tool)',
        risk: 'Low',
        category: 'Development',
        icon: AppWindow,
        href: '/dashboard/dapp-builder'
    },
    {
        name: 'Gas Token Top-Up',
        description: 'Monitors the native token (e.g., ETH, MATIC) balance of your wallets and automatically sends a small amount from a master wallet if it falls below a threshold.',
        cost: 'Gas Fees',
        roi: 'N/A (Convenience)',
        risk: 'Low',
        category: 'Development',
        icon: Zap,
        href: '/dashboard/bot-creator'
    },
    {
        name: 'Subscription Service Deployer',
        description: 'Deploy a set of smart contracts that allow you to charge users a recurring fee (e.g., monthly) for access to a service.',
        cost: 'Deployment Gas',
        roi: 'N/A (Business)',
        risk: 'Medium',
        category: 'Development',
        icon: AppWindow,
        href: '/dashboard/dapp-builder'
    },
    {
        name: 'On-chain Oracle Deployer',
        description: 'Deploy and configure your own Chainlink oracle contract to bring off-chain data into your smart contracts securely.',
        cost: 'LINK tokens + Gas',
        roi: 'N/A (Infrastructure)',
        risk: 'Medium',
        category: 'Development',
        icon: AppWindow,
        href: '/dashboard/dapp-builder'
    },

    // Security
    {
        name: 'MEV Sandwich Attack Simulator',
        description: 'An educational flow for security researchers that simulates how a Maximal Extractable Value (MEV) sandwich attack works on a target transaction.',
        cost: '0.1 ETH (Testnet)',
        roi: 'N/A (Educational)',
        risk: 'Low',
        category: 'Security',
        icon: ShieldAlert,
        href: '/dashboard/security-audits'
    },
    {
        name: 'Flash Loan Exploit Tester',
        description: 'For developers: a flow that attempts to use a flash loan to exploit a vulnerability in a smart contract deployed on a testnet.',
        cost: 'Testnet Gas',
        roi: 'N/A (Security)',
        risk: 'Medium',
        category: 'Security',
        icon: ShieldAlert,
        href: '/dashboard/security-audits'
    },
    {
        name: 'Rug Pull Detector',
        description: 'Analyze a token\'s contract for common signs of a "rug pull", such as locked liquidity, ownership renouncement, and honeypot functions.',
        cost: 'Free',
        roi: 'N/A (Security)',
        risk: 'Low',
        category: 'Security',
        icon: ShieldAlert,
        href: '/dashboard/security-audits'
    },
];

const categories = ['DeFi', 'Solana', 'NFT', 'Development', 'Security'];

const riskStyles: Record<string, { card: string; badge: string; text: string }> = {
    'Low': {
        card: 'border-green-500/30 hover:border-green-500/80',
        badge: 'border-green-500/50 bg-green-500/10 text-green-400',
        text: 'text-green-400'
    },
    'Medium': {
        card: 'border-orange-500/30 hover:border-orange-500/80',
        badge: 'border-orange-500/50 bg-orange-500/10 text-orange-400',
        text: 'text-orange-400'
    },
    'High': {
        card: 'border-red-500/30 hover:border-red-500/80',
        badge: 'border-red-500/50 bg-red-500/10 text-red-400',
        text: 'text-red-400'
    },
    'Very High': {
        card: 'border-red-700/50 hover:border-red-700/80',
        badge: 'border-red-700/50 bg-red-700/20 text-red-500',
        text: 'text-red-500'
    }
}

export default function StrategyVaultPage() {
    const [selectedStrategy, setSelectedStrategy] = useState<any>(null);
    const { setOpen } = useCommandMenu();

    const handleExecute = () => {
        if (selectedStrategy.cost.toLowerCase() !== 'free') {
            setOpen(true);
        } else {
            // Handle free strategy execution
        }
    };

    return (
        <div className="container mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-headline tracking-tight flex items-center justify-center gap-3"><Library className="w-10 h-10 text-primary"/> Strategy Vault</h1>
                <p className="text-muted-foreground mt-4 text-xl max-w-3xl mx-auto">
                    Your command center for Web3 automation. Discover, customize, and execute powerful strategies across DeFi, Solana, NFTs, and more.
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <Tabs defaultValue="DeFi" className="w-full">
                        <TabsList className="grid w-full grid-cols-5 mb-6">
                            {categories.map(category => (
                                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                            ))}
                        </TabsList>
                        {categories.map(category => (
                            <TabsContent key={category} value={category}>
                                <motion.div layout className="grid gap-6 md:grid-cols-2">
                                    {allStrategies.filter(s => s.category === category).map(strategy => (
                                        <StrategyCard 
                                            key={strategy.name} 
                                            strategy={strategy} 
                                            onSelect={setSelectedStrategy} 
                                            isSelected={selectedStrategy?.name === strategy.name}
                                        />
                                    ))}
                                </motion.div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>

                <div className="lg:sticky lg:top-24">
                     <AnimatePresence>
                        {selectedStrategy ? (
                             <motion.div 
                                layoutId={`card-${selectedStrategy.name}`}
                                key={selectedStrategy.name}
                                className="h-full"
                             >
                                <Card className={cn("border-2", riskStyles[selectedStrategy.risk]?.card)}>
                                    <CardHeader className="flex-row items-start gap-4 space-y-0">
                                        <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit h-fit mt-1">
                                            <selectedStrategy.icon className="w-8 h-8 shrink-0"/>
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg font-bold font-headline">{selectedStrategy.name}</CardTitle>
                                            <CardDescription className="mt-1 text-sm">{selectedStrategy.description}</CardDescription>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => setSelectedStrategy(null)} className="ml-auto !mt-0">
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="space-y-6 text-sm">
                                         <div className="space-y-4 p-4 rounded-lg bg-card-foreground/5">
                                             <h4 className="font-bold">Strategy Details</h4>
                                            <div className="flex items-center justify-between">
                                                <p className="text-muted-foreground flex items-center gap-2"><Zap className="w-4 h-4"/>Execution Cost</p>
                                                <p className="font-mono font-bold">{selectedStrategy.cost}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-muted-foreground flex items-center gap-2"><TrendingUp className="w-4 h-4"/>Projected ROI</p>
                                                <p className="font-mono font-bold">{selectedStrategy.roi}</p>
                                            </div>
                                                <div className="flex items-center justify-between">
                                                <p className="text-muted-foreground flex items-center gap-2"><ShieldAlert className="w-4 h-4"/>Risk Level</p>
                                                <p className={cn("font-mono font-bold", riskStyles[selectedStrategy.risk]?.text)}>{selectedStrategy.risk}</p>
                                            </div>
                                        </div>
                                        <Button size="lg" className="w-full" onClick={handleExecute}>
                                            Execute Strategy <ArrowRight className="ml-2 w-4 h-4"/>
                                        </Button>
                                         <Button size="lg" variant="outline" className="w-full" asChild>
                                            <Link href={selectedStrategy.href}>Go to Full Page</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ) : (
                             <Card className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[400px]">
                                <Library className="w-12 h-12 text-muted-foreground/50" />
                                <p className="mt-4 text-lg font-medium text-muted-foreground">
                                    Select a strategy to view its details.
                                </p>
                                <p className="text-sm text-muted-foreground/80">Choose a flow from the left to see more information and execution options.</p>
                            </Card>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

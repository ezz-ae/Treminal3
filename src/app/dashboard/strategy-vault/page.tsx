
'use client';

import { Library, Zap, TrendingUp, ShieldAlert, ArrowRight, Bot, AppWindow, Gem, FileJson } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const strategies = [
    {
        name: 'Solana "First Mover" Token Launch',
        description: 'Launch a new SPL token, generate professional marketing assets, and create the initial liquidity pool on Raydium. A complete A-to-Z flow for new token launches.',
        cost: '2 SOL + Liquidity',
        roi: '150-300% (Projected 7-day)',
        risk: 'High',
        category: 'Solana',
        icon: Gem,
        href: '/solana/launch'
    },
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
        name: 'Cross-Chain Governance Play',
        description: 'Identify and participate in key governance proposals across multiple protocols. This flow automatically acquires the necessary tokens to vote on high-impact proposals.',
        cost: 'Variable',
        roi: 'N/A (Influence-based)',
        risk: 'Low',
        category: 'DAO',
        icon: Library,
        href: '/dashboard/dao-governance'
    },
     {
        name: 'NFT Wash Trade Detection',
        description: 'Analyze NFT marketplace transactions to identify and report on potential wash trading activity. A flow for on-chain analysts and security researchers.',
        cost: '0.2 SOL per collection',
        roi: 'N/A (Data product)',
        risk: 'Low',
        category: 'Analytics',
        icon: ShieldAlert,
        href: '/dashboard/finance'
    },
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
        name: 'Airdrop Farming Assistant',
        description: 'Identifies potential upcoming airdrops and guides you through the required on-chain interactions to maximize eligibility.',
        cost: 'Gas Fees',
        roi: 'Highly Variable',
        risk: 'Medium',
        category: 'DeFi',
        icon: Bot,
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
        name: 'Smart Contract Deployment Suite',
        description: 'A complete CI/CD pipeline for smart contracts. Compile, test, and deploy your contracts to a testnet, then mainnet, with a single command.',
        cost: 'Gas Fees',
        roi: 'N/A (Dev Tool)',
        risk: 'Low',
        category: 'Dev Tool',
        icon: FileJson,
        href: '/dashboard/tools'
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
        name: 'Decentralized Identity Setup',
        description: 'Create a comprehensive decentralized identity using ENS/SNS, Ceramic, and other DID protocols. Consolidate your Web3 presence.',
        cost: '0.05 ETH',
        roi: 'N/A (Reputation)',
        risk: 'Low',
        category: 'Identity',
        icon: AppWindow,
        href: '/dashboard/dapp-builder'
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
        name: 'On-chain Data Exporter',
        description: 'A script that scrapes specific smart contract event logs (e.g., all "Transfer" events for an NFT) and exports them to a CSV file for off-chain analysis.',
        cost: 'RPC Credits',
        roi: 'N/A (Data)',
        risk: 'Low',
        category: 'Analytics',
        icon: FileJson,
        href: '/dashboard/finance'
    },
    {
        name: 'DAO Proposal Automation',
        description: 'Automatically create and submit a DAO proposal using a template. Ideal for recurring treasury requests or community grants.',
        cost: 'Gas Fees',
        roi: 'N/A (Governance)',
        risk: 'Low',
        category: 'DAO',
        icon: Library,
        href: '/dashboard/dao-governance'
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
        name: 'Wallet Drainer Honeypot',
        description: 'Deploy a smart contract that appears vulnerable to a wallet draining attack to study and trap malicious bots. For security researchers only.',
        cost: 'Gas Fees',
        roi: 'N/A (Research)',
        risk: 'Medium',
        category: 'Security',
        icon: ShieldAlert,
        href: '/dashboard/security-audits'
    },
    {
        name: 'EVM State Change Visualizer',
        description: 'Enter a transaction hash and this flow will provide a visual step-by-step breakdown of every state change that occurred in the EVM.',
        cost: 'RPC Credits',
        roi: 'N/A (Dev Tool)',
        risk: 'Low',
        category: 'Dev Tool',
        icon: FileJson,
        href: '/dashboard/tools'
    },
    {
        name: 'Multi-Sig Wallet Manager',
        description: 'A complete UI and backend flow for creating and managing a Gnosis Safe multi-signature wallet for teams or DAOs.',
        cost: 'Deployment Gas',
        roi: 'N/A (Security)',
        risk: 'Low',
        category: 'DAO',
        icon: Library,
        href: '/dashboard/dao-governance'
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
    {
        name: 'Front-End dApp Generator',
        description: 'Provide a smart contract address and ABI, and the AI will generate a complete React/Next.js front-end to interact with it.',
        cost: 'Free',
        roi: 'N/A (Dev Tool)',
        risk: 'Low',
        category: 'Dev Tool',
        icon: AppWindow,
        href: '/dashboard/dapp-builder'
    },
    {
        name: 'Gas Token Top-Up',
        description: 'Monitors the native token (e.g., ETH, MATIC) balance of your wallets and automatically sends a small amount from a master wallet if it falls below a threshold.',
        cost: 'Gas Fees',
        roi: 'N/A (Convenience)',
        risk: 'Low',
        category: 'Dev Tool',
        icon: Zap,
        href: '/dashboard/bot-creator'
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
    {
        name: 'Subscription Service Deployer',
        description: 'Deploy a set of smart contracts that allow you to charge users a recurring fee (e.g., monthly) for access to a service.',
        cost: 'Deployment Gas',
        roi: 'N/A (Business)',
        risk: 'Medium',
        category: 'Dev Tool',
        icon: AppWindow,
        href: '/dashboard/dapp-builder'
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
        name: 'On-chain Oracle Deployer',
        description: 'Deploy and configure your own Chainlink oracle contract to bring off-chain data into your smart contracts securely.',
        cost: 'LINK tokens + Gas',
        roi: 'N/A (Infrastructure)',
        risk: 'Medium',
        category: 'Dev Tool',
        icon: AppWindow,
        href: '/dashboard/dapp-builder'
    },
    {
        name: 'Tax Calculation Reporter',
        description: 'Analyzes your transaction history across multiple wallets and generates a CSV report of capital gains and losses for tax purposes.',
        cost: '0.1 ETH',
        roi: 'Time Saved',
        risk: 'Low',
        category: 'Analytics',
        icon: FileJson,
        href: '/dashboard/finance'
    },
];

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

const categories = [...new Set(strategies.map(s => s.category))];
const risks = ['Low', 'Medium', 'High', 'Very High'];


/**
 * A page that displays available "Crypto Flows" or investment strategies.
 * @returns {JSX.Element} The Strategy Vault page component.
 */
export default function StrategyVaultPage() {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeRisks, setActiveRisks] = useState<string[]>([]);

  const toggleFilter = (filterList: string[], setFilterList: Function, item: string) => {
    if (filterList.includes(item)) {
        setFilterList(filterList.filter(i => i !== item));
    } else {
        setFilterList([...filterList, item]);
    }
  }

  const filteredStrategies = strategies.filter(strategy => {
    const categoryMatch = activeCategories.length === 0 || activeCategories.includes(strategy.category);
    const riskMatch = activeRisks.length === 0 || activeRisks.includes(strategy.risk);
    return categoryMatch && riskMatch;
  });

  return (
      <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight flex items-center gap-3"><Library className="w-8 h-8 text-primary"/> Strategy Vault</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Browse, select, and execute pre-packaged intelligent flows designed to generate outcomes. This is your bank for Web3.
            </p>
          </div>
          <Card className="p-6 bg-card/50">
           <div className="flex flex-col md:flex-row gap-6">
               <div className="flex-1">
                   <h3 className="font-semibold mb-2">Filter by Category</h3>
                   <div className="flex flex-wrap gap-2">
                       {categories.map(category => (
                           <Button
                               key={category}
                               variant={activeCategories.includes(category) ? 'default' : 'outline'}
                               size="sm"
                               onClick={() => toggleFilter(activeCategories, setActiveCategories, category)}
                           >
                               {category}
                           </Button>
                       ))}
                   </div>
               </div>
                <div className="flex-1">
                   <h3 className="font-semibold mb-2">Filter by Risk</h3>
                    <div className="flex flex-wrap gap-2">
                       {risks.map(risk => (
                           <Button
                               key={risk}
                               variant={activeRisks.includes(risk) ? 'default' : 'outline'}
                               size="sm"
                               onClick={() => toggleFilter(activeRisks, setActiveRisks, risk)}
                               className={cn(activeRisks.includes(risk) && riskStyles[risk]?.badge, 'border')}
                           >
                               {risk}
                           </Button>
                       ))}
                   </div>
               </div>
           </div>
           {(activeCategories.length > 0 || activeRisks.length > 0) && (
               <Button variant="ghost" size="sm" onClick={() => { setActiveCategories([]); setActiveRisks([]); }} className="mt-4">
                   Clear all filters
               </Button>
           )}
         </Card>
          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
            {filteredStrategies.map((strategy) => {
                const riskStyle = riskStyles[strategy.risk] || riskStyles['Medium'];
                const Icon = strategy.icon;
                return (
                    <motion.div
                        layout
                        key={strategy.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className={cn("flex flex-col bg-card/50 transition-colors group h-full", riskStyle.card)}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg font-bold font-headline group-hover:text-primary transition-colors pr-4">{strategy.name}</CardTitle>
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary w-fit h-fit">
                                        <Icon className="w-5 h-5 shrink-0"/>
                                    </div>
                                </div>
                                <CardDescription className="pt-2 text-sm">{strategy.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 flex-grow">
                                <div className="flex items-center gap-4">
                                    <Badge variant="outline" className="text-xs font-mono">{strategy.category}</Badge>
                                    <Badge variant="outline" className={cn('text-xs', riskStyle.badge)}>{strategy.risk} Risk</Badge>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <Zap className="w-4 h-4 text-primary" />
                                    <div>
                                        <p className="text-xs font-semibold">Execution Cost</p>
                                        <p className="text-xs text-muted-foreground">{strategy.cost}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-green-400" />
                                    <div>
                                        <p className="text-xs font-semibold">Projected ROI</p>
                                        <p className="text-xs text-muted-foreground">{strategy.roi}</p>
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
                    </motion.div>
                );
            })}
            </AnimatePresence>
          </motion.div>
          {filteredStrategies.length === 0 && (
             <div className="text-center py-12">
               <p className="text-lg text-muted-foreground">No strategies match your current filters.</p>
             </div>
           )}
      </div>
  );
}

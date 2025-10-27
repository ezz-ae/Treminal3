
'use client';

import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, SlidersHorizontal, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface LiquidityStrategy {
  id: string;
  name: string;
  description: string;
  aiInsight: string;
  apyRange: string;
  impermanentLossRisk: string; // AI-assessed risk
}

const mockLiquidityStrategies: LiquidityStrategy[] = [
  {
    id: 'strat_001',
    name: 'Dynamic SOL-USDC Rebalancer',
    description: 'An AI-driven strategy that actively rebalances SOL and USDC positions in a concentrated liquidity pool to maximize fee generation while mitigating impermanent loss.',
    aiInsight: 'AI analysis suggests high capital efficiency and strong performance potential in stable-to-mildly volatile markets. Optimized for minimizing impermanent loss with adaptive ranges.',
    apyRange: '15-25% APY',
    impermanentLossRisk: 'Low to Medium',
  },
  {
    id: 'strat_002',
    name: 'High-Yield Altcoin Pair Explorer',
    description: 'AI proactively identifies and allocates capital to high-APY, volatile altcoin-stablecoin pairs on Solana DEXs, capitalizing on short-term price movements.',
    aiInsight: 'AI flags this for aggressive growth. Optimal for users with higher risk tolerance, as it leverages volatility for amplified returns. Requires continuous AI monitoring.',
    apyRange: '30-60% APY',
    impermanentLossRisk: 'Medium to High',
  },
  {
    id: 'strat_003',
    name: 'Stablecoin Concentrated Optimizer',
    description: 'Focuses on generating consistent fees from stablecoin pairs (e.g., USDC-USDT) within tight, AI-managed price ranges, ideal for capital preservation.',
    aiInsight: 'AI recommends this strategy for capital preservation and consistent, lower-risk returns. Ideal for minimizing exposure to market volatility.',
    apyRange: '8-12% APY',
    impermanentLossRisk: 'Very Low',
  },
];

export default function SolanaLiquidityPoolsPage() {
  const [selectedStrategy, setSelectedStrategy] = useState<LiquidityStrategy | null>(null);
  const [aiAnalysisLoading, setAiAnalysisLoading] = useState(false);
  const [userRiskProfile, setUserRiskProfile] = useState('medium'); // From global adaptors, mock for now

  const handleSelectStrategy = useCallback(async (strategyId: string) => {
    setAiAnalysisLoading(true);
    // Simulate AI adapting insights based on user's global risk profile (mock)
    await new Promise(resolve => setTimeout(resolve, 800)); 
    const strategy = mockLiquidityStrategies.find(s => s.id === strategyId);
    if (strategy) {
        // Simulate AI slightly adjusting description based on user risk
        const adaptedStrategy = { ...strategy };
        if (userRiskProfile === 'low' && adaptedStrategy.impermanentLossRisk.includes('High')) {
            adaptedStrategy.aiInsight = "AI recommends caution given your low risk profile. This strategy, while high-yield, carries elevated impermanent loss risk. Consider a more conservative approach.";
        }
        setSelectedStrategy(adaptedStrategy);
    }
    setAiAnalysisLoading(false);
  }, [userRiskProfile]);

  const handleDeployStrategy = useCallback(() => {
    if (selectedStrategy) {
      alert(`Deploying AI-optimized strategy: ${selectedStrategy.name}`);
      // Actual deployment logic here, interacting with backend/smart contracts
      // Redirect to a monitoring page, e.g., /dashboard/ai-trading/portfolio or similar
    }
  }, [selectedStrategy]);

  return (
    <div className="bg-background text-foreground overflow-hidden font-body">
      {/* Hero Section: AI-Optimized Solana Liquidity */}
      <div className="container mx-auto px-4 md:px-6 py-20 text-center relative overflow-hidden max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl lg:text-7xl font-extrabold font-headline mb-4 bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text leading-tight"
        >
          AI-Optimized Solana: Liquidity Orchestration
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 tracking-wide"
        >
          Maximize your capital efficiency and generate consistent returns by deploying AI-driven liquidity strategies on the Solana blockchain.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button size="lg" className="text-base py-6 px-9 group">
            Explore AI Strategies
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      {/* AI-Driven Strategy Explorer */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-green-400 to-primary text-transparent bg-clip-text">
          AI Strategy Explorer: Intelligent Liquidity Pathways
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Strategy Selection Column */}
            <div className="space-y-6 p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">Choose Your AI-Optimized Strategy</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="user-risk" className="text-base text-foreground">Your Global Risk Profile (Mock)</Label>
                        <Select value={userRiskProfile} onValueChange={setUserRiskProfile}>
                            <SelectTrigger id="user-risk" className="text-base"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low Risk</SelectItem>
                                <SelectItem value="medium">Medium Risk</SelectItem>
                                <SelectItem value="high">High Risk</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">This setting influences AI recommendations across the platform.</p>
                    </div>
                    {mockLiquidityStrategies.map((strategy) => (
                        <motion.div
                            key={strategy.id}
                            whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
                            className={`p-4 border rounded-md cursor-pointer transition-all 
                                ${selectedStrategy?.id === strategy.id ? 'border-primary bg-primary/10' : 'border-border/50 bg-background/50 hover:bg-background/70'}
                            `}
                            onClick={() => handleSelectStrategy(strategy.id)}
                        >
                            <h4 className="text-lg font-bold text-foreground mb-1">{strategy.name}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{strategy.description.substring(0, 100)}...</p>
                            <span className="text-xs text-primary mt-2 block">APY: {strategy.apyRange} | IL Risk: {strategy.impermanentLossRisk}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* AI Analysis & Deployment Column */}
            <div className="space-y-8 p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-purple-500/10 shadow-lg">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">AI-Driven Strategy Insights</h3>
                <AnimatePresence mode="wait">
                    {aiAnalysisLoading && (
                        <motion.div 
                            key="loading-analysis"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-muted-foreground text-center py-10"
                        >
                            AI is analyzing and tailoring insights...
                        </motion.div>
                    )}
                    {!selectedStrategy && !aiAnalysisLoading && (
                        <motion.div 
                            key="no-strategy-selected"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-muted-foreground text-center py-10"
                        >
                            Select a liquidity strategy from the left panel for AI-powered insights and deployment options.
                        </motion.div>
                    )}
                    {selectedStrategy && !aiAnalysisLoading && (
                        <motion.div
                            key={selectedStrategy.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            <h4 className="text-xl font-bold text-primary font-headline">{selectedStrategy.name}</h4>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                <strong className="text-foreground">AI Insight:</strong> {selectedStrategy.aiInsight}
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                <div><strong>APY Range:</strong> <span className="font-mono text-green-400">{selectedStrategy.apyRange}</span></div>
                                <div><strong>IL Risk:</strong> <span className={`font-semibold 
                                    ${selectedStrategy.impermanentLossRisk.includes('High') ? 'text-red-400' : selectedStrategy.impermanentLossRisk.includes('Medium') ? 'text-yellow-400' : 'text-green-400'}
                                `}>{selectedStrategy.impermanentLossRisk}</span></div>
                            </div>
                            <Button 
                                onClick={handleDeployStrategy} 
                                className="w-full text-base py-6 group bg-primary hover:bg-primary/90 transition-all mt-8"
                            >
                                Deploy AI Liquidity Strategy
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </section>

      {/* Execution Guidance / On-page Docs */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-4xl text-muted-foreground text-base space-y-8">
          <h2 className="text-3xl font-bold font-headline text-foreground text-center mb-10">Orchestrating Your Solana Liquidity</h2>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">1. Set Your AI Preferences</h3>
            <p>Begin by defining your overall risk tolerance and strategic goals using the AI Adaptors in your user history. These preferences will inform the AI's recommendations for liquidity strategies.</p>
            <p className="mt-2"><strong>Action:</strong> Review and adjust your AI Adaptor settings on the <Link href="/dashboard/history" className="text-primary hover:underline">User History & Adaptors</Link> page.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">2. Explore AI-Optimized Strategies</h3>
            <p>Browse a curated selection of liquidity strategies, each with detailed AI-generated insights into their performance potential, capital efficiency, and impermanent loss considerations. Select the strategy that best aligns with your objectives.</p>
            <p className="mt-2"><strong>Action:</strong> Click on a strategy in the left panel to reveal its AI-driven analysis and projected outcomes.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">3. Deploy & Monitor with AI Autonomy</h3>
            <p>Once you've chosen and reviewed a strategy, deploy your AI liquidity agent with a single command. The AI will autonomously manage your positions, rebalance assets, and optimize for continuous fee generation. Monitor its performance seamlessly through your dashboard.</p>
            <p className="mt-2"><strong>Action:</strong> After selecting a strategy, click 'Deploy AI Liquidity Strategy'. Monitor its performance via your integrated <Link href="/dashboard/finance" className="text-primary hover:underline">Financial Dashboard</Link>.</p>
          </motion.div>
      </section>

      {/* Disclaimer Section - Subtle & Professional */}
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground max-w-3xl mx-auto opacity-70 leading-relaxed">
          <strong className="text-destructive-foreground">Disclaimer:</strong> Providing liquidity in decentralized finance (DeFi) involves inherent risks, including impermanent loss and smart contract vulnerabilities. Terminal3 offers advanced AI tools for optimization; however, users are responsible for their investment decisions and ensuring compliance with all applicable regulations. Please engage with AI liquidity strategies responsibly.
        </p>
      </div>
    </div>
  );
}

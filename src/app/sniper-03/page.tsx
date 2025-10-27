
'use client';

import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// --- Mock AI Functions for Sniper 03 ---
const generateAiSniperStrategy = async (risk: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate AI processing
  const strategies = [
    "AI-optimized front-running detection for new token liquidity pools.",
    "Algorithmic snipe for NFT collection mints with rarity prediction.",
    "Dynamic rebalancing and entry for highly anticipated token launches."
  ];
  return strategies[Math.floor(Math.random() * strategies.length)];
};

const simulateSniperPerformance = async (strategy: string, risk: string) => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI processing
  return {
    successRate: (75 + Math.random() * 20).toFixed(1) + '%',
    expectedCaptureTime: (100 + Math.random() * 50).toFixed(0) + 'ms',
    simulatedProfit: (risk === 'high' ? (Math.random() * 500 + 100).toFixed(2) : (Math.random() * 50 + 10).toFixed(2)) + ' USDC',
    aiAnalysis: 'Simulation indicates high probability of rapid execution and significant capture in optimal market conditions.'
  };
};

export default function Sniper03Page() {
  const [selectedRisk, setSelectedRisk] = useState('medium');
  const [aiStrategy, setAiStrategy] = useState<string | null>(null);
  const [simulationResult, setSimulationResult] = useState<any | null>(null);
  const [loadingState, setLoadingState] = useState<'idle' | 'generating_strategy' | 'simulating' | 'deploying'>('idle');

  const handleGenerateStrategy = useCallback(async () => {
    setLoadingState('generating_strategy');
    const strategy = await generateAiSniperStrategy(selectedRisk);
    setAiStrategy(strategy);
    setLoadingState('idle');
    setSimulationResult(null); // Clear previous simulation when generating new strategy
  }, [selectedRisk]);

  const handleSimulatePerformance = useCallback(async () => {
    if (!aiStrategy) return;
    setLoadingState('simulating');
    const result = await simulateSniperPerformance(aiStrategy, selectedRisk);
    setSimulationResult(result);
    setLoadingState('idle');
  }, [aiStrategy, selectedRisk]);

  const handleDeploySniper = useCallback(() => {
    setLoadingState('deploying');
    // Actual deployment logic would go here
    setTimeout(() => {
      setLoadingState('idle');
      alert("Sniper 03 AI Agent Deployed! Monitoring initiated.");
      // Redirect to a monitoring page or history
    }, 2000);
  }, []);

  return (
    <div className="bg-background text-foreground overflow-hidden font-body">
      {/* Hero Section: AI-Native Market Edge */}
      <div className="container mx-auto px-4 md:px-6 py-20 text-center relative overflow-hidden max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl lg:text-7xl font-extrabold font-headline mb-4 bg-gradient-to-r from-red-400 to-yellow-400 text-transparent bg-clip-text leading-tight"
        >
          Sniper 03: Your AI-Native Market Edge
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 tracking-wide"
        >
          Achieve unparalleled dominance in volatile Web3 markets. Sniper 03 empowers you with AI-driven precision and autonomous execution for critical opportunities.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button asChild size="lg" className="text-base py-6 px-9 group bg-red-500 hover:bg-red-600 transition-all">
            Activate Your AI Sniper
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      {/* AI Strategy & Execution Flow */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
          AI-Driven Precision: Orchestrating Your Sniper Strategy
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Configuration Panel */}
            <div className="space-y-8 p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">Define AI Strategy Parameters</h3>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="risk-level" className="text-base text-foreground">Desired Risk Profile</Label>
                        <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                            <SelectTrigger id="risk-level" className="text-base">
                                <SelectValue placeholder="Select risk profile" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low Risk</SelectItem>
                                <SelectItem value="medium">Medium Risk</SelectItem>
                                <SelectItem value="high">High Risk</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button 
                        onClick={handleGenerateStrategy} 
                        disabled={loadingState === 'generating_strategy'} 
                        className="w-full text-base py-6 group bg-primary hover:bg-primary/90 transition-all"
                    >
                        {loadingState === 'generating_strategy' ? 'AI Formulating...' : 'AI Formulate Strategy'}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </div>

            {/* Right: AI Feedback & Execution */}
            <div className="space-y-8 p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-red-500/10 shadow-lg">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">AI Performance & Deployment</h3>
                <AnimatePresence mode="wait">
                    {aiStrategy ? (
                        <motion.div
                            key="strategy-feedback"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                <strong className="text-primary font-semibold">AI Proposed Strategy:</strong> {aiStrategy}
                            </p>
                            <Button 
                                onClick={handleSimulatePerformance} 
                                disabled={loadingState === 'simulating' || !aiStrategy} 
                                className="w-full text-base py-6 group bg-blue-500 hover:bg-blue-600 transition-all"
                            >
                                {loadingState === 'simulating' ? 'AI Simulating...' : 'Simulate AI Performance'}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>

                            <AnimatePresence mode="wait">
                                {simulationResult && (
                                    <motion.div
                                        key="simulation-result-display"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="mt-6 p-4 bg-green-500/10 text-green-400 rounded-md shadow-inner text-left space-y-2"
                                    >
                                        <p className="text-base"><strong>Success Rate:</strong> {simulationResult.successRate}</p>
                                        <p className="text-base"><strong>Expected Capture:</strong> {simulationResult.expectedCaptureTime}</p>
                                        <p className="text-base"><strong>Simulated Profit:</strong> {simulationResult.simulatedProfit}</p>
                                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{simulationResult.aiAnalysis}</p>
                                        <Button 
                                            onClick={handleDeploySniper} 
                                            disabled={loadingState === 'deploying'} 
                                            className="w-full text-base py-6 group bg-red-500 hover:bg-red-600 transition-all mt-4"
                                        >
                                            {loadingState === 'deploying' ? 'Deploying AI Sniper...' : 'Deploy AI Sniper Agent'}
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="initial-state-sniper"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-muted-foreground text-center py-10"
                        >
                            AI is ready to formulate your market-dominating sniper strategy. Define your risk profile to begin.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </section>

      {/* Execution Guidance / On-page Docs */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-4xl text-muted-foreground text-base space-y-8">
          <h2 className="text-3xl font-bold font-headline text-foreground text-center mb-10">Activating Your AI Market Edge</h2>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">1. AI Strategy Formulation</h3>
            <p>Begin by simply selecting your desired risk profile. Our AI will then autonomously formulate a high-precision sniper strategy tailored to your parameters and market conditions.</p>
            <p className="mt-2"><strong>Action:</strong> Use the 'Desired Risk Profile' selector and click 'AI Formulate Strategy' to receive an AI-generated plan.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">2. Performance Simulation</h3>
            <p>Before any live operations, the AI rigorously simulates its proposed strategy. You'll receive detailed performance metrics, including success rate and simulated profit, building confidence in its capabilities.</p>
            <p className="mt-2"><strong>Action:</strong> After AI proposes a strategy, click 'Simulate AI Performance' to review expected outcomes and fine-tune your approach.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">3. Autonomous Deployment</h3>
            <p>Once you are satisfied with the simulated performance, deploy your AI sniper agent with a single click. It will operate autonomously, executing opportunities with unparalleled speed and precision in real-time markets.</p>
            <p className="mt-2"><strong>Action:</strong> Click 'Deploy AI Sniper Agent' to activate your automated market edge. Monitor its activities and results via your integrated dashboard.</p>
          </motion.div>
      </section>

      {/* Disclaimer Section - Subtle & Professional */}
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground max-w-3xl mx-auto opacity-70 leading-relaxed">
          <strong className="text-destructive-foreground">Disclaimer:</strong> Automated market operations in volatile cryptocurrency environments carry significant inherent risks. Success is not guaranteed, and rapid price movements can lead to substantial losses. Terminal3 operates as a technology provider and is not a financial advisor. Users are solely responsible for their investment decisions and ensuring compliance with all applicable regulations. Please utilize Sniper 03 responsibly.
        </p>
      </div>
    </div>
  );
}

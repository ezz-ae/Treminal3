
'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Bot, Loader2 } from 'lucide-react';

// --- Mock AI Functions for dynamic interaction ---
const generateAiStrategySuggestions = async (risk: string, budget: number, duration: string, autonomy: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  const strategies = [
    "AI-optimized momentum trading for volatile assets with adaptive stop-losses.",
    "Algorithmic arbitrage across Solana DEXs with real-time slippage control.",
    "Yield-farming automation with dynamic rebalancing and impermanent loss protection.",
    "Sentiment-driven trading based on real-time social data, cross-referenced with on-chain metrics."
  ];
  return strategies[Math.floor(Math.random() * strategies.length)];
};

const simulateStrategyPerformance = async (strategy: string, parameters: any) => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
  return {
    projectedRoi: (Math.random() * 2 + 0.5).toFixed(2) + '% over ' + parameters.duration,
    aiConfidence: (90 + Math.random() * 9).toFixed(1) + '%',
    simulatedOutcome: 'Simulation indicates high probability of optimal entry and exit points within defined parameters.'
  };
};

export default function SolanaTradingPage() {
  const [riskLevel, setRiskLevel] = useState('medium');
  const [budget, setBudget] = useState('1000');
  const [tradeDuration, setTradeDuration] = useState('24h');
  const [aiDecisionAutonomy, setAiDecisionAutonomy] = useState('balanced');
  const [aiStrategySuggestion, setAiStrategySuggestion] = useState<string | null>(null);
  const [simulationResult, setSimulationResult] = useState<any | null>(null);
  const [loadingState, setLoadingState] = useState<'idle' | 'suggesting' | 'simulating' | 'deploying'>('idle');

  const handleGenerateStrategy = useCallback(async () => {
    setLoadingState('suggesting');
    const suggestion = await generateAiStrategySuggestions(riskLevel, parseFloat(budget), tradeDuration, aiDecisionAutonomy);
    setAiStrategySuggestion(suggestion);
    setLoadingState('idle');
    setSimulationResult(null); // Clear previous simulation when generating new strategy
  }, [riskLevel, budget, tradeDuration, aiDecisionAutonomy]);

  const handleSimulateStrategy = useCallback(async () => {
    if (!aiStrategySuggestion) return;
    setLoadingState('simulating');
    const result = await simulateStrategyPerformance(aiStrategySuggestion, { risk: riskLevel, budget: parseFloat(budget), duration: tradeDuration, autonomy: aiDecisionAutonomy });
    setSimulationResult(result);
    setLoadingState('idle');
  }, [aiStrategySuggestion, riskLevel, budget, tradeDuration, aiDecisionAutonomy]);

  const handleDeployBot = useCallback(() => {
    setLoadingState('deploying');
    // Actual deployment logic would go here, interacting with backend services
    // For now, simulate success and redirect
    setTimeout(() => {
      setLoadingState('idle');
      alert("AI Trading Agent Deployed! Monitoring initiated.");
      // router.push('/dashboard/ai-trading/portfolio'); // Redirect to a portfolio/monitoring page
    }, 2000);
  }, []);

  return (
    <div className="bg-background text-foreground overflow-hidden font-body">
      {/* Hero Section: AI-Native Trading Orchestration */}
      <div className="container mx-auto px-4 md:px-6 py-20 text-center relative overflow-hidden max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl lg:text-7xl font-extrabold font-headline mb-4 bg-gradient-to-r from-primary to-green-400 text-transparent bg-clip-text leading-tight"
        >
          AI-Native Trading: Orchestrate Your Solana Profit
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 tracking-wide"
        >
          Unleash autonomous AI agents for unparalleled precision and adaptive strategies. Terminal3 transforms your trading objectives into consistent Web3 profitability.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button asChild size="lg" className="text-base py-6 px-9 group bg-primary hover:bg-primary/90 transition-all">
            Configure Your AI Agent
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      {/* AI Strategy Orchestration Flow */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Your AI-Driven Trading Workflow
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Configuration Panel */}
            <div className="space-y-8 p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">Define Your AI Parameters</h3>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="budget" className="text-base text-foreground">Initial Trading Capital (USDC)</Label>
                        <Input 
                            id="budget" 
                            type="number" 
                            placeholder="e.g., 1000"
                            value={budget} 
                            onChange={e => setBudget(e.target.value)}
                            className="text-base"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="risk-level" className="text-base text-foreground">Risk Adaptor</Label>
                        <Select value={riskLevel} onValueChange={setRiskLevel}>
                            <SelectTrigger id="risk-level" className="text-base">
                                <SelectValue placeholder="Select risk level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="trade-duration" className="text-base text-foreground">Trade Duration Adaptor</Label>
                        <Select value={tradeDuration} onValueChange={setTradeDuration}>
                            <SelectTrigger id="trade-duration" className="text-base">
                                <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1h">1 Hour</SelectItem>
                                <SelectItem value="24h">24 Hours</SelectItem>
                                <SelectItem value="7d">7 Days</SelectItem>
                                <SelectItem value="30d">30 Days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ai-autonomy" className="text-base text-foreground">AI Decision Autonomy</Label>
                        <Select value={aiDecisionAutonomy} onValueChange={setAiDecisionAutonomy}>
                            <SelectTrigger id="ai-autonomy" className="text-base">
                                <SelectValue placeholder="Select autonomy level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="human_review">Human Review Required</SelectItem>
                                <SelectItem value="balanced">Balanced Autonomy</SelectItem>
                                <SelectItem value="full_autonomy">Full Autonomy</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button 
                        onClick={handleGenerateStrategy} 
                        disabled={loadingState === 'suggesting'} 
                        className="w-full text-base py-6 group bg-primary hover:bg-primary/90 transition-all"
                    >
                        {loadingState === 'suggesting' ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> AI Generating...</>
                        ) : (
                            <>AI Generate Strategy<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>
                        )}
                    </Button>
                </div>
            </div>

            {/* Right: AI Feedback & Execution */}
            <div className="space-y-8 p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-purple-500/10 shadow-lg">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">AI Performance & Deployment</h3>
                <AnimatePresence mode="wait">
                    {aiStrategySuggestion ? (
                        <motion.div
                            key="suggestion"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                <strong className="text-primary font-semibold">AI Proposed Strategy:</strong> {aiStrategySuggestion}
                            </p>
                            <Button 
                                onClick={handleSimulateStrategy} 
                                disabled={loadingState === 'simulating' || !aiStrategySuggestion} 
                                className="w-full text-base py-6 group bg-blue-500 hover:bg-blue-600 transition-all"
                            >
                                {loadingState === 'simulating' ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Simulating...</>
                                ) : (
                                    <>Simulate AI Performance<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>
                                )}
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
                                        <p className="text-base"><strong>Projected ROI:</strong> {simulationResult.projectedRoi}</p>
                                        <p className="text-base"><strong>AI Confidence:</strong> {simulationResult.aiConfidence}</p>
                                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{simulationResult.simulatedOutcome}</p>
                                        <Button 
                                            onClick={handleDeployBot} 
                                            disabled={loadingState === 'deploying'} 
                                            className="w-full text-base py-6 group bg-red-500 hover:bg-red-600 transition-all mt-4"
                                        >
                                            {loadingState === 'deploying' ? (
                                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deploying AI Agent...</>
                                            ) : (
                                                <>Deploy AI Trading Agent<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>
                                            )}
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="initial-state-trading"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-muted-foreground text-center py-10"
                        >
                            AI is ready to assist. Define your trading parameters to begin orchestrating your strategy.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </section>

      {/* Execution Guidance / On-page Docs */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-4xl text-muted-foreground text-base space-y-8">
          <h2 className="text-3xl font-bold font-headline text-foreground text-center mb-10">Executing Your AI Trading Strategies</h2>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">1. Configure & Connect</h3>
            <p>Start by defining your trading parameters in the panel above, including your capital, desired risk profile, trade duration, and AI autonomy level. Ensure your Solana wallet is connected to authorize AI agent deployment.</p>
            <p className="mt-2"><strong>Action:</strong> Use the input fields and dropdowns in the 'Define Your AI Parameters' panel. Connect your wallet via the global connect button or the prompt in the top right of the dashboard.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">2. AI Strategy & Simulation</h3>
            <p>Our AI will formulate a strategy based on your inputs and rigorously simulate its performance against current and historical market data. Review the projected ROI and AI confidence before proceeding.</p>
            <p className="mt-2"><strong>Action:</strong> Click 'AI Generate Strategy' and then 'Simulate AI Performance' to review AI insights. Adjust parameters based on feedback.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">3. Autonomous Deployment & Monitoring</h3>
            <p>Once satisfied, deploy your AI trading agent with a single click. It operates autonomously, 24/7, executing trades and adapting to market conditions. Monitor its real-time performance and insights via your dedicated dashboard.</p>
            <p className="mt-2"><strong>Action:</strong> After reviewing the simulation, click 'Deploy AI Trading Agent'. Monitor its performance via your <Link href="/dashboard/ai-trading/portfolio" className="text-primary hover:underline">AI Trading Portfolio</Link>.</p>
          </motion.div>
      </section>

      {/* Disclaimer Section - Subtle & Professional */}
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground max-w-3xl mx-auto opacity-70 leading-relaxed">
          <strong className="text-destructive-foreground">Disclaimer:</strong> Automated trading in volatile cryptocurrency markets carries inherent risks. Terminal3 provides advanced AI tools; however, users are responsible for their investment decisions and compliance with all applicable regulations. Please utilize AI trading agents responsibly.
        </p>
      </div>
    </div>
  );
}

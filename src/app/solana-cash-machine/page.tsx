
'use client';

import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Info, Bot } from 'lucide-react';
import { motion } from "framer-motion";
import Link from "next/link";

// --- Mock AI Functions (duplicated for self-contained, but ideally shared) ---
const validateAiInput = async (field: string, value: string | number) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
  if (field === 'budget' && typeof value === 'number' && value < 50) {
    return "AI Insight: For optimized liquidity strategies and yield generation, a budget of at least 50 USDC is recommended.";
  }
  if (field === 'budget' && typeof value === 'number' && value > 0 && value < 100) {
    return "AI Suggestion: To unlock more substantial returns, consider an initial budget of 100 USDC or greater.";
  }
  return null; // No issue found
};

export default function SolanaCashMachinePage() {
  const [budget, setBudget] = useState('1000');
  const [roiEstimate, setRoiEstimate] = useState<string | null>(null);
  const [aiBudgetValidation, setAiBudgetValidation] = useState<string | null>(null);

  const validateBudgetField = useCallback(async (value: string | number) => {
      const message = await validateAiInput('budget', value);
      setAiBudgetValidation(message);
  }, []);

  const calculateRoi = async () => {
    const numBudget = parseFloat(budget);
    if (isNaN(numBudget) || numBudget <= 0) {
      setRoiEstimate("Please enter a valid budget.");
      return;
    }
    
    await validateBudgetField(numBudget);
    if (aiBudgetValidation) {
      setRoiEstimate(null); // Clear previous ROI if validation fails
      return;
    }

    // Simple mock ROI calculation for demonstration
    const estimatedMonthlyReturn = numBudget * 0.05; // 5% monthly return
    setRoiEstimate(`Projected Monthly Return: $${estimatedMonthlyReturn.toFixed(2)} USDC`);
  };

  return (
    <div className="bg-background text-foreground overflow-hidden font-body">
      {/* Hero Section: Elegant & Focused */}
      <div className="container mx-auto px-4 md:px-6 py-20 text-center relative overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-6xl font-extrabold font-headline mb-4 bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text leading-tight"
        >
          Solana Wealth Blueprint: AI-Powered Income
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 tracking-wide"
        >
          Transform your capital into a consistent income stream on Solana. Our AI orchestrates token creation, liquidity, and growth for effortless wealth generation.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button size="lg" className="text-base py-6 px-8 group">
            Start Your Solana Journey
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      {/* On-Page Execution / How It Works - Documentation Style */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
        <h2 className="text-4xl font-bold font-headline mb-10 bg-gradient-to-r from-green-400 to-primary text-transparent bg-clip-text text-center">
          Your Automated Solana Wealth Cycle
        </h2>
        <div className="space-y-12 text-muted-foreground text-base">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">1. AI-Guided Token Launch</h3>
            <p>Begin by defining your unique token concept. Our AI-native platform will guide you through the creation and seamless deployment of a custom SPL token on the high-performance Solana blockchain. This step is designed for clarity and efficiency, ensuring your token is ready for market with AI precision.</p>
            <p className="mt-2"><strong>Execution:</strong> Navigate to the <Link href="/dashboard/token-launcher" className="text-primary hover:underline">Token Launcher</Link> to initiate your AI-assisted token creation. Follow the intuitive prompts to define parameters and deploy.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">2. Automated Liquidity Management</h3>
            <p>Once your token is live, our intelligent AI agents take over the complex task of liquidity provisioning and management. They continuously monitor market conditions, adjust liquidity pools, and execute strategies to optimize performance and maximize the value flow of your token for you.</p>
            <p className="mt-2"><strong>Execution:</strong> Access the <Link href="/dashboard/bot-creator" className="text-primary hover:underline">AI Trading Bots</Link> section to configure and activate your automated liquidity strategy. Minimal setup required, maximum efficiency delivered.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">3. Real-time Wealth Optimization</h3>
            <p>Track your automated income and token performance through a streamlined dashboard. Our AI provides proactive insights and adaptive adjustments, ensuring your Solana Wealth Blueprint continues to generate consistent returns and evolve with market dynamics, keeping you informed and empowered.</p>
            <p className="mt-2"><strong>Execution:</strong> Your <Link href="/dashboard/finance" className="text-primary hover:underline">Dashboard</Link> provides a comprehensive overview. For detailed analytics and strategy refinement, consult our AI directly via the integrated terminal.</p>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator - Integrated & Elegant with AI Validation */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-2xl bg-muted/10 rounded-xl shadow-inner border border-border/50 text-center">
        <h2 className="text-3xl font-bold font-headline mb-6 text-foreground">
          Estimate Your Solana Returns
        </h2>
        <p className="text-muted-foreground text-base mb-8">
          Input your initial budget to see potential monthly income generated by the Solana Wealth Blueprint. Our AI provides proactive insights.
        </p>
        <div className="space-y-6 max-w-sm mx-auto">
          <div className="space-y-2 text-left">
            <Label htmlFor="budget" className="text-base text-foreground">Your Initial Capital (USDC)</Label>
            <Input 
              id="budget" 
              type="number" 
              placeholder="e.g., 1000" 
              value={budget}
              onChange={e => {
                setBudget(e.target.value);
                validateBudgetField(parseFloat(e.target.value));
              }}
              className="text-base"
            />
            {aiBudgetValidation && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-yellow-400 text-sm mt-1 flex items-center gap-1"><Bot className="w-4 h-4"/> {aiBudgetValidation}</motion.p>}
          </div>
          <Button onClick={calculateRoi} className="w-full text-base py-6 group" disabled={!!aiBudgetValidation}>
            Calculate Potential Returns
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          {roiEstimate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-4 bg-primary/10 text-primary-foreground rounded-md text-base font-semibold"
            >
              {roiEstimate}
            </motion.div>
          )}
        </div>
      </section>

      {/* Important Considerations - Professional & Clear */}
      <section className="container mx-auto px-4 md:px-6 py-12 max-w-4xl text-muted-foreground text-sm space-y-4">
        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-blue-400" /> Important Considerations
        </h3>
        <p>By engaging with the Solana Wealth Blueprint, you acknowledge and agree to the following terms. This platform provides advanced, AI-driven tools for token creation and liquidity management; however, informed decision-making and understanding market dynamics remain key to your success.</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Cryptocurrency markets are dynamic and can experience rapid fluctuations. Potential returns are not guaranteed.</li>
          <li>Terminal3 operates as a cutting-edge technology provider and does not offer financial advice. Users are encouraged to conduct their own due diligence.</li>
          <li>Any ROI calculations or projections are AI-informed estimates for informational purposes and should not be considered guarantees of future performance.</li>
          <li>Users are solely responsible for ensuring their activities comply with all applicable local, national, and international laws and regulations regarding cryptocurrency and financial transactions.</li>
        </ul>
        <p className="mt-4">Empower your Web3 strategy with SolCash, and always operate with a clear understanding of the evolving market landscape.</p>
      </section>
    </div>
  );
}

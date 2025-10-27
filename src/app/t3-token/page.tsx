
'use client';

import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWallet } from '@/hooks/use-wallet';

// --- Mock AI Functions for T03 ---
const mockAiSuggestBurnAmount = async (currentSupply: number) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const suggestedAmount = Math.floor(currentSupply * 0.001 * (0.5 + Math.random())); // 0.05% - 0.15% of supply
  return `AI recommends burning approximately ${suggestedAmount.toLocaleString()} T03 tokens to enhance scarcity and potential value.`;
};

const mockAiSuggestValidator = async (riskProfile: string) => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  const validators = [
    "AI-Optimized Validator Alpha: Balanced performance with 98% uptime and 8% APY.",
    "Secure Node Beta: Prioritizes network security, 99.5% uptime, 7% APY.",
    "High-Yield Node Gamma: Aggressive reward structure, 95% uptime, 10% APY. (Higher Risk)"
  ];
  if (riskProfile === 'low') return validators[0];
  if (riskProfile === 'high') return validators[2];
  return validators[1]; // Medium risk default
};

export default function T3TokenPage() {
  const { wallet } = useWallet();
  const connected = !!wallet?.ethereum?.address || !!wallet?.solana?.address;
  const userAddress = wallet?.ethereum?.address || wallet?.solana?.address || 'Not Connected';

  const [currentSupply, setCurrentSupply] = useState(1_000_000_000);
  const [burnAmount, setBurnAmount] = useState('');
  const [aiBurnSuggestion, setAiBurnSuggestion] = useState<string | null>(null);
  const [burnLoading, setBurnLoading] = useState(false);
  
  const [aiValidatorSuggestion, setAiValidatorSuggestion] = useState<string | null>(null);
  const [validatorLoading, setValidatorLoading] = useState(false);
  const [userRiskProfile, setUserRiskProfile] = useState('medium'); // This would ideally come from global AI Adaptors

  const handleSuggestBurn = useCallback(async () => {
    setBurnLoading(true);
    setAiBurnSuggestion(null);
    const suggestion = await mockAiSuggestBurnAmount(currentSupply);
    setAiBurnSuggestion(suggestion);
    setBurnLoading(false);
  }, [currentSupply]);

  const handleInitiateBurn = useCallback(() => {
    const amount = parseFloat(burnAmount);
    if (isNaN(amount) || amount <= 0 || amount > currentSupply) {
      alert("Please enter a valid burn amount.");
      return;
    }
    if (!connected) {
      alert("Please connect your wallet to initiate a burn.");
      return;
    }
    // Simulate burn transaction
    alert(`Initiating burn of ${amount.toLocaleString()} T03 from ${userAddress}.`);
    setCurrentSupply(prev => prev - amount);
    setBurnAmount('');
    setAiBurnSuggestion(null);
  }, [burnAmount, connected, currentSupply, userAddress]);

  const handleSuggestValidator = useCallback(async () => {
    setValidatorLoading(true);
    setAiValidatorSuggestion(null);
    const suggestion = await mockAiSuggestValidator(userRiskProfile);
    setAiValidatorSuggestion(suggestion);
    setValidatorLoading(false);
  }, [userRiskProfile]);

  return (
    <div className="bg-background text-foreground overflow-hidden font-body">
      {/* Hero Section: T03 Token - Core Fuel */}
      <div className="container mx-auto px-4 md:px-6 py-20 text-center relative overflow-hidden max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl lg:text-7xl font-extrabold font-headline mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text leading-tight"
        >
          T03 Token: Core Fuel for Autonomous Web3
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 tracking-wide"
        >
          The T03 token is the fundamental energy powering Terminal3's AI agents. It unlocks advanced capabilities, enables premium automation, and facilitates active governance.
        </motion.p>
        <div className="flex justify-center items-center text-sm text-muted-foreground bg-primary/10 text-primary-foreground p-3 rounded-md max-w-md mx-auto">
            <Wallet className="w-4 h-4 mr-2" /> Connected Wallet: <span className="font-mono ml-2">{userAddress.slice(0, 10)}...{userAddress.slice(-8)}</span>
        </div>
      </div>

      {/* Tokenomics Overview */}
      <section className="container mx-auto px-4 md:px-6 py-16 text-center max-w-6xl">
        <h2 className="text-4xl lg:text-5xl font-bold font-headline mb-12 bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
          T03 Tokenomics: Engineered for Ecosystem Value
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg">
            <div>
                <p className="text-5xl font-extrabold text-foreground leading-tight">{currentSupply.toLocaleString()}</p>
                <p className="text-lg text-muted-foreground mt-2">Current Supply</p>
            </div>
            <div>
                <p className="text-5xl font-extrabold text-foreground leading-tight">SPL</p>
                <p className="text-lg text-muted-foreground mt-2">Token Standard</p>
            </div>
            <div>
                <p className="text-5xl font-extrabold text-foreground leading-tight">9</p>
                <p className="text-lg text-muted-foreground mt-2">Decimals</p>
            </div>
        </div>
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 text-left p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-purple-500/10 shadow-lg"
        >
            <h3 className="text-2xl font-bold font-headline text-foreground mb-4">T03 Distribution Overview</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">The T03 token distribution strategy is designed to foster a robust ecosystem, ensuring widespread participation and long-term sustainability for the Terminal3 platform.</p>
            {/* Simplified distribution display for elegance */}
            <ul className="mt-6 space-y-3 text-base text-muted-foreground">
                <li><strong>Community & Airdrops:</strong> 40% - Empowering early adopters and active participants.</li>
                <li><strong>Ecosystem Fund:</strong> 30% - Fueling development, integrations, and future growth.</li>
                <li><strong>Team & Advisors:</strong> 20% - Aligned incentives for long-term vision and innovation.</li>
                <li><strong>Liquidity & Staking:</strong> 10% - Ensuring market health and rewarding network contributors.</li>
            </ul>
        </motion.div>
      </section>

      {/* AI-Assisted Burn Mechanism */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-red-400 to-yellow-400 text-transparent bg-clip-text">
          AI-Assisted T03 Token Burn: Enhance Scarcity
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-start p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg">
            <div className="space-y-6">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">Define Burn Parameters</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="burn-amount" className="text-base text-foreground">Amount of T03 to Burn</Label>
                        <Input 
                            id="burn-amount" 
                            type="number" 
                            placeholder="e.g., 10000" 
                            value={burnAmount} 
                            onChange={e => setBurnAmount(e.target.value)}
                            className="text-base"
                        />
                    </div>
                    <Button 
                        onClick={handleSuggestBurn} 
                        disabled={burnLoading}
                        className="w-full text-base py-6 group bg-primary hover:bg-primary/90 transition-all"
                    >
                        {burnLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> AI Suggesting Burn...</>) : (<>AI Suggest Optimal Burn<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>)}
                    </Button>
                </div>
            </div>
            <div className="space-y-6 p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-purple-500/10 shadow-inner flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">AI Burn Strategy & Execution</h3>
                <AnimatePresence mode="wait">
                    {aiBurnSuggestion ? (
                        <motion.div
                            key="burn-sugg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-lg text-muted-foreground leading-relaxed"
                        >
                            <strong className="text-primary font-semibold">AI Recommendation:</strong> {aiBurnSuggestion}
                            <Button 
                                onClick={handleInitiateBurn} 
                                disabled={!connected || !burnAmount || parseFloat(burnAmount) <= 0} 
                                className="w-full text-base py-6 group bg-red-500 hover:bg-red-600 transition-all mt-6"
                            >
                                Initiate AI-Guided Burn<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="burn-initial"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-muted-foreground py-10"
                        >
                            AI is ready to optimize T03 token burning strategies to enhance scarcity and value for the ecosystem.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </section>

      {/* AI-Optimized Validator Participation */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          AI-Optimized T03 Validator Participation
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-start p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg">
            <div className="space-y-6">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">Select Staking Preferences</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="staking-risk" className="text-base text-foreground">Your Staking Risk Profile</Label>
                        <Select value={userRiskProfile} onValueChange={setUserRiskProfile}>
                            <SelectTrigger id="staking-risk" className="text-base"><SelectValue placeholder="Select Risk Profile" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low Risk (Prioritize Stability)</SelectItem>
                                <SelectItem value="medium">Medium Risk (Balanced Growth)</SelectItem>
                                <SelectItem value="high">High Risk (Maximize APY)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button 
                        onClick={handleSuggestValidator} 
                        disabled={validatorLoading}
                        className="w-full text-base py-6 group bg-primary hover:bg-primary/90 transition-all"
                    >
                        {validatorLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> AI Suggesting Validator...</>) : (<>AI Suggest Optimal Validator<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>)}
                    </Button>
                </div>
            </div>
            <div className="space-y-6 p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-green-500/10 shadow-inner flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">AI-Guided Validator Insights</h3>
                <AnimatePresence mode="wait">
                    {aiValidatorSuggestion ? (
                        <motion.div
                            key="validator-sugg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-lg text-muted-foreground leading-relaxed text-left w-full space-y-4"
                        >
                            <strong className="text-primary font-semibold">AI Recommendation:</strong> {aiValidatorSuggestion}
                            <Button 
                                disabled={!connected} 
                                className="w-full text-base py-6 group bg-green-500 hover:bg-green-600 transition-all mt-6"
                            >
                                Delegate T03 with AI Guidance<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="validator-initial"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-muted-foreground py-10"
                        >
                            AI is ready to recommend optimal validators for your T03 staking, balancing rewards and network health.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </section>

      {/* T03 for Service Acceptance */}
      <section className="container mx-auto px-4 md:px-6 py-16 text-center max-w-5xl">
        <h2 className="text-4xl lg:text-5xl font-bold font-headline mb-12 bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text">
          T03: Unlock Terminal3's AI Advantage
        </h2>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-10 leading-relaxed">
          Holding and utilizing T03 tokens empowers your journey across Terminal3. Gain priority access to cutting-edge AI features, secure reduced service fees, and amplify your interaction with our autonomous agents.
        </p>
        <div className="flex justify-center gap-6 mt-8">
            <Button asChild size="lg" className="text-base py-6 px-9 group bg-primary hover:bg-primary/90 transition-all">
                Explore All AI Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base py-6 px-9 group border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                View My T03 Portfolio
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>
      </section>

      {/* Disclaimer Section - Subtle & Professional */}
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground max-w-4xl mx-auto opacity-70 leading-relaxed">
          <strong className="text-destructive-foreground">Disclaimer:</strong> T03 token utility, burning, and staking involve inherent risks in volatile cryptocurrency markets. Terminal3 provides AI-powered tools for guidance and optimization; however, users are responsible for their decisions and compliance with all applicable regulations. Engage responsibly.
        </p>
      </div>
    </div>
  );
}

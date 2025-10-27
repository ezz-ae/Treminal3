
'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Bot, RefreshCcw } from 'lucide-react'; // Only ArrowRight, Bot for AI, and Refresh for market refresh

// --- Mock AI Functions for token discovery and analysis ---
interface TokenInsight {
  name: string;
  symbol: string;
  price: string;
  change: string;
  volume: string;
  aiSummary: string;
  aiSentiment: string; // e.g., "Bullish", "Neutral", "Bearish"
  aiRisk: string; // e.g., "Low", "Medium", "High"
}

const mockAiDiscoverTokens = async (criteria: { type: string; risk: string; sentiment: string }) => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI processing

  const baseTokens: TokenInsight[] = [
    { name: 'QuantumFlow AI', symbol: 'QFAI', price: '$0.0058', change: '+12.3%', volume: '$2.1M', aiSummary: 'AI identifies strong community support and increasing developer activity. Momentum signals positive.', aiSentiment: 'Bullish', aiRisk: 'Medium' },
    { name: 'DataStream Protocol', symbol: 'DSP', price: '$0.124', change: '+4.7%', volume: '$870K', aiSummary: 'Steady growth attributed to recent integrations. AI detects solid fundamentals.', aiSentiment: 'Neutral', aiRisk: 'Low' },
    { name: 'NeuralNet Token', symbol: 'NNT', price: '$0.00031', change: '-2.1%', volume: '$4.5M', aiSummary: 'Recent volatility. AI suggests caution due to concentrated whale activity.', aiSentiment: 'Bearish', aiRisk: 'High' },
    { name: 'Metaverse Forge', symbol: 'MFORGE', price: '$1.58', change: '+22.0%', volume: '$3.9M', aiSummary: 'AI flags early breakout potential driven by metaverse narrative. High reward, higher risk.', aiSentiment: 'Bullish', aiRisk: 'High' },
    { name: 'Solana Governance DAO', symbol: 'SGDAO', price: '$8.22', change: '+1.1%', volume: '$15.3M', aiSummary: 'AI notes increased governance participation and stable development. A long-term hold.', aiSentiment: 'Neutral', aiRisk: 'Low'},
    { name: 'DeFi Yield Oracle', symbol: 'DYO', price: '$0.78', change: '-7.5%', volume: '$6.1M', aiSummary: 'AI identifies short-term profit taking. Fundamentals remain strong for a rebound.', aiSentiment: 'Neutral', aiRisk: 'Medium'},
  ];

  // Shuffle for a 'fresh' market feel on refresh
  const shuffledTokens = baseTokens.sort(() => 0.5 - Math.random());

  // Filter based on mock criteria (simplified)
  return shuffledTokens.filter(token => {
    if (criteria.type !== 'all' && !token.name.toLowerCase().includes(criteria.type.toLowerCase()) && !token.aiSummary.toLowerCase().includes(criteria.type.toLowerCase())) return false;
    if (criteria.risk !== 'all' && token.aiRisk.toLowerCase() !== criteria.risk) return false;
    if (criteria.sentiment !== 'all' && token.aiSentiment.toLowerCase() !== criteria.sentiment) return false;
    return true;
  });
};

export default function SolanaTokensPage() {
  const [tokenType, setTokenType] = useState('all');
  const [riskPreference, setRiskPreference] = useState('all');
  const [sentimentFilter, setSentimentFilter] = useState('all');
  const [discoveredTokens, setDiscoveredTokens] = useState<TokenInsight[] | null>(null);
  const [loadingState, setLoadingState] = useState<'idle' | 'discovering'>('idle');

  const handleDiscoverTokens = useCallback(async () => {
    setLoadingState('discovering');
    setDiscoveredTokens(null); // Clear previous results
    const results = await mockAiDiscoverTokens({ type: tokenType, risk: riskPreference, sentiment: sentimentFilter });
    setDiscoveredTokens(results);
    setLoadingState('idle');
  }, [tokenType, riskPreference, sentimentFilter]);

  const handleRefreshMarket = useCallback(async () => {
    // Simulate a full market refresh by calling discovery with 'all' criteria
    setLoadingState('discovering');
    setDiscoveredTokens(null); 
    const results = await mockAiDiscoverTokens({ type: 'all', risk: 'all', sentiment: 'all' });
    setDiscoveredTokens(results);
    setTokenType('all');
    setRiskPreference('all');
    setSentimentFilter('all');
    setLoadingState('idle');
  }, []);

  return (
    <div className="bg-background text-foreground overflow-hidden font-body">
      {/* Hero Section: AI-Powered Token Intelligence */}
      <div className="container mx-auto px-4 md:px-6 py-20 text-center relative overflow-hidden max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl lg:text-7xl font-extrabold font-headline mb-4 bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text leading-tight"
        >
          AI-Powered Solana: Token Intelligence
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 tracking-wide"
        >
          Discover high-potential Solana tokens with unparalleled AI insights. Our intelligence engine proactively identifies opportunities and analyzes market dynamics.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="lg" className="text-base py-6 px-9 group bg-primary hover:bg-primary/90 transition-all">
            Start AI Token Discovery
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={handleRefreshMarket} 
            disabled={loadingState === 'discovering'}
            className="text-base py-6 px-9 group border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            {loadingState === 'discovering' ? (
                <><Bot className="mr-2 h-4 w-4 animate-pulse" /> AI Refreshing Market...</>
            ) : (
                <><RefreshCcw className="mr-2 h-4 w-4" /> AI Refresh Market</>
            )}
          </Button>
        </motion.div>
      </div>

      {/* AI Discovery Engine - Interactive & Elegant */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-green-400 to-primary text-transparent bg-clip-text">
          AI Discovery Engine: Proactive Solana Insights
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-start p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg">
            {/* Discovery Parameters (formerly filters) */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">Define Discovery Parameters</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="token-type" className="text-base text-foreground">Token Type / Niche</Label>
                        <Select value={tokenType} onValueChange={setTokenType}>
                            <SelectTrigger id="token-type" className="text-base">
                                <SelectValue placeholder="e.g., DeFi, Meme, AI, Gaming" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All / Any</SelectItem>
                                <SelectItem value="defi">DeFi</SelectItem>
                                <SelectItem value="meme">Meme Coin</SelectItem>
                                <SelectItem value="ai">AI Integration</SelectItem>
                                <SelectItem value="gaming">Gaming</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="risk-pref" className="text-base text-foreground">Risk Preference</Label>
                        <Select value={riskPreference} onValueChange={setRiskPreference}>
                            <SelectTrigger id="risk-pref" className="text-base">
                                <SelectValue placeholder="e.g., Low, Medium, High" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Any</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sentiment-filter" className="text-base text-foreground">AI Sentiment Focus</Label>
                        <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
                            <SelectTrigger id="sentiment-filter" className="text-base">
                                <SelectValue placeholder="e.g., Bullish, Neutral" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Any</SelectItem>
                                <SelectItem value="bullish">Bullish</SelectItem>
                                <SelectItem value="neutral">Neutral</SelectItem>
                                <SelectItem value="bearish">Bearish</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button 
                        onClick={handleDiscoverTokens} 
                        disabled={loadingState === 'discovering'} 
                        className="w-full text-base py-6 group bg-primary hover:bg-primary/90 transition-all"
                    >
                        {loadingState === 'discovering' ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> AI Discovering...</>
                        ) : (
                            <>AI Discover Tokens<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>
                        )}
                    </Button>
                </div>
            </div>

            {/* AI Discovery Results */}
            <div className="space-y-6 p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-purple-500/10 shadow-lg flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">AI Insights & Discoveries</h3>
                <AnimatePresence mode="wait">
                    {loadingState === 'discovering' && (
                        <motion.div 
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-muted-foreground py-10"
                        >
                            AI is intelligently scanning Solana for you...
                        </motion.div>
                    )}
                    {discoveredTokens && discoveredTokens.length > 0 && loadingState === 'idle' && (
                        <motion.div 
                            key="results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="w-full space-y-6"
                        >
                            {discoveredTokens.map((token, index) => (
                                <motion.div
                                    key={token.symbol}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="p-4 border border-border/50 rounded-md text-left bg-background/50 hover:bg-background/70 transition-colors"
                                >
                                    <h4 className="text-xl font-bold text-foreground">{token.name} ({token.symbol})</h4>
                                    <p className="text-sm text-muted-foreground mt-1">Price: <span className="font-mono">{token.price}</span> | Change: <span className="font-semibold 
                                        ${token.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}
                                    ">{token.change}</span> | Volume: <span className="font-mono">{token.volume}</span></p>
                                    <p className="text-sm text-primary mt-3">AI Sentiment: {token.aiSentiment} | Risk: {token.aiRisk}</p>
                                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{token.aiSummary}</p>
                                    <Button variant="link" asChild className="mt-2 pl-0 text-base">
                                        <Link href="/solana/trading">
                                            Trade Now <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                    {discoveredTokens && discoveredTokens.length === 0 && loadingState === 'idle' && (
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-muted-foreground py-10"
                        >
                            AI found no tokens matching your criteria. Try adjusting parameters.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </section>

      {/* Execution Guidance / On-page Docs */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-4xl text-muted-foreground text-base space-y-8">
          <h2 className="text-3xl font-bold font-headline text-foreground text-center mb-10">Maximizing Your Token Discovery</h2>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">1. Refine Discovery Parameters</h3>
            <p>Start by providing clear parameters for the AI. Specify the type of tokens you're interested in, your preferred risk level, and the market sentiment you want the AI to prioritize. The more precise your input, the more tailored the AI's discoveries.</p>
            <p className="mt-2"><strong>Action:</strong> Use the dropdown menus in the 'Define Discovery Parameters' panel to guide the AI's search. Experiment with different combinations to broaden or narrow your results.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">2. Analyze AI Insights</h3>
            <p>Once the AI presents its discoveries, delve into the generated insights. Each token will come with an AI-summarized overview, sentiment analysis, and risk assessment, providing a holistic understanding beyond raw market data.</p>
            <p className="mt-2"><strong>Action:</strong> Review the detailed insights provided by the AI for each discovered token. Pay attention to sentiment and risk to inform your next steps.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">3. Seamlessly Transition to Action</h3>
            <p>From discovery to execution, the process is streamlined. If a discovered token aligns with your strategy, you can directly initiate trading or further analysis with a single click, maintaining your workflow efficiency.</p>
            <p className="mt-2"><strong>Action:</strong> Click the 'Trade Now' button associated with any token to proceed directly to the trading interface and execute your strategy.</p>
          </motion.div>
      </section>

      {/* Disclaimer Section - Subtle & Professional */}
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground max-w-3xl mx-auto opacity-70 leading-relaxed">
          <strong className="text-destructive-foreground">Disclaimer:</strong> Token discovery and market analysis in volatile cryptocurrency markets carry inherent risks. AI insights are for informational purposes and do not constitute financial advice. Terminal3 is not a financial advisor. Users are solely responsible for their investment decisions, due diligence, and compliance with all applicable regulations. Please utilize AI token intelligence responsibly.
        </p>
      </div>
    </div>
  );
}

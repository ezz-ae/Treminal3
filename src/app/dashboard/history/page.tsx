
'use client';

import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, History, Convert, Scale, Clock, BrainCircuit, Activity } from 'lucide-react'; // Keeping these few icons for clarity of specific features
import { useWallet } from '@/hooks/use-wallet';

interface Transaction {
  id: string;
  type: 'Buy' | 'Sell' | 'Swap' | 'Airdrop' | 'Stake' | 'Launch';
  asset: string;
  amount: string;
  fiatValue: string;
  date: string;
  status: 'Success' | 'Pending' | 'Failed';
  aiNotes: string;
}

const mockTransactionHistory: Transaction[] = [
  {
    id: 'tx_001', type: 'Launch', asset: 'QFAI', amount: '1,000,000', fiatValue: '$5,800', date: '2024-03-10', status: 'Success',
    aiNotes: 'AI-guided launch for QuantumFlow AI. Optimal gas/priority fees detected for rapid deployment.'
  },
  {
    id: 'tx_002', type: 'Buy', asset: 'SOL', amount: '10', fiatValue: '$1,595', date: '2024-03-09', status: 'Success',
    aiNotes: 'AI executed market buy for SOL. Identified temporary dip due to large sell order.'
  },
  {
    id: 'tx_003', type: 'Stake', asset: 'T03', amount: '5,000', fiatValue: '$250', date: '2024-03-08', status: 'Success',
    aiNotes: 'Automated staking of T03. Rebalanced allocation for optimal yield generation.'
  },
  {
    id: 'tx_004', type: 'Sell', asset: 'NNT', amount: '50,000', fiatValue: '$15', date: '2024-03-07', status: 'Failed',
    aiNotes: 'AI detected unusual price slippage. Transaction reverted to prevent significant loss.'
  },
  {
    id: 'tx_005', type: 'Airdrop', asset: 'T03', amount: '100', fiatValue: '$5', date: '2024-03-06', status: 'Success',
    aiNotes: 'Claimed T03 community reward. Successfully added to wallet.'
  },
];

const supportedCurrencies = ['SOL', 'USDC', 'ETH', 'T03'];

const mockConvertCurrency = async (from: string, to: string, amount: number) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const rates: { [key: string]: { [key: string]: number } } = {
    'SOL': { 'USDC': 160, 'ETH': 0.05, 'T03': 3200 },
    'USDC': { 'SOL': 1 / 160, 'ETH': 1 / 3200, 'T03': 1 / 0.05 },
    'ETH': { 'USDC': 3200, 'SOL': 20, 'T03': 64000 },
    'T03': { 'USDC': 0.05, 'SOL': 1 / 3200, 'ETH': 1 / 64000 },
  };
  if (from === to) return amount;
  if (rates[from] && rates[from][to]) {
    return amount * rates[from][to];
  }
  return null;
};

export default function UserHistoryPage() {
  const { wallet } = useWallet();
  const connected = !!wallet?.ethereum?.address || !!wallet?.solana?.address;
  const userAddress = wallet?.ethereum?.address || wallet?.solana?.address || 'Connect Wallet';

  const [convertFromAmount, setConvertFromAmount] = useState('1');
  const [convertFromCurrency, setConvertFromCurrency] = useState('SOL');
  const [convertToCurrency, setConvertToCurrency] = useState('USDC');
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);

  const [riskAdaptor, setRiskAdaptor] = useState('medium');
  const [tradeDuration, setTradeDuration] = useState('24h');
  const [aiDecisionAutonomy, setAiDecisionAutonomy] = useState('balanced');

  const handleConvert = useCallback(async () => {
    setConverting(true);
    setConvertedAmount(null);
    const amount = parseFloat(convertFromAmount);
    if (isNaN(amount) || amount <= 0) {
      setConvertedAmount("Invalid amount.");
      setConverting(false);
      return;
    }
    const result = await mockConvertCurrency(convertFromCurrency, convertToCurrency, amount);
    if (result !== null) {
      setConvertedAmount(`${result.toFixed(4)} ${convertToCurrency}`);
    } else {
      setConvertedAmount("Conversion unavailable.");
    }
    setConverting(false);
  }, [convertFromAmount, convertFromCurrency, convertToCurrency]);

  return (
    <div className="bg-background text-foreground overflow-hidden font-body">
      {/* Hero Section: User History & Adaptors */}
      <div className="container mx-auto px-4 md:px-6 py-20 text-center relative overflow-hidden max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl lg:text-7xl font-extrabold font-headline mb-4 bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text leading-tight"
        >
          Your AI-Orchestrated Web3 Journey
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 tracking-wide"
        >
          Review your past AI-driven executions, manage your portfolio, and fine-tune your AI's behavior with precision adaptors.
        </motion.p>
        <div className="flex justify-center items-center text-sm text-muted-foreground bg-primary/10 text-primary-foreground p-3 rounded-md max-w-md mx-auto">
            <Wallet className="w-4 h-4 mr-2" /> Connected Wallet: <span className="font-mono ml-2">{userAddress.slice(0, 10)}...{userAddress.slice(-8)}</span>
        </div>
      </div>

      {/* AI Adaptors: Control Your Autonomous Agents */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-green-400 to-primary text-transparent bg-clip-text">
          AI Adaptors: Fine-Tune Autonomous Intelligence
        </h2>
        <div className="grid md:grid-cols-3 gap-10 p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4 text-center"
          >
            <h3 className="text-xl font-bold font-headline text-foreground mb-2">Risk Adaptor</h3>
            <p className="text-muted-foreground text-sm">Define your AI's risk tolerance for automated operations. From conservative to aggressive, your choice dictates the AI's strategic posture.</p>
            <Select value={riskAdaptor} onValueChange={setRiskAdaptor}>
              <SelectTrigger className="w-full text-base">
                <SelectValue placeholder="Select Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4 text-center"
          >
            <h3 className="text-xl font-bold font-headline text-foreground mb-2">Trade Duration Adaptor</h3>
            <p className="text-muted-foreground text-sm">Set the preferred timeframe for AI-executed trades and liquidity events. Optimize for short-term gains or long-term growth.</p>
            <Select value={tradeDuration} onValueChange={setTradeDuration}>
              <SelectTrigger className="w-full text-base">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4 text-center"
          >
            <h3 className="text-xl font-bold font-headline text-foreground mb-2">AI Decision Autonomy</h3>
            <p className="text-muted-foreground text-sm">Determine how much independence your AI agent has in making execution decisions. From full human oversight to complete autonomy.</p>
            <Select value={aiDecisionAutonomy} onValueChange={setAiDecisionAutonomy}>
              <SelectTrigger className="w-full text-base">
                <SelectValue placeholder="Select Autonomy Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="human_review">Human Review Required</SelectItem>
                <SelectItem value="balanced">Balanced Autonomy</SelectItem>
                <SelectItem value="full_autonomy">Full Autonomy</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>
        <div className="text-center mt-12">
            <Button size="lg" className="text-base py-6 px-9 group">
                Apply AI Adaptor Settings
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>
      </section>

      {/* Transaction History Section */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-7xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Your AI-Orchestrated Transaction History
        </h2>
        <div className="space-y-6">
          {mockTransactionHistory.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-border/10 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex flex-col text-left">
                <h3 className="text-lg font-bold text-foreground">{tx.type} {tx.asset}</h3>
                <p className="text-sm text-muted-foreground">Amount: <span className="font-mono">{tx.amount} {tx.asset}</span></p>
                <p className="text-sm text-muted-foreground">Value: <span className="font-mono">{tx.fiatValue}</span></p>
                <p className="text-sm text-muted-foreground">Date: {tx.date}</p>
              </div>
              <div className="text-right flex flex-col items-start md:items-end">
                <span className={`text-base font-semibold ${tx.status === 'Success' ? 'text-green-500' : tx.status === 'Failed' ? 'text-destructive-foreground' : 'text-yellow-500'}`}>
                    <Activity className="inline-block w-4 h-4 mr-2 align-text-bottom" />{tx.status}
                </span>
                <p className="text-sm text-muted-foreground mt-2 max-w-md md:max-w-xs text-left md:text-right leading-relaxed"><strong className="text-primary">AI Insight:</strong> {tx.aiNotes}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Currency Converter Section */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-4xl bg-muted/10 rounded-xl shadow-inner border border-border/50 text-center">
        <h2 className="text-3xl font-bold font-headline mb-8 text-foreground">
          AI-Assisted Currency Converter
        </h2>
        <p className="text-muted-foreground text-base mb-10">
          Quickly convert between supported cryptocurrencies with real-time AI-informed rates.
        </p>
        <div className="grid md:grid-cols-3 gap-6 items-end max-w-lg mx-auto">
          <div className="space-y-2 text-left">
            <Label htmlFor="from-amount" className="text-base text-foreground">Amount</Label>
            <Input 
              id="from-amount" 
              type="number" 
              value={convertFromAmount}
              onChange={(e) => setConvertFromAmount(e.target.value)}
              className="text-base"
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="from-currency" className="text-base text-foreground">From</Label>
            <Select value={convertFromCurrency} onValueChange={setConvertFromCurrency}>
              <SelectTrigger id="from-currency" className="w-full text-base">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {supportedCurrencies.map(currency => (
                  <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="to-currency" className="text-base text-foreground">To</Label>
            <Select value={convertToCurrency} onValueChange={setConvertToCurrency}>
              <SelectTrigger id="to-currency" className="w-full text-base">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {supportedCurrencies.map(currency => (
                  <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-3 mt-4">
            <Button onClick={handleConvert} disabled={converting} className="w-full text-base py-6 group">
              {converting ? 'Converting...' : 'Convert Currency'}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <AnimatePresence>
            {convertedAmount && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="md:col-span-3 mt-6 p-4 bg-primary/10 text-primary-foreground rounded-md text-base font-semibold text-center"
              >
                Result: <span className="font-mono">{convertedAmount}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Disclaimer Section - Subtle & Professional */}
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground max-w-3xl mx-auto opacity-70 leading-relaxed">
          <strong className="text-destructive-foreground">Disclaimer:</strong> Transaction history and AI adaptor settings are for informational and operational guidance. Currency conversion rates are simulated and may not reflect real-time market accuracy. Terminal3 is not a financial advisor. Users are solely responsible for their financial decisions and ensuring compliance with all applicable regulations. Engage with autonomous agents responsibly.
        </p>
      </div>
    </div>
  );
}

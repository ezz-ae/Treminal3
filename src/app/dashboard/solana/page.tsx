
'use client';

import { useState, useEffect } from 'react';
import { Wind, CornerDownLeft, Loader2, Bot, CircleDollarSign, Zap, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWallet } from '@/hooks/use-wallet';
import { runSolanaTool } from '@/ai/actions';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

type ChatMessage = {
  id: number;
  type: 'user' | 'bot' | 'loading';
  text: string;
};

/**
 * A comprehensive dashboard for interacting with and monitoring the Solana network.
 * Features live network stats and an AI-powered terminal for natural language commands.
 * @returns {JSX.Element} The Solana dashboard page component.
 */
export default function SolanaPage() {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const { wallet } = useWallet();
  const { toast } = useToast();

  const [networkStats, setNetworkStats] = useState({
    tps: 0,
    slotTime: 0,
    epoch: 0,
  });

  useEffect(() => {
    // Mock real-time data fetching
    const interval = setInterval(() => {
      setNetworkStats({
        tps: Math.floor(2500 + Math.random() * 1500),
        slotTime: Math.floor(400 + Math.random() * 100),
        epoch: 512, // Usually static for a while
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = { id: Date.now(), type: 'user', text: inputValue };
    const loadingMessage: ChatMessage = { id: Date.now() + 1, type: 'loading', text: '...' };

    setChatHistory(prev => [...prev, userMessage, loadingMessage]);
    const currentInput = inputValue;
    setInputValue('');

    try {
      const result = await runSolanaTool({
        query: currentInput,
        userWalletAddress: wallet?.address,
      });

      const botMessage: ChatMessage = { id: Date.now() + 2, type: 'bot', text: result.result };

      setChatHistory(prev =>
        prev.filter(m => m.type !== 'loading').concat(botMessage)
      );

    } catch (error: any) {
      console.error("Failed to run Solana tool", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || "The AI agent failed to process your request.",
      });
       setChatHistory(prev => prev.filter(m => m.type !== 'loading'));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <Wind className="w-8 h-8 text-primary" />
          Solana Command Center
        </h1>
        <p className="text-muted-foreground">
          Interact with the Solana network using natural language and monitor live stats.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions per Second</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.tps.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Live network throughput</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Slot Time (ms)</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.slotTime}ms</div>
            <p className="text-xs text-muted-foreground">Block confirmation speed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Epoch</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.epoch}</div>
            <p className="text-xs text-muted-foreground">Next epoch in ~2 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="text-primary" /> AI Agent Terminal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg h-[400px] flex flex-col p-4 space-y-4 overflow-y-auto">
            <AnimatePresence>
              {chatHistory.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={msg.type === 'user' ? 'self-end' : 'self-start'}
                >
                  <div
                    className={`max-w-md p-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card-foreground/5'
                    }`}
                  >
                    {msg.type === 'loading' ? (
                      <Loader2 className="animate-spin w-5 h-5" />
                    ) : (
                      <p className="text-sm">{msg.text}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Input
              type="text"
              placeholder="e.g., 'Airdrop 1 SOL to my wallet' or 'get balance for [address]'"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="h-11"
            />
            <Button size="lg" onClick={handleSendMessage}>
              <CornerDownLeft className="h-4 w-4" />
            </Button>
          </div>
           <p className="text-xs text-muted-foreground mt-2">
            Try: `airdrop 1 SOL to my wallet`, `get balance for {wallet?.address || 'YOUR_WALLET_ADDRESS'}`, `get transaction details for 5som...`
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

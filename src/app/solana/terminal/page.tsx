
'use client';

import { useState } from 'react';
import { CornerDownLeft, Loader2, Bot, Terminal } from 'lucide-react';
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
 * A dedicated terminal page for interacting with the Solana network via an AI agent.
 * @returns {JSX.Element} The Solana AI Terminal page component.
 */
export default function SolanaTerminalPage() {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const { wallet } = useWallet();
  const { toast } = useToast();

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
    <div className="container mx-auto py-12 space-y-8">
      <header>
        <h1 className="text-4xl font-bold font-headline flex items-center gap-3">
          <Terminal className="w-10 h-10 text-primary" />
          AI Agent Terminal
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Interact with the Solana network using natural language. Check balances, airdrop tokens, and analyze transactions.
        </p>
      </header>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Bot className="text-primary" /> AI Agent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg h-[50vh] flex flex-col p-4 space-y-4 overflow-y-auto">
            <AnimatePresence>
              {chatHistory.map((msg) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={msg.type === 'user' ? 'self-end' : 'self-start'}
                >
                  <div
                    className={`max-w-xl p-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card-foreground/5'
                    }`}
                  >
                    {msg.type === 'loading' ? (
                      <Loader2 className="animate-spin w-5 h-5" />
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Input
              type="text"
              placeholder={wallet ? `e.g., 'Airdrop 1 SOL to my wallet' or 'get balance for ${wallet.address.slice(0,6)}...'` : "e.g., 'get balance for [address]'"}
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

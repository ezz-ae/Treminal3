'use client';

import { useState, useEffect } from 'react';
import { Wind, CornerDownLeft, Loader2, Bot, CircleDollarSign, Zap, Clock, BotMessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWallet } from '@/hooks/use-wallet';
import { runSolanaTool } from '@/ai/actions';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { CustomCodeBlock } from '@/components/ui/code-block';
import Link from 'next/link';

type ChatMessage = {
  id: number;
  type: 'user' | 'bot' | 'loading';
  text: string;
};

const rpcEndpoint = "https://api.terminal3.me/v1/rpc/YOUR_API_KEY/sol";
const curlExample = `
curl ${rpcEndpoint} -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getEpochInfo"
  }
'
    `;

const jsExample = `
const url = '${rpcEndpoint}';
const headers = {
    'Content-Type': 'application/json'
};
const body = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'getAccountInfo',
    params: [
        'vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg',
        {
          encoding: 'jsonParsed'
        }
    ]
});

fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
    `;


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
    <div className="space-y-8 prose prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tight">
      <header className="not-prose">
        <h1 className="text-4xl font-bold font-headline flex items-center gap-3">
          <Wind className="w-10 h-10 text-primary" />
          Solana Command Center
        </h1>
        <p className="text-muted-foreground text-lg">
          Your complete hub to interact with the Solana network using natural language, monitor live stats, and access high-performance RPC endpoints.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 not-prose">
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

       <Card className="not-prose">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
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
      
      <section>
            <h2>High-Performance RPC</h2>
            <p>
                Connect to our robust Solana RPC endpoints to interact with the blockchain. Send transactions, query data, and build powerful applications with confidence.
            </p>
            <h3>Endpoint URL</h3>
            <p>
                Use the following base URL for all RPC requests. Replace \`YOUR_API_KEY\` with your actual API key.
            </p>
            <div className="bg-card border rounded-md p-4 font-mono text-sm not-prose">https://api.terminal3.me/v1/rpc/<span className='text-primary'>YOUR_API_KEY</span>/sol</div>
            
            <h3 className="mt-8">Examples</h3>
            <h4>cURL Request</h4>
            <p>Here's a simple example of how to fetch the current epoch info using cURL.</p>
            <CustomCodeBlock code={curlExample} language="bash" />

            <h4 className="mt-8">JavaScript Fetch</h4>
            <p>Here's how you can fetch account information using JavaScript's \`fetch\` API.</p>
            <CustomCodeBlock code={jsExample} language="javascript" />
        </section>

        <section>
            <h2>Key RPC Methods</h2>
            <p>Our Solana endpoints support a wide range of JSON-RPC methods. Here are some of the most commonly used ones:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li><code>getAccountInfo</code>: Returns all information associated with the account of a given public key.</li>
                <li><code>getTokenAccountsByOwner</code>: Returns all token accounts owned by a given public key.</li>
                <li><code>getBalance</code>: Returns the balance of the account of a given public key.</li>
                <li><code>sendTransaction</code>: Submits a signed transaction to the cluster for processing.</li>
                <li><code>requestAirdrop</code>: Requests an airdrop of lamports to a public key (devnet/testnet only).</li>
            </ul>
        </section>
    </div>
  );
}
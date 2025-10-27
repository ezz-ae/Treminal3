
'use client';

import { useState, useEffect } from 'react';
import { CornerDownLeft, Loader2, Bot, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWallet } from '@/hooks/use-wallet';
import { runSolanaTool, runSolanaCloseAccount } from '@/ai/actions';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { CustomCodeBlock } from '@/components/ui/code-block';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';

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

// Mock AI Network Insights
const getAiNetworkInsights = (tps: number, slotTime: number, epoch: number) => {
    if (tps > 3500 && slotTime < 450) {
        return "AI confirms exceptionally robust network performance. High throughput ensures your transactions execute with maximum speed.";
    } else if (tps < 3000 && slotTime > 500) {
        return "AI observes stable network activity. Performance is reliable, providing a solid foundation for your on-chain operations.";
    }
    return "AI notes balanced network conditions. A consistent and efficient environment for executing your Web3 strategies.";
};

export default function SolanaPage() {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [closeAccountAddress, setCloseAccountAddress] = useState('');
  const [closeAccountResult, setCloseAccountResult] = useState('');
  const [isClosingAccount, setIsClosingAccount] = useState(false);
  const { wallet } = useWallet();
  const { toast } = useToast();

  const [networkStats, setNetworkStats] = useState({
    tps: 0,
    slotTime: 0,
    epoch: 0,
    aiInsight: "Your AI partner is analyzing Solana network data...",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTps = Math.floor(2500 + Math.random() * 1500);
      const newSlotTime = Math.floor(400 + Math.random() * 100);
      const newEpoch = 512;
      setNetworkStats({
        tps: newTps,
        slotTime: newSlotTime,
        epoch: newEpoch,
        aiInsight: getAiNetworkInsights(newTps, newSlotTime, newEpoch),
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = { id: Date.now(), type: 'user', text: inputValue };
    const loadingMessage: ChatMessage = { id: Date.now() + 1, type: 'loading', text: 'AI Agent Processing... ' };

    setChatHistory(prev => [...prev, userMessage, loadingMessage]);
    const currentInput = inputValue;
    setInputValue('');

    try {
      const result = await runSolanaTool({
        query: currentInput,
        userWalletAddress: wallet?.ethereum?.address || wallet?.solana?.address,
      });

      const botMessage: ChatMessage = { id: Date.now() + 2, type: 'bot', text: result.result };

      setChatHistory(prev =>
        prev.filter(m => m.type !== 'loading').concat(botMessage)
      );

    } catch (error: any) {
        console.error("Failed to run Solana tool", error);
        toast({
            variant: 'destructive',
            title: 'AI Command Error',
            description: error.message || "Your AI partner encountered an issue. Please try again.",
        });
       setChatHistory(prev => prev.filter(m => m.type !== 'loading'));
    }
  };

  const handleCloseAccount = async () => {
    if (!closeAccountAddress.trim()) {
      toast({
        variant: "destructive",
        title: "Address Required",
        description: "Please provide a token account address for your AI to close.",
      });
      return;
    }

    setIsClosingAccount(true);
    setCloseAccountResult('');

    try {
      const result = await runSolanaCloseAccount({ tokenAccountAddress: closeAccountAddress });
      setCloseAccountResult(result.result);
      toast({
        title: "Account Closure Initiated by AI",
        description: "Your AI partner has successfully processed the closure request.",
      });
    } catch (error: any) {
        console.error("Failed to close account", error);
        toast({
          variant: "destructive",
          title: "AI Execution Error",
          description: error.message || "Your AI partner failed to close the token account.",
        });
    } finally {
      setIsClosingAccount(false);
    }
  };

  return (
    <div className="bg-background text-foreground overflow-hidden font-body">
      {/* Hero Section: Solana Intelligence */}
      <div className="container mx-auto px-4 md:px-6 py-20 text-center relative overflow-hidden max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl lg:text-7xl font-extrabold font-headline mb-4 bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text leading-tight"
        >
          Command Solana with AI-Powered Intelligence
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 tracking-wide"
        >
          Your AI partner for interacting with, monitoring, and managing the Solana blockchain. Execute with unparalleled precision and intuitive natural language commands.
        </motion.p>
      </div>

      {/* AI-Analyzed Network Pulse */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-6xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-green-400 to-primary text-transparent bg-clip-text">
          AI-Analyzed Solana Network Pulse
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-foreground mb-3 font-headline">Live Throughput (TPS)</h3>
            <p className="text-5xl font-extrabold text-primary leading-tight">{networkStats.tps.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">AI confirms live network efficiency.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-foreground mb-3 font-headline">Block Finality (Slot Time)</h3>
            <p className="text-5xl font-extrabold text-blue-400 leading-tight">{networkStats.slotTime}ms</p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">AI confirms rapid transaction speed.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-foreground mb-3 font-headline">Network Cycle (Epoch)</h3>
            <p className="text-5xl font-extrabold text-purple-400 leading-tight">{networkStats.epoch}</p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">AI is tracking the next epoch transition.</p>
          </motion.div>
        </div>
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg text-primary mt-12 text-center max-w-4xl mx-auto"
        >
            <Bot className="inline-block w-5 h-5 mr-2 align-middle" /> {networkStats.aiInsight}
        </motion.p>
      </section>

      {/* AI Agent Terminal */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-6xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-red-400 to-yellow-400 text-transparent bg-clip-text">
          Your AI Command Terminal for Solana
        </h2>
        <div className="p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg">
            <div className="border rounded-lg h-[400px] flex flex-col p-4 space-y-4 overflow-y-auto bg-background/50">
                <AnimatePresence>
                {chatHistory.map((msg) => (
                    <motion.div
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={msg.type === 'user' ? 'self-end text-right' : 'self-start text-left'}
                    >
                    <div
                        className={`max-w-md p-3 rounded-lg text-sm leading-relaxed ${
                        msg.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted/20 text-foreground'
                        }`}
                    >
                        {msg.type === 'loading' ? (
                        <Loader2 className="animate-spin w-5 h-5 inline-block mr-2" />
                        ) : null}
                        {msg.text}
                    </div>
                    </motion.div>
                ))}
                </AnimatePresence>
            </div>
            <div className="mt-6 flex items-center gap-4">
                <Input
                type="text"
                placeholder="Ask your AI to... e.g., 'Airdrop 1 SOL' or 'find and close all my empty token accounts'"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="h-12 text-base"
                />
                <Button size="lg" onClick={handleSendMessage} className="h-12 text-base px-6 group">
                    Command AI <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                <strong className="text-primary">AI Suggestions:</strong> `get balance for YOUR_WALLET_ADDRESS`, `get transaction details for 5som...`
            </p>
        </div>
      </section>

      {/* Integrated Execution Tools */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-6xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
          AI-Powered Execution Tools
        </h2>

        {/* Close Token Account */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 mb-10"
        >
            <h3 className="text-2xl font-bold font-headline text-foreground mb-4">Automated Token Account Cleanup</h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Let your AI partner recover SOL from empty token accounts. It will verify zero-balances and securely execute the closure, returning the rent-exempt reserve to you.
            </p>
            <div className="flex items-center gap-4">
                <Input
                type="text"
                placeholder="Enter Token Account Address for AI Closure"
                value={closeAccountAddress}
                onChange={(e) => setCloseAccountAddress(e.target.value)}
                className="h-12 text-base"
                />
                <Button size="lg" onClick={handleCloseAccount} disabled={isClosingAccount} className="h-12 text-base px-6 group">
                    {isClosingAccount ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> AI Closing...</>) : (<>Let AI Close Account<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>)}
                </Button>
            </div>
            <AnimatePresence>
            {closeAccountResult && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-4 bg-primary/10 text-primary-foreground rounded-md text-sm leading-relaxed"
                >
                    <h4 className="font-semibold mb-2">AI Closure Result:</h4>
                    <CustomCodeBlock code={closeAccountResult} language="json" />
                </motion.div>
            )}
            </AnimatePresence>
        </motion.div>
      
        {/* High-Performance RPC Documentation */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-purple-500/10 shadow-lg hover:shadow-xl transition-all duration-300"
        >
            <h3 className="text-2xl font-bold font-headline text-foreground mb-4">High-Performance RPC for Your AI Agents</h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Power your AI agents and custom scripts with our robust, AI-optimized Solana RPC endpoints. Ensure lightning-fast, reliable network access for all your on-chain operations.
            </p>
            <p className="text-base text-muted-foreground mb-4"><strong>Your Endpoint URL:</strong> Replace <code className='text-primary font-mono'>YOUR_API_KEY</code> with your personal API key.</p>
            <CustomCodeBlock code={`https://api.terminal3.me/v1/rpc/YOUR_API_KEY/sol`} language="text" className="mb-8"/>
            
            <h4 className="text-xl font-bold text-foreground mb-4">AI-Assisted RPC Interaction Examples:</h4>
            <p className="text-base text-muted-foreground mb-4">Your AI partner is ready to help formulate complex RPC calls and interpret responses. Here are some examples to get you started:</p>
            <p className="text-sm text-muted-foreground mb-2"><strong>cURL Request (Get Epoch Info):</strong></p>
            <CustomCodeBlock code={curlExample} language="bash" className="mb-6"/>

            <p className="text-sm text-muted-foreground mb-2"><strong>JavaScript Fetch (Get Account Info):</strong></p>
            <CustomCodeBlock code={jsExample} language="javascript" className="mb-6"/>

            <p className="text-base text-muted-foreground mt-8 leading-relaxed">
                <strong>Key AI-Enabled RPC Methods:</strong> Let your AI partner handle the complexities:
            </p>
            <ul className="list-disc pl-8 space-y-2 text-base text-muted-foreground leading-relaxed">
                <li><code>getAccountInfo</code>: Let AI parse and interpret complex account data for you.</li>
                <li><code>getTokenAccountsByOwner</code>: Let AI identify and summarize all token accounts for a given wallet.</li>
                <li><code>getBalance</code>: Let AI provide real-time balance checks and forecast changes.</li>
                <li><code>sendTransaction</code>: Let AI construct transactions and select optimal fees for you.</li>
                <li><code>requestAirdrop</code>: (Devnet/Testnet) Let AI streamline airdrop requests for seamless testing.</li>
            </ul>
        </motion.div>
      </section>

      {/* Disclaimer Section - Subtle & Professional */}
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground max-w-4xl mx-auto opacity-70 leading-relaxed">
          <strong className="text-destructive-foreground">Engage Responsibly:</strong> Interacting with the Solana blockchain involves inherent risks. Terminal3 provides AI-powered tools to enhance your capabilities, but you are responsible for validating all commands, managing your private keys, and ensuring compliance. Your AI partner is a tool to augment your own judgment.
        </p>
      </div>
    </div>
  );
}

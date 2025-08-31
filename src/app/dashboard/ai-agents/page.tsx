
'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Copy } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { recommendBusinessTools, generateDapp, generateToken } from '@/app/actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import type { DappBuilderOutput, TokenLauncherOutput, BusinessToolRecommendationOutput } from '@/app/actions';
import {
  AppWindow,
  Bot,
  Puzzle,
  Wallet,
  FileJson,
  Network,
  BotMessageSquare,
  AreaChart,
  FileArchive,
  ShieldCheck,
  Vote,
} from 'lucide-react';

const FormSchema = z.object({
  prompt: z.string().min(10, {
    message: 'Please enter a more detailed prompt.',
  }),
});

const iconMap: Record<string, React.ElementType> = {
  AppWindow, Bot, Puzzle, Wallet, FileJson, Network, BotMessageSquare, AreaChart, FileArchive, ShieldCheck, Vote,
};

const toolUrlMap: Record<string, string> = {
    'dApp Builder': '/dashboard/ai-agents',
    'Token Launcher': '/dashboard/ai-agents',
    'Trading Bot Platform': '/dashboard/trading-bots',
    'AI Agents': '/dashboard/ai-agents',
    'Custom Wallets': '/dashboard/wallets',
    'Smart Contract Templates': '/dashboard/smart-contracts',
    'Manual Transactions': '/dashboard/transactions',
    'On-chain Analytics': '/dashboard/analytics',
    'Decentralized Storage': '/dashboard/storage',
    'Security Audits': '/dashboard/audits',
    'DAO Governance': '/dashboard/governance',
};

type DisplayLine = {
    id: string;
    type: 'prompt' | 'output' | 'status' | 'recommendation' | 'guidance' | 'plan' | 'code';
    text?: string;
    recommendation?: BusinessToolRecommendationOutput['recommendations'][0];
    plan?: DappBuilderOutput;
    code?: TokenLauncherOutput;
};

const initialLines: DisplayLine[] = [
    { id: 'guidance-1', type: 'guidance', text: 'Welcome to your AI Command Center.' },
    { id: 'guidance-2', type: 'guidance', text: "Describe what you want to build, and I'll generate a plan or recommend the right tools." },
];

enum AgentTask {
  Recommend,
  BuildDapp,
  LaunchToken,
  Unknown
}

function determineTask(prompt: string): AgentTask {
    const lowerCasePrompt = prompt.toLowerCase();
    if (lowerCasePrompt.includes('dapp') || lowerCasePrompt.includes('application')) {
        return AgentTask.BuildDapp;
    }
    if (lowerCasePrompt.includes('token') || lowerCasePrompt.includes('crypto') || lowerCasePrompt.includes('coin')) {
        return AgentTask.LaunchToken;
    }
    if (lowerCasePrompt.includes('business') || lowerCasePrompt.includes('help') || lowerCasePrompt.includes('tool')) {
        return AgentTask.Recommend;
    }
    return AgentTask.Unknown;
}

export default function AiAgentsPage() {
    const [lines, setLines] = useState<DisplayLine[]>(initialLines);
    const [isLoading, setIsLoading] = useState(false);
    const { setOpen } = useSidebar();
    const { toast } = useToast();
    const terminalOutputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setOpen(false);
    }, [setOpen]);
    
    useEffect(() => {
        if (terminalOutputRef.current) {
            terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
        }
        if (!isLoading) {
            inputRef.current?.focus();
        }
    }, [lines, isLoading]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const addLine = (line: Omit<DisplayLine, 'id'>) => {
        setLines(prev => [...prev, { ...line, id: self.crypto.randomUUID() }]);
    };
    
    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Copied to clipboard!",
            description: "The Solidity code has been copied to your clipboard.",
        });
    }

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        addLine({ type: 'prompt', text: data.prompt });
        
        const task = determineTask(data.prompt);

        try {
            if (task === AgentTask.Recommend || task === AgentTask.Unknown) {
                addLine({ type: 'status', text: 'Analyzing business needs...' });
                const result = await recommendBusinessTools({ business_description: data.prompt });
                setTimeout(() => {
                    setLines(prev => prev.filter(l => l.type !== 'status'));
                    addLine({ type: 'guidance', text: 'Found recommendations:'})
                    result.recommendations.forEach((rec) => {
                        addLine({ type: 'recommendation', recommendation: rec });
                    });
                }, 1000);
            } else if (task === AgentTask.BuildDapp) {
                addLine({ type: 'status', text: 'Generating dApp plan...' });
                const result = await generateDapp({ description: data.prompt });
                setTimeout(() => {
                    setLines(prev => prev.filter(l => l.type !== 'status'));
                    addLine({ type: 'guidance', text: 'Generated Plan:'})
                    addLine({ type: 'plan', plan: result });
                }, 1000);
            } else if (task === AgentTask.LaunchToken) {
                 addLine({ type: 'status', text: 'Generating ERC-20 Smart Contract...' });
                const result = await generateToken({ description: data.prompt });
                 setTimeout(() => {
                    setLines(prev => prev.filter(l => l.type !== 'status'));
                    addLine({ type: 'guidance', text: 'Generated Contract:'})
                    addLine({ type: 'code', code: result });
                }, 1000);
            }
        } catch (error) {
            console.error('Error processing prompt:', error);
            addLine({ type: 'output', text: 'Error: Could not process your request.' });
        } finally {
             setTimeout(() => {
                setIsLoading(false);
                form.reset();
            }, 1000);
        }
    }

  return (
    <>
       <div className="sr-only">
        <h1 className="text-3xl font-bold font-headline">AI Command Center</h1>
        <p className="text-muted-foreground">
          Your unified interface for building and managing Web3 projects with AI.
        </p>
      </div>

       <div className="font-code bg-black text-white h-full flex flex-col text-sm" onClick={() => inputRef.current?.focus()}>
            <div ref={terminalOutputRef} id="terminal-output" className="flex-grow overflow-y-auto p-4">
                <AnimatePresence>
                {lines.map((line, index) => (
                    <motion.div 
                        key={line.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4"
                    >
                        <span className="text-gray-500 w-6 text-right select-none">{index + 1}</span>
                        <div className="flex-1">
                             {line.type === 'prompt' && (
                                <div className="flex gap-2 items-center">
                                    <span className="text-blue-400">&gt;</span>
                                    <span>{line.text}</span>
                                </div>
                             )}
                            {line.type === 'guidance' && (
                                <p className="text-green-400">{line.text}</p>
                            )}
                            {line.type === 'status' && (
                                <p className="text-yellow-400 flex items-center gap-2">
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  {line.text}
                                </p>
                            )}
                            {line.type === 'output' && (
                                <p className="text-red-400">{line.text}</p>
                            )}
                            {line.type === 'recommendation' && line.recommendation && (() => {
                                const LucideIcon = iconMap[line.recommendation.icon] || Puzzle;
                                const toolUrl = toolUrlMap[line.recommendation.name] || '/dashboard';
                                return (
                                    <>
                                        <Link href={toolUrl} className="block group -ml-2">
                                            <div className="border border-gray-700 rounded-md p-3 my-2 bg-gray-900/50 hover:bg-gray-800/50 transition-colors duration-200">
                                                <div className="flex items-center gap-3">
                                                    <LucideIcon className="w-5 h-5 text-green-400" />
                                                    <h3 className="font-bold text-base">{line.recommendation.name}</h3>
                                                </div>
                                                <p className="mt-1 ml-8 text-gray-400">{line.recommendation.description}</p>
                                            </div>
                                        </Link>
                                        <div className="ml-8 mt-2 pl-4 border-l-2 border-gray-700">
                                            <p className="text-purple-400 font-bold mb-1">Recommended Flow:</p>
                                            <ul className="space-y-1">
                                                {line.recommendation.flow.map((step, i) => (
                                                    <li key={i} className="text-gray-400 flex items-start">
                                                        <span className="mr-2">&rarr;</span>
                                                        <span>{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                )
                            })()}
                             {line.type === 'plan' && line.plan && (
                                <div className="border border-gray-700 rounded-md p-4 my-2 bg-gray-900/50">
                                    <h3 className="font-bold text-base text-purple-400">{line.plan.name}</h3>
                                    <p className="text-gray-400 italic mb-4">{line.plan.description}</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <AppWindow className="w-4 h-4 text-green-400"/>
                                                <h4 className="font-bold text-green-400">UI Components</h4>
                                            </div>
                                            <ul className="space-y-1 list-disc list-inside text-gray-400">
                                                {line.plan.components.map((item, i) => <li key={i}>{item}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <FileJson className="w-4 h-4 text-green-400"/>
                                                <h4 className="font-bold text-green-400">Smart Contracts</h4>
                                            </div>
                                            <ul className="space-y-1 list-disc list-inside text-gray-400">
                                                {line.plan.contracts.map((item, i) => <li key={i}>{item}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                             {line.type === 'code' && line.code && (
                                <div className="border border-gray-700 rounded-md my-2 bg-gray-900/50">
                                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-base text-purple-400">{line.code.name} ({line.code.symbol})</h3>
                                            <p className="text-gray-400 text-xs">Total Supply: {line.code.supply.toLocaleString()}</p>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => handleCopy(line.code!.solidityCode)}>
                                            <Copy className="w-4 h-4 mr-2"/>
                                            Copy Code
                                        </Button>
                                    </div>
                                    <pre className="p-4 overflow-x-auto text-xs">
                                        <code>{line.code.solidityCode}</code>
                                    </pre>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
                </AnimatePresence>
                {!isLoading && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                             <div className="flex gap-4">
                                <span className="text-gray-500 w-6 text-right select-none">{lines.length + 1}</span>
                                <div className="flex-1 flex gap-2 items-center">
                                    <span className="text-blue-400">&gt;</span>
                                    <FormField
                                        control={form.control}
                                        name="prompt"
                                        render={({ field }) => (
                                            <FormItem className="flex-grow">
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        ref={inputRef}
                                                        placeholder="e.g., 'Launch a token named...', 'Build a dapp for...', 'I need a tool for...'"
                                                        className="bg-transparent border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 w-full p-0 h-auto"
                                                        autoComplete="off"
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                )}
            </div>
       </div>
    </>
  );
}

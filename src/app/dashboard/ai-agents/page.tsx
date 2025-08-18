
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import * as recommendations from '@/ai/flows/business-tool-recommendation';
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
  Icon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const FormSchema = z.object({
  business_description: z.string().min(10, {
    message: 'Business description must be at least 10 characters.',
  }),
});

const iconMap: Record<string, React.ElementType> = {
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
};

const toolUrlMap: Record<string, string> = {
  'dApp Builder': '/dashboard/dapp-builder',
  'Token Launcher': '/dashboard/token-launcher',
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
    id: number;
    type: 'input' | 'output' | 'status' | 'recommendation';
    text?: string;
    recommendation?: recommendations.BusinessToolRecommendationOutput['recommendations'][0];
};


export default function AiAgentsPage() {
    const [displayLines, setDisplayLines] = useState<DisplayLine[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<string[]>([]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            business_description: "",
        },
    });

    const printLine = (line: Omit<DisplayLine, 'id'>, delay: number = 0) => {
        setTimeout(() => {
            setDisplayLines(prev => [...prev, { ...line, id: Date.now() + Math.random() }]);
        }, delay);
    };

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setHistory(prev => [...prev, data.business_description]);
        printLine({ type: 'input', text: data.business_description });

        printLine({ type: 'status', text: 'Analyzing business needs...' }, 200);

        try {
            const result = await recommendations.recommendBusinessTools(data);
            printLine({ type: 'status', text: 'Found recommendations:' }, 1000);
            
            result.recommendations.forEach((rec, index) => {
                printLine({ type: 'recommendation', recommendation: rec }, 1200 + index * 300);
            });

        } catch (error) {
            console.error('Error getting recommendations:', error);
            printLine({ type: 'output', text: 'Error: Could not get recommendations.' });
        } finally {
            setIsLoading(false);
            form.reset();
        }
    }

    useEffect(() => {
        const terminalOutput = document.getElementById('terminal-output');
        if (terminalOutput) {
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    }, [displayLines]);

  return (
    <div className="space-y-4">
       <div>
        <h1 className="text-3xl font-bold font-headline">AI Business Agent</h1>
        <p className="text-muted-foreground">
          Describe your business, and our AI agent will recommend the best tools to help you grow.
        </p>
      </div>

       <Card className="font-code bg-gray-900/50 border-gray-700 text-white overflow-hidden">
            <CardContent className="p-0">
                <div id="terminal-output" className="h-[500px] overflow-y-auto p-4 space-y-2 text-sm">
                    <p className="text-green-400">AI-Agent v1.0.0 ready.</p>
                    <p>Enter a description of your business to get started.</p>
                    <AnimatePresence>
                    {displayLines.map((line) => (
                        <motion.div 
                            key={line.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {line.type === 'input' && (
                                <p><span className="text-blue-400">&gt;</span> {line.text}</p>
                            )}
                            {line.type === 'status' && (
                                <p className="text-yellow-400">{line.text}</p>
                            )}
                             {line.type === 'output' && (
                                <p className="text-red-400">{line.text}</p>
                            )}
                            {line.type === 'recommendation' && line.recommendation && (() => {
                                const LucideIcon = iconMap[line.recommendation.icon] || Puzzle;
                                const toolUrl = toolUrlMap[line.recommendation.name] || '/dashboard';
                                return (
                                    <Link href={toolUrl} className="block group">
                                        <div className="border border-gray-600 rounded-md p-3 my-2 bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200">
                                            <div className="flex items-center gap-3">
                                                <LucideIcon className="w-5 h-5 text-green-400" />
                                                <h3 className="font-bold text-base">{line.recommendation.name}</h3>
                                            </div>
                                            <p className="mt-1 ml-8 text-gray-400">{line.recommendation.description}</p>
                                        </div>
                                    </Link>
                                )
                            })()}
                        </motion.div>
                    ))}
                    </AnimatePresence>
                     {isLoading && (
                        <div className="flex items-center gap-2">
                           <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />
                           <p className="text-yellow-400">Thinking...</p>
                        </div>
                    )}
                </div>
                 <div className="p-2 border-t border-gray-700 bg-gray-900/80">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
                            <span className="text-blue-400 font-bold">&gt;</span>
                            <FormField
                                control={form.control}
                                name="business_description"
                                render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormControl>
                                    <Input
                                        placeholder="e.g., 'A decentralized NFT marketplace for artists...'"
                                        className="bg-transparent border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
                                        disabled={isLoading}
                                        {...field}
                                    />
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                             <Button type="submit" size="sm" variant="ghost" className="text-blue-400 hover:bg-blue-900/50 hover:text-white" disabled={isLoading}>
                                Run
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}

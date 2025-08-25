
'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { recommendBusinessTools } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BusinessToolRecommendationOutput } from '@/ai/schemas/business-tool-recommendation';
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
import { useSidebar } from '@/components/ui/sidebar';


const FormSchema = z.object({
  business_description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
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
    id: string;
    type: 'prompt' | 'input' | 'output' | 'status' | 'recommendation' | 'guidance';
    text?: string;
    recommendation?: BusinessToolRecommendationOutput['recommendations'][0];
};

export default function TokenLauncherPage() {
    const { setOpen } = useSidebar();
    const terminalOutputRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const initialLines: DisplayLine[] = [
        { id: 'guidance-1', type: 'guidance', text: 'Welcome to the Token Launcher.' },
        { id: 'guidance-2', type: 'guidance', text: "Describe the cryptocurrency token you want to create." },
    ];
    const [lines, setLines] = useState<DisplayLine[]>(initialLines);


    useEffect(() => {
        setOpen(false);
    }, [setOpen]);
    
    useEffect(() => {
      if (terminalOutputRef.current) {
        terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
      }
    }, [lines, isLoading]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            business_description: "",
        },
    });

    const addLine = (line: Omit<DisplayLine, 'id'>) => {
        setLines(prev => [...prev, { ...line, id: self.crypto.randomUUID() }]);
    };
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        addLine({ type: 'prompt', text: data.business_description });
        
        addLine({ type: 'status', text: 'Generating token contract...' });

        try {
            const result = await recommendBusinessTools(data);
            
            setTimeout(() => {
                setLines(prev => prev.map(l => l.type === 'status' ? {...l, text: 'Found recommendations:'} : l));
                result.recommendations.forEach((rec) => {
                    addLine({ type: 'recommendation', recommendation: rec });
                });
                setIsLoading(false);
                form.reset();
            }, 1000);

        } catch (error) {
            console.error('Error getting recommendations:', error);
            addLine({ type: 'output', text: 'Error: Could not generate token contract.' });
            setIsLoading(false);
            form.reset();
        }
    }

  return (
    <>
       <div className="sr-only">
        <h1 className="text-3xl font-bold font-headline">Token Launcher</h1>
        <p className="text-muted-foreground">
          Describe the token you want to create, and our AI will generate a plan for you.
        </p>
      </div>

       <div className="font-code bg-black text-white h-full flex flex-col text-sm">
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
                                <p className="text-yellow-400">{line.text}</p>
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
                        </div>
                    </motion.div>
                ))}
                </AnimatePresence>
                {isLoading && (
                    <div className="flex gap-4">
                       <span className="text-gray-500 w-6 text-right select-none">{lines.length + 1}</span>
                        <div className="flex-1 flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />
                            <p className="text-yellow-400">Thinking...</p>
                        </div>
                    </div>
                )}
            </div>
             <div className="border-t border-gray-700 p-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
                        <span className="text-blue-400">&gt;</span>
                        <FormField
                            control={form.control}
                            name="business_description"
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormControl>
                                        <Input
                                            placeholder="e.g., 'An ERC-20 utility token named 'Starlight' (STAR) with a total supply of 100 million...'"
                                            className="bg-transparent border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 w-full p-0 h-auto"
                                            disabled={isLoading}
                                            autoFocus
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                         <Button type="submit" size="sm" disabled={isLoading}>
                           {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send'}
                         </Button>
                    </form>
                </Form>
             </div>
        </div>
    </>
  );
}

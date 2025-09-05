'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Copy, AlertTriangle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { recommendBusinessTools, generateDapp, generateToken, runSecurityAudit, generateDaoPlan } from '@/app/actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import type { BusinessToolRecommendationOutput } from '@/ai/schemas/business-tool-recommendation';
import type { DappBuilderOutput } from '@/ai/schemas/dapp-builder';
import type { TokenLauncherOutput } from '@/ai/schemas/token-launcher';
import type { SecurityAuditOutput } from '@/ai/schemas/security-audit';
import type { DaoGovernanceOutput } from '@/ai/schemas/dao-governance';
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
  Vote,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CodeBlock, dracula } from 'react-code-blocks';

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
    'Trading Bot Platform': '/dashboard/ai-agents',
    'AI Agents': '/dashboard/ai-agents',
    'Custom Wallets': '/dashboard/ai-agents',
    'Smart Contract Templates': '/dashboard/ai-agents',
    'Manual Transactions': '/dashboard/ai-agents',
    'On-chain Analytics': '/dashboard/ai-agents',
    'Decentralized Storage': '/dashboard/ai-agents',
    'Security Audits': '/dashboard/ai-agents',
    'DAO Governance': '/dashboard/ai-agents',
};

type DisplayLine = {
    id: string;
    type: 'prompt' | 'output' | 'status' | 'recommendation' | 'guidance' | 'plan' | 'code' | 'audit' | 'dao';
    text?: string;
    recommendation?: BusinessToolRecommendationOutput['recommendations'][0];
    plan?: DappBuilderOutput;
    code?: TokenLauncherOutput;
    audit?: SecurityAuditOutput;
    dao?: DaoGovernanceOutput;
};

const initialLines: DisplayLine[] = [
    { id: 'guidance-1', type: 'guidance', text: 'Welcome to your AI Command Center.' },
    { id: 'guidance-2', type: 'guidance', text: "Describe what you want to build, audit a contract, or design a DAO. I'm ready." },
];

enum AgentTask {
  Recommend,
  BuildDapp,
  LaunchToken,
  AuditContract,
  DesignDao,
  Unknown
}

function determineTask(prompt: string): AgentTask {
    const lowerCasePrompt = prompt.toLowerCase();
    if (lowerCasePrompt.includes('audit') || lowerCasePrompt.includes('security') || lowerCasePrompt.includes('vulnerability')) {
        return AgentTask.AuditContract;
    }
     if (lowerCasePrompt.includes('dao') || lowerCasePrompt.includes('governance')) {
        return AgentTask.DesignDao;
    }
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

const severityConfig = {
    'Critical': 'bg-red-500/20 text-red-400 border-red-500/30',
    'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Low': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Informational': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

const CustomCodeBlock = ({ code, language = 'solidity' }: { code: string; language?: string }) => {
    const { toast } = useToast();
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Copied to clipboard!",
        });
    }

    return (
        <div className="relative group my-4 rounded-md overflow-hidden">
            <CodeBlock
                text={code.trim()}
                language={language}
                showLineNumbers={true}
                theme={dracula}
            />
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleCopy}
            >
                <Copy className="w-4 h-4"/>
            </Button>
        </div>
    )
}

export default function AiAgentsPage() {
    const [lines, setLines] = useState<DisplayLine[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setOpen } = useSidebar();
    const { toast } = useToast();
    const terminalOutputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setLines(initialLines.map(line => ({ ...line, id: crypto.randomUUID() })));
    }, []);

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

    const addLine = (line: Omit<DisplayLine, 'id'>, type?: 'status' | 'guidance' | 'output') => {
        const id = crypto.randomUUID();
        if (type) {
            setLines(prev => {
                const newLines = prev.filter(l => l.type !== type);
                return [...newLines, { ...line, id }];
            });
        } else {
             setLines(prev => [...prev, { ...line, id }]);
        }
    };
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        addLine({ type: 'prompt', text: data.prompt });
        form.reset();
        
        const task = determineTask(data.prompt);

        try {
            if (task === AgentTask.Recommend || task === AgentTask.Unknown) {
                addLine({ type: 'status', text: 'Analyzing business needs...' }, 'status');
                const result = await recommendBusinessTools({ business_description: data.prompt });
                addLine({ type: 'guidance', text: 'Found recommendations:'}, 'status')
                result.recommendations.forEach((rec) => {
                    addLine({ type: 'recommendation', recommendation: rec });
                });
            } else if (task === AgentTask.BuildDapp) {
                addLine({ type: 'status', text: 'Generating dApp plan...' }, 'status');
                const result = await generateDapp({ description: data.prompt });
                addLine({ type: 'guidance', text: 'Generated Plan:'}, 'status');
                addLine({ type: 'plan', plan: result });
            } else if (task === AgentTask.LaunchToken) {
                addLine({ type: 'status', text: 'Generating ERC-20 Smart Contract...' }, 'status');
                const result = await generateToken({ description: data.prompt });
                addLine({ type: 'guidance', text: 'Generated Contract:'}, 'status');
                addLine({ type: 'code', code: result });
            } else if (task === AgentTask.AuditContract) {
                addLine({ type: 'status', text: 'Analyzing contract for vulnerabilities...' }, 'status');
                const result = await runSecurityAudit({ solidityCode: data.prompt });
                addLine({ type: 'guidance', text: 'Security Audit Complete:'}, 'status');
                addLine({ type: 'audit', audit: result });
            } else if (task === AgentTask.DesignDao) {
                addLine({ type: 'status', text: 'Generating DAO Governance Plan...' }, 'status');
                const result = await generateDaoPlan({ description: data.prompt });
                addLine({ type: 'guidance', text: 'Generated DAO Plan:'}, 'status');
                addLine({ type: 'dao', dao: result });
            }
        } catch (error) {
            console.error('Error processing prompt:', error);
            addLine({ type: 'output', text: 'Error: Could not process your request.' }, 'status');
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div 
        className="font-code bg-black text-white text-sm -m-6 grid grid-rows-[1fr_auto] h-[calc(100vh-113px)]" 
        onClick={() => inputRef.current?.focus()}
    >
        <div ref={terminalOutputRef} id="terminal-output" className="overflow-y-auto p-4">
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
                            <div className="flex gap-2 items-start">
                                <span className="text-blue-400 mt-2">&gt;</span>
                                <span className="whitespace-pre-wrap">{line.text}</span>
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
                            const toolUrl = toolUrlMap[line.recommendation.name] || '/dashboard/ai-agents';
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
                                <div className="p-4 border-b border-gray-700">
                                     <h3 className="font-bold text-base text-purple-400">{line.code.name} ({line.code.symbol})</h3>
                                    <p className="text-gray-400 text-xs">Total Supply: {line.code.supply.toLocaleString()}</p>
                                </div>
                                <div className="p-4">
                                    <CustomCodeBlock code={line.code.solidityCode} />
                                </div>
                            </div>
                        )}
                        {line.type === 'audit' && line.audit && (
                            <div className="border border-gray-700 rounded-md p-4 my-2 bg-gray-900/50">
                                <h3 className="font-bold text-base text-purple-400 mb-2">Security Audit Report</h3>
                                <p className="text-gray-400 italic mb-4">{line.audit.summary}</p>
                                <div className="space-y-4">
                                    {line.audit.vulnerabilities.length > 0 ? line.audit.vulnerabilities.map((vuln, i) => (
                                        <div key={i} className={cn("border rounded-md p-3", severityConfig[vuln.severity])}>
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-bold flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> {vuln.name}</h4>
                                                <Badge variant="secondary" className={cn("text-xs", severityConfig[vuln.severity])}>{vuln.severity}</Badge>
                                            </div>
                                            <p className="text-gray-400 text-xs mb-2">{vuln.description}</p>
                                            <p className="text-green-400 text-xs font-medium">{vuln.recommendation}</p>
                                        </div>
                                    )) : (
                                        <div className="flex items-center gap-2 text-green-400">
                                            <ShieldCheck className="w-5 h-5" />
                                            <p>No vulnerabilities found.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {line.type === 'dao' && line.dao && (
                            <div className="border border-gray-700 rounded-md p-4 my-2 bg-gray-900/50">
                                <h3 className="font-bold text-base text-purple-400">{line.dao.name}</h3>
                                <p className="text-gray-400 italic mb-4">{line.dao.description}</p>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold text-green-400 mb-1">Governance Model</h4>
                                        <p className="font-semibold text-gray-300">{line.dao.governanceModel.name}</p>
                                        <p className="text-gray-400 text-xs">{line.dao.governanceModel.description}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-green-400 mb-1">Tokenomics</h4>
                                        <p className="font-semibold text-gray-300">{line.dao.tokenomics.tokenName} ({line.dao.tokenomics.tokenSymbol})</p>
                                        <p className="text-gray-400 text-xs">{line.dao.tokenomics.initialDistribution}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-green-400 mb-1">Operational Plan</h4>
                                        <ul className="space-y-1">
                                            {line.dao.operationalPlan.map((step, i) => (
                                                <li key={i} className="text-gray-400 flex items-start text-xs">
                                                    <span className="mr-2 mt-1">&rarr;</span>
                                                    <span>{step}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
        <div className="p-4 border-t border-gray-700">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-4 items-start">
                        <span className="text-gray-500 w-6 text-right select-none mt-2">{lines.length + 1}</span>
                        <div className="flex-1 flex gap-2 items-start">
                            <span className="text-blue-400 mt-2">&gt;</span>
                            <FormField
                                control={form.control}
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="flex-grow">
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                ref={inputRef as React.Ref<HTMLTextAreaElement>}
                                                placeholder="e.g., 'Audit this contract for reentrancy...' or 'Design a DAO for a collective of artists...'"
                                                className="bg-transparent border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 w-full p-0 h-auto resize-none"
                                                autoComplete="off"
                                                disabled={isLoading}
                                                rows={1}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        form.handleSubmit(onSubmit)();
                                                    }
                                                }}
                                                onChange={(e) => {
                                                field.onChange(e);
                                                const textarea = e.target;
                                                textarea.style.height = 'auto';
                                                textarea.style.height = `${textarea.scrollHeight}px`;
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </form>
            </Form>
        </div>
   </div>
  );
}

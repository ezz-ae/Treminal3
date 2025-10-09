
'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Copy, AlertTriangle, ShieldCheck, BrainCircuit, BotMessageSquare, FileText, Vote } from 'lucide-react';
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
  AreaChart,
  FileArchive,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CodeBlock, dracula } from 'react-code-blocks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    'On-chain Analytics': '/dashboard/analytics',
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

const getInitialLines = (): DisplayLine[] => [
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

    const auditKeywords = ['audit', 'security', 'vulnerability', 'check contract'];
    if (auditKeywords.some(kw => lowerCasePrompt.includes(kw))) {
        return AgentTask.AuditContract;
    }
    
    const daoKeywords = ['dao', 'governance', 'decentralized autonomous organization'];
    if (daoKeywords.some(kw => lowerCasePrompt.includes(kw))) {
        return AgentTask.DesignDao;
    }

    const dappKeywords = ['dapp', 'application', 'build a website', 'create a platform'];
    if (dappKeywords.some(kw => lowerCasePrompt.includes(kw))) {
        return AgentTask.BuildDapp;
    }

    const tokenKeywords = ['token', 'cryptocurrency', 'coin', 'erc-20', 'launch a currency'];
    if (tokenKeywords.some(kw => lowerCasePrompt.includes(kw))) {
        return AgentTask.LaunchToken;
    }

    const recommendKeywords = ['recommend', 'suggest', 'what tools', 'help my business'];
     if (recommendKeywords.some(kw => lowerCasePrompt.includes(kw))) {
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
        <div className="relative group my-4 rounded-md overflow-hidden bg-[#282a36]">
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
                <Copy className="w-4 h-4 text-white"/>
            </Button>
        </div>
    )
}

export default function AiAgentsPage() {
    const [lines, setLines] = useState<DisplayLine[]>(getInitialLines);
    const [status, setStatus] = useState<'idle' | 'thinking' | 'generating' | 'error'>('idle');
    const isLoading = status === 'thinking' || status === 'generating';

    const { setOpen } = useSidebar();
    const terminalOutputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

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
        setLines(prev => [...prev, { ...line, id: crypto.randomUUID() }]);
    };
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setStatus('thinking');
        addLine({ type: 'prompt', text: data.prompt });
        form.reset();
        
        const task = determineTask(data.prompt);
        let statusLineId: string | null = null;
        
        const updateStatus = (text: string) => {
            const newLine: DisplayLine = { id: crypto.randomUUID(), type: 'status', text };
            if (statusLineId === null) {
                statusLineId = newLine.id;
                setLines(prev => [...prev, newLine]);
            } else {
                setLines(prev => prev.map(l => l.id === statusLineId ? newLine : l));
            }
        };
        
        const removeStatus = () => {
            if (statusLineId) {
                setLines(prev => prev.filter(l => l.id !== statusLineId));
            }
        }

        try {
            if (task === AgentTask.Recommend || task === AgentTask.Unknown) {
                updateStatus('Analyzing business needs...');
                setStatus('generating');
                const result = await recommendBusinessTools({ business_description: data.prompt });
                removeStatus();
                addLine({ type: 'guidance', text: 'Found recommendations:'});
                result.recommendations.forEach((rec) => {
                    addLine({ type: 'recommendation', recommendation: rec });
                });
            } else if (task === AgentTask.BuildDapp) {
                updateStatus('Generating dApp plan...');
                setStatus('generating');
                const result = await generateDapp({ description: data.prompt });
                removeStatus();
                addLine({ type: 'guidance', text: 'Generated Plan:'});
                addLine({ type: 'plan', plan: result });
            } else if (task === AgentTask.LaunchToken) {
                updateStatus('Generating ERC-20 Smart Contract...');
                setStatus('generating');
                const result = await generateToken({ description: data.prompt });
                removeStatus();
                addLine({ type: 'guidance', text: 'Generated Contract:'});
                addLine({ type: 'code', code: result });
            } else if (task === AgentTask.AuditContract) {
                updateStatus('Analyzing contract for vulnerabilities...');
                setStatus('generating');
                const result = await runSecurityAudit({ solidityCode: data.prompt });
                removeStatus();
                addLine({ type: 'guidance', text: 'Security Audit Complete:'});
                addLine({ type: 'audit', audit: result });
            } else if (task === AgentTask.DesignDao) {
                updateStatus('Generating DAO Governance Plan...');
                setStatus('generating');
                const result = await generateDaoPlan({ description: data.prompt });
                removeStatus();
                addLine({ type: 'guidance', text: 'Generated DAO Plan:'});
                addLine({ type: 'dao', dao: result });
            }
            setStatus('idle');
        } catch (error) {
            console.error('Error processing prompt:', error);
            removeStatus();
            addLine({ type: 'output', text: `Error: Could not process your request. ${error instanceof Error ? error.message : ''}` });
            setStatus('error');
        }
    }

  return (
    <div className="font-code text-sm flex flex-col h-full rounded-md border bg-card">
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
                    <span className="text-muted-foreground w-6 text-right select-none">{index + 1}</span>
                    <div className="flex-1">
                        {line.type === 'prompt' && (
                            <div className="flex gap-2 items-start">
                                <span className="text-primary mt-2">&gt;</span>
                                <span className="whitespace-pre-wrap text-primary font-medium">{line.text}</span>
                            </div>
                        )}
                        {line.type === 'guidance' && (
                            <p className="text-foreground">{line.text}</p>
                        )}
                        {line.type === 'status' && (
                            <p className="text-muted-foreground flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {line.text}
                            </p>
                        )}
                        {line.type === 'output' && (
                            <p className="text-destructive">{line.text}</p>
                        )}
                        {line.type === 'recommendation' && line.recommendation && (() => {
                            const LucideIcon = iconMap[line.recommendation.icon] || Puzzle;
                            const toolUrl = toolUrlMap[line.recommendation.name] || '/dashboard/ai-agents';
                            return (
                                <>
                                    <Card className="my-2">
                                        <CardHeader>
                                            <Link href={toolUrl} className="block group">
                                                <div className="flex items-center gap-3">
                                                    <LucideIcon className="w-5 h-5 text-primary" />
                                                    <h3 className="font-bold text-base">{line.recommendation.name}</h3>
                                                </div>
                                                <p className="mt-1 ml-8 text-muted-foreground text-sm">{line.recommendation.description}</p>
                                            </Link>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="ml-8 mt-2 pl-4 border-l">
                                                <p className="text-foreground font-bold mb-1">Recommended Flow:</p>
                                                <ul className="space-y-1">
                                                    {line.recommendation.flow.map((step, i) => (
                                                        <li key={i} className="text-muted-foreground text-xs flex items-start">
                                                            <span className="mr-2">&rarr;</span>
                                                            <span>{step}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </>
                            )
                        })()}
                        {line.type === 'plan' && line.plan && (
                            <Card className="my-2">
                                <CardHeader>
                                    <CardTitle className="text-primary">{line.plan.name}</CardTitle>
                                    <p className="text-muted-foreground text-sm italic">{line.plan.description}</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <AppWindow className="w-4 h-4 text-primary"/>
                                                <h4 className="font-bold">UI Components</h4>
                                            </div>
                                            <ul className="space-y-1 list-disc list-inside text-muted-foreground text-sm">
                                                {line.plan.components.map((item, i) => <li key={i}>{item}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <FileJson className="w-4 h-4 text-primary"/>
                                                <h4 className="font-bold">Smart Contracts</h4>
                                            </div>
                                            <ul className="space-y-1 list-disc list-inside text-muted-foreground text-sm">
                                                {line.plan.contracts.map((item, i) => <li key={i}>{item}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        {line.type === 'code' && line.code && (
                             <Card className="my-2">
                                <CardHeader>
                                     <CardTitle className="text-primary">{line.code.name} ({line.code.symbol})</CardTitle>
                                    <p className="text-muted-foreground text-xs">Total Supply: {line.code.supply.toLocaleString()}</p>
                                </CardHeader>
                                <CardContent>
                                    <CustomCodeBlock code={line.code.solidityCode} />
                                </CardContent>
                            </Card>
                        )}
                        {line.type === 'audit' && line.audit && (
                           <Card className="my-2">
                               <CardHeader>
                                <CardTitle className="text-primary mb-2 flex items-center gap-2"><ShieldCheck className="w-5 h-5"/> Security Audit Report</CardTitle>
                                <p className="text-muted-foreground text-sm italic">{line.audit.summary}</p>
                               </CardHeader>
                               <CardContent>
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
                               </CardContent>
                            </Card>
                        )}
                        {line.type === 'dao' && line.dao && (
                            <Card className="my-2">
                                <CardHeader>
                                    <CardTitle className="text-primary">{line.dao.name}</CardTitle>
                                    <p className="text-muted-foreground text-sm italic">{line.dao.description}</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-primary"/>Governance Model</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="font-semibold text-foreground">{line.dao.governanceModel.name}</p>
                                                <p className="text-muted-foreground text-sm mt-1">{line.dao.governanceModel.description}</p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold flex items-center gap-2"><FileText className="w-5 h-5 text-primary"/>Tokenomics</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="font-semibold text-foreground">{line.dao.tokenomics.tokenName} ({line.dao.tokenomics.tokenSymbol})</p>
                                                <p className="text-muted-foreground text-sm mt-1">{line.dao.tokenomics.initialDistribution}</p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold flex items-center gap-2"><Vote className="w-5 h-5 text-primary"/>Operational Plan</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-2">
                                                    {line.dao.operationalPlan.map((step, i) => (
                                                        <li key={i} className="text-muted-foreground flex items-start text-sm">
                                                            <span className="mr-2 mt-1 text-primary">&rarr;</span>
                                                            <span>{step}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
        <div className="p-4 border-t">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-4 items-start">
                        <span className="text-muted-foreground w-6 text-right select-none mt-2">{lines.length + 1}</span>
                        <div className="flex-1 flex gap-2 items-start">
                            <span className="text-primary mt-2">&gt;</span>
                            <FormField
                                control={form.control}
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="flex-grow">
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                ref={inputRef}
                                                placeholder="e.g., 'Audit this contract for reentrancy...' or 'Design a DAO for a collective of artists...'"
                                                className="bg-transparent border-0 ring-offset-card focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground w-full p-0 h-auto resize-none"
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

    
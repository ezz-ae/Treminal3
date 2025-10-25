
'use client';

import { ArrowRight, Bot, BrainCircuit, HeartPulse, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const actions = [
    {
        name: 'AI Business Architect',
        description: 'Get a strategic plan and tool recommendations for your Web3 project based on your goals and industry.',
        icon: Bot,
        link: '/dashboard/dapp-builder',
    },
    {
        name: 'Solana AI Agent',
        description: 'Use natural language to interact with the Solana network. Airdrop tokens, check balances, and analyze transactions.',
        icon: BrainCircuit,
        link: '/dashboard/solana',
    },
    {
        name: 'Smart Contract Security Auditor',
        description: 'Our AI will analyze your smart contracts for common vulnerabilities and provide a detailed security report.',
        icon: Search,
        link: '/dashboard/security-audits',
    },
    {
        name: 'Market Sentiment Analysis',
        description: 'Access real-time AI-driven analysis of market sentiment and trends across the entire Web3 landscape.',
        icon: HeartPulse,
        link: '/dashboard/finance',
    },
];

export default function Web3ActionsPage() {
  return (
    <div className="container mx-auto py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Web3 Actions</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Discover and utilize our growing library of AI-powered actions to build, manage, and grow your Web3 applications.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action) => {
            const Icon = action.icon;
            return (
                <Card key={action.name} className="flex flex-col group bg-card/50 hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-lg font-bold font-headline group-hover:text-primary transition-colors pr-4 flex items-center gap-3">
                                <Icon className="w-6 h-6" />
                                {action.name}
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription className="text-sm">{action.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href={action.link}>
                                Go to Tool <ArrowRight className="ml-2 w-4 h-4"/>
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            );
        })}
      </div>
    </div>
  );
}

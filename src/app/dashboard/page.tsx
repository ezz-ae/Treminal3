
'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  ArrowRight,
  Code2,
  ShieldCheck,
  Vote,
  Sprout,
  Wrench,
  BookOpen,
  Download,
  Terminal,
  Info,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { GuideDialog } from '@/components/dashboard/guide-dialog';
import { articles, type Article } from '@/lib/articles';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, React.ElementType> = {
    AppWindow, Bot, Puzzle, Wallet, FileJson, Network, BotMessageSquare, AreaChart, FileArchive, Code2, ShieldCheck, Vote, Sprout, Wrench, BookOpen, Download, Terminal,
};

const allServices = [
      {
        href: '/dashboard/ai-agents',
        iconName: 'Terminal',
        title: 'AI Command Center',
        description: 'Describe what you want to build, audit, or design.',
        category: 'AI',
        serviceIndex: null,
      },
       {
        href: '/dashboard/ai-agents',
        iconName: 'AppWindow',
        title: 'dApp Builder',
        description:
          'Create and deploy dApps with our intuitive AI-powered builder.',
        category: 'Build',
        serviceIndex: 0,
      },
      {
        href: '/dashboard/ai-agents',
        iconName: 'Puzzle',
        title: 'Token Launcher',
        description: 'Design and launch your own custom cryptocurrency tokens.',
        category: 'Build',
        serviceIndex: 1,
      },
      {
        href: '/dashboard/ai-agents',
        iconName: 'Bot',
        title: 'Trading Bot Platform',
        description: 'Develop and deploy automated trading bots on DEXs.',
        category: 'Automate',
        serviceIndex: 2,
      },
       {
        href: '/dashboard/ai-agents',
        iconName: 'BotMessageSquare',
        title: 'AI Agents',
        description: 'Deploy autonomous AI agents to automate on-chain tasks.',
        category: 'Automate',
        serviceIndex: 3,
      },
      {
        href: '/dashboard/ai-agents',
        iconName: 'Wallet',
        title: 'Custom Wallets',
        description: 'Build and brand your own secure crypto wallets for your users.',
        category: 'Build',
        serviceIndex: 4,
      },
       {
        href: '/dashboard/ai-agents',
        iconName: 'FileJson',
        title: 'Smart Contract Templates',
        description:
          'Use our audited templates to create secure smart contracts.',
        category: 'Build',
        serviceIndex: 5,
      },
      {
        href: '/dashboard/ai-agents',
        iconName: 'Network',
        title: 'Manual Transactions',
        description: 'Interact directly with the blockchain for custom operations.',
        category: 'Tools',
        serviceIndex: 6,
      },
      {
        href: '/dashboard/analytics',
        iconName: 'AreaChart',
        title: 'On-chain Analytics',
        description: 'Run complex queries and visualize data from blockchains.',
        category: 'Data',
        serviceIndex: 7,
      },
       {
        href: '/dashboard/ai-agents',
        iconName: 'FileArchive',
        title: 'Decentralized Storage',
        description: 'Upload and manage files on IPFS and other storage networks.',
        category: 'Infra',
        serviceIndex: 8,
      },
       {
        href: '/dashboard/ai-agents',
        iconName: 'ShieldCheck',
        title: 'Security Audits',
        description: 'Automatically audit your smart contracts for vulnerabilities.',
        category: 'Security',
        serviceIndex: 9,
      },
      {
        href: '/dashboard/ai-agents',
        iconName: 'Vote',
        title: 'DAO Governance',
        description: 'Manage your decentralized autonomous organization with ease.',
        category: 'Community',
        serviceIndex: 10,
      },
      {
        href: '/dashboard/docs/apis',
        iconName: 'Code2',
        title: 'Universal RPC API',
        description:
          'Access 50+ chains with a single, reliable RPC endpoint.',
        category: 'Infra',
        serviceIndex: null,
      },
      { href: '/dashboard/stake', iconName: 'Sprout', title: 'Stake', description: 'Stake your assets to earn rewards.', category: 'DeFi', serviceIndex: null},
      { href: '/dashboard/tools', iconName: 'Wrench', title: 'Developer Tools', description: 'Utilities for building, testing, and debugging.', category: 'Tools', serviceIndex: null},
      { href: '/dashboard/docs', iconName: 'BookOpen', title: 'Documentation', description: 'Read guides and API references.', category: 'Resources', serviceIndex: null},
      { href: '/dashboard/download', iconName: 'Download', title: 'Download App', description: 'Get the Terminal3 desktop application.', category: 'Resources', serviceIndex: null},
]


export default function DashboardPage() {
  const [guideArticle, setGuideArticle] = React.useState<Article | null>(null);

  const handleOpenGuide = (serviceIndex: number | null) => {
    if (serviceIndex === null) return;
    const article = articles.find(a => a.serviceIndex === serviceIndex);
    if (article) {
      setGuideArticle(article);
    }
  };

  return (
    <div>
       <div className="mb-12">
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a summary of your on-chain assets and available services.</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-6">Unified Web3 Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allServices.map((service) => {
              const Icon = iconMap[service.iconName];
              return (
                <Card key={service.title} className="flex flex-col h-full bg-card/50 group hover:border-primary/50 transition-colors duration-300">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-4">
                                <Icon className="w-6 h-6" />
                            </div>
                            <Badge variant="secondary">{service.category}</Badge>
                        </div>
                        <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                    <div className="p-6 pt-0 flex items-center justify-between">
                        <Link href={service.href} className="text-sm font-medium text-primary flex items-center gap-2 group-hover:underline">
                           Go to {service.category === 'AI' ? 'AI Agent' : service.title} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        {service.serviceIndex !== null && (
                           <Button variant="ghost" size="icon" onClick={() => handleOpenGuide(service.serviceIndex)}>
                                <Info className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                           </Button>
                        )}
                    </div>
                </Card>
            )})}
        </div>
      </div>
       <GuideDialog
        article={guideArticle}
        isOpen={!!guideArticle}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setGuideArticle(null);
          }
        }}
      />
    </div>
  );
}

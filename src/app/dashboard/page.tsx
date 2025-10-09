
'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  Newspaper,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const allServices = [
      {
        href: '/dashboard/ai-agents',
        icon: Terminal,
        title: 'AI Command Center',
        description: 'Describe what you want to build, audit, or design.',
        category: 'AI',
      },
       {
        href: '/dashboard/ai-agents',
        icon: AppWindow,
        title: 'dApp Builder',
        description:
          'Create and deploy dApps with our intuitive AI-powered builder.',
        category: 'Build',
      },
      {
        href: '/dashboard/ai-agents',
        icon: Puzzle,
        title: 'Token Launcher',
        description: 'Design and launch your own custom cryptocurrency tokens.',
        category: 'Build',
      },
      {
        href: '/dashboard/ai-agents',
        icon: Bot,
        title: 'Trading Bot Platform',
        description: 'Develop and deploy automated trading bots on DEXs.',
        category: 'Automate',
      },
       {
        href: '/dashboard/ai-agents',
        icon: BotMessageSquare,
        title: 'AI Agents',
        description: 'Deploy autonomous AI agents to automate on-chain tasks.',
        category: 'Automate',
      },
      {
        href: '/dashboard/ai-agents',
        icon: Wallet,
        title: 'Custom Wallets',
        description: 'Build and brand your own secure crypto wallets for your users.',
        category: 'Build',
      },
       {
        href: '/dashboard/ai-agents',
        icon: FileJson,
        title: 'Smart Contract Templates',
        description:
          'Use our audited templates to create secure smart contracts.',
        category: 'Build',
      },
      {
        href: '/dashboard/ai-agents',
        icon: Network,
        title: 'Manual Transactions',
        description: 'Interact directly with the blockchain for custom operations.',
        category: 'Tools',
      },
      {
        href: '/dashboard/analytics',
        icon: AreaChart,
        title: 'On-chain Analytics',
        description: 'Run complex queries and visualize data from blockchains.',
        category: 'Data',
      },
       {
        href: '/dashboard/ai-agents',
        icon: FileArchive,
        title: 'Decentralized Storage',
        description: 'Upload and manage files on IPFS and other storage networks.',
        category: 'Infra',
      },
       {
        href: '/dashboard/ai-agents',
        icon: ShieldCheck,
        title: 'Security Audits',
        description: 'Automatically audit your smart contracts for vulnerabilities.',
        category: 'Security',
      },
      {
        href: '/dashboard/ai-agents',
        icon: Vote,
        title: 'DAO Governance',
        description: 'Manage your decentralized autonomous organization with ease.',
        category: 'Community',
      },
      {
        href: '/dashboard/docs/apis',
        icon: Code2,
        title: 'Universal RPC API',
        description:
          'Access 50+ chains with a single, reliable RPC endpoint.',
        category: 'Infra',
      },
      { href: '/dashboard/stake', icon: Sprout, title: 'Stake', description: 'Stake your assets to earn rewards.', category: 'DeFi'},
      { href: '/dashboard/tools', icon: Wrench, title: 'Developer Tools', description: 'Utilities for building, testing, and debugging.', category: 'Tools'},
      { href: '/dashboard/docs', icon: BookOpen, title: 'Documentation', description: 'Read guides and API references.', category: 'Resources'},
      { href: '/blog', icon: Newspaper, title: 'Blog', description: 'Explore articles, guides, and updates.', category: 'Resources'},
      { href: '/dashboard/download', icon: Download, title: 'Download App', description: 'Get the Terminal3 desktop application.', category: 'Resources'},
]


export default function DashboardPage() {
  return (
    <div>
       <div className="mb-12">
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a summary of your on-chain assets and available services.</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-6">Unified Web3 Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allServices.map((tool) => (
            <Card key={tool.title} className="flex flex-col group bg-card/50 hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                    <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-4">
                        <tool.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm">{tool.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button asChild className="w-full">
                        <Link href={tool.href}>
                            Launch <ArrowRight className="ml-2"/>
                        </Link>
                    </Button>
                </div>
            </Card>
            ))}
        </div>
      </div>
    </div>
  );
}


'use client';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  AppWindow,
  Bot,
  Puzzle,
  Wallet,
  FileJson,
  Network,
  ArrowRight,
  BotMessageSquare,
  AreaChart,
  FileArchive,
  ShieldCheck,
  Vote,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


const tools = [
  {
    href: '/dashboard/dapp-builder',
    icon: AppWindow,
    title: 'dApp Builder',
    description:
      'Create and deploy decentralized applications with our intuitive builder.',
    tag: 'Builder',
    gradient: 'from-blue-500/10 to-transparent',
    className: 'lg:col-span-2'
  },
  {
    href: '/dashboard/token-launcher',
    icon: Puzzle,
    title: 'Token Launcher',
    description: 'Design and launch your own custom cryptocurrency tokens in minutes.',
    tag: 'Tokens',
  },
  {
    href: '/dashboard/trading-bots',
    icon: Bot,
    title: 'Trading Bot Platform',
    description: 'Develop and deploy automated trading bots on major exchanges.',
    tag: 'Automation',
    gradient: 'from-purple-500/10 to-transparent'
  },
  {
    href: '/dashboard/ai-agents',
    icon: BotMessageSquare,
    title: 'AI Agents',
    description: 'Deploy autonomous AI agents to interact with your dApps and automate tasks.',
    tag: 'AI',
    className: 'lg:col-span-2'
  },
  {
    href: '/dashboard/wallets',
    icon: Wallet,
    title: 'Custom Wallets',
    description: 'Build and brand your own secure crypto wallets for your users.',
    tag: 'Infrastructure',
  },
  {
    href: '/dashboard/smart-contracts',
    icon: FileJson,
    title: 'Smart Contract Templates',
    description:
      'Use our audited templates to create secure smart contracts without the hassle.',
    tag: 'Contracts',
    gradient: 'from-green-500/10 to-transparent'
  },
  {
    href: '/dashboard/transactions',
    icon: Network,
    title: 'Manual Transactions',
    description:
      'Interact directly with the blockchain for custom operations and analysis.',
    tag: 'Chain',
  },
   {
    href: '/dashboard/analytics',
    icon: AreaChart,
    title: 'On-chain Analytics',
    description: 'Get deep insights into on-chain data with our powerful analytics engine.',
    tag: 'Data',
    gradient: 'from-yellow-500/10 to-transparent'
  },
  {
    href: '/dashboard/storage',
    icon: FileArchive,
    title: 'Decentralized Storage',
    description: 'Upload and manage files on IPFS and other decentralized storage networks.',
    tag: 'Storage',
  },
  {
    href: '/dashboard/audits',
    icon: ShieldCheck,
    title: 'Security Audits',
    description: 'Run automated security audits on your smart contracts to find vulnerabilities.',
    tag: 'Security',
    gradient: 'from-red-500/10 to-transparent'
  },
  {
    href: '/dashboard/governance',
    icon: Vote,
    title: 'DAO Governance',
    description: 'Manage your decentralized autonomous organization with our governance tools.',
    tag: 'Community',
  },
  {
    href: '#',
    title: 'View all tools',
    description: 'Explore the full suite of our platform capabilities.',
    tag: 'All',
  },
];

const filters = ["All topics", "dApp Builder", "Token Launcher", "Trading Bots", "AI Agents", "Analytics", "Security"];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Education</h1>
        <p className="text-muted-foreground">
          Come here to learn and discover. Let's answer questions about all things crypto.
        </p>
      </div>

       <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter, index) => (
          <Button key={filter} variant={index === 0 ? "secondary" : "ghost"} size="sm" className="rounded-full">
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card key={tool.title} className={cn("flex flex-col justify-between group bg-card/50 hover:border-primary/50 transition-colors duration-300 relative overflow-hidden", tool.gradient, tool.className)}>
             {tool.gradient && <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", tool.gradient)} />}
            <CardContent className="pt-6 flex-grow flex flex-col">
              <div className="flex-grow">
                <div className="mb-4 bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-1 rounded-full inline-block">
                    {tool.tag}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{tool.title}</h3>
                <p className="text-muted-foreground text-sm">{tool.description}</p>
              </div>
              <div className="mt-6">
                  <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardContent>
            <Link href={tool.href} className="absolute inset-0">
                <span className="sr-only">View {tool.title}</span>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

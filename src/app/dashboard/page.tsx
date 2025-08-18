
import {
  Card,
  CardContent,
  CardDescription,
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
  ArrowRight,
  BotMessageSquare,
  AreaChart,
  FileArchive,
  ShieldCheck,
  Vote,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const tools = [
  {
    href: '/dashboard/dapp-builder',
    icon: AppWindow,
    title: 'dApp Builder',
    description:
      'Create and deploy decentralized applications with our intuitive builder.',
  },
  {
    href: '/dashboard/token-launcher',
    icon: Puzzle,
    title: 'Token Launcher',
    description: 'Design and launch your own custom cryptocurrency tokens in minutes.',
  },
  {
    href: '/dashboard/trading-bots',
    icon: Bot,
    title: 'Trading Bot Platform',
    description: 'Develop and deploy automated trading bots on major exchanges.',
  },
  {
    href: '/dashboard/ai-agents',
    icon: BotMessageSquare,
    title: 'AI Agents',
    description: 'Deploy autonomous AI agents to interact with your dApps and automate tasks.',
  },
  {
    href: '/dashboard/wallets',
    icon: Wallet,
    title: 'Custom Wallets',
    description: 'Build and brand your own secure crypto wallets for your users.',
  },
  {
    href: '/dashboard/smart-contracts',
    icon: FileJson,
    title: 'Smart Contract Templates',
    description:
      'Use our audited templates to create secure smart contracts without the hassle.',
  },
  {
    href: '/dashboard/transactions',
    icon: Network,
    title: 'Manual Transactions',
    description:
      'Interact directly with the blockchain for custom operations and analysis.',
  },
   {
    href: '/dashboard/analytics',
    icon: AreaChart,
    title: 'On-chain Analytics',
    description: 'Get deep insights into on-chain data with our powerful analytics engine.',
  },
  {
    href: '/dashboard/storage',
    icon: FileArchive,
    title: 'Decentralized Storage',
    description: 'Upload and manage files on IPFS and other decentralized storage networks.',
  },
  {
    href: '/dashboard/audits',
    icon: ShieldCheck,
    title: 'Security Audits',
    description: 'Run automated security audits on your smart contracts to find vulnerabilities.',
  },
  {
    href: '/dashboard/governance',
    icon: Vote,
    title: 'DAO Governance',
    description: 'Manage your decentralized autonomous organization with our governance tools.',
  },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here are the tools to build, manage, and grow your Web3 project.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card key={tool.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <tool.icon className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline text-xl">{tool.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{tool.description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
                <Button variant="outline" asChild>
                    <Link href={tool.href}>
                        Go to {tool.title} <ArrowRight className="ml-2"/>
                    </Link>
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

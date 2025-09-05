
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
  TrendingUp,
  Building,
  Sprout,
  Image as ImageIcon,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const serviceCategories = [
  {
    category: "Build On-chain Assets",
    description: "The foundational tools for creating and launching your digital assets.",
    services: [
       {
        href: '/dashboard/ai-agents',
        icon: Puzzle,
        title: 'Token Launcher',
        description: 'Design and launch your own custom cryptocurrency tokens in minutes.',
        chains: ["Ethereum", "Polygon", "BNB Chain"],
      },
      {
        href: '/dashboard/ai-agents',
        icon: FileJson,
        title: 'Smart Contract Templates',
        description:
          'Use our audited templates to create secure smart contracts without the hassle.',
        chains: ["Ethereum", "Polygon", "Arbitrum"],
      },
    ]
  },
  {
    category: "Build Your Application",
    description: "Everything you need to build, brand, and launch your user-facing applications.",
     services: [
       {
        href: '/dashboard/ai-agents',
        icon: AppWindow,
        title: 'dApp Builder',
        description:
          'Create and deploy decentralized applications with our intuitive builder, powered by AI.',
        chains: ["Ethereum", "Polygon", "Solana", "Avalanche"],
        className: 'lg:col-span-2'
      },
      {
        href: '/dashboard/ai-agents',
        icon: Wallet,
        title: 'Custom Wallets',
        description: 'Build and brand your own secure crypto wallets for your users.',
        chains: ["Ethereum", "Solana"],
      },
    ]
  },
   {
    category: "Orchestrate & Automate",
    description: "Deploy autonomous agents and bots to automate complex tasks and strategies.",
    services: [
       {
        href: '/dashboard/ai-agents',
        icon: BotMessageSquare,
        title: 'AI Agents',
        description: 'Deploy autonomous AI agents to interact with your dApps and automate tasks.',
        chains: ["All EVM", "Solana"],
        className: 'lg:col-span-2'
      },
      {
        href: '/dashboard/ai-agents',
        icon: Bot,
        title: 'Trading Bot Platform',
        description: 'Develop and deploy automated trading bots on major decentralized exchanges.',
        chains: ["Ethereum", "Solana", "Arbitrum"],
      },
    ]
  },
  {
    category: "Data & Infrastructure",
    description: "Powerful APIs and robust infrastructure to scale your Web3 applications.",
    services: [
      {
        href: '/dashboard/docs/solana',
        icon: Code2,
        title: 'Universal RPC API',
        description:
          'Access 50+ chains with a single, reliable RPC endpoint.',
        chains: ["Ethereum", "Solana", "+50 more"],
      },
       {
        href: '/dashboard/analytics',
        icon: AreaChart,
        title: 'On-chain Analytics',
        description: 'Run complex queries and visualize data from indexed blockchains.',
        chains: ["Ethereum", "Polygon", "BNB Chain"],
      },
      {
        href: '/dashboard/ai-agents',
        icon: FileArchive,
        title: 'Decentralized Storage',
        description: 'Upload and manage files on IPFS and other decentralized storage networks.',
        chains: ["IPFS", "Arweave"],
      },
    ]
  },
]


export default function DashboardPage() {
  return (
    <div>
       <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Portfolio</h1>
        <p className="text-muted-foreground">Welcome back! Here's a summary of your on-chain assets.</p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,845.12</div>
            <p className="text-xs text-muted-foreground">+2.1% from last 24h</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NFTs Owned</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">Floor value: 12.5 ETH</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staking</CardTitle>
            <Sprout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,120.89</div>
            <p className="text-xs text-muted-foreground">Avg. APY: 5.8%</p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">3 New Mints</div>
                <p className="text-xs text-muted-foreground">Last transaction: 2h ago</p>
            </CardContent>
        </Card>
      </div>

      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold font-headline tracking-tight">Your Unified Web3 Services Marketplace</h2>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
            Below is our full suite of services. Whether you're a developer, trader, or enterprise, select a category to find the tools you need to build, manage, and grow your on-chain presence.
        </p>
      </div>

       <Tabs defaultValue="developers" className="w-full">
        <div className="flex justify-center mb-10">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="developers"><Code2 className="mr-2"/> For Developers</TabsTrigger>
            <TabsTrigger value="traders"><TrendingUp className="mr-2"/> For Traders</TabsTrigger>
            <TabsTrigger value="enterprises"><Building className="mr-2"/> For Enterprises</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="developers">
            {serviceCategories.map((category) => (
              <div key={category.category} className="mb-12">
                <h2 className="text-2xl font-bold font-headline mb-2">{category.category}</h2>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((tool) => (
                    <Card key={tool.title} className={cn("flex flex-col group bg-card/50 hover:border-primary/50 transition-colors duration-300", tool.className)}>
                      <CardHeader className="flex-row items-start gap-4 space-y-0">
                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                          <tool.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold mb-1">{tool.title}</CardTitle>
                          <div className="flex flex-wrap gap-1.5">
                            {tool.chains.map(chain => (
                                <span key={chain} className="text-xs bg-secondary text-secondary-foreground/80 px-2 py-0.5 rounded-full">{chain}</span>
                            ))}
                          </div>
                        </div>
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
            ))}
        </TabsContent>
         <TabsContent value="traders">
            <div className="text-center py-20">
                <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4"/>
                <h3 className="text-2xl font-bold font-headline">Trading Tools Coming Soon</h3>
                <p className="text-muted-foreground mt-2">Specialized tools for DeFi traders and financial engineers are under construction.</p>
            </div>
        </TabsContent>
        <TabsContent value="enterprises">
            <div className="text-center py-20">
                <Building className="w-12 h-12 mx-auto text-muted-foreground mb-4"/>
                <h3 className="text-2xl font-bold font-headline">Enterprise Solutions Coming Soon</h3>
                <p className="text-muted-foreground mt-2">High-performance infrastructure and support for large-scale applications are on the way.</p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    
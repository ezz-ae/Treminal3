
'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ArrowRight,
  Bot,
  Activity,
  PlusCircle,
  BarChart2,
  List,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';

const pnlData = [
  { date: '2024-01', pnl: 0 },
  { date: '2024-02', pnl: 1200 },
  { date: '2024-03', pnl: 900 },
  { date: '2024-04', pnl: 1800 },
  { date: '2024-05', pnl: 2500 },
  { date: '2024-06', pnl: 4300 },
];

const chartConfig = {
  pnl: {
    label: 'PNL',
    color: 'hsl(var(--chart-1))',
  },
};

const activeBots = [
  { name: 'ETH/USDC Arbitrage', status: 'Running', pnl: 1250.55 },
  { name: 'SOL Momentum', status: 'Running', pnl: 873.21 },
  { name: 'Low-Cap Gem Hunter', status: 'Stopped', pnl: -150.32 },
  { name: 'BTC Grid Trader', status: 'Running', pnl: 450.10 },
];

export default function DashboardPage() {

  return (
    <div className="space-y-8">
       <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Trading Command Center</h1>
        <p className="text-muted-foreground">Monitor your active trading bots and overall performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total PNL (USD)</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">$6,423.54</div>
            <p className="text-xs text-muted-foreground">+32.1% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bots</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 / 4</div>
            <p className="text-xs text-muted-foreground">1 bot requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,832</div>
            <p className="text-xs text-muted-foreground">+152 this week</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary/20 hover:bg-primary/20 transition-colors">
            <Link href="/dashboard/bot-creator" className="h-full flex flex-col justify-center items-center">
                 <CardContent className="text-center p-6">
                    <PlusCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-lg font-bold font-headline text-primary">Create New Bot</p>
                    <p className="text-xs text-muted-foreground">Use AI to build a new strategy</p>
                </CardContent>
            </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
              <CardHeader>
                  <CardTitle>Portfolio PNL Over Time</CardTitle>
                  <CardDescription>Your portfolio's profit and loss over the last 6 months.</CardDescription>
              </CardHeader>
              <CardContent>
                 <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <AreaChart accessibilityLayer data={pnlData}>
                        <defs>
                            <linearGradient id="fillPnl" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-pnl)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="var(--color-pnl)" stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value/1000}k`} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Area dataKey="pnl" type="natural" fill="url(#fillPnl)" fillOpacity={0.4} stroke="var(--color-pnl)" />
                    </AreaChart>
                </ChartContainer>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Bot Status</CardTitle>
                    <List className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Live status of all your trading bots.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                      {activeBots.map(bot => (
                        <div key={bot.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className={`h-2 w-2 rounded-full ${bot.status === 'Running' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                <div>
                                    <p className="font-medium">{bot.name}</p>
                                    <p className={`text-xs ${bot.pnl > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        PNL: ${bot.pnl.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                           <Badge variant={bot.status === 'Running' ? 'default' : 'destructive'} className="bg-opacity-20 text-opacity-100">
                                {bot.status}
                            </Badge>
                        </div>
                      ))}
                  </div>
              </CardContent>
          </Card>
      </div>

       <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Explore Core Services</h2>
        <p className="text-muted-foreground mb-6">Beyond trading, Terminal3 offers a full suite of Web3 development tools.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard href="/dashboard/dapp-builder" title="dApp Builder" description="Create dApps with AI" />
            <ServiceCard href="/dashboard/token-launcher" title="Token Launcher" description="Launch custom tokens" />
            <ServiceCard href="/dashboard/security-audits" title="Security Audits" description="Audit smart contracts" />
            <ServiceCard href="/dashboard/docs" title="Documentation" description="Read guides & APIs" />
        </div>
      </div>
    </div>
  );
}


const ServiceCard = ({ href, title, description }: { href: string, title: string, description: string }) => (
    <Link href={href}>
        <Card className="h-full bg-card/50 hover:border-primary/50 transition-colors group">
            <CardHeader>
                <CardTitle className="text-lg font-bold group-hover:text-primary">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-sm font-medium text-primary flex items-center gap-1">
                    Go to {title} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </p>
            </CardContent>
        </Card>
    </Link>
)

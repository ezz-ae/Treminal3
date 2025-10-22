'use client';

import {
  Landmark,
  Wallet,
  CircleDollarSign,
  TrendingUp,
  BrainCircuit,
  PieChart,
  BarChart2,
  Users,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { BarChart, Bar, Pie, Cell, ResponsiveContainer } from 'recharts';

const treasuryAssets = [
  { token: 'USDC', balance: '1,250,000.00', value: '$1,250,000' },
  { token: 'ETH', balance: '450.50', value: '$1,576,750' },
  { token: 'wBTC', balance: '10.20', value: '$652,800' },
  { token: 'SOL', balance: '5,000', value: '$750,000' },
  { token: 'T3', balance: '500,000,000', value: '$2,500,000' },
];

const revenueData = [
    { source: "Bot Fees", value: 45000, color: 'hsl(var(--chart-1))' },
    { source: "Token Launch", value: 75000, color: 'hsl(var(--chart-2))' },
    { source: "RPC API", value: 15000, color: 'hsl(var(--chart-3))' },
    { source: "Staking", value: 22000, color: 'hsl(var(--chart-4))' },
];

const T3HolderData = [
  { name: 'Top 10', value: 45, color: 'hsl(var(--chart-1))' },
  { name: '11-100', value: 25, color: 'hsl(var(--chart-2))' },
  { name: '101-1k', value: 15, color: 'hsl(var(--chart-3))' },
  { name: '1k+', value: 15, color: 'hsl(var(--chart-4))' },
];

export default function FinanceDashboardPage() {
  return (
    <div className="container mx-auto py-12 space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-headline flex items-center gap-3">
          <Landmark className="w-10 h-10 text-primary" />
          Platform Finance Dashboard
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          An intelligent, real-time overview of the Terminal3 protocol's financial health.
        </p>
      </div>

       <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Treasury Value</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$6,729,550</div>
            <p className="text-xs text-muted-foreground">+1.2% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Protocol Volume</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$12,450,830</div>
            <p className="text-xs text-muted-foreground">Across all integrated services</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">$T3 Token Price</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$0.005</div>
            <p className="text-xs text-muted-foreground text-green-400">+5.6% (24h)</p>
          </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Treasury Wallet</CardTitle>
                <CardDescription>Live balances of the main protocol treasury.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Asset</TableHead>
                            <TableHead>Balance</TableHead>
                            <TableHead className="text-right">Value (USD)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {treasuryAssets.map((asset) => (
                             <TableRow key={asset.token}>
                                <TableCell className="font-medium">{asset.token}</TableCell>
                                <TableCell>{asset.balance}</TableCell>
                                <TableCell className="text-right font-mono">{asset.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Protocol Revenue (30d)</CardTitle>
                <CardDescription>Breakdown of revenue streams from platform fees.</CardDescription>
            </CardHeader>
             <CardContent>
                <ChartContainer config={{}} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Pie data={revenueData} dataKey="value" nameKey="source" innerRadius={60} outerRadius={100}>
                                {revenueData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <ChartLegend content={<ChartLegendContent nameKey="source" />} className="-mt-4" />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>
      
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>$T3 Token Overview</CardTitle>
                    <CardDescription>Key metrics for the Terminal3 native token.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h4 className="font-semibold">Tokenomics</h4>
                        <div className="flex justify-between p-3 bg-card-foreground/5 rounded-md"><span>Total Supply</span> <span className="font-mono">1,000,000,000</span></div>
                        <div className="flex justify-between p-3 bg-card-foreground/5 rounded-md"><span>Circulating Supply</span> <span className="font-mono">350,000,000</span></div>
                        <div className="flex justify-between p-3 bg-card-foreground/5 rounded-md"><span>Market Cap</span> <span className="font-mono">$1,750,000</span></div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-center mb-2">Holder Distribution</h4>
                        <ChartContainer config={{}} className="h-[150px] w-full">
                           <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Pie data={T3HolderData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={60}>
                                        {T3HolderData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BrainCircuit/> AI Recommendations</CardTitle>
                <CardDescription>Actionable insights based on live protocol data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-sm p-3 bg-card rounded-md">
                    <p className="font-semibold">"Consider increasing the staking rewards for T3 by 0.5% to incentivize more token locks, reducing market volatility."</p>
                </div>
                 <div className="text-sm p-3 bg-card rounded-md">
                    <p className="font-semibold">"Trading bot fee revenue is up 25% week-over-week. Suggest running a marketing campaign to highlight this service."</p>
                </div>
                 <Button className="w-full">Generate New Insights</Button>
            </CardContent>
        </Card>
       </div>

    </div>
  );
}

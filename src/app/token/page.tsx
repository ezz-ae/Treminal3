
'use client';

import { Gem, Shield, Vote, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const tokenomicsData = [
    { name: 'Ecosystem & Rewards', value: 40, color: 'hsl(var(--chart-1))' },
    { name: 'Team & Advisors', value: 20, color: 'hsl(var(--chart-2))' },
    { name: 'Public Sale', value: 15, color: 'hsl(var(--chart-3))' },
    { name: 'Treasury', value: 15, color: 'hsl(var(--chart-4))' },
    { name: 'Liquidity', value: 10, color: 'hsl(var(--chart-5))' },
];

export default function TokenPage() {
  return (
    <div className="container mx-auto py-12 px-4">
        <header className="mb-12 text-center">
            <Gem className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-5xl font-bold font-headline">The $T3 Token</h1>
            <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
                The native utility and governance token that powers the Terminal3 ecosystem.
            </p>
        </header>

        <Card className="mb-12 bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="text-center">Mission & Utility</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <Vote className="w-12 h-12 text-primary mb-4"/>
                    <h3 className="text-xl font-bold font-headline">Govern the Future</h3>
                    <p className="text-muted-foreground mt-2">
                        $T3 holders can create and vote on proposals to guide the future development of the Terminal3 platform.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <Zap className="w-12 h-12 text-primary mb-4"/>
                    <h3 className="text-xl font-bold font-headline">Access & Discounts</h3>
                    <p className="text-muted-foreground mt-2">
                        Stake $T3 to receive reduced fees on premium services like AI trading bots and advanced API access.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <Shield className="w-12 h-12 text-primary mb-4"/>
                    <h3 className="text-xl font-bold font-headline">Secure & Earn</h3>
                    <p className="text-muted-foreground mt-2">
                        Help secure the platform and earn a share of protocol revenue by staking your $T3 tokens in our vault.
                    </p>
                </div>
            </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Tokenomics</CardTitle>
                    <CardDescription>Total Supply: 1,000,000,000 $T3</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Pie data={tokenomicsData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {tokenomicsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

             <Card className="flex flex-col justify-center">
                <CardHeader>
                    <CardTitle>Get Involved</CardTitle>
                    <CardDescription>Join the Terminal3 ecosystem and start building the future.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button size="lg" className="w-full" asChild>
                        <Link href="/solana/trading">Trade $T3</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full" asChild>
                        <Link href="/dashboard/stake">Stake $T3</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

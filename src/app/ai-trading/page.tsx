
'use client';
import { BrainCircuit, TrendingUp, CheckCircle, Shield, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import GridPattern from '@/components/landing/grid-pattern';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const liveOpportunities = [
    { pair: 'BTC/USDC', strategy: 'Momentum Breakout', projectedRoi: '15.2%', risk: 'Medium', confidence: 98.2, href: '/dashboard/bot-creator/momentum-master-btc' },
    { pair: 'SOL/USDC', strategy: 'Arbitrage (Raydium/Orca)', projectedRoi: '1.8%', risk: 'Low', confidence: 99.9, href: '/dashboard/bot-creator/arbitrage-bot-sol' },
    { pair: 'SOL/USDC', strategy: 'Mean Reversion', projectedRoi: '7.5%', risk: 'Medium', confidence: 96.5, href: '/dashboard/bot-creator/mean-reversion-sol' },
    { pair: 'ETH/USDC', strategy: 'Volatility Scalp', projectedRoi: '22.1%', risk: 'High', confidence: 94.8, href: '/dashboard/bot-creator/volatility-scalper-eth' },
];

const riskStyles: Record<string, string> = {
    'Low': 'text-green-400 border-green-500/50 bg-green-500/10',
    'Medium': 'text-orange-400 border-orange-500/50 bg-orange-500/10',
    'High': 'text-red-400 border-red-500/50 bg-red-500/10',
};


export default function AiTradingPage() {
    return (
        <div className="relative flex-1 flex flex-col p-4 md:p-8 space-y-8">
             <GridPattern
                width={60}
                height={60}
                x={-1}
                y={-1}
                className="[mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_80%)] opacity-30 animate-pulse"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0"></div>

            <header className="text-center z-10">
                <h1 className="text-4xl md:text-5xl font-bold font-headline flex items-center justify-center gap-3">
                    <BrainCircuit className="w-12 h-12 text-primary" />
                    AI Trading Command Center
                </h1>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto mt-4">
                    Leverage our enterprise-grade AI to spot and execute high-probability trades across the crypto market in real-time.
                </p>
            </header>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 z-10">
                <Card className="bg-card/60 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">AI Accuracy</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-400">99.9%</div>
                        <p className="text-xs text-muted-foreground">Based on back-tested strategies</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/60 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Live 24h PNL</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-400">+$12,480.30</div>
                        <p className="text-xs text-muted-foreground">Across all automated strategies</p>
                    </CardContent>
                </Card>
                 <Card className="bg-card/60 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Trades Executed (24h)</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,832</div>
                        <p className="text-xs text-muted-foreground">All trades executed successfully</p>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="z-10 bg-card/60 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Live AI Opportunities</CardTitle>
                    <CardDescription>High-conviction trades identified by our AI engine within the last 5 minutes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Pair</TableHead>
                                <TableHead>Strategy</TableHead>
                                <TableHead>Projected ROI</TableHead>
                                <TableHead>Risk Level</TableHead>
                                <TableHead>Confidence</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {liveOpportunities.map((trade) => (
                                <TableRow key={trade.pair + trade.strategy} className="hover:bg-primary/5">
                                    <TableCell className="font-medium">{trade.pair}</TableCell>
                                    <TableCell>{trade.strategy}</TableCell>
                                    <TableCell className="text-green-400 font-semibold">{trade.projectedRoi}</TableCell>
                                    <TableCell><Badge variant="outline" className={cn(riskStyles[trade.risk])}>{trade.risk}</Badge></TableCell>
                                    <TableCell className="font-mono">{trade.confidence}%</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={trade.href}>
                                                Execute <ArrowRight className="w-4 h-4 ml-2" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

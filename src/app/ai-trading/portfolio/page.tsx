
'use client';

import { DollarSign, BarChart2, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

const activeStrategies = [
    { name: 'Momentum Master (BTC)', status: 'Active', pnl: 450.75, pnlPercent: 9.01, risk: 'Medium' },
    { name: 'Volatility Scalper (ETH)', status: 'Active', pnl: 120.30, pnlPercent: 4.81, risk: 'High' },
    { name: 'DEX Arbitrage (SOL)', status: 'Active', pnl: 88.12, pnlPercent: 0.88, risk: 'Low' },
    { name: 'Mean Reversion (SOL)', status: 'Monitoring', pnl: -15.50, pnlPercent: -0.31, risk: 'Medium' },
];

const riskStyles: Record<string, string> = {
    'Low': 'text-green-400 border-green-500/50 bg-green-500/10',
    'Medium': 'text-orange-400 border-orange-500/50 bg-orange-500/10',
    'High': 'text-red-400 border-red-500/50 bg-red-500/10',
};

const statusStyles: Record<string, string> = {
    'Active': 'text-green-400',
    'Monitoring': 'text-yellow-400',
};

export default function PortfolioPage() {
    return (
        <div className="flex-1 flex flex-col p-4 md:p-8 space-y-8 container mx-auto">
            <div className="grid gap-4 md:grid-cols-3">
                 <Card className="bg-card/60 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$27,625.67</div>
                        <p className="text-xs text-muted-foreground">+2.2% in the last 24 hours</p>
                    </CardContent>
                </Card>
                 <Card className="bg-card/60 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">24h PNL</CardTitle>
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-400">+$603.67</div>
                        <p className="text-xs text-muted-foreground">From all active strategies</p>
                    </CardContent>
                </Card>
                 <Card className="bg-card/60 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Overall Risk Exposure</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold flex items-center gap-2">
                            Medium
                            <Progress value={55} className="w-2/3 h-2" />
                        </div>
                        <p className="text-xs text-muted-foreground">Balanced across all strategies</p>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="z-10 bg-card/60 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Active AI Strategies</CardTitle>
                    <CardDescription>An overview of all currently deployed and monitored trading strategies.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Strategy Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Risk Level</TableHead>
                                <TableHead>PNL (USD)</TableHead>
                                <TableHead>PNL (%)</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activeStrategies.map((strategy) => (
                                <TableRow key={strategy.name} className="hover:bg-primary/5">
                                    <TableCell className="font-medium">{strategy.name}</TableCell>
                                     <TableCell>
                                        <span className={cn("font-semibold", statusStyles[strategy.status])}>
                                            {strategy.status}
                                        </span>
                                    </TableCell>
                                    <TableCell><Badge variant="outline" className={cn(riskStyles[strategy.risk])}>{strategy.risk}</Badge></TableCell>
                                    <TableCell className={cn("font-mono", strategy.pnl >= 0 ? 'text-green-400' : 'text-red-400')}>
                                        {strategy.pnl >= 0 ? '+' : ''}{strategy.pnl.toFixed(2)}
                                    </TableCell>
                                     <TableCell className={cn("font-mono", strategy.pnl >= 0 ? 'text-green-400' : 'text-red-400')}>
                                         {strategy.pnlPercent.toFixed(2)}%
                                     </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">
                                            View Details
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

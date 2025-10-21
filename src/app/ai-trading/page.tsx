
'use client';
import { TrendingUp, CheckCircle, Shield, BrainCircuit, BarChart, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

const kpis = [
    { title: 'AI Confidence', value: '99.9%', icon: CheckCircle, description: 'Based on 1.2M back-tested scenarios', color: 'text-green-400' },
    { title: 'Live 24h PNL', value: '+$12,480.30', icon: TrendingUp, description: 'Across all automated strategies', color: 'text-green-400' },
    { title: 'Trades Executed (24h)', value: '1,832', icon: Shield, description: 'All trades executed successfully', color: 'text-foreground' },
];

const strategies = [
    { name: 'Multi-DEX Arbitrage', description: 'Exploiting price differences across exchanges.', performance: '+18.2% APY' },
    { name: 'Trend Following (BTC)', description: 'Capitalizing on major price movements.', performance: '+45.7% APY' },
    { name: 'Mean Reversion (ETH)', description: 'Trading based on RSI indicators.', performance: '+22.9% APY' },
]

export default function AiTradingPage() {
    return (
        <div className="flex-1 flex flex-col p-4 md:p-8 space-y-8 container mx-auto">
            <div className="grid gap-4 md:grid-cols-3">
                {kpis.map(kpi => (
                     <Card key={kpi.title} className="bg-card/60 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                            <kpi.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
                            <p className="text-xs text-muted-foreground">{kpi.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-card/60 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BrainCircuit className="text-primary"/> Active Strategy Types</CardTitle>
                        <CardDescription>Our AI employs a diverse set of strategies to navigate different market conditions.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {strategies.map(strategy => (
                             <div key={strategy.name} className="flex justify-between items-center p-3 rounded-md bg-card-foreground/5">
                                <div>
                                    <p className="font-semibold">{strategy.name}</p>
                                    <p className="text-sm text-muted-foreground">{strategy.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono text-green-400">{strategy.performance}</p>
                                    <p className="text-xs text-muted-foreground">Simulated</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card className="bg-card/60 backdrop-blur-sm flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart className="text-primary"/> Platform Performance</CardTitle>
                        <CardDescription>An overview of the AI's performance over the last 30 days.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-muted-foreground">Detailed performance charts are being generated.</p>
                             <Link href="/ai-trading/opportunities" className="text-primary font-semibold mt-4 inline-flex items-center gap-2">
                                Explore Live Opportunities <ArrowRight className="w-4 h-4"/>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

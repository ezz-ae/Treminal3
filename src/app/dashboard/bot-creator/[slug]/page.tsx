
'use client';

import { useState, useEffect } from 'react';
import { Loader2, Bot, SlidersHorizontal, BrainCircuit, BarChart2, ArrowLeft, Play, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateTradingBot, runTradingBotSimulation } from '@/ai/actions';
import { Button } from '@/components/ui/button';
import type { TradingBotOutput, TradingBotSimulationOutput } from '@/ai/schemas/trading-bot';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CustomCodeBlock } from '@/components/ui/code-block';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { notFound, useRouter } from 'next/navigation';

const botStrategies: Record<string, { name: string, strategy: string; tradingPair: string; initialCapital: number, icon: React.ElementType }> = {
    'momentum-master-btc': {
        name: 'Momentum Master (BTC)',
        strategy: 'A trend-following bot for BTC/USDC that buys when the 50-day moving average crosses above the 200-day moving average (Golden Cross) and sells when it crosses below (Death Cross). It aims to capture long-term trends.',
        tradingPair: 'BTC/USDC',
        initialCapital: 10000,
        icon: BrainCircuit,
    },
    'volatility-scalper-eth': {
        name: 'Volatility Scalper (ETH)',
        strategy: 'A high-frequency bot for ETH/USDC that uses Bollinger Bands. It buys when the price hits the lower band and sells when it hits the upper band, aiming to profit from short-term volatility.',
        tradingPair: 'ETH/USDC',
        initialCapital: 10000,
        icon: SlidersHorizontal,
    },
    'mean-reversion-sol': {
        name: 'Mean Reversion (SOL)',
        strategy: 'A bot for SOL/USDC based on the Relative Strength Index (RSI). It buys when the RSI drops below 30 (oversold) and sells when it rises above 70 (overbought), betting on price returning to its average.',
        tradingPair: 'SOL/USDC',
        initialCapital: 10000,
        icon: BarChart2,
    },
};


export default function BotDetailPage({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const [bot, setBot] = useState<TradingBotOutput | null>(null);
    const [simulation, setSimulation] = useState<TradingBotSimulationOutput | null>(null);
    const [isGenerating, setIsGenerating] = useState(true);
    const [isDeploying, setIsDeploying] = useState(false);
    const [deploymentLog, setDeploymentLog] = useState<string[]>([]);
    
    const botData = botStrategies[params.slug];

    useEffect(() => {
        if (botData) {
            const fetchData = async () => {
                setIsGenerating(true);
                try {
                    const [botResult, simResult] = await Promise.all([
                        generateTradingBot(botData),
                        runTradingBotSimulation(botData)
                    ]);
                    setBot(botResult);
                    setSimulation(simResult);
                } catch (error) {
                    console.error("Failed to generate bot data", error);
                } finally {
                    setIsGenerating(false);
                }
            };
            fetchData();
        }
    }, [botData]);
    
    if (!botData) {
        return notFound();
    }
    
    const handleDeploy = () => {
        setIsDeploying(true);
        setDeploymentLog([]);
        const log = [
            'Attempting to connect to exchange...',
            'Connection successful. Authenticating...',
            'API keys validated.',
            'Allocating trading capital: 10,000 USDC.',
            `Deploying strategy: ${botData.name}.`,
            'Listening for market data on pair: ' + botData.tradingPair,
            `Bot is now live and monitoring for trade signals.`,
        ];
        
        let i = 0;
        const interval = setInterval(() => {
            if (i < log.length) {
                setDeploymentLog(prev => [...prev, log[i]]);
                i++;
            } else {
                clearInterval(interval);
                // Keep 'deploying' state true to show log
            }
        }, 500);
    };

    if (isGenerating) {
        return (
            <div className="container mx-auto py-12 flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <h3 className="text-xl font-headline font-semibold">Building & Backtesting Bot...</h3>
                <p className="text-muted-foreground">Our AI is running thousands of simulations on historical data.</p>
            </div>
        )
    }

  const Icon = botData.icon;

  return (
    <div className="container mx-auto py-12 space-y-8">
        <Button variant="ghost" onClick={() => router.push('/dashboard/bot-creator')}><ArrowLeft className="mr-2"/> Back to Marketplace</Button>
        <div>
            <h1 className="text-4xl font-bold font-headline flex items-center gap-3"><Icon className="w-10 h-10 text-primary"/> {bot?.name || botData.name}</h1>
            <p className="text-muted-foreground text-lg mt-2">
                {bot?.description || botData.strategy}
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
                 {simulation && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-3"><BarChart2 className="w-6 h-6 text-primary"/>Performance Backtest (12-Month)</CardTitle>
                                <CardDescription>Simulation results based on historical data with an initial capital of ${botData.initialCapital.toLocaleString()} USDC.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-3 gap-4 text-center p-4 bg-card/50 rounded-lg">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total PNL (USDC)</p>
                                        <p className={`font-bold text-2xl ${simulation.summary.totalPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {simulation.summary.totalPnl >= 0 ? '+' : ''}${simulation.summary.totalPnl.toFixed(2)}
                                        </p>
                                    </div>
                                     <div>
                                        <p className="text-sm text-muted-foreground">Win Rate</p>
                                        <p className="font-bold text-2xl">{simulation.summary.winRate.toFixed(1)}%</p>
                                    </div>
                                     <div>
                                        <p className="text-sm text-muted-foreground">Max Drawdown</p>
                                        <p className="font-bold text-2xl">{simulation.summary.maxDrawdown.toFixed(2)}%</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2 text-center">Equity Curve (USDC)</h4>
                                     <ChartContainer config={{ equity: { label: 'Equity', color: 'hsl(var(--primary))'}}} className="h-[250px] w-full">
                                        <AreaChart data={simulation.equityCurve} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                            <defs>
                                                <linearGradient id="fillEquity" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                                            <XAxis dataKey="date" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                                            <YAxis domain={['dataMin', 'dataMax']} tick={{fontSize: 12}} tickLine={false} axisLine={false} width={70} tickFormatter={(val) => `$${Number(val).toLocaleString()}`} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Area type="monotone" dataKey="equity" strokeWidth={2} stroke="hsl(var(--primary))" fill="url(#fillEquity)" />
                                        </AreaChart>
                                    </ChartContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
                 {simulation && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition:{delay: 0.2} }}>
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-3">Initial Trades</CardTitle>
                                <CardDescription>A sample of the first few trades executed during the simulation.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Price (USDC)</TableHead>
                                            <TableHead>Amount ({botData.tradingPair.split('/')[0]})</TableHead>
                                            <TableHead>Value (USDC)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {simulation.trades.slice(0, 7).map((trade, i) => (
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <Badge variant={trade.type === 'buy' ? 'default' : 'destructive'} className={trade.type === 'buy' ? 'bg-green-500/20 text-green-400 border-green-500/20' : 'bg-red-500/20 text-red-400 border-red-500/20'}>
                                                        {trade.type}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>${trade.price.toLocaleString()}</TableCell>
                                                <TableCell>{trade.amount.toFixed(6)}</TableCell>
                                                <TableCell>${(trade.price * trade.amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </motion.div>
                 )}
            </div>

            {/* Right Column */}
            <div className="space-y-8 lg:sticky lg:top-24">
               <Card>
                    <CardHeader>
                        <CardTitle>Deploy Bot</CardTitle>
                        <CardDescription>Activate this bot on your connected exchange account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         {isDeploying ? (
                             <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2"><Terminal/>Deployment Log</h3>
                                <div className="bg-black text-white p-4 rounded-lg font-mono text-xs h-[250px] overflow-y-auto flex flex-col-reverse border border-primary/20">
                                    <div>
                                        {deploymentLog.slice().reverse().map((line, index) => (
                                            <motion.div 
                                                key={deploymentLog.length - index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex items-start gap-2"
                                            >
                                                <span className="text-primary/50 shrink-0">$</span>
                                                <span className="text-white/80 whitespace-pre-wrap">{line}</span>
                                            </motion.div>
                                        ))}
                                         <div className="w-2 h-4 bg-green-400 animate-pulse" />
                                    </div>
                                </div>
                                 <Button size="lg" className="w-full mt-4" disabled>Bot is Live</Button>
                            </div>
                         ) : (
                             <Button size="lg" className="w-full" onClick={handleDeploy}>
                                <Play className="mr-2"/>Deploy Bot
                            </Button>
                         )}
                    </CardContent>
               </Card>
                {bot && (
                    <Card>
                         <CardHeader>
                            <CardTitle>Strategy Code</CardTitle>
                            <CardDescription>The underlying Python code for this strategy.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CustomCodeBlock code={bot.pythonCode} language="python" />
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
   </div>
  );
}

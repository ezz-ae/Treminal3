
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Bot, SlidersHorizontal, BrainCircuit, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateTradingBot, runTradingBotSimulation } from '@/ai/actions';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import type { TradingBotInput, TradingBotOutput, TradingBotSimulationOutput } from '@/ai/schemas/trading-bot';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomCodeBlock } from '@/components/ui/code-block';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const tradingPairs = ['BTC/USDC', 'ETH/USDC', 'SOL/USDC', 'DOGE/USDC'];
const initialCapitals = [1000, 5000, 10000, 50000];

const FormSchema = z.object({
  strategy: z.string().min(20, 'Please describe your strategy in at least 20 characters.'),
  tradingPair: z.string({ required_error: 'Please select a trading pair.' }),
  initialCapital: z.coerce.number({ required_error: 'Please select an initial capital amount.' }),
});

export default function BotCreatorPage() {
    const [bot, setBot] = useState<TradingBotOutput | null>(null);
    const [simulation, setSimulation] = useState<TradingBotSimulationOutput | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            strategy: "",
        },
    });

    const formData = form.watch();
    
    async function onGenerate(data: z.infer<typeof FormSchema>) {
        setIsGenerating(true);
        setBot(null);
        setSimulation(null);
        try {
            const result = await generateTradingBot(data);
            setBot(result);
        } catch (error) {
            console.error("Failed to generate bot", error);
        } finally {
            setIsGenerating(false);
        }
    }

    async function onSimulate() {
        if (!bot) return;
        setIsSimulating(true);
        setSimulation(null);
        try {
            const simResult = await runTradingBotSimulation(formData);
            setSimulation(simResult);
        } catch (error) {
            console.error("Failed to run simulation", error);
        } finally {
            setIsSimulating(false);
        }
    }

  return (
    <div className="container mx-auto py-12 space-y-8">
        <div>
            <h1 className="text-4xl font-bold font-headline">AI Trading Bot Creator</h1>
            <p className="text-muted-foreground text-lg mt-2">
                Describe a trading strategy in plain English, and our AI will generate, simulate, and deploy it for you.
            </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card className="lg:sticky lg:top-6">
                <CardHeader>
                    <CardTitle>1. Define Your Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onGenerate)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="strategy"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Strategy Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="e.g., 'A simple momentum strategy that buys when the 50-day moving average crosses above the 200-day moving average, and sells when it crosses below.'"
                                                className="min-h-[120px] text-base"
                                                disabled={isGenerating || isSimulating}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                               <FormField
                                    control={form.control}
                                    name="tradingPair"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Trading Pair</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isGenerating || isSimulating}>
                                                <FormControl><SelectTrigger><SelectValue placeholder="Select pair" /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    {tradingPairs.map(pair => <SelectItem key={pair} value={pair}>{pair}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="initialCapital"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Initial Capital (USDC)</FormLabel>
                                            <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)} disabled={isGenerating || isSimulating}>
                                                <FormControl><SelectTrigger><SelectValue placeholder="Select amount" /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    {initialCapitals.map(amount => <SelectItem key={amount} value={String(amount)}>${amount.toLocaleString()}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" disabled={isGenerating || isSimulating} size="lg" className="w-full">
                                {isGenerating ? <Loader2 className="animate-spin" /> : <><BrainCircuit className="mr-2"/>Generate Bot Code</>}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <div className="space-y-8">
                {bot && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-3"><Bot className="w-6 h-6 text-primary"/>{bot.name}</CardTitle>
                                <CardDescription>{bot.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CustomCodeBlock code={bot.pythonCode} language="python" />
                                <Button onClick={onSimulate} disabled={isSimulating || !bot} className="w-full mt-4" size="lg">
                                    {isSimulating ? <Loader2 className="animate-spin" /> : <><SlidersHorizontal className="mr-2"/>Run Simulation</>}
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
                 {simulation && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-3"><BarChart2 className="w-6 h-6 text-primary"/>Backtest Results</CardTitle>
                                <CardDescription>Simulation results based on the last 6 months of historical data.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total PNL</p>
                                        <p className={`font-bold text-lg ${simulation.summary.totalPnl > 0 ? 'text-green-500' : 'text-red-500'}`}>${simulation.summary.totalPnl.toFixed(2)}</p>
                                    </div>
                                     <div>
                                        <p className="text-sm text-muted-foreground">Win Rate</p>
                                        <p className="font-bold text-lg">{simulation.summary.winRate.toFixed(1)}%</p>
                                    </div>
                                     <div>
                                        <p className="text-sm text-muted-foreground">Max Drawdown</p>
                                        <p className="font-bold text-lg">{simulation.summary.maxDrawdown.toFixed(2)}%</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Equity Curve (USDC)</h4>
                                     <ChartContainer config={{ equity: { label: 'Equity', color: 'hsl(var(--primary))'}}} className="h-[200px] w-full">
                                        <AreaChart data={simulation.equityCurve}>
                                            <defs>
                                                <linearGradient id="fillEquity" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                            <XAxis dataKey="date" tick={false} axisLine={false} />
                                            <YAxis domain={['dataMin', 'dataMax']} allowDecimals={false} tickLine={false} width={60} />
                                            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
                                            <Area type="monotone" dataKey="equity" stroke="hsl(var(--primary))" fill="url(#fillEquity)" />
                                        </AreaChart>
                                    </ChartContainer>
                                </div>
                                
                                <div>
                                    <h4 className="font-semibold mb-2">Initial Trades</h4>
                                     <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Price (USDC)</TableHead>
                                                <TableHead>Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {simulation.trades.slice(0, 5).map((trade, i) => (
                                                <TableRow key={i}>
                                                    <TableCell>
                                                        <Badge variant={trade.type === 'buy' ? 'default' : 'destructive'} className={trade.type === 'buy' ? 'bg-green-500/20 text-green-400 border-green-500/20' : 'bg-red-500/20 text-red-400 border-red-500/20'}>
                                                            {trade.type}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>${trade.price.toLocaleString()}</TableCell>
                                                    <TableCell>{trade.amount.toFixed(6)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <Button size="lg" className="w-full" disabled>Deploy Bot to Production (Coming Soon)</Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </div>
        </div>
   </div>
  );
}

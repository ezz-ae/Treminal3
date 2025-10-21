
'use client';

import { AreaChart, ArrowRightLeft, Clock, Zap, TrendingUp, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart as RechartsAreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

const mockPriceData = Array.from({ length: 60 }, (_, i) => ({
  time: `${i}s ago`,
  price: 158.5 + Math.random() * 2 - 1 + Math.sin(i / 8) * 1.5,
}));

const mockOrderBook = {
    bids: Array.from({length: 8}, (_, i) => ({ price: (159.5 - i * 0.1).toFixed(2), size: (Math.random() * 10).toFixed(2) })),
    asks: Array.from({length: 8}, (_, i) => ({ price: (159.6 + i * 0.1).toFixed(2), size: (Math.random() * 10).toFixed(2) }))
}

const mockRecentTrades = Array.from({length: 12}, (_, i) => ({
    price: (159.5 + Math.random() * 0.2 - 0.1).toFixed(3),
    amount: (Math.random() * 5).toFixed(3),
    time: new Date(Date.now() - i * 1500).toLocaleTimeString(),
    side: Math.random() > 0.5 ? 'buy' : 'sell'
}));

/**
 * A DEX trading terminal page for the Solana network.
 */
export default function SolanaTradingPage() {
    const [side, setSide] = useState('buy');

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-12 gap-4">
        
        {/* Left column for trade execution */}
        <div className="col-span-12 lg:col-span-3">
             <Card className="bg-card/80 backdrop-blur-sm sticky top-24">
                <CardHeader>
                    <CardTitle>Trade Execution</CardTitle>
                    <CardDescription>SOL/USDC</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                         <Button variant={side === 'buy' ? 'default' : 'secondary'} onClick={() => setSide('buy')} className="w-full">Buy</Button>
                         <Button variant={side === 'sell' ? 'destructive' : 'secondary'} onClick={() => setSide('sell')} className="w-full">Sell</Button>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="order-type">Order Type</Label>
                        <Select defaultValue="limit">
                            <SelectTrigger id="order-type"><SelectValue placeholder="Order Type" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="limit">Limit Order</SelectItem>
                                <SelectItem value="market">Market Order</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="price">Price (USDC)</Label>
                        <Input id="price" placeholder="Price (USDC)" type="number" defaultValue="159.55" />
                    </div>
                     <div className="space-y-2">
                         <Label htmlFor="amount">Amount (SOL)</Label>
                        <Input id="amount" placeholder="Amount (SOL)" type="number" />
                    </div>

                    <Button size="lg" className="w-full h-12" variant={side === 'buy' ? 'default' : 'destructive'}>
                        {side === 'buy' ? 'Buy SOL' : 'Sell SOL'}
                    </Button>
                </CardContent>
            </Card>
        </div>

        {/* Center column for Chart and AI analysis */}
        <div className="col-span-12 lg:col-span-6 space-y-4">
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>SOL/USDC Price Chart</CardTitle>
                        <Badge variant="outline" className="font-mono">1m</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={{ price: { label: 'Price', color: 'hsl(var(--primary))'}}} className="h-[250px] w-full">
                        <RechartsAreaChart data={mockPriceData}>
                            <defs>
                                <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={false} axisLine={false} />
                            <YAxis domain={['dataMin - 1', 'dataMax + 1']} allowDecimals={true} tickLine={false} axisLine={false} width={60} tickFormatter={(val) => `$${Number(val).toFixed(2)}`} />
                            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
                            <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fill="url(#fillPrice)" strokeWidth={2}/>
                        </RechartsAreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="text-primary"/> AI Analysis: Momentum Breakout
                    </CardTitle>
                    <CardDescription>
                        Based on your parameters (Trade Amount: $5,000, Duration: 1h, Risk: Medium)
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    <div className="bg-background/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Strategy</p>
                        <p className="font-bold text-lg">Momentum</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Projected ROI</p>
                        <p className="font-bold text-lg font-mono text-green-400">0.75%</p>
                    </div>
                     <div className="bg-background/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">AI Confidence</p>
                        <p className="font-bold text-lg font-mono">98.2%</p>
                    </div>
                     <div className="bg-background/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Risk Level</p>
                        <p className="font-bold text-lg text-orange-400">Medium</p>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Right column for Order Book and Trades */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base"><ArrowRightLeft className="w-4 h-4"/> Order Book</CardTitle>
                </CardHeader>
                <CardContent className="pr-0">
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Price (USDC)</TableHead>
                                <TableHead>Size (SOL)</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockOrderBook.asks.reverse().map(ask => (
                                <TableRow key={ask.price} className="relative text-xs">
                                    <TableCell className="text-red-400 font-mono p-1.5">{ask.price}</TableCell>
                                    <TableCell className="font-mono p-1.5">{ask.size}</TableCell>
                                    <TableCell className="font-mono p-1.5 text-right">{(parseFloat(ask.price) * parseFloat(ask.size)).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                             <TableRow>
                                <TableCell colSpan={3} className="py-2 text-center font-bold text-lg">159.55</TableCell>
                            </TableRow>
                             {mockOrderBook.bids.map(bid => (
                                <TableRow key={bid.price} className="text-xs">
                                    <TableCell className="text-green-400 font-mono p-1.5">{bid.price}</TableCell>
                                    <TableCell className="font-mono p-1.5">{bid.size}</TableCell>
                                    <TableCell className="font-mono p-1.5 text-right">{(parseFloat(bid.price) * parseFloat(bid.size)).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base"><Clock className="w-4 h-4"/> Market Trades</CardTitle>
                </CardHeader>
                 <CardContent className="pr-0 h-[260px] overflow-y-auto">
                    <Table>
                         <TableBody>
                            {mockRecentTrades.map((trade, i) => (
                                 <TableRow key={i} className="text-xs">
                                    <TableCell className={`font-mono p-1.5 ${trade.side === 'buy' ? 'text-green-400' : 'text-red-400'}`}>{trade.price}</TableCell>
                                    <TableCell className="p-1.5">{trade.amount}</TableCell>
                                    <TableCell className="text-muted-foreground p-1.5 text-right">{trade.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

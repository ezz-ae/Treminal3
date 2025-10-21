'use client';

import { AreaChart, ArrowRightLeft, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart as RechartsAreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useState } from 'react';

const mockPriceData = Array.from({ length: 30 }, (_, i) => ({
  date: `D${i+1}`,
  price: 140 + Math.random() * 20 + Math.sin(i / 5) * 10,
}));

const mockOrderBook = {
    bids: Array.from({length: 5}, (_, i) => ({ price: (158.5 - i * 0.1).toFixed(2), size: (Math.random() * 10).toFixed(2) })),
    asks: Array.from({length: 5}, (_, i) => ({ price: (158.6 + i * 0.1).toFixed(2), size: (Math.random() * 10).toFixed(2) }))
}


/**
 * A DEX trading terminal page for the Solana network.
 * @returns {JSX.Element} The Solana Trading page component.
 */
export default function SolanaTradingPage() {
    const [side, setSide] = useState('buy');

  return (
    <div className="container mx-auto py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline flex items-center gap-3">
          <AreaChart className="w-10 h-10 text-primary" />
          DEX Trading Terminal
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          High-performance trading interface for the Solana ecosystem. Powered by Jupiter.
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart and Order Form */}
        <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm">
                 <CardHeader>
                    <CardTitle>SOL/USDC Price Chart</CardTitle>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={{ price: { label: 'Price', color: 'hsl(var(--primary))'}}} className="h-[300px] w-full">
                        <RechartsAreaChart data={mockPriceData}>
                            <defs>
                                <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={false} axisLine={false} />
                            <YAxis domain={['dataMin - 10', 'dataMax + 10']} allowDecimals={false} tickLine={false} axisLine={false} width={60} />
                            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
                            <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fill="url(#fillPrice)" />
                        </RechartsAreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4">
                     <Button variant={side === 'buy' ? 'default' : 'secondary'} onClick={() => setSide('buy')} className="w-full">Buy</Button>
                     <Button variant={side === 'sell' ? 'destructive' : 'secondary'} onClick={() => setSide('sell')} className="w-full">Sell</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Price (USDC)" type="number" defaultValue="158.55" />
                        <Input placeholder="Amount (SOL)" type="number" />
                    </div>
                     <Select defaultValue="limit">
                        <SelectTrigger><SelectValue placeholder="Order Type" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="limit">Limit Order</SelectItem>
                            <SelectItem value="market">Market Order</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button size="lg" className="w-full" variant={side === 'buy' ? 'default' : 'destructive'}>
                        {side === 'buy' ? 'Buy SOL' : 'Sell SOL'}
                    </Button>
                </CardContent>
            </Card>
        </div>

        {/* Order Book and Recent Trades */}
        <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ArrowRightLeft className="w-5 h-5"/> Order Book</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Price (USDC)</TableHead>
                                <TableHead className="text-right">Size (SOL)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockOrderBook.asks.reverse().map(ask => (
                                <TableRow key={ask.price} className="relative">
                                    <TableCell className="text-red-400">{ask.price}</TableCell>
                                    <TableCell className="text-right">{ask.size}</TableCell>
                                </TableRow>
                            ))}
                             <TableRow>
                                <TableCell colSpan={2} className="py-2 text-center font-bold text-lg">158.55</TableCell>
                            </TableRow>
                             {mockOrderBook.bids.map(bid => (
                                <TableRow key={bid.price}>
                                    <TableCell className="text-green-400">{bid.price}</TableCell>
                                    <TableCell className="text-right">{bid.size}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

             <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5"/> Recent Trades</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                         <TableHeader>
                            <TableRow>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({length: 5}).map((_, i) => (
                                 <TableRow key={i}>
                                    <TableCell className={Math.random() > 0.5 ? "text-green-400" : "text-red-400"}>{(158.5 + Math.random() * 0.2).toFixed(2)}</TableCell>
                                    <TableCell className="text-right">{(Math.random() * 5).toFixed(3)}</TableCell>
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

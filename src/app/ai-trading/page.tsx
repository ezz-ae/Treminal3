'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MarketScannerPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleScan = () => {
        setIsLoading(true);
        // Simulate AI scanning process
        setTimeout(() => {
            setIsLoading(false);
            router.push('/solana/trading');
        }, 2500);
    }

    return (
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 container mx-auto">
            <Card className="w-full max-w-2xl bg-card/60 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-headline">AI Market Scanner</CardTitle>
                    <CardDescription>Configure your parameters and command the AI to find the optimal trade for you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="trade-amount">Trade Amount (USDC)</Label>
                            <Input id="trade-amount" type="number" placeholder="e.g., 5,000" defaultValue="5000" />
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="duration">Trade Duration</Label>
                             <Select defaultValue="1h">
                                <SelectTrigger id="duration">
                                    <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5m">5 Minutes</SelectItem>
                                    <SelectItem value="1h">1 Hour</SelectItem>
                                    <SelectItem value="24h">24 Hours</SelectItem>
                                    <SelectItem value="7d">7 Days</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="risk">Risk Appetite</Label>
                         <Select defaultValue="medium">
                            <SelectTrigger id="risk">
                                <SelectValue placeholder="Select risk level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low - Arbitrage & Scalping</SelectItem>
                                <SelectItem value="medium">Medium - Trend Following</SelectItem>
                                <SelectItem value="high">High - Volatility & Breakouts</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button size="lg" className="w-full h-12 text-lg" onClick={handleScan} disabled={isLoading}>
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Scanning Market...</>
                        ) : (
                            <><Zap className="mr-2 h-5 w-5" />Scan for Opportunity</>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

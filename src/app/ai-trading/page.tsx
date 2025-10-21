
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
                    <CardDescription>Command our AI to scan the entire market and identify the single highest-probability trading opportunity available right now.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <Button size="lg" className="w-full h-12 text-lg" onClick={handleScan} disabled={isLoading}>
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Scanning Market for Optimal Trade...</>
                        ) : (
                            <><Zap className="mr-2 h-5 w-5" />Scan for Opportunity</>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

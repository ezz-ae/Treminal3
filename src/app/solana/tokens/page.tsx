'use client';

import { Gem, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const trendingTokens = [
  {
    name: 'Wif Cat',
    symbol: 'WIFC',
    price: '$0.00123',
    change: '+152.4%',
    changeType: 'up',
    volume: '$1.2M',
  },
  {
    name: 'Solama',
    symbol: 'SOLAMA',
    price: '$0.0456',
    change: '+88.1%',
    changeType: 'up',
    volume: '$890K',
  },
  {
    name: 'Bonk',
    symbol: 'BONK',
    price: '$0.000028',
    change: '-5.2%',
    changeType: 'down',
    volume: '$250M',
  },
  {
    name: 'Dogwifhat',
    symbol: 'WIF',
    price: '$2.58',
    change: '+3.1%',
    changeType: 'up',
    volume: '$400M',
  },
    {
    name: 'Jeo Boden',
    symbol: 'BODEN',
    price: '$0.15',
    change: '+25.7%',
    changeType: 'up',
    volume: '$2.3M',
  },
];

/**
 * A dashboard for exploring trending tokens on the Solana network.
 * @returns {JSX.Element} The Solana Tokens page component.
 */
export default function SolanaTokensPage() {
  return (
      <div className="container mx-auto py-12 space-y-8">
          <header>
            <h1 className="text-4xl font-bold font-headline flex items-center gap-3">
              <Gem className="w-10 h-10 text-primary" />
              Solana Token Hub
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
              Explore popular and trending tokens on the Solana network. Track prices, analyze volume, and discover new opportunities.
            </p>
          </header>
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Trending Tokens</CardTitle>
                <CardDescription>Live market data for the most talked-about tokens on Solana.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Token</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>24h Change</TableHead>
                            <TableHead>Volume</TableHead>
                            <TableHead className="text-right">Trade</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trendingTokens.map((token) => (
                            <TableRow key={token.symbol}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Image data-ai-hint="logo abstract" src={`https://picsum.photos/seed/${token.symbol}/40/40`} width={40} height={40} className="rounded-full" alt={token.name} />
                                        <div>
                                            <p className="font-bold">{token.name}</p>
                                            <p className="text-xs text-muted-foreground">{token.symbol}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                 <TableCell className="font-mono">{token.price}</TableCell>
                                <TableCell className={`flex items-center gap-1 font-semibold ${token.changeType === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                                    {token.changeType === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                    {token.change}
                                </TableCell>
                                <TableCell className="font-mono">{token.volume}</TableCell>
                                 <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href="/solana/trading" legacyBehavior>
                                            Trade <ArrowRight className="w-4 h-4 ml-2" />
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

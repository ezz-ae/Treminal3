
'use client';

import { Sprout } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const stakingOptions = [
    {
        name: 'Marinade Staked SOL',
        symbol: 'mSOL',
        apr: '8.1%',
        description: 'Liquid stake your SOL for mSOL to earn rewards while keeping your assets liquid.'
    },
    {
        name: 'Jito Staked SOL',
        symbol: 'jitoSOL',
        apr: '8.5%',
        description: 'Stake with Jito to get a liquid token and earn MEV rewards on top of staking yield.'
    },
    {
        name: 'Lido Staked SOL',
        symbol: 'stSOL',
        apr: '7.9%',
        description: 'A popular liquid staking solution that allows you to use your staked assets in DeFi.'
    },
    {
        name: 'Direct Validator Staking',
        symbol: 'SOL',
        apr: '7.2%',
        description: 'Delegate your SOL directly to a network validator to help secure the network.'
    }
];

/**
 * A dashboard for staking Solana assets.
 * @returns {JSX.Element} The Solana Staking page component.
 */
export default function SolanaStakingPage() {
    const { toast } = useToast();
    const [stakeAmounts, setStakeAmounts] = useState<Record<string, string>>({});

    const handleAmountChange = (symbol: string, amount: string) => {
        setStakeAmounts(prev => ({ ...prev, [symbol]: amount }));
    }

    const handleStake = (tokenSymbol: string) => {
        const amount = stakeAmounts[tokenSymbol];
        if (!amount || parseFloat(amount) <= 0) {
            toast({
                variant: 'destructive',
                title: 'Invalid Amount',
                description: `Please enter a valid amount of ${tokenSymbol} to stake.`,
            });
            return;
        }
        toast({
            title: 'Staking Simulated!',
            description: `You have successfully staked ${amount} ${tokenSymbol}.`,
        });
        handleAmountChange(tokenSymbol, '');
    }

  return (
    <div className="container mx-auto py-12 space-y-8">
      <header>
        <h1 className="text-4xl font-bold font-headline flex items-center gap-3">
          <Sprout className="w-10 h-10 text-primary" />
          Solana Staking
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Stake your SOL with trusted validators and liquid staking providers to earn yield.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {stakingOptions.map((option) => (
            <Card key={option.name} className="flex flex-col bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-2xl font-bold">{option.name}</CardTitle>
                            <CardDescription>{option.description}</CardDescription>
                        </div>
                         <div className="text-right">
                             <p className="text-2xl font-semibold text-primary">{option.apr}</p>
                             <p className="text-sm text-muted-foreground">Est. APY</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow flex flex-col justify-end">
                    <div className="space-y-2">
                        <Input
                            type="number"
                            placeholder={`Amount of SOL to Stake`}
                            value={stakeAmounts[option.symbol] || ''}
                            onChange={(e) => handleAmountChange(option.symbol, e.target.value)}
                        />
                         <Button className="w-full" onClick={() => handleStake(option.symbol)}>
                            Stake {option.symbol}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}

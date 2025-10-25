
'use client';

import { Sprout, Wallet, Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { useWallet } from '@/hooks/use-wallet';

const stakingOptions = [
    {
        name: 'Terminal3 Token',
        symbol: 'T3',
        apr: '12.0%',
        description: 'Stake our native token to get a share of protocol revenue and other benefits.'
    },
    {
        name: 'Ethereum',
        symbol: 'ETH',
        apr: '4.5%',
        description: 'Stake ETH to help secure the network and earn rewards through liquid staking providers.'
    },
    {
        name: 'Solana',
        symbol: 'SOL',
        apr: '7.2%',
        description: 'Delegate your SOL to validators to secure the network and earn a share of the rewards.'
    }
];

/**
 * A dashboard for staking various crypto assets.
 * Allows users to view staking options, input amounts, and simulate staking actions.
 * @returns {JSX.Element} The Staking page component.
 */
export default function StakePage() {
    const { toast } = useToast();
    const { wallet } = useWallet();
    const [stakeAmounts, setStakeAmounts] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

    const handleAmountChange = (symbol: string, amount: string) => {
        setStakeAmounts(prev => ({ ...prev, [symbol]: amount }));
    }

    const handleStake = (tokenSymbol: string) => {
        if (!wallet) {
            toast({
                variant: 'destructive',
                title: 'Wallet Not Connected',
                description: 'Please connect your wallet to stake tokens.',
            });
            return;
        }

        const amount = stakeAmounts[tokenSymbol];
        if (!amount || parseFloat(amount) <= 0) {
            toast({
                variant: 'destructive',
                title: 'Invalid Amount',
                description: `Please enter a valid amount of ${tokenSymbol} to stake.`,
            });
            return;
        }

        setIsLoading(prev => ({ ...prev, [tokenSymbol]: true }));

        // Simulate transaction
        setTimeout(() => {
            setIsLoading(prev => ({ ...prev, [tokenSymbol]: false }));
            toast({
                title: 'Staking Successful!',
                description: `You have successfully staked ${amount} ${tokenSymbol}.`,
            });
            handleAmountChange(tokenSymbol, ''); // Clear input after staking
        }, 2000);
    }

  return (
    <div className="container mx-auto py-12 space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-headline tracking-tight">Staking</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Stake your assets to earn rewards and help secure the future of decentralization.
        </p>
      </div>

       <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Wallet/>Your Staking Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
            <div>
                <p className="text-sm text-muted-foreground">Total Value Staked</p>
                <p className="text-3xl font-bold">{wallet ? '$3,120.89' : '$0.00'}</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Average APY</p>
                <p className="text-3xl font-bold">{wallet ? '5.8%' : '0.0%'}</p>
            </div>
             <div>
                <p className="text-sm text-muted-foreground">Lifetime Rewards</p>
                <p className="text-3xl font-bold">{wallet ? '$182.45' : '$0.00'}</p>
            </div>
        </CardContent>
      </Card>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stakingOptions.map((option) => (
            <Card key={option.name} className="flex flex-col">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-2xl font-bold">{option.name}</CardTitle>
                            <CardDescription>{option.description}</CardDescription>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit">
                            <Sprout className="w-6 h-6 shrink-0"/>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow flex flex-col justify-end">
                     <div>
                        <p className="text-sm text-muted-foreground">Estimated APY</p>
                        <p className="text-2xl font-semibold text-primary">{option.apr}</p>
                    </div>
                    <div className="space-y-2">
                        <Input
                            type="number"
                            placeholder={`Amount of ${option.symbol} to Stake`}
                            value={stakeAmounts[option.symbol] || ''}
                            onChange={(e) => handleAmountChange(option.symbol, e.target.value)}
                            disabled={isLoading[option.symbol]}
                        />
                         <Button 
                            className="w-full" 
                            onClick={() => handleStake(option.symbol)} 
                            disabled={isLoading[option.symbol]}>
                            {isLoading[option.symbol] ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {isLoading[option.symbol] ? 'Staking...' : `Stake ${option.symbol}`}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}

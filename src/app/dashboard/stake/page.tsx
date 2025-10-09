
'use client';

import { Sprout, Wallet } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const stakingOptions = [
    {
        name: 'Ethereum',
        symbol: 'ETH',
        apr: '4.5%',
        description: 'Stake your ETH to help secure the network and earn rewards.'
    },
    {
        name: 'Solana',
        symbol: 'SOL',
        apr: '7.2%',
        description: 'Delegate your SOL to validators to earn rewards and participate in governance.'
    },
    {
        name: 'Polygon',
        symbol: 'MATIC',
        apr: '5.8%',
        description: 'Stake MATIC to participate in network security and earn rewards.'
    },
    {
        name: 'Terminal3 Token',
        symbol: 'T3',
        apr: '12.0%',
        description: 'Stake our native token to get a share of protocol revenue and other benefits.'
    }
]

export default function StakePage() {
    const { toast } = useToast();
    const [stakeAmount, setStakeAmount] = useState('');

    const handleStake = (tokenName: string) => {
        if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
            toast({
                variant: 'destructive',
                title: 'Invalid Amount',
                description: 'Please enter a valid amount to stake.',
            });
            return;
        }
        toast({
            title: 'Staking Successful!',
            description: `You have successfully staked ${stakeAmount} ${tokenName}.`,
        });
        setStakeAmount('');
    }

  return (
    <div className="space-y-8">
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
                <p className="text-3xl font-bold">$3,120.89</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Average APY</p>
                <p className="text-3xl font-bold">5.8%</p>
            </div>
             <div>
                <p className="text-sm text-muted-foreground">Lifetime Rewards</p>
                <p className="text-3xl font-bold">$182.45</p>
            </div>
        </CardContent>
      </Card>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {stakingOptions.map((option) => (
            <Card key={option.name} className="flex flex-col">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-2xl font-bold">{option.name}</CardTitle>
                            <CardDescription>{option.description}</CardDescription>
                        </div>
                        <Sprout className="w-8 h-8 text-primary shrink-0"/>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                     <div>
                        <p className="text-sm text-muted-foreground">Estimated APY</p>
                        <p className="text-2xl font-semibold text-primary">{option.apr}</p>
                    </div>
                    <div className="space-y-2">
                        <Input 
                            type="number"
                            placeholder="Amount to Stake"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
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

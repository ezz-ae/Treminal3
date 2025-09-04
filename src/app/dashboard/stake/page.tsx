
'use client';

import { Sprout } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const stakingOptions = [
    {
        name: 'Ethereum',
        apr: '4.5%',
        description: 'Stake your ETH to help secure the network and earn rewards.'
    },
    {
        name: 'Solana',
        apr: '7.2%',
        description: 'Delegate your SOL to validators to earn rewards and participate in governance.'
    },
    {
        name: 'Polygon',
        apr: '5.8%',
        description: 'Stake MATIC to participate in network security and earn rewards.'
    },
    {
        name: 'Terminal3 Token (T3)',
        apr: '12.0%',
        description: 'Stake our native token to get a share of protocol revenue and other benefits.'
    }
]

export default function StakePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Staking</h1>
        <p className="text-muted-foreground">
          Stake your assets to earn rewards and participate in network governance.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stakingOptions.map((option) => (
            <Card key={option.name}>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold">{option.name}</CardTitle>
                        <Sprout className="w-6 h-6 text-primary"/>
                    </div>
                     <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Estimated APY</p>
                        <p className="text-xl font-semibold text-primary">{option.apr}</p>
                    </div>
                    <Button className="w-full" disabled>
                        Coming Soon
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}

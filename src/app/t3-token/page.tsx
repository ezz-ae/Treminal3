'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator';
import { Globe, TrendingUp, Zap, Wind, Flame, Gift } from 'lucide-react';

export default function T3TokenPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight font-headline mb-4">The T3 Token</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          The native utility token that powers the Terminal3 ecosystem. Get access to exclusive features, pay for services, and participate in governance.
        </p>
      </header>

      <main className="space-y-12">
        <Card className="bg-gradient-to-br from-purple-900/10 to-blue-900/10 border-purple-500/20">
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><Globe className="w-6 h-6 text-primary" /> Tokenomics</CardTitle>
              <CardDescription>The fundamental design and economic model of the T3 token.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-4 bg-card/50 rounded-lg">
                    <p className="text-4xl font-bold">1B</p>
                    <p className="text-muted-foreground">Total Supply</p>
                </div>
                <div className="p-4 bg-card/50 rounded-lg">
                    <p className="text-4xl font-bold">SPL</p>
                    <p className="text-muted-foreground">Token Standard</p>
                </div>
                <div className="p-4 bg-card/50 rounded-lg">
                    <p className="text-4xl font-bold">9</p>
                    <p className="text-muted-foreground">Decimals</p>
                </div>
            </div>
            <Separator className="my-8"/>
             <h3 className="text-lg font-semibold mb-4 text-center">Distribution</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Community & Airdrops</span>
                    <span className="font-bold">40%</span>
                </div>
                 <div className="w-full bg-card/50 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Ecosystem Fund</span>
                    <span className="font-bold">30%</span>
                </div>
                 <div className="w-full bg-card/50 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Team & Advisors</span>
                    <span className="font-bold">20%</span>
                </div>
                 <div className="w-full bg-card/50 rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Liquidity & Staking</span>
                    <span className="font-bold">10%</span>
                </div>
                 <div className="w-full bg-card/50 rounded-full h-2.5">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="utility" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="utility"><Zap className="w-4 h-4 mr-2"/>Utility</TabsTrigger>
            <TabsTrigger value="airdrop"><Gift className="w-4 h-4 mr-2"/>Airdrop</TabsTrigger>
            <TabsTrigger value="burn"><Flame className="w-4 h-4 mr-2"/>Burn</TabsTrigger>
          </TabsList>
          <TabsContent value="utility" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>T3 Token Utility</CardTitle>
                    <CardDescription>The T3 token is deeply integrated into the Terminal3 platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-2 rounded-full">
                            <Zap className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Service Payments</h4>
                            <p className="text-muted-foreground text-sm">Use T3 to pay for all services on the platform, including smart contract audits, token launches, and bot deployments.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-2 rounded-full">
                            <Wind className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Premium Features</h4>
                            <p className="text-muted-foreground text-sm">Stake or hold T3 to unlock exclusive features, higher API rate limits, and priority access to new tools.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-2 rounded-full">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Governance</h4>
                            <p className="text-muted-foreground text-sm">Participate in the governance of the Terminal3 ecosystem by voting on proposals with your T3 tokens.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="airdrop" className="mt-6">
             <Card>
                <CardHeader>
                    <CardTitle>Community Airdrop</CardTitle>
                    <CardDescription>We're distributing 40% of the total supply to the community.</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p>The airdrop is coming soon! Follow us on Twitter and join our Discord to stay updated on the latest news and announcements.</p>
                    <div className="flex justify-center gap-4">
                        <Button variant="outline">Follow on Twitter</Button>
                        <Button variant="outline">Join Discord</Button>
                    </div>
                </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="burn" className="mt-6">
             <Card>
                <CardHeader>
                    <CardTitle>Token Burn</CardTitle>
                    <CardDescription>A portion of the fees generated from platform services will be used to buy back and burn T3 tokens, reducing the total supply.</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-2xl font-bold">0 T3</p>
                    <p className="text-muted-foreground">Total Tokens Burned</p>
                    <Button disabled>Burn Tokens (Coming Soon)</Button>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </main>
    </div>
  );
}

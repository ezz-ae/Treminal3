
'use client';

import { Leaf, Zap, BarChart3, Atom } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const carbonData = [
  { name: 'Terminal3 (PoS)', co2: 0.05 },
  { name: 'Traditional Cloud', co2: 2.5 },
  { name: 'BTC (PoW)', co2: 900 },
];

export default function CarbonPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-12 text-center">
        <Leaf className="w-12 h-12 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline">Carbon & Efficiency Analysis</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          Building a sustainable and efficient future for Web3. An analysis of our commitment to environmental responsibility.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto mb-16">
        <div className="bg-card/50 p-6 rounded-lg border">
            <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold font-headline">Efficient by Design</h3>
            <p className="text-muted-foreground mt-2 text-sm">
                We exclusively build on and support Proof-of-Stake (PoS) networks, which are over 99.9% more energy-efficient than Proof-of-Work (PoW) chains.
            </p>
        </div>
        <div className="bg-card/50 p-6 rounded-lg border">
            <BarChart3 className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold font-headline">Optimized AI</h3>
            <p className="text-muted-foreground mt-2 text-sm">
                Our partnership with Google allows us to leverage their hyper-efficient AI models, minimizing the computational cost of every generation and analysis.
            </p>
        </div>
        <div className="bg-card/50 p-6 rounded-lg border">
            <Atom className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold font-headline">Lean Infrastructure</h3>
            <p className="text-muted-foreground mt-2 text-sm">
                By generating code and plans on-demand, we avoid the need for massive, always-on servers, reducing our overall energy footprint.
            </p>
        </div>
      </div>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
            <CardTitle>Energy Consumption Comparison</CardTitle>
            <CardDescription>Estimated CO₂ emissions per transaction (in kg)</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={{ co2: { label: 'CO₂ (kg)', color: 'hsl(var(--primary))' } }} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={carbonData} layout="vertical" margin={{ left: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Bar dataKey="co2" layout="vertical" radius={5} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
             <p className="text-xs text-muted-foreground mt-4 text-center">
                * Data is illustrative and based on public estimates for PoW, PoS, and traditional data centers.
            </p>
        </CardContent>
      </Card>

    </div>
  );
}

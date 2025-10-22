
'use client';

import { BarChart as BarChartIcon, Wallet, Activity, CreditCard, Bot } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { BarChart, Bar, Pie, Cell, PieChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const initialChartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
};

const initialPieData = [
    { name: 'Swaps', value: 400, color: 'hsl(var(--chart-1))' },
    { name: 'Mints', value: 300, color: 'hsl(var(--chart-2))' },
    { 'name': 'Transfers', value: 200, color: 'hsl(var(--chart-3))' },
    { name: 'Votes', value: 100, color: 'hsl(var(--chart-4))' },
]

const pieChartConfig = {
  swaps: {
    label: "Swaps",
    color: "hsl(var(--chart-1))",
  },
  mints: {
    label: "Mints",
    color: "hsl(var(--chart-2))",
  },
  transfers: {
    label: "Transfers",
    color: "hsl(var(--chart-3))",
  },
  votes: {
    label: "Votes",
    color: "hsl(var(--chart-4))",
  }
}

const initialStats = {
    transactions: 1234567,
    wallets: 5231,
    gas: 12234.56,
    contracts: 789,
};

const marketSentiments = [
    "The market is showing healthy signs of growth, with a notable 5.2% increase in transaction volume over the last 24 hours.",
    "A slight cooling period is observed; wallet growth has stabilized, but DeFi protocol engagement remains strong.",
    "Volatility is increasing in the NFT sector. Recommend monitoring floor prices on major collections.",
    "Gas prices are trending down, presenting a good opportunity for large-scale contract deployments or airdrops.",
    "Significant capital rotation detected from L1s into L2 solutions. Arbitrum and Optimism are seeing major inflows."
]

export default function AnalyticsPage() {
  const [stats, setStats] = useState(initialStats);
  const [barData, setBarData] = useState(initialChartData);
  const [sentimentIndex, setSentimentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStats(prevStats => ({
            transactions: prevStats.transactions + Math.floor(Math.random() * 100),
            wallets: prevStats.wallets + Math.floor(Math.random() * 10),
            gas: prevStats.gas + (Math.random() * 100 - 50),
            contracts: prevStats.contracts + Math.floor(Math.random() * 5),
        }));

        setBarData(prevData => prevData.map(d => ({
            ...d,
            desktop: Math.max(50, d.desktop + Math.floor(Math.random() * 20 - 10)),
            mobile: Math.max(30, d.mobile + Math.floor(Math.random() * 20 - 10)),
        })));

        setSentimentIndex(prevIndex => (prevIndex + 1) % marketSentiments.length);

    }, 3000);

    return () => clearInterval(interval);
  }, [])


  return (
    <div className="container mx-auto py-12 space-y-8">
       <div>
        <h1 className="text-4xl font-bold font-headline">On-chain Analytics</h1>
        <p className="text-muted-foreground text-lg mt-2">
          An elegant, AI-driven overview of the entire Web3 market landscape.
        </p>
      </div>

        <Card className="bg-card/50">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-3"><Bot className="w-6 h-6 text-primary"/> AI Market Analysis</CardTitle>
                    <div className="text-xs text-muted-foreground">Updating in real-time...</div>
                </div>
            </CardHeader>
            <CardContent>
                <motion.p 
                    key={sentimentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg text-foreground/90 italic"
                >
                    "{marketSentiments[sentimentIndex]}"
                </motion.p>
            </CardContent>
        </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Transactions Over Time</CardTitle>
             <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart accessibilityLayer data={barData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                 <YAxis
                    tickLine={false}
                    axisLine={false}
                    stroke="#888888"
                    fontSize={12}
                    tickFormatter={(value) => `$${value}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle>Transaction Volume by Type</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex pb-0 items-center justify-center">
             <ChartContainer config={pieChartConfig} className="mx-auto aspect-square h-full max-h-[250px]">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie data={initialPieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} strokeWidth={5}>
                     {initialPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                  </Pie>
                  <ChartLegend
                    content={<ChartLegendContent nameKey="name" />}
                    className="text-xs"
                  />
                </PieChart>
              </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

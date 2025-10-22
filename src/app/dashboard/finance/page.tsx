
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

const generateInitialBarData = () => [
  { month: 'January', desktop: Math.floor(Math.random() * 200) + 50, mobile: Math.floor(Math.random() * 100) + 30 },
  { month: 'February', desktop: Math.floor(Math.random() * 200) + 50, mobile: Math.floor(Math.random() * 100) + 30 },
  { month: 'March', desktop: Math.floor(Math.random() * 200) + 50, mobile: Math.floor(Math.random() * 100) + 30 },
  { month: 'April', desktop: Math.floor(Math.random() * 200) + 50, mobile: Math.floor(Math.random() * 100) + 30 },
  { month: 'May', desktop: Math.floor(Math.random() * 200) + 50, mobile: Math.floor(Math.random() * 100) + 30 },
  { month: 'June', desktop: Math.floor(Math.random() * 200) + 50, mobile: Math.floor(Math.random() * 100) + 30 },
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

const marketSentiment = "The market is showing healthy signs of growth, with a notable 5.2% increase in transaction volume over the last 24 hours.";

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    transactions: 0,
    wallets: 0,
    gas: 0,
    contracts: 0,
  });
  const [barData, setBarData] = useState(generateInitialBarData());

  useEffect(() => {
    // Initial dynamic data
    setStats({
        transactions: 1234567,
        wallets: 5231,
        gas: 12234.56,
        contracts: 789,
    });

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

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Transactions" value={stats.transactions.toLocaleString()} icon={Activity}/>
        <StatCard title="Active Wallets" value={stats.wallets.toLocaleString()} icon={Wallet}/>
        <StatCard title="Total Gas Paid (ETH)" value={stats.gas.toFixed(2)} icon={CreditCard}/>
        <StatCard title="New Contracts" value={stats.contracts.toLocaleString()} icon={BarChartIcon}/>
      </div>

        <Card className="bg-card/50">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-3"><Bot className="w-6 h-6 text-primary"/> AI Market Analysis</CardTitle>
                    <div className="text-xs text-muted-foreground">Updated moments ago</div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-lg text-foreground/90 italic">
                    "{marketSentiment}"
                </p>
            </CardContent>
        </Card>

      <Card>
        <CardHeader>
            <CardTitle>Market Overview</CardTitle>
            <CardDescription>A summary of transaction types and volumes over the past 6 months.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-2">
          <div className="pl-2">
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
          </div>
          <div className="flex-1 flex pb-0 items-center justify-center">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


const StatCard = ({ title, value, icon: Icon }: { title: string, value: string, icon: React.ElementType }) => (
    <Card className="bg-card/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
)

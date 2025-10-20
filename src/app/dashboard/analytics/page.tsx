
'use client';

import { BarChart as BarChartIcon, Wallet, Activity, CreditCard } from 'lucide-react';
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
import { BarChart, Bar, Pie, Cell, PieChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from 'react';

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

export default function AnalyticsPage() {
  const [stats, setStats] = useState(initialStats);
  const [barData, setBarData] = useState(initialChartData);

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
        })))

    }, 3000);

    return () => clearInterval(interval);
  }, [])


  return (
    <div className="container mx-auto py-12 space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">On-chain Analytics</h1>
        <p className="text-muted-foreground">
          Get deep insights into on-chain data with our powerful analytics engine.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.transactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Wallets</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.wallets.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gas Fees (USD)</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.gas.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">-5.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contracts Deployed</CardTitle>
                <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+{stats.contracts.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+3.2% from last month</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Transactions Over Time</CardTitle>
             <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <BarChart accessibilityLayer data={barData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                 <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>Transaction Volume by Type</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex pb-0">
             <ChartContainer config={pieChartConfig} className="mx-auto aspect-square max-h-[300px]">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie data={initialPieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>
                     {initialPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                  </Pie>
                  <ChartLegend
                    content={<ChartLegendContent nameKey="name" />}
                    className="-mt-4"
                  />
                </PieChart>
              </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

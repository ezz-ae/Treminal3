'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import * as recommendations from '@/ai/flows/business-tool-recommendation';
import {
  AppWindow,
  Bot,
  Puzzle,
  Wallet,
  FileJson,
  Network,
  BotMessageSquare,
  AreaChart,
  FileArchive,
  ShieldCheck,
  Vote,
  Icon,
} from 'lucide-react';

const FormSchema = z.object({
  business_description: z.string().min(10, {
    message: 'Business description must be at least 10 characters.',
  }),
});

const iconMap: Record<string, React.ElementType> = {
    AppWindow,
    Bot,
    Puzzle,
    Wallet,
    FileJson,
    Network,
    BotMessageSquare,
    AreaChart,
    FileArchive,
    ShieldCheck,
    Vote,
};

const toolUrlMap: Record<string, string> = {
    'dApp Builder': '/dashboard/dapp-builder',
    'Token Launcher': '/dashboard/token-launcher',
    'Trading Bot Platform': '/dashboard/trading-bots',
    'AI Agents': '/dashboard/ai-agents',
    'Custom Wallets': '/dashboard/wallets',
    'Smart Contract Templates': '/dashboard/smart-contracts',
    'Manual Transactions': '/dashboard/transactions',
    'On-chain Analytics': '/dashboard/analytics',
    'Decentralized Storage': '/dashboard/storage',
    'Security Audits': '/dashboard/audits',
    'DAO Governance': '/dashboard/governance',
  };

export default function AiAgentsPage() {
  const [recommendationsResult, setRecommendationsResult] = useState<recommendations.BusinessToolRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      business_description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setRecommendationsResult(null);
    try {
      const result = await recommendations.recommendBusinessTools(data);
      setRecommendationsResult(result);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      // You could show an error toast here
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI Business Agent</h1>
        <p className="text-muted-foreground">
          Describe your business, and our AI agent will recommend the best tools to help you grow.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business Description</CardTitle>
          <CardDescription>
            Tell us about your business goals, target audience, and what you want to build.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="business_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Business Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I want to build a decentralized marketplace for digital art (NFTs) that supports multiple cryptocurrencies...'"
                        className="resize-min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Get Recommendations
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {recommendationsResult && (
        <div>
          <h2 className="text-2xl font-bold font-headline mb-4">Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendationsResult.recommendations.map((tool) => {
                const LucideIcon = iconMap[tool.icon] || Puzzle;
                const toolUrl = toolUrlMap[tool.name] || '/dashboard';
                return (
                    <Link href={toolUrl} key={tool.name} className="block hover:scale-105 transition-transform duration-200">
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <LucideIcon className="w-8 h-8 text-primary" />
                                    <CardTitle>{tool.name}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{tool.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                )
            })}
          </div>
        </div>
      )}
    </div>
  );
}

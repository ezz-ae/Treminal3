
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Bot, AppWindow, Puzzle, Wallet, FileJson, Network, BotMessageSquare, AreaChart, FileArchive, ShieldCheck, Vote } from 'lucide-react';
import * as React from 'react';
import { motion } from 'framer-motion';
import { recommendBusinessTools } from '@/app/actions';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import type { BusinessToolRecommendationOutput } from '@/ai/schemas/business-tool-recommendation';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const industries = ['DeFi', 'Gaming', 'NFTs / Art', 'Social', 'Infrastructure', 'Other'];
const stages = ['Idea / Concept', 'Prototype / MVP', 'Growth Stage', 'Mature Product'];
const goals = [
    { id: 'Launch a Token', label: 'Launch a Token' },
    { id: 'Build a Community', label: 'Build a Community' },
    { id: 'Generate Revenue', label: 'Generate Revenue' },
    { id: 'Increase Security', label: 'Increase Security' },
    { id: 'Improve User Experience', label: 'Improve User Experience' },
    { id: 'Analyze Data', label: 'Analyze Data' },
];

const FormSchema = z.object({
  industry: z.string({ required_error: "Please select an industry." }),
  stage: z.string({ required_error: "Please select your business stage." }),
  goals: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one goal.",
  }),
  description: z.string().min(20, 'Please describe your business in at least 20 characters.'),
});

const iconMap: Record<string, React.ElementType> = {
    AppWindow, Bot, Puzzle, Wallet, FileJson, Network, BotMessageSquare, AreaChart, FileArchive, ShieldCheck, Vote
};

export default function BusinessToolRecommendationPage() {
    const [result, setResult] = useState<BusinessToolRecommendationOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            goals: [],
            description: "",
        },
    });
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setResult(null);
        try {
            const recommendations = await recommendBusinessTools(data);
            setResult(recommendations);
        } catch (error) {
            console.error("Failed to get recommendations", error);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div>
            <h1 className="text-4xl font-bold font-headline">AI Business Tool Recommendation</h1>
            <p className="text-muted-foreground text-lg mt-2">
                Describe your business or project, and our AI will recommend the best Web3 tools from our platform to help you succeed.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Describe Your Business</CardTitle>
                <CardDescription>Fill out your project profile for our AI to analyze.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="industry"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Industry</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an industry" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        {industries.map(industry => (
                                            <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stage"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Business Stage</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a stage" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        {stages.map(stage => (
                                            <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                         <FormField
                            control={form.control}
                            name="goals"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Primary Goals</FormLabel>
                                        <p className="text-sm text-muted-foreground">Select up to 3 main objectives.</p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {goals.map((item) => (
                                        <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="goals"
                                        render={({ field }) => {
                                            return (
                                            <FormItem
                                                key={item.id}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(item.id)}
                                                    onCheckedChange={(checked) => {
                                                    return checked
                                                        ? field.onChange([...field.value, item.id])
                                                        : field.onChange(
                                                            field.value?.filter(
                                                            (value) => value !== item.id
                                                            )
                                                        )
                                                    }}
                                                    disabled={isLoading}
                                                />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                {item.label}
                                                </FormLabel>
                                            </FormItem>
                                            )
                                        }}
                                        />
                                    ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                     <FormLabel>Brief Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="e.g., 'A decentralized social media platform for artists to share and monetize their work through NFTs.'"
                                            className="min-h-[100px] text-base"
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                            {isLoading ? <Loader2 className="animate-spin" /> : <><Bot className="mr-2"/>Get Recommendations</>}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

        {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary text-2xl">Recommended Tools for You</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {result.recommendations.map((rec, i) => {
                            const Icon = iconMap[rec.icon] || Puzzle;
                            return (
                                <Card key={i} className="bg-card/50">
                                    <CardHeader>
                                        <div className="flex items-center gap-4">
                                            <Icon className="w-8 h-8 text-primary"/>
                                            <div>
                                                <CardTitle className="text-xl font-bold">{rec.name}</CardTitle>
                                                <CardDescription className="mt-1">{rec.description}</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <h4 className="font-semibold mb-2 text-foreground">Recommended Flow:</h4>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {rec.flow.map((step, j) => (
                                                <li key={j}>{step}</li>
                                            ))}
                                        </ol>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </CardContent>
                </Card>
            </motion.div>
        )}
   </div>
  );
}

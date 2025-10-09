
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, AppWindow, FileJson, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateDapp } from '@/app/actions';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import type { DappBuilderOutput } from '@/ai/schemas/dapp-builder';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const features = [
    { id: 'NFT Minting', label: 'NFT Minting' },
    { id: 'Token Gating', label: 'Token Gating' },
    { id: 'Marketplace', label: 'Marketplace' },
    { id: 'Staking', label: 'Staking' },
    { id: 'Voting', label: 'Voting / Governance' },
] as const;

const industries = ['Art & Collectibles', 'Gaming', 'DeFi', 'Social', 'Real Estate', 'Music', 'Other'];

const FormSchema = z.object({
  name: z.string().min(3, { message: 'Please enter a name with at least 3 characters.'}),
  coreIdea: z.string().min(20, {
    message: 'Please provide a more detailed description of your dApp (at least 20 characters).',
  }),
  features: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one feature.",
  }),
  industry: z.string({
    required_error: "Please select an industry.",
  }),
});

export default function DappBuilderPage() {
    const [result, setResult] = useState<DappBuilderOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            coreIdea: "",
            features: [],
            industry: undefined,
        },
    });
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setResult(null);
        try {
            const dappPlan = await generateDapp(data);
            setResult(dappPlan);
        } catch (error) {
            console.error("Failed to generate dApp plan", error);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div>
            <h1 className="text-4xl font-bold font-headline">dApp Architect</h1>
            <p className="text-muted-foreground text-lg mt-2">
                Describe the decentralized application you want to build, and let our AI architect generate a complete plan for you.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Design Your dApp</CardTitle>
                <CardDescription>Fill out the fields below to generate your architectural plan.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>dApp Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., 'Artify Marketplace'" {...field} disabled={isLoading}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="coreIdea"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Core Idea</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="e.g., 'A platform for digital artists to mint and sell their artwork as NFTs. It should include user profiles and a 5% platform fee on all sales.'"
                                            className="min-h-[120px] text-base"
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="features"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Key Features</FormLabel>
                                        <p className="text-sm text-muted-foreground">Select the features you want to include in your dApp.</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                    {features.map((item) => (
                                        <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="features"
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
                            name="industry"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Target Industry</FormLabel>
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
                        <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                            {isLoading ? <Loader2 className="animate-spin" /> : <><Bot className="mr-2"/>Generate Plan</>}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

        {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="my-2">
                    <CardHeader>
                        <CardTitle className="text-primary text-2xl">{result.name}</CardTitle>
                        <p className="text-muted-foreground text-base italic">{result.description}</p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <AppWindow className="w-6 h-6 text-primary"/>
                                    <h4 className="font-bold text-xl">UI Components</h4>
                                </div>
                                <ul className="space-y-2 list-disc list-inside text-muted-foreground text-base">
                                    {result.components.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <FileJson className="w-6 h-6 text-primary"/>
                                    <h4 className="font-bold text-xl">Smart Contracts</h4>
                                </div>
                                <ul className="space-y-2 list-disc list-inside text-muted-foreground text-base">
                                    {result.contracts.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        )}
   </div>
  );
}

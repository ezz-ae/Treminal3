
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, AppWindow, FileJson } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateDapp } from '@/app/actions';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import type { DappBuilderOutput } from '@/ai/schemas/dapp-builder';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FormSchema = z.object({
  description: z.string().min(20, {
    message: 'Please provide a more detailed description of your dApp (at least 20 characters).',
  }),
});

export default function DappBuilderPage() {
    const [result, setResult] = useState<DappBuilderOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            description: "",
        },
    });
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setResult(null);
        try {
            const dappPlan = await generateDapp({ description: data.description });
            setResult(dappPlan);
        } catch (error) {
            console.error("Failed to generate dApp plan", error);
            // Optionally set an error state to show in the UI
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div>
            <h1 className="text-4xl font-bold font-headline">dApp Builder</h1>
            <p className="text-muted-foreground text-lg mt-2">
                Describe the decentralized application you want to build, and let our AI architect generate a complete plan for you.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Describe Your dApp</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="e.g., 'An NFT marketplace for digital artists that allows minting, listing, and selling of artwork. It should have user profiles and a 5% platform fee on sales.'"
                                            className="min-h-[120px] text-base"
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} size="lg">
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Generate Plan'}
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


'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Puzzle } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateToken } from '@/app/actions';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import type { TokenLauncherOutput } from '@/ai/schemas/token-launcher';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomCodeBlock } from '@/components/ui/code-block';

const FormSchema = z.object({
  description: z.string().min(20, {
    message: 'Please provide a more detailed description (at least 20 characters).',
  }),
});

export default function TokenLauncherPage() {
    const [result, setResult] = useState<TokenLauncherOutput | null>(null);
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
            const tokenResult = await generateToken({ description: data.description });
            setResult(tokenResult);
        } catch (error) {
            console.error("Failed to generate token", error);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div>
            <h1 className="text-4xl font-bold font-headline">Token Launcher</h1>
            <p className="text-muted-foreground text-lg mt-2">
                Describe the ERC-20 token you want to create, and our AI will generate a secure, deployable Solidity smart contract.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Describe Your Token</CardTitle>
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
                                            placeholder="e.g., 'A governance token for a new DeFi protocol. Call it 'Galaxy Dust' with symbol 'GLX' and a total supply of 100 million.'"
                                            className="min-h-[120px] text-base"
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} size="lg">
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Generate Contract'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

        {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                 <Card>
                    <CardHeader>
                         <CardTitle className="text-primary text-2xl">{result.name} ({result.symbol})</CardTitle>
                        <p className="text-muted-foreground text-sm">Total Supply: {result.supply.toLocaleString()}</p>
                    </CardHeader>
                    <CardContent>
                        <CustomCodeBlock code={result.solidityCode} />
                    </CardContent>
                </Card>
            </motion.div>
        )}
   </div>
  );
}


'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Bot, CirclePlus, Flame, FileJson } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateToken } from '@/app/actions';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import type { TokenLauncherOutput } from '@/ai/schemas/token-launcher';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CustomCodeBlock } from '@/components/ui/code-block';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const FormSchema = z.object({
  name: z.string().min(3, 'Token name must be at least 3 characters.'),
  symbol: z.string().min(2, 'Symbol must be at least 2 characters.').max(5, 'Symbol cannot be more than 5 characters.'),
  supply: z.coerce.number().min(1, 'Supply must be at least 1.'),
  isMintable: z.boolean().default(false),
  isBurnable: z.boolean().default(false),
});

export default function TokenLauncherPage() {
    const [result, setResult] = useState<TokenLauncherOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            symbol: "",
            supply: 1000000,
            isBurnable: true,
            isMintable: false,
        },
    });
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setResult(null);
        try {
            const tokenResult = await generateToken(data);
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
                Define your ERC-20 token's properties, and our AI will generate a secure, deployable Solidity smart contract.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Define Your Token</CardTitle>
                <CardDescription>Fill out the fields below to create your token contract.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Token Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., 'Galaxy Dust'" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="symbol"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Token Symbol</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., 'GLX'" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="supply"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Initial Supply</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g., 1000000" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-4">
                            <FormLabel>Token Features</FormLabel>
                            <FormField
                                control={form.control}
                                name="isBurnable"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base flex items-center gap-2"><Flame/>Burnable</FormLabel>
                                            <p className="text-sm text-muted-foreground">Allows token holders to destroy (burn) their tokens.</p>
                                        </div>
                                        <FormControl>
                                            <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled={isLoading}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isMintable"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base flex items-center gap-2"><CirclePlus/>Mintable</FormLabel>
                                            <p className="text-sm text-muted-foreground">Allows the contract owner to create new tokens.</p>
                                        </div>
                                        <FormControl>
                                            <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled={isLoading}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                            {isLoading ? <Loader2 className="animate-spin" /> : <><Bot className="mr-2"/>Generate Contract</>}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

        {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                 <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <FileJson className="w-8 h-8 text-primary"/>
                            <div>
                                <CardTitle className="text-primary text-2xl">{result.name} ({result.symbol})</CardTitle>
                                <p className="text-muted-foreground text-sm">Total Supply: {result.supply.toLocaleString()}</p>
                            </div>
                        </div>
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

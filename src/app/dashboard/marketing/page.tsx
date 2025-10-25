
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Send } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  tokenAddress: z.string().min(42, 'Please enter a valid token address.'),
  recipients: z.string().min(10, 'Please enter at least one recipient address.'),
  amount: z.coerce.number().min(1, 'Please enter a valid amount.'),
});

export default function MarketingPage() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            tokenAddress: "",
            recipients: "",
            amount: 100,
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        console.log(data); // In a real app, you would process the airdrop here
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
        setIsLoading(false);
        toast({
            title: "Airdrop Successful!",
            description: "Your tokens have been distributed to the recipients.",
        });
        form.reset();
    }

    return (
        <div className="container mx-auto py-12">
            <div className="text-center">
                <h1 className="text-3xl font-bold font-headline">Token Airdrop</h1>
                <p className="text-muted-foreground text-lg mt-2">
                    Distribute your tokens to build your community and reach a wider audience.
                </p>
            </div>

            <Card className="max-w-2xl mx-auto mt-8">
                <CardHeader>
                    <CardTitle>Configure Your Airdrop</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="tokenAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Token Contract Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="0x..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="recipients"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Recipient Addresses</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Enter one address per line" className="min-h-[120px]"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount per Recipient</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                                {isLoading ? <Loader2 className="animate-spin" /> : <><Send className="mr-2"/>Start Airdrop</>}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}


'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, BrainCircuit, FileText, Vote } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateDaoPlan } from '@/app/actions';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import type { DaoGovernanceOutput } from '@/ai/schemas/dao-governance';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FormSchema = z.object({
  description: z.string().min(20, {
    message: 'Please provide a more detailed description of your DAO (at least 20 characters).',
  }),
});

export default function DaoGovernancePage() {
    const [result, setResult] = useState<DaoGovernanceOutput | null>(null);
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
            const daoPlan = await generateDaoPlan({ description: data.description });
            setResult(daoPlan);
        } catch (error) {
            console.error("Failed to generate DAO plan", error);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div>
            <h1 className="text-4xl font-bold font-headline">DAO Governance Planner</h1>
            <p className="text-muted-foreground text-lg mt-2">
                Describe the purpose of your Decentralized Autonomous Organization, and our AI will generate a complete governance plan.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Describe Your DAO</CardTitle>
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
                                            placeholder="e.g., 'A decentralized investment club for funding early-stage Web3 gaming projects. We need a way to vote on proposals and manage a treasury.'"
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
                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary text-2xl">{result.name}</CardTitle>
                        <p className="text-muted-foreground text-base italic">{result.description}</p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <Card className='bg-card/50'>
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold flex items-center gap-3"><BrainCircuit className="w-6 h-6 text-primary"/>Governance Model</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold text-foreground text-base">{result.governanceModel.name}</p>
                                    <p className="text-muted-foreground text-sm mt-1">{result.governanceModel.description}</p>
                                </CardContent>
                            </Card>
                            <Card className='bg-card/50'>
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold flex items-center gap-3"><FileText className="w-6 h-6 text-primary"/>Tokenomics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold text-foreground text-base">{result.tokenomics.tokenName} ({result.tokenomics.tokenSymbol})</p>
                                    <p className="text-muted-foreground text-sm mt-1">{result.tokenomics.initialDistribution}</p>
                                </CardContent>
                            </Card>
                            <Card className='bg-card/50'>
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold flex items-center gap-3"><Vote className="w-6 h-6 text-primary"/>Operational Plan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {result.operationalPlan.map((step, i) => (
                                            <li key={i} className="text-muted-foreground flex items-start text-base">
                                                <span className="mr-3 mt-1 text-primary">&rarr;</span>
                                                <span>{step}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        )}
   </div>
  );
}

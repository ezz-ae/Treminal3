
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, BrainCircuit, Vote, Users, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateDaoPlan } from '@/app/actions';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import type { DaoGovernanceOutput } from '@/ai/schemas/dao-governance';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const FormSchema = z.object({
  name: z.string().min(3, 'Please enter a name with at least 3 characters.'),
  mission: z.string().min(20, 'Please describe your mission in at least 20 characters.'),
  governanceModel: z.enum(['Token-Weighted Voting', 'One-Person-One-Vote', 'Multisig Council'], {
    required_error: "You need to select a governance model.",
  }),
});

const governanceOptions = {
    'Token-Weighted Voting': 'Votes are weighted by the amount of governance token a member holds. Best for investment DAOs.',
    'One-Person-One-Vote': 'Each member gets one vote, regardless of token holdings. Best for community-focused DAOs.',
    'Multisig Council': 'A small, elected council of trusted members manages decisions. Best for focused, expert-led projects.',
}

export default function DaoGovernancePage() {
    const [result, setResult] = useState<DaoGovernanceOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setResult(null);
        try {
            const daoPlan = await generateDaoPlan(data);
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
                Design your Decentralized Autonomous Organization by providing the core details, and our AI will generate a complete governance and operational plan.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Design Your DAO</CardTitle>
                <CardDescription>Fill out the fields below to get started.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>DAO Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., 'Galaxy Guild'" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mission"
                            render={({ field }) => (
                                <FormItem>
                                     <FormLabel>Core Mission</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="e.g., 'To fund and support the next generation of decentralized games and gamers.'"
                                            className="min-h-[100px] text-base"
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="governanceModel"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel>Governance Model</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                    disabled={isLoading}
                                    >
                                    {Object.entries(governanceOptions).map(([name, description]) => (
                                        <FormItem key={name} className="flex-1">
                                            <FormControl>
                                                <RadioGroupItem value={name} className="sr-only" />
                                            </FormControl>
                                            <FormLabel className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-full cursor-pointer">
                                                <p className="font-semibold text-center mb-2">{name}</p>
                                                <p className="text-xs text-muted-foreground text-center">{description}</p>
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                    </RadioGroup>
                                </FormControl>
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
                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary text-2xl">{result.name}</CardTitle>
                        <p className="text-muted-foreground text-base italic">{result.description}</p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <Card className='bg-card/50'>
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold flex items-center gap-3"><Users className="w-6 h-6 text-primary"/>Governance Model</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold text-foreground text-base">{result.governanceModel.name}</p>
                                    <p className="text-muted-foreground text-sm mt-1">{result.governanceModel.description}</p>
                                </CardContent>
                            </Card>
                            <Card className='bg-card/50'>
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold flex items-center gap-3"><BrainCircuit className="w-6 h-6 text-primary"/>Tokenomics</CardTitle>
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

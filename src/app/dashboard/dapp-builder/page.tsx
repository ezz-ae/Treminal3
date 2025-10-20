
'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Bot, Wand2, ArrowRight, Check, ChevronsRight, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { recommendBusinessTools } from '@/ai/actions';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import type { BusinessToolRecommendationOutput } from '@/ai/schemas/business-tool-recommendation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { iconMap } from '@/lib/icon-map';

const industries = ["DeFi", "Gaming", "NFTs", "Infrastructure", "Social", "Enterprise"];
const stages = ["Idea", "Prototype", "MVP", "Growth", "Established"];

const FormSchema = z.object({
  industry: z.string({ required_error: 'Please select an industry.' }),
  stage: z.string({ required_error: 'Please select a business stage.' }),
  goals: z.array(z.object({ value: z.string().min(3, "Goal must be at least 3 characters.") })).min(1, "Please provide at least one goal."),
  description: z.string().min(20, 'Please describe your project in at least 20 characters.'),
});

export default function DappBuilderPage() {
    const [recommendations, setRecommendations] = useState<BusinessToolRecommendationOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            description: "",
            goals: [{ value: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "goals"
    });
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setRecommendations(null);
        try {
            const formattedData = {
                ...data,
                goals: data.goals.map(g => g.value),
            };
            const result = await recommendBusinessTools(formattedData);
            setRecommendations(result);
        } catch (error) {
            console.error("Failed to get recommendations", error);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
        <div>
            <h1 className="text-4xl font-bold font-headline">AI Business Architect</h1>
            <p className="text-muted-foreground text-lg mt-2">
                Describe your Web3 project, and our AI will recommend the best tools and a strategic plan to get you started.
            </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card className="lg:sticky lg:top-6">
                <CardHeader>
                    <CardTitle>1. Describe Your Business</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                               <FormField
                                    control={form.control}
                                    name="industry"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Industry</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                                <FormControl><SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    {industries.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
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
                                                <FormControl><SelectTrigger><SelectValue placeholder="Select stage" /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    {stages.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                             <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="e.g., A decentralized platform for musicians to sell their music as NFTs directly to fans."
                                                className="min-h-[100px]"
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <FormLabel>Primary Goals</FormLabel>
                                {fields.map((field, index) => (
                                    <FormField
                                        control={form.control}
                                        key={field.id}
                                        name={`goals.${index}.value`}
                                        render={({ field }) => (
                                        <FormItem className='flex items-center gap-2 mt-2'>
                                            <FormControl>
                                                <Input {...field} placeholder={`e.g., Build a community`} disabled={isLoading}/>
                                            </FormControl>
                                            {fields.length > 1 && <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}><X className="h-4 w-4" /></Button>}
                                        </FormItem>
                                        )}
                                    />
                                ))}
                                 <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ value: "" })}>
                                    <Plus className="mr-2 h-4 w-4" /> Add Goal
                                </Button>
                                <FormMessage>{form.formState.errors.goals?.message}</FormMessage>
                            </div>

                            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                                {isLoading ? <Loader2 className="animate-spin" /> : <><Wand2 className="mr-2"/>Generate Plan</>}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <div className="space-y-8">
                <AnimatePresence>
                    {isLoading && (
                         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <Card>
                                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-96">
                                    <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                                    <h3 className="text-xl font-headline font-semibold">Architecting Your Plan...</h3>
                                    <p className="text-muted-foreground">Our AI is analyzing your business needs to create the perfect strategy.</p>
                                </CardContent>
                            </Card>
                         </motion.div>
                    )}
                    {recommendations && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-3"><Bot className="w-6 h-6 text-primary"/>Your Strategic Plan</CardTitle>
                                    <CardDescription>Based on your profile, here are the recommended tools and a plan to get started.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {recommendations.recommendations.map((rec, index) => {
                                        const LucideIcon = iconMap[rec.icon] || iconMap['AppWindow'];
                                        return (
                                            <div key={index} className="border-l-4 border-primary pl-4 py-2 bg-card-foreground/5 rounded-r-lg">
                                                <h3 className="font-bold text-lg flex items-center gap-2"><LucideIcon className="w-5 h-5"/> {rec.name}</h3>
                                                <p className="text-sm text-muted-foreground mt-1 mb-4">{rec.description}</p>
                                                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><ChevronsRight className="w-4 h-4 text-primary"/>Recommended Flow:</h4>
                                                <ul className="space-y-2">
                                                    {rec.flow.map((step, stepIndex) => (
                                                        <li key={stepIndex} className="flex items-start gap-2 text-sm">
                                                            <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0"/>
                                                            <span>{step}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )
                                    })}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
   </div>
  );
}

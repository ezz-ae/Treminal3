
'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Bot, Wand2, ArrowLeft, ArrowRight, Check, ChevronsRight, Plus, X } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';

const industries = ["DeFi", "Gaming", "NFTs", "Infrastructure", "Social", "Enterprise"];
const stages = ["Idea", "Prototype", "MVP", "Growth", "Established"];

const FormSchema = z.object({
  industry: z.string({ required_error: 'Please select an industry.' }),
  stage: z.string({ required_error: 'Please select a business stage.' }),
  goals: z.array(z.object({ value: z.string().min(3, "Goal must be at least 3 characters.") })).min(1, "Please provide at least one goal."),
  description: z.string().min(20, 'Please describe your project in at least 20 characters.'),
});

const steps = [
    { id: 'industry', title: 'Industry', fields: ['industry'] },
    { id: 'stage', title: 'Business Stage', fields: ['stage'] },
    { id: 'goals', title: 'Primary Goals', fields: ['goals'] },
    { id: 'description', title: 'Project Description', fields: ['description'] },
    { id: 'review', title: 'Review & Generate' },
]

/**
 * A multi-step form that guides the user through creating a business profile
 * to receive AI-powered tool recommendations.
 * @returns {JSX.Element} The AI Business Architect page component.
 */
export default function DappBuilderPage() {
    const [recommendations, setRecommendations] = useState<BusinessToolRecommendationOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

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
    
    /**
     * Submits the form data to the AI to get tool recommendations.
     * @param {z.infer<typeof FormSchema>} data The validated form data.
     */
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

    type FieldName = keyof z.infer<typeof FormSchema>;

    /**
     * Moves to the next step in the form after validating the current step.
     */
    const next = async () => {
        const fields = steps[currentStep].fields as FieldName[];
        const output = await form.trigger(fields, { shouldFocus: true });

        if (!output) return;

        if (currentStep < steps.length - 1) {
             setCurrentStep(step => step + 1)
        }
    }

    /**
     * Moves to the previous step in the form.
     */
    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(step => step - 1);
        }
    }
    
    const progressValue = ((currentStep + 1) / (steps.length)) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
            <h1 className="text-4xl font-bold font-headline">AI Business Architect</h1>
            <p className="text-muted-foreground text-lg mt-2">
                Answer a few questions about your project, and our AI will recommend the best tools and a strategic plan to get you started.
            </p>
        </div>
        
        <Card className="min-h-[500px] flex flex-col">
            <CardHeader>
                <CardTitle>Step {currentStep + 1}: {steps[currentStep].title}</CardTitle>
                <Progress value={progressValue} className="w-full mt-2" />
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <AnimatePresence mode="wait">
                 <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="flex-grow"
                 >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-full flex flex-col">
                            <div className="flex-grow">
                                {currentStep === 0 && (
                                     <FormField
                                        control={form.control}
                                        name="industry"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xl">What industry does your project operate in?</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                                    <FormControl><SelectTrigger className="h-12 text-lg"><SelectValue placeholder="Select an industry..." /></SelectTrigger></FormControl>
                                                    <SelectContent>
                                                        {industries.map(item => <SelectItem key={item} value={item} className="text-lg">{item}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                {currentStep === 1 && (
                                    <FormField
                                        control={form.control}
                                        name="stage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xl">What is the current stage of your business?</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                                    <FormControl><SelectTrigger className="h-12 text-lg"><SelectValue placeholder="Select a stage..." /></SelectTrigger></FormControl>
                                                    <SelectContent>
                                                        {stages.map(item => <SelectItem key={item} value={item} className="text-lg">{item}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                
                                {currentStep === 2 && (
                                     <div>
                                        <FormLabel className="text-xl">What are your primary goals?</FormLabel>
                                        <div className="mt-4 space-y-2">
                                            {fields.map((field, index) => (
                                                <FormField
                                                    control={form.control}
                                                    key={field.id}
                                                    name={`goals.${index}.value`}
                                                    render={({ field }) => (
                                                        <FormItem className='flex items-center gap-2'>
                                                            <FormControl>
                                                                <Input {...field} placeholder={`e.g., Build a community`} disabled={isLoading} className="h-12 text-lg"/>
                                                            </FormControl>
                                                            {fields.length > 1 && <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}><X className="h-4 w-4" /></Button>}
                                                        </FormItem>
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ value: "" })}>
                                            <Plus className="mr-2 h-4 w-4"/>Add Goal
                                        </Button>
                                        <FormMessage>{form.formState.errors.goals?.message}</FormMessage>
                                    </div>
                                )}
                                
                                {currentStep === 3 && (
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xl">Briefly describe your project.</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        placeholder="e.g., A decentralized platform for musicians to sell their music as NFTs directly to fans."
                                                        className="min-h-[150px] text-lg mt-2"
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                {currentStep === 4 && !isLoading && !recommendations && (
                                    <div>
                                        <h3 className="text-2xl font-headline font-bold">Ready to Generate Your Plan?</h3>
                                        <p className="text-muted-foreground mt-2 mb-6">Review your inputs below. Once you're ready, click the button to have our AI Business Architect generate a customized strategic plan for your project.</p>
                                        <Card className="bg-background">
                                            <CardContent className="p-6 space-y-4">
                                                 <div><strong className="text-muted-foreground">Industry:</strong> {form.getValues('industry')}</div>
                                                 <div><strong className="text-muted-foreground">Stage:</strong> {form.getValues('stage')}</div>
                                                 <div><strong className="text-muted-foreground">Goals:</strong> {form.getValues('goals').map(g => g.value).join(', ')}</div>
                                                 <div><strong className="text-muted-foreground">Description:</strong> {form.getValues('description')}</div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                                
                                {isLoading && (
                                    <div className="flex flex-col items-center justify-center text-center h-full">
                                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                                        <h3 className="text-xl font-headline font-semibold">Architecting Your Plan...</h3>
                                        <p className="text-muted-foreground">Our AI is analyzing your business needs to create the perfect strategy.</p>
                                    </div>
                                )}
                                {recommendations && (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                        <CardHeader className="px-0">
                                            <CardTitle className="text-xl flex items-center gap-3"><Bot className="w-6 h-6 text-primary"/>Your Strategic Plan</CardTitle>
                                            <CardDescription>Based on your profile, here are the recommended tools and a plan to get started.</CardDescription>
                                        </CardHeader>
                                        <div className="space-y-6">
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
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                             {!isLoading && !recommendations && (
                                <div className="mt-8 flex justify-between">
                                    <Button type="button" variant="ghost" onClick={prev} disabled={currentStep === 0}>
                                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                                    </Button>
                                    {currentStep < steps.length - 1 && (
                                        <Button type="button" onClick={next}>
                                            Next <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    )}
                                    {currentStep === steps.length - 1 && (
                                        <Button type="submit" disabled={isLoading} size="lg">
                                            {isLoading ? <Loader2 className="animate-spin" /> : <><Wand2 className="mr-2"/>Generate Plan</>}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </form>
                    </Form>
                 </motion.div>
                </AnimatePresence>
            </CardContent>
        </Card>
   </div>
  );
}


'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2, Lightbulb } from 'lucide-react';
import type { BusinessToolRecommendationOutput } from '@/ai/flows/business-tool-recommendation';
import { getRecommendations } from '@/app/actions';

const formSchema = z.object({
  businessType: z.string().min(3, {
    message: 'Please describe your business type.',
  }),
  businessNeeds: z.string().min(10, {
    message: 'Please describe your needs in more detail.',
  }),
  budget: z.string().min(2, {
    message: 'Please specify your budget (e.g., "Under $50/mo").',
  }),
});

export default function RecommendationForm() {
  const [recommendations, setRecommendations] = useState<BusinessToolRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: '',
      businessNeeds: '',
      budget: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    
    const result = await getRecommendations(values);

    if ('error' in result) {
      setError(result.error);
    } else {
      setRecommendations(result);
    }

    setIsLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-background/50">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Business</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., E-commerce, Freelance Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Budget</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., $100/month, Bootstrapped" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="businessNeeds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are your main needs or challenges?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I need a better way to handle invoices and accept crypto payments."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button type="submit" disabled={isLoading} size="lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <div className="mt-8 text-center text-destructive">
          <p>Sorry, an error occurred. Please try again later.</p>
        </div>
      )}

      {recommendations && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-8 font-headline">Your Personalized Recommendations</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.recommendations.map((rec) => (
              <Card key={rec.toolName} className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Lightbulb className="h-6 w-6 text-primary"/>
                    <CardTitle className="font-headline">{rec.toolName}</CardTitle>
                  </div>
                   <p className="text-sm font-medium text-muted-foreground">{rec.toolCategory}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{rec.toolDescription}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

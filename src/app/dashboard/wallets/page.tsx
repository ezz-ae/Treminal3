
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, ServerCrash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DappBuilderOutput, generateDapp } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const FormSchema = z.object({
  description: z.string().min(10, {
    message: 'Wallet description must be at least 10 characters.',
  }),
});

export default function WalletsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DappBuilderOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await generateDapp({ description: data.description });
      setResult(response);
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Custom Wallets</h1>
        <p className="text-muted-foreground">Describe the custom wallet you want to build for your users.</p>
      </div>

      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'A secure, multi-signature wallet for a DAO that requires 3 out of 5 signatories to approve a transaction. It should support ETH and all ERC-20 tokens.'"
                        className="min-h-[150px]"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Wallet Plan
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {error && (
        <Alert variant="destructive" className="max-w-2xl">
          <ServerCrash className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>{result.name}</CardTitle>
            <CardDescription>{result.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <div className="flex flex-wrap gap-2">
                {result.components.map((component) => (
                  <Badge key={component} variant="secondary">{component}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Security Modules</h4>
               <div className="flex flex-wrap gap-2">
                {result.contracts.map((contract) => (
                  <Badge key={contract} variant="outline">{contract}</Badge>
                ))}
              </div>
            </div>
             <Button className="mt-4">Build Wallet</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

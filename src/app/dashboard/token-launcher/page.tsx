
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, ServerCrash, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TokenLauncherOutput, generateToken } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  description: z.string().min(10, {
    message: 'Token description must be at least 10 characters.',
  }),
});

export default function TokenLauncherPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TokenLauncherOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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
      const response = await generateToken({ description: data.description });
      setResult(response);
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = () => {
    if (result?.solidityCode) {
      navigator.clipboard.writeText(result.solidityCode);
      toast({
        title: "Copied to Clipboard",
        description: "The Solidity code has been copied.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Token Launcher</h1>
        <p className="text-muted-foreground">Describe the cryptocurrency token you want to create.</p>
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
                        placeholder="e.g., 'An ERC-20 utility token named 'Starlight' (STAR) with a total supply of 100 million. It should have features for burning and minting.'"
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
                Generate Token
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {error && (
        <Alert variant="destructive" className="max-w-2xl">
          <ServerCrash className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>{result.name} ({result.symbol})</CardTitle>
            <CardDescription>
              Total Supply: {new Intl.NumberFormat().format(result.supply)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Generated Solidity Code</h4>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto font-code">
                <code>{result.solidityCode}</code>
              </pre>
            </div>
            <div className="flex gap-4 pt-4">
                <Button>Deploy Contract</Button>
                <Button variant="outline">Run Security Audit</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

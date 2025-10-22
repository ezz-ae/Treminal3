
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Gem, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateTokenContract } from '@/ai/actions';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import type { TokenGeneratorOutput } from '@/ai/schemas/token-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { CustomCodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const features = [
  { id: 'Mintable', label: 'Mintable - Allow creating more tokens after initial supply.' },
  { id: 'Burnable', label: 'Burnable - Allow tokens to be destroyed.' },
  { id: 'Pausable', label: 'Pausable - Allow pausing token transfers.' },
  { id: 'Permit', label: 'Permit - Allow gasless approvals via signatures.' },
  { id: 'Votes', label: 'Votes - Enable on-chain governance participation.' },
  { id: 'FlashMinting', label: 'Flash Minting - Enable flash loans.' },
];

const FormSchema = z.object({
  name: z.string().min(3, 'Token name must be at least 3 characters.'),
  symbol: z.string().min(2, 'Token symbol must be at least 2 characters.').max(6, 'Token symbol must be 6 characters or less.'),
  supply: z.coerce.number().min(1, 'Supply must be at least 1.'),
  features: z.array(z.string()),
});

/**
 * A dashboard for creating and generating ERC-20 token smart contracts using AI.
 * @returns {JSX.Element} The Token Launcher page component.
 */
export default function TokenLauncherPage() {
    const [result, setResult] = useState<TokenGeneratorOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            symbol: "",
            supply: 1000000,
            features: ["Burnable"],
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setResult(null);
        try {
            const tokenResult = await generateTokenContract(data);
            setResult(tokenResult);
            toast({
              title: "Contract Generated!",
              description: "Your ERC-20 smart contract is ready.",
            });
        } catch (error) {
            console.error("Failed to generate token contract", error);
            toast({
              variant: "destructive",
              title: "Generation Failed",
              description: "The AI failed to generate the contract. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

  return (
      <div className="container mx-auto py-12 space-y-8">
          <div>
              <h1 className="text-3xl font-bold font-headline">AI Token Launcher</h1>
              <p className="text-muted-foreground text-lg mt-2">
                  Define the properties of your ERC-20 token, and our AI will generate a secure, gas-efficient smart contract for you.
              </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <Card className="lg:sticky lg:top-6">
                  <CardHeader>
                      <CardTitle>1. Configure Your Token</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <FormField
                                      control={form.control}
                                      name="name"
                                      render={({ field }) => (
                                          <FormItem>
                                              <FormLabel>Token Name</FormLabel>
                                              <FormControl>
                                                  <Input {...field} placeholder="e.g., My Token" disabled={isLoading} />
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
                                                  <Input {...field} placeholder="e.g., MTK" disabled={isLoading} />
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
                                              <Input type="number" {...field} placeholder="e.g., 1000000" disabled={isLoading} />
                                          </FormControl>
                                          <FormMessage />
                                      </FormItem>
                                  )}
                              />
                              <FormField
                                  control={form.control}
                                  name="features"
                                  render={() => (
                                      <FormItem>
                                          <div className="mb-4">
                                              <FormLabel>Token Features</FormLabel>
                                          </div>
                                          <div className="space-y-3">
                                          {features.map((item) => (
                                              <FormField
                                                  key={item.id}
                                                  control={form.control}
                                                  name="features"
                                                  render={({ field }) => {
                                                      return (
                                                          <FormItem
                                                              key={item.id}
                                                              className="flex flex-row items-start space-x-3 space-y-0"
                                                          >
                                                              <FormControl>
                                                                  <Checkbox
                                                                      checked={field.value?.includes(item.id)}
                                                                      onCheckedChange={(checked) => {
                                                                          return checked
                                                                          ? field.onChange([...field.value, item.id])
                                                                          : field.onChange(field.value?.filter((value) => value !== item.id))
                                                                      }}
                                                                      disabled={isLoading}
                                                                  />
                                                              </FormControl>
                                                              <FormLabel className="font-normal text-sm text-muted-foreground">{item.label}</FormLabel>
                                                          </FormItem>
                                                      )
                                                  }}
                                              />
                                          ))}
                                          </div>
                                          <FormMessage />
                                      </FormItem>
                                  )}
                              />

                              <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                                  {isLoading ? <Loader2 className="animate-spin" /> : <><Gem className="mr-2"/>Generate Contract</>}
                              </Button>
                          </form>
                      </Form>
                  </CardContent>
              </Card>

              <div className="space-y-8">
                  {isLoading && (
                       <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                          <h3 className="text-xl font-headline font-semibold">Generating Your Smart Contract...</h3>
                          <p className="text-muted-foreground">Our AI is crafting a secure and gas-efficient ERC-20 contract based on your requirements.</p>
                      </div>
                  )}
                  {result && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                          <Card>
                               <CardHeader>
                                  <CardTitle className="text-xl flex items-center gap-3"><FileText className="w-6 h-6 text-primary"/>Generated Smart Contract</CardTitle>
                                  <CardDescription>{result.summary}</CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-6">
                                  <CustomCodeBlock code={result.solidityCode} language="solidity" />
                                  <div className="flex gap-2">
                                      <Button size="lg" className="w-full" asChild>
                                          <Link
                                              href={{ pathname: '/dashboard/security-audits', query: { code: result.solidityCode } }}
                                              >
                                              <ShieldCheck className="mr-2 h-4 w-4" />
                                              Run Security Audit
                                          </Link>
                                      </Button>
                                       <Button size="lg" className="w-full" variant="outline" disabled>
                                          Deploy to Testnet (Soon)
                                      </Button>
                                  </div>
                              </CardContent>
                          </Card>
                      </motion.div>
                  )}
              </div>
          </div>
      </div>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Rocket, Twitter, FileText, Sparkles, Copy, Check, Link as LinkIcon, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateSolanaToken } from '@/ai/actions';
import { createToken } from '@/app/solana/actions/create-token';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import type { SolanaTokenGeneratorOutput } from '@/ai/schemas/solana-token-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SolanaTokenGeneratorInputSchema } from '@/ai/schemas/solana-token-generator';
import type { z } from 'zod';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

type FormData = z.infer<typeof SolanaTokenGeneratorInputSchema>;
type AiAssets = Omit<SolanaTokenGeneratorOutput, 'tokenAddress' | 'signature'>;
type LaunchResult = { 
    success: boolean; 
    signature?: string; 
    mintAddress?: string; 
    error?: string; 
};

export default function SolanaLaunchPage() {
    const [aiAssets, setAiAssets] = useState<AiAssets | null>(null);
    const [launchResult, setLaunchResult] = useState<LaunchResult | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isLaunching, setIsLaunching] = useState(false);
    
    const { toast } = useToast();
    const { publicKey, connected } = useWallet();

    const form = useForm<FormData>({
        resolver: zodResolver(SolanaTokenGeneratorInputSchema),
        mode: 'onChange',
        defaultValues: {
            name: "",
            symbol: "",
            description: "",
            supply: 1000000000,
            decimals: 9,
        },
    });

    async function handleGenerate(data: Pick<FormData, 'name' | 'symbol' | 'description'>) {
        setIsGenerating(true);
        setAiAssets(null);
        try {
            const assets = await generateSolanaToken(data);
            setAiAssets(assets);
        } catch (error) {
            console.error("Failed to generate assets", error);
            toast({
              variant: 'destructive',
              title: 'AI Generation Failed',
              description: error instanceof Error ? error.message : 'An unknown error occurred.',
            })
        } finally {
            setIsGenerating(false);
        }
    }

    async function handleLaunch(data: FormData) {
        if (!publicKey) {
            toast({ variant: 'destructive', title: 'Wallet not connected'});
            return;
        }
        if (!aiAssets) {
            toast({ variant: 'destructive', title: 'Please generate AI assets first'});
            return;
        }

        setIsLaunching(true);
        setLaunchResult(null);

        try {
            const result = await createToken({
                ...data,
                imageUrl: aiAssets.imageUrl,
                walletAddress: publicKey.toBase58(),
            });
            setLaunchResult(result);
            if (result.success) {
                toast({ title: 'Token Launched Successfully!', description: `Signature: ${result.signature?.slice(0, 20)}...` })
            } else {
                throw new Error(result.error || 'Unknown error during launch.')
            }
        } catch (error) {
             console.error("Failed to launch token", error);
            toast({
              variant: 'destructive',
              title: 'Token Launch Failed',
              description: error instanceof Error ? error.message : 'An unknown error occurred.',
            })
        } finally {
            setIsLaunching(false);
        }
    }

    const isLoading = isGenerating || isLaunching;
    const resetForm = () => {
        form.reset();
        setAiAssets(null);
        setLaunchResult(null);
    }

    if (launchResult && launchResult.success) {
         return (
            <div className="container mx-auto py-12">
                <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-4xl mx-auto">
                    <div className="text-center">
                        <Rocket className="w-16 h-16 text-primary mx-auto mb-4"/>
                        <h2 className="text-3xl font-bold font-headline">Launch Successful!</h2>
                        <p className="text-muted-foreground mt-2">Your token <span className="font-bold text-primary">{form.getValues('name')}</span> is now live on the Solana devnet.</p>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Launch Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                            <CopyableField fieldName="Token Mint Address" value={launchResult.mintAddress!} isLink={`https://explorer.solana.com/address/${launchResult.mintAddress}?cluster=devnet`}/>
                            <CopyableField fieldName="Transaction Signature" value={launchResult.signature!} isLink={`https://explorer.solana.com/tx/${launchResult.signature}?cluster=devnet`}/>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Twitter className="w-5 h-5 text-blue-400"/>Tweet Announcement</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm bg-card/50 p-4 rounded-md border">{aiAssets?.twitter}</p>
                        </CardContent>
                    </Card>
                    <div className="text-center">
                         <Button onClick={resetForm} size="lg">Launch Another Token</Button>
                    </div>
                </motion.div>
            </div>
        )
    }

  return (
    <div className="container mx-auto py-12">
        <header className="mb-8 flex justify-between items-center max-w-5xl mx-auto">
            <div className="max-w-3xl">
                 <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                    <Rocket className="w-8 h-8 text-primary" />
                    Solana Token Launchpad
                </h1>
                <p className="text-muted-foreground text-lg mt-2">
                    Define, generate, and launch your SPL token on the Solana devnet.
                </p>
            </div>
            <WalletMultiButton />
        </header>
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLaunch)} className="space-y-8 max-w-5xl mx-auto">
                <motion.div layout className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
                    {/* Left side: Form */}
                    <Card className="md:col-span-3">
                        <CardHeader>
                            <CardTitle>Token Configuration</CardTitle>
                            <CardDescription>Fill in the details for your new SPL token.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Token Name</FormLabel>
                                    <FormControl><Input {...field} placeholder="e.g., Galaxy Dust" disabled={isLoading || !!aiAssets} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="symbol" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Token Symbol</FormLabel>
                                    <FormControl><Input {...field} placeholder="e.g., GLXY" disabled={isLoading || !!aiAssets} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Token Concept / Description</FormLabel>
                                    <FormControl><Textarea {...field} placeholder="e.g., A community token for space explorers and art collectors." disabled={isLoading || !!aiAssets} className="min-h-[100px]" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            {/* Generate Assets Button */}
                            {!aiAssets && (
                                 <Button 
                                    type="button" 
                                    onClick={async () => {
                                        const isValid = await form.trigger(['name', 'symbol', 'description']);
                                        if(isValid) handleGenerate(form.getValues());
                                    }} 
                                    disabled={isGenerating}
                                    className="w-full"
                                    size="lg"
                                >
                                    {isGenerating ? <Loader2 className="mr-2 animate-spin"/> : <Sparkles className="mr-2"/>} 
                                    {isGenerating ? 'Generating Assets...' : 'Generate AI Assets'}
                                </Button>
                            )}
                            
                            {/* Revealed after asset generation */}
                            <AnimatePresence>
                            {aiAssets && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    className="space-y-6 pt-4 border-t"
                                >
                                    <FormField control={form.control} name="supply" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Total Supply</FormLabel>
                                            <FormControl><Input type="number" {...field} placeholder="1,000,000,000" disabled={isLoading} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="decimals" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Decimals</FormLabel>
                                            <FormControl><Input type="number" {...field} disabled={isLoading} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                     <Button type="submit" disabled={isLoading || !connected} className="w-full" size="lg">
                                        {isLaunching ? <Loader2 className="mr-2 animate-spin" /> : <Rocket className="mr-2" />} 
                                        {isLaunching ? 'Launching on Devnet...' : 'Launch Token'}
                                    </Button>
                                    {!connected && <p className="text-center text-sm text-destructive">You must connect your wallet to launch.</p>}
                                </motion.div>
                            )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>

                    {/* Right side: AI Preview */}
                    <Card className="md:col-span-2 sticky top-24">
                        <CardHeader>
                            <CardTitle>AI Generated Assets</CardTitle>
                            <CardDescription>A preview of the assets generated by AI.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 text-center">
                             <div className="flex flex-col items-center justify-center bg-background rounded-lg p-4 h-[220px]">
                                {isGenerating ? (
                                     <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                ) : aiAssets?.imageUrl ? (
                                     <Image src={aiAssets.imageUrl} alt="Generated token image" width={160} height={160} className="rounded-full border-4 border-primary/50 shadow-lg" />
                                ) : (
                                    <div className="text-muted-foreground text-sm">Fill in the token details and click &quot;Generate&quot; to see your image here.</div>
                                )}
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold flex items-center gap-2 mb-2"><Twitter className="w-5 h-5 text-blue-400" /> Generated Tweet</h4>
                                <p className="text-xs text-muted-foreground p-3 bg-card/50 rounded-md border min-h-[80px]">{isGenerating ? '...' : aiAssets?.twitter || ''}</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </form>
        </Form>
   </div>
  );
}

const CopyableField = ({ fieldName, value, isLink }: { fieldName: string, value: string, isLink?: string }) => {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);
    
    const onCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        toast({ title: `${fieldName} copied!` });
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="space-y-1">
            <label className="text-sm font-medium flex items-center justify-between">
                <span>{fieldName}</span>
                {isLink && <a href={isLink} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1"><LinkIcon className="w-3 h-3" />View on Explorer</a>}
            </label>
            <div className="flex items-center gap-2">
                <Input readOnly value={value} className="font-mono text-xs"/>
                <Button variant="ghost" size="icon" onClick={onCopy} aria-label={`Copy ${fieldName}`}>
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4"/>}
                </Button>
            </div>
        </div>
    )
}

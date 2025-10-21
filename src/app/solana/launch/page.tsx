
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Rocket, Twitter, FileText, Bot, Sparkles, Copy, Check, Terminal, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSolanaToken } from '@/ai/actions';
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
import { CustomCodeBlock } from '@/components/ui/code-block';

type FormData = z.infer<typeof SolanaTokenGeneratorInputSchema>;

const steps = [
  { id: 'concept', title: 'Token Concept', fields: ['name', 'symbol', 'description'] },
  { id: 'tokenomics', title: 'Tokenomics', fields: ['supply', 'decimals'] },
  { id: 'generate', title: 'Generate & Launch' },
];

const createPoolScript = `
import { Connection, Keypair, VersionedTransaction, PublicKey } from '@solana/web3.js';
import { Liquidity, Token } from '@raydium-io/raydium-sdk';
import { Wallet } from '@project-serum/anchor';
import bs58 from 'bs58';

// --- Configuration ---
// Warning: Do not hardcode private keys in production code. Use environment variables.
const RPC_URL = 'https://api.mainnet-beta.solana.com';
const WALLET_PRIVATE_KEY = process.env.SOLANA_PRIVATE_KEY || 'YOUR_WALLET_PRIVATE_KEY';

const BASE_TOKEN_MINT = 'YOUR_NEW_TOKEN_MINT_ADDRESS'; // AI will populate this
const QUOTE_TOKEN_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC

const LP_AMOUNT_BASE = 1000000; // The amount of your new token to add to the pool
const LP_AMOUNT_QUOTE = 1000; // The amount of USDC to pair with your token

async function main() {
  console.log('--- Solana Liquidity Pool Creation Script ---');
  if (WALLET_PRIVATE_KEY === 'YOUR_WALLET_PRIVATE_KEY') {
    console.error('ERROR: Please replace YOUR_WALLET_PRIVATE_KEY with your actual private key.');
    return;
  }

  const connection = new Connection(RPC_URL, 'confirmed');
  const owner = Keypair.fromSecretKey(bs58.decode(WALLET_PRIVATE_KEY));
  const wallet = new Wallet(owner);

  console.log('Wallet loaded. Public Key:', wallet.publicKey.toBase58());

  // This is a placeholder. In a real scenario, you'd create a market on OpenBook/Raydium first.
  const MOCK_OPENBOOK_MARKET_ID = '8BnEgHoWFysVcuFFX7QztDmzuH8rMaXpeWAKcfjchZ14';
  
  console.log('Fetching token details...');
  const baseToken = await Token.fetch(connection, new PublicKey(BASE_TOKEN_MINT));
  const quoteToken = await Token.fetch(connection, new PublicKey(QUOTE_TOKEN_MINT));
  console.log('Base Token:', baseToken.symbol, 'Quote Token:', quoteToken.symbol);

  console.log('Constructing transaction to create liquidity pool...');
  // This is a simplified example. Raydium SDK usage can be complex.
  const { transaction, signers } = await Liquidity.makeCreatePoolTransaction({
    connection,
    programId: Liquidity.getProgramId(4),
    baseMint: baseToken.mint,
    quoteMint: quoteToken.mint,
    baseDecimals: baseToken.decimals,
    quoteDecimals: quoteToken.decimals,
    marketId: new PublicKey(MOCK_OPENBOOK_MARKET_ID),
    baseAmount: new BN(LP_AMOUNT_BASE * (10 ** baseToken.decimals)),
    quoteAmount: new BN(LP_AMOUNT_QUOTE * (10 ** quoteToken.decimals)),
    owner: wallet.publicKey,
  });

  console.log('Transaction constructed. Sending to network...');
  // In a real run, this would be sent. Here we simulate it.
  // const txSignature = await connection.sendTransaction(transaction, [owner, ...signers], { skipPreflight: true });
  const txSignature = 'SIMULATED_SIGNATURE_' + Math.random().toString(36).substring(2);
  
  console.log('Transaction sent with signature:', txSignature);
  // await connection.confirmTransaction(txSignature);
  console.log('--- SIMULATION COMPLETE ---');
  console.log('Liquidity pool creation has been simulated successfully!');
}

main().catch(err => console.error('Script failed:', err));
`;

export default function SolanaLaunchPage() {
    const [result, setResult] = useState<SolanaTokenGeneratorOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isRunningScript, setIsRunningScript] = useState(false);
    const [scriptOutput, setScriptOutput] = useState<string[]>([]);
    const { toast } = useToast();

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

    async function onSubmit(data: FormData) {
        setIsLoading(true);
        setResult(null);
        try {
            const tokenResult = await generateSolanaToken(data);
            setResult(tokenResult);
        } catch (error) {
            console.error("Failed to generate token", error);
            toast({
              variant: 'destructive',
              title: 'Generation Failed',
              description: error instanceof Error ? error.message : 'An unknown error occurred.',
            })
        } finally {
            setIsLoading(false);
        }
    }

    const handleRunScript = () => {
        setIsRunningScript(true);
        setScriptOutput([]);
        
        const mockOutput = [
            '--- Solana Liquidity Pool Creation Script ---',
            `Wallet loaded. Public Key: ${'YourWalletAddress'.slice(0,4)}...${'YourWalletAddress'.slice(-4)}`,
            'Fetching token details...',
            `Base Token: ${form.getValues('symbol') || 'TKN'} Quote Token: USDC`,
            'Constructing transaction to create liquidity pool...',
            'Transaction constructed. Sending to network...',
            `Transaction sent with signature: SIMULATED_SIGNATURE_${Math.random().toString(36).substring(2, 10)}`,
            '--- SIMULATION COMPLETE ---',
            'Liquidity pool creation has been simulated successfully!',
        ];

        let lineIndex = 0;
        const interval = setInterval(() => {
            if (lineIndex < mockOutput.length) {
                setScriptOutput(prev => [...prev, mockOutput[lineIndex]]);
                lineIndex++;
            } else {
                clearInterval(interval);
                setIsRunningScript(false);
            }
        }, 350);
    }

    const nextStep = async () => {
        const fields = steps[currentStep].fields as (keyof FormData)[] | undefined;
        const output = await form.trigger(fields);

        if (!output) return;

        if (currentStep < steps.length - 1) {
            setCurrentStep(step => step + 1);
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(step => step - 1);
        }
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Token Name</FormLabel>
                                <FormControl><Input {...field} placeholder="e.g., Galaxy Dust" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="symbol" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Token Symbol</FormLabel>
                                <FormControl><Input {...field} placeholder="e.g., GLXY" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Token Concept / Description</FormLabel>
                                <FormControl><Textarea {...field} placeholder="e.g., A community token for space explorers and art collectors." className="min-h-[100px]" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-4">
                         <FormField control={form.control} name="supply" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Supply</FormLabel>
                                <FormControl><Input type="number" {...field} placeholder="1,000,000,000" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="decimals" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Decimals</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                );
            case 2:
                const formData = form.getValues();
                return (
                     <div className="text-center">
                        <h3 className="text-2xl font-bold font-headline mb-4">Review Your Token</h3>
                        <Card className="text-left bg-card/50">
                            <CardContent className="p-6 space-y-2">
                                <p><strong>Name:</strong> {formData.name}</p>
                                <p><strong>Symbol:</strong> {formData.symbol}</p>
                                <p><strong>Supply:</strong> {formData.supply.toLocaleString()}</p>
                                <p><strong>Decimals:</strong> {formData.decimals}</p>
                                <p><strong>Description:</strong> {formData.description}</p>
                            </CardContent>
                        </Card>
                    </div>
                )
            default:
                return null;
        }
    }

  return (
    <div className="container mx-auto py-12">
        <header className="mb-12 text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-headline flex items-center justify-center gap-3">
                <Rocket className="w-10 h-10 text-primary" />
                Solana Token Launchpad
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
                Launch your SPL token on Solana with AI-powered branding, marketing, and deployment simulation.
            </p>
        </header>
        
        {!result && !isLoading && (
             <motion.div layout className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Step {currentStep + 1}: {steps[currentStep].title}</CardTitle>
                        <CardDescription>
                            {currentStep === 0 && "Define the core identity of your new token."}
                            {currentStep === 1 && "Configure the supply and divisibility of your token."}
                            {currentStep === 2 && "Review your configuration and let the AI generate your assets."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {renderStepContent()}
                                    </motion.div>
                                </AnimatePresence>
                            
                                <div className="flex justify-between items-center pt-4">
                                    <Button type="button" variant="ghost" onClick={prevStep} disabled={currentStep === 0}>
                                        Back
                                    </Button>
                                    {currentStep < steps.length - 1 ? (
                                        <Button type="button" onClick={nextStep}>
                                            Next
                                        </Button>
                                    ) : (
                                        <Button type="submit" disabled={isLoading} size="lg">
                                            {isLoading ? <Loader2 className="animate-spin" /> : <><Sparkles className="mr-2"/>Generate & Launch</>}
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </motion.div>
        )}

        {isLoading && (
            <div className="flex flex-col items-center justify-center text-center rounded-lg border p-12 min-h-[400px] max-w-2xl mx-auto">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <h3 className="text-xl font-headline font-semibold">AI is Building Your Launch Kit...</h3>
                <p className="text-muted-foreground">Generating token image, crafting marketing copy, and simulating deployment. Please wait.</p>
            </div>
        )}
        
        {result && (
            <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-5xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold font-headline">Your Launch Kit is Ready!</h2>
                    <p className="text-muted-foreground mt-2">The AI has generated your token assets and the launch has been simulated.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 space-y-8">
                         <Card>
                             <CardHeader className="text-center">
                                <CardTitle>Token Image</CardTitle>
                             </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center">
                                    <Image src={result.imageUrl} alt="Generated token image" width={160} height={160} className="rounded-full border-4 border-primary/50 shadow-lg" />
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                             <CardHeader>
                                <CardTitle>On-Chain Details</CardTitle>
                             </CardHeader>
                            <CardContent className="space-y-4">
                                <CopyableField fieldName="Token Address" value={result.tokenAddress} />
                                <CopyableField fieldName="Signature" value={result.signature} />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-2 space-y-8">
                        <Card>
                             <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Twitter className="w-5 h-5 text-primary"/>Tweet Announcement</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm bg-card/50 p-4 rounded-md border">{result.twitter}</p>
                            </CardContent>
                        </Card>
                         <Card>
                             <CardHeader>
                                <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5 text-primary"/>Telegram Post</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm bg-card/50 p-4 rounded-md border">{result.telegram}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><PlayCircle className="w-6 h-6 text-primary"/>Final Step: Create Liquidity Pool</CardTitle>
                        <CardDescription>
                            Execute this script in a Node.js environment to create a new liquidity pool on Raydium for your token, making it tradable.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-2">Liquidity Pool Script</h3>
                            <CustomCodeBlock 
                                code={createPoolScript.replace('YOUR_NEW_TOKEN_MINT_ADDRESS', result.tokenAddress)} 
                                language="typescript" 
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Simulated Execution Output</h3>
                            <div className="bg-black text-white p-4 rounded-lg font-mono text-xs h-[250px] overflow-y-auto flex flex-col-reverse border border-primary/20">
                                <div>
                                    {scriptOutput.slice().reverse().map((line, index) => (
                                        <motion.div 
                                            key={scriptOutput.length - index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="text-primary/50 shrink-0">$</span>
                                            <span className="text-white/80 whitespace-pre-wrap">{line}</span>
                                        </motion.div>
                                    ))}
                                    {isRunningScript && <div className="w-2 h-4 bg-green-400 animate-pulse" />}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button className="w-full" size="lg" onClick={handleRunScript} disabled={isRunningScript}>
                                {isRunningScript ? <Loader2 className="mr-2 animate-spin"/> : <PlayCircle className="mr-2"/>} 
                                {isRunningScript ? 'Running Script...' : 'Simulate Script Execution'}
                            </Button>
                             <Button className="w-full" size="lg" variant="outline" disabled>
                                Deploy to Production (Coming Soon)
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        )}
   </div>
  );
}

const CopyableField = ({ fieldName, value }: { fieldName: string, value: string }) => {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);
    
    const onCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        toast({ title: `${fieldName} copied!` });
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div>
            <label className="text-sm font-medium">{fieldName}</label>
            <div className="flex items-center gap-2 mt-1">
                <Input readOnly value={value} className="font-mono text-xs"/>
                <Button variant="ghost" size="icon" onClick={onCopy}>
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4"/>}
                </Button>
            </div>
        </div>
    )
}

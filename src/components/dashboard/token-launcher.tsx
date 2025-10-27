
'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Rocket, Wallet, CheckCircle, XCircle, Loader2, Lightbulb, Bot } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/hooks/use-wallet';
import { motion, AnimatePresence } from 'framer-motion';
import { PayModal } from '@/components/PayModal'; // Import PayModal

// --- Mock AI Functions (replace with actual API calls) ---
const generateAiTokenSuggestions = async (prompt: string) => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
  const suggestions = [
    { name: `Solana ${prompt} AI`, symbol: `SAI`, description: `An AI-optimized token for the ${prompt} industry on Solana.` },
    { name: `Quantum ${prompt} Flow`, symbol: `QPF`, description: `Next-gen token for ${prompt} powered by quantum algorithms.` },
    { name: `Decentralized ${prompt} Unit`, symbol: `DPU`, description: `A community-driven token for decentralized ${prompt} applications.` },
  ];
  return suggestions[Math.floor(Math.random() * suggestions.length)];
};

const validateAiInput = async (field: string, value: string | number) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
  if (field === 'tokenSupply' && typeof value === 'number' && value < 1000) {
    return "AI Suggestion: A minimum supply of 1,000 tokens is recommended for market viability.";
  }
  if (field === 'budget' && typeof value === 'number' && value < 50) {
    return "AI Insight: A budget below 50 USDC may limit the effectiveness of liquidity strategies.";
  }
  if (field === 'tokenName' && value.toString().length < 3) {
    return "AI Suggestion: Token names are typically more descriptive (3+ characters).";
  }
  if (field === 'tokenDescription' && value.toString().length < 20) {
    return "AI Suggestion: A more detailed description (20+ characters) enhances token appeal.";
  }
  return null; // No issue found
};

export function TokenLauncher() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState('9');
  const [tokenSupply, setTokenSupply] = useState('1000000');
  const [tokenDescription, setTokenDescription] = useState('');
  const [tokenImage, setTokenImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'generating' | 'success' | 'error' | 'awaiting_payment'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [txSignature, setTxSignature] = useState('');
  const [showPayModal, setShowPayModal] = useState(false);
  const [aiSuggestionLoading, setAiSuggestionLoading] = useState(false);
  const [aiNameValidation, setAiNameValidation] = useState<string | null>(null);
  const [aiDescValidation, setAiDescValidation] = useState<string | null>(null);
  const [aiSupplyValidation, setAiSupplyValidation] = useState<string | null>(null);

  const { wallet, connectWallet } = useWallet();
  const connected = !!wallet?.ethereum?.address || !!wallet?.solana?.address; // Check both wallet types
  const publicKey = wallet?.ethereum?.address || wallet?.solana?.address;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          setTokenImage(file);
          const reader = new FileReader();
          reader.onloadend = () => {
              setImagePreview(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const handleGenerateAiSuggestions = useCallback(async () => {
    if (!tokenName) {
        setStatus('error');
        setStatusMessage('Please enter a base name for AI suggestions.');
        return;
    }
    setAiSuggestionLoading(true);
    setStatus('generating');
    setStatusMessage('Generating AI suggestions for your token...');
    const suggestion = await generateAiTokenSuggestions(tokenName);
    setTokenName(suggestion.name);
    setTokenSymbol(suggestion.symbol);
    setTokenDescription(suggestion.description);
    setAiSuggestionLoading(false);
    setStatus('idle');
    setStatusMessage('');
  }, [tokenName]);

  const validateField = useCallback(async (field: string, value: string | number) => {
      const message = await validateAiInput(field, value);
      if (field === 'tokenName') setAiNameValidation(message);
      if (field === 'tokenDescription') setAiDescValidation(message);
      if (field === 'tokenSupply') setAiSupplyValidation(message);
  }, []);

  const executeLaunch = async () => {
      setStatus('generating');
      
      setStatusMessage('Uploading token metadata to Arweave...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      const metadataUri = `https://arweave.net/${Math.random().toString(36).substring(2, 15)}`;
      console.log('Metadata URI:', metadataUri);

      setStatusMessage('Creating token mint account on Solana...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      const mintAccount = `mint_${Math.random().toString(36).substring(2, 15)}`;
      console.log('Mint Account:', mintAccount);

      setStatusMessage('Creating your personal token account...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      const tokenAccount = `token_acct_${Math.random().toString(36).substring(2, 15)}`;
      console.log('Token Account:', tokenAccount);

      setStatusMessage(`Minting ${tokenSupply} ${tokenSymbol} tokens...`);
      await new Promise(resolve => setTimeout(resolve, 3000));
      const fakeSignature = `sig_${Math.random().toString(36).substring(2, 15)}`;
      console.log('Transaction Signature:', fakeSignature);

      setTxSignature(fakeSignature);
      setStatus('success');
      setStatusMessage(`Token ${tokenName} launched successfully!`);
  }

  const handleLaunch = async () => {
      if (!connected) {
        setStatus('error');
        setStatusMessage('Please connect your wallet first.');
        return;
      }
      
      // AI pre-validation check before attempting launch
      await validateField('tokenName', tokenName);
      await validateField('tokenDescription', tokenDescription);
      await validateField('tokenSupply', Number(tokenSupply));

      if (aiNameValidation || aiDescValidation || aiSupplyValidation) {
          setStatus('error');
          setStatusMessage('Please address AI suggestions before launching.');
          return;
      }

      const paymentRequired = true; // For demonstration, replace with actual logic

      if (paymentRequired) {
          setShowPayModal(true);
          setStatus('awaiting_payment');
          setStatusMessage('Awaiting payment confirmation to launch token.');
          return;
      }
      executeLaunch();
  };

  const handlePaymentConfirmed = () => {
      setShowPayModal(false);
      setStatus('idle');
      executeLaunch();
  }

  const renderStatus = () => {
      switch(status) {
          case 'generating': return <div className="flex items-center gap-2"><Loader2 className="animate-spin w-5 h-5" /> {statusMessage}</div>;
          case 'success': return <div className="flex items-center gap-2 text-green-500"><CheckCircle className="w-5 h-5"/> {statusMessage}</div>;
          case 'error': return <div className="flex items-center gap-2 text-red-500"><XCircle className="w-5 h-5" /> {statusMessage}</div>;
          case 'awaiting_payment': return <div className="flex items-center gap-2"><Wallet className="w-5 h-5 animate-pulse" /> {statusMessage}</div>;
          default: return null;
      }
  }

  const resetForm = () => {
      setTokenName('');
      setTokenSymbol('');
      setTokenDecimals('9');
      setTokenSupply('1000000');
      setTokenDescription('');
      setTokenImage(null);
      setImagePreview(null);
      setStatus('idle');
      setStatusMessage('');
      setTxSignature('');
      setShowPayModal(false);
      setAiNameValidation(null);
      setAiDescValidation(null);
      setAiSupplyValidation(null);
  }

  if (status === 'success') {
      return (
          <Card className="max-w-4xl mx-auto p-8">
              <CardHeader className="text-center border-b pb-6 mb-6">
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1}} className="mx-auto bg-green-500/10 rounded-full w-28 h-28 flex items-center justify-center mb-4">
                    <CheckCircle className="w-20 h-20 text-green-500" />
                  </motion.div>
                  <CardTitle className="text-3xl font-headline mt-4">Launch Successful!</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">Your AI-designed token <span className="font-bold text-primary">{tokenName} ({tokenSymbol})</span> has been deployed on Solana.</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                 <p className="text-base text-muted-foreground">
                     View your transaction on the Solana explorer:
                 </p>
                 <a href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`} target="_blank" rel="noopener noreferrer" className="font-mono text-sm p-3 bg-card-foreground/10 rounded-md break-all inline-block hover:underline transition-all">
                     {txSignature}
                 </a>
                 <div className="flex justify-center gap-4 mt-8">
                    <Button onClick={resetForm} variant="outline" className="text-base py-6 px-8">Create Another Token</Button>
                    <Button asChild className="text-base py-6 px-8">
                        <Link href="/dashboard/portfolio">View My Portfolio <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                 </div>
              </CardContent>
          </Card>
      )
  }

  return (
    <Card className="max-w-4xl mx-auto p-8">
        <CardHeader className="border-b pb-6 mb-6">
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-3xl font-headline">AI-Assisted Token Configuration</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground mt-2">Let our AI guide you in defining and launching your new SPL token on Solana. Precision, powered by intelligence.</CardDescription>
                </div>
                 {connected ? (
                    <div className="text-sm text-muted-foreground bg-primary/10 text-primary-foreground p-2 rounded-md flex items-center gap-2">
                        <Wallet className="h-4 w-4" /> Connected: {publicKey?.slice(0, 6)}...{publicKey?.slice(-4)}
                    </div>
                ) : (
                    <Button onClick={connectWallet} className="text-base py-5 px-7"><Wallet className="mr-2 h-4 w-4" />Connect Wallet</Button>
                )}
            </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
                 <div className="space-y-2">
                    <Label htmlFor="token-name" className="text-base text-foreground">Token Name</Label>
                    <Input 
                        id="token-name" 
                        placeholder="e.g., Quantum Legacy Token"
                        value={tokenName} 
                        onChange={e => {
                            setTokenName(e.target.value);
                            validateField('tokenName', e.target.value);
                        }}
                        className="text-base"
                    />
                    {aiNameValidation && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm mt-1 flex items-center gap-1"><Bot className="w-4 h-4"/> {aiNameValidation}</motion.p>}
                 </div>
                <div className="space-y-2">
                    <Label htmlFor="token-symbol" className="text-base text-foreground">Symbol</Label>
                    <Input id="token-symbol" placeholder="e.g., QLT" value={tokenSymbol} onChange={e => setTokenSymbol(e.target.value)} className="text-base" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="token-decimals" className="text-base text-foreground">Decimals</Label>
                        <Input id="token-decimals" type="number" value={tokenDecimals} onChange={e => setTokenDecimals(e.target.value)} className="text-base" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="token-supply" className="text-base text-foreground">Total Supply</Label>
                        <Input 
                            id="token-supply" 
                            type="number" 
                            placeholder="e.g., 1000000"
                            value={tokenSupply} 
                            onChange={e => {
                                setTokenSupply(e.target.value);
                                validateField('tokenSupply', Number(e.target.value));
                            }}
                            className="text-base"
                        />
                        {aiSupplyValidation && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm mt-1 flex items-center gap-1"><Bot className="w-4 h-4"/> {aiSupplyValidation}</motion.p>}
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="token-description" className="text-base text-foreground">Description</Label>
                    <Textarea 
                        id="token-description" 
                        placeholder="Describe your token's purpose, utility, and vision. (AI can help here!)" 
                        value={tokenDescription} 
                        onChange={e => {
                            setTokenDescription(e.target.value);
                            validateField('tokenDescription', e.target.value);
                        }}
                        rows={4}
                        className="text-base"
                    />
                    {aiDescValidation && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm mt-1 flex items-center gap-1"><Bot className="w-4 h-4"/> {aiDescValidation}</motion.p>}
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleGenerateAiSuggestions} 
                        disabled={aiSuggestionLoading || !tokenName} 
                        className="mt-2 text-xs h-8 px-3"
                    >
                        {aiSuggestionLoading ? (<Loader2 className="mr-2 h-3 w-3 animate-spin" />) : (<Lightbulb className="mr-2 h-3 w-3" />)} 
                        AI Suggest Name & Description
                    </Button>
                 </div>
            </div>
            <div className="space-y-4 flex flex-col items-center justify-center p-4 border border-dashed border-border/50 rounded-lg bg-muted/10">
                <Label htmlFor="token-image" className="w-full h-full cursor-pointer flex flex-col items-center justify-center">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Token Preview" className="w-40 h-40 rounded-full object-cover border-2 border-primary/20 shadow-md" />
                    ) : (
                        <div className="text-muted-foreground flex flex-col items-center p-6">
                            <Upload className="w-16 h-16 mb-4 text-primary" />
                            <p className="font-bold text-base text-foreground">Upload Token Image</p>
                            <p className="text-xs mt-1">PNG, JPG, GIF up to 5MB</p>
                        </div>
                    )}
                </Label>
                <Input id="token-image" type="file" className="hidden" onChange={handleImageChange} accept="image/png, image/jpeg, image/gif" />
            </div>
        </CardContent>
        <CardFooter className="flex flex-col items-end gap-6 pt-6 border-t mt-6">
             <AnimatePresence>
                {status !== 'idle' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full text-center p-3 rounded-lg bg-card-foreground/5 text-sm">
                       {renderStatus()}
                    </motion.div>
                )}
            </AnimatePresence>
            <Button 
                size="lg" 
                onClick={handleLaunch} 
                disabled={!tokenName || !tokenSymbol || !connected || status === 'generating' || status === 'awaiting_payment' || aiNameValidation !== null || aiDescValidation !== null || aiSupplyValidation !== null}
                className="text-base py-6 px-9 group"
            >
                {status === 'generating' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Rocket className="mr-2 h-5 w-5" />} 
                Launch Your AI-Native Token
            </Button>
        </CardFooter>

        {/* PayModal Integration */}
        <AnimatePresence>
            {showPayModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                >
                    <Card className="p-6 relative max-w-lg w-full">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground" 
                            onClick={() => { setShowPayModal(false); setStatus('idle'); setStatusMessage(''); }}
                        >
                            <XCircle className="w-6 h-6" />
                        </Button>
                        <PayModal usageTag="TOKEN_LAUNCH" onPaymentConfirmed={handlePaymentConfirmed} />
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>

    </Card>
  );
}

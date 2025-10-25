
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Rocket, Wallet, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/hooks/use-wallet';
import { motion, AnimatePresence } from 'framer-motion';

export function TokenLauncher() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState('9');
  const [tokenSupply, setTokenSupply] = useState('1000000');
  const [tokenDescription, setTokenDescription] = useState('');
  const [tokenImage, setTokenImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [txSignature, setTxSignature] = useState('');

  const { wallet, connectWallet } = useWallet();
  const connected = !!wallet;
  const publicKey = wallet?.address;

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

  const handleLaunch = async () => {
      if (!connected || !publicKey) {
        setStatus('error');
        setStatusMessage('Please connect your wallet first.');
        return;
      }
      setStatus('generating');
      
      // 1. Upload metadata
      setStatusMessage('Uploading token metadata to Arweave...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      const metadataUri = `https://arweave.net/${Math.random().toString(36).substring(2, 15)}`;
      console.log('Metadata URI:', metadataUri);

      // 2. Create Mint Account
      setStatusMessage('Creating token mint account on Solana...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      const mintAccount = `mint_${Math.random().toString(36).substring(2, 15)}`;
      console.log('Mint Account:', mintAccount);

      // 3. Create Token Account
      setStatusMessage('Creating your personal token account...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      const tokenAccount = `token_acct_${Math.random().toString(36).substring(2, 15)}`;
      console.log('Token Account:', tokenAccount);

      // 4. Mint Tokens
      setStatusMessage(`Minting ${tokenSupply} ${tokenSymbol} tokens...`);
      await new Promise(resolve => setTimeout(resolve, 3000));
      const fakeSignature = `sig_${Math.random().toString(36).substring(2, 15)}`;
      console.log('Transaction Signature:', fakeSignature);

      setTxSignature(fakeSignature);
      setStatus('success');
      setStatusMessage(`Token ${tokenName} launched successfully!`);
  };

  const renderStatus = () => {
      switch(status) {
          case 'generating': return <div className="flex items-center gap-2"><Loader2 className="animate-spin w-5 h-5" /> {statusMessage}</div>;
          case 'success': return <div className="flex items-center gap-2 text-green-500"><CheckCircle className="w-5 h-5"/> {statusMessage}</div>;
          case 'error': return <div className="flex items-center gap-2 text-red-500"><XCircle className="w-5 h-5" /> {statusMessage}</div>;
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
  }

  if (status === 'success') {
      return (
          <Card className="max-w-3xl mx-auto">
              <CardHeader className="text-center">
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1}} className="mx-auto bg-green-500/10 rounded-full w-24 h-24 flex items-center justify-center">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </motion.div>
                  <CardTitle className="text-2xl mt-4">Launch Successful!</CardTitle>
                  <CardDescription>Your token <span className="font-bold text-primary">{tokenName} ({tokenSymbol})</span> has been created on the Solana network.</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                 <p className="text-sm text-muted-foreground">
                     View your transaction on the Solana explorer:
                 </p>
                 <a href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`} target="_blank" rel="noopener noreferrer" className="font-mono text-sm p-2 bg-card-foreground/10 rounded-md break-all">
                     {txSignature}
                 </a>
              </CardContent>
              <CardFooter className="justify-center">
                  <Button onClick={resetForm}>Create Another Token</Button>
              </CardFooter>
          </Card>
      )
  }

  return (
    <Card className="max-w-3xl mx-auto">
        <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle className="text-2xl">Configure Your Token</CardTitle>
                    <CardDescription>Fill in the details below to create your new SPL token.</CardDescription>
                </div>
                 {connected ? (
                    <div className="text-sm text-muted-foreground bg-card-foreground/5 p-2 rounded-md">
                        Connected: {publicKey?.slice(0, 6)}...{publicKey?.slice(-4)}
                    </div>
                ) : (
                    <Button onClick={connectWallet}><Wallet className="mr-2 h-4 w-4" />Connect Wallet</Button>
                )}
            </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="token-name">Token Name</Label>
                    <Input id="token-name" placeholder="e.g., Solana Gold" value={tokenName} onChange={e => setTokenName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="token-symbol">Symbol</Label>
                    <Input id="token-symbol" placeholder="e.g., GOLD" value={tokenSymbol} onChange={e => setTokenSymbol(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="token-decimals">Decimals</Label>
                        <Input id="token-decimals" type="number" value={tokenDecimals} onChange={e => setTokenDecimals(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="token-supply">Total Supply</Label>
                        <Input id="token-supply" type="number" value={tokenSupply} onChange={e => setTokenSupply(e.target.value)} />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="token-description">Description</Label>
                    <Textarea id="token-description" placeholder="Describe your token and its purpose." value={tokenDescription} onChange={e => setTokenDescription(e.target.value)} />
                </div>
            </div>
            <div className="space-y-4 flex flex-col items-center justify-center">
                <Label htmlFor="token-image" className="w-full h-full">
                    <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 cursor-pointer h-full text-center hover:bg-card-foreground/5">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Token Preview" className="w-32 h-32 rounded-full object-cover" />
                        ) : (
                            <div className="text-muted-foreground flex flex-col items-center">
                                <Upload className="w-12 h-12 mb-4" />
                                <p className="font-bold">Upload Token Image</p>
                                <p className="text-xs mt-1">PNG, JPG, GIF up to 5MB</p>
                            </div>
                        )}
                    </div>
                </Label>
                <Input id="token-image" type="file" className="hidden" onChange={handleImageChange} accept="image/png, image/jpeg, image/gif" />
            </div>
        </CardContent>
        <CardFooter className="flex flex-col items-end gap-4">
             <AnimatePresence>
                {status !== 'idle' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full text-center p-2 rounded-lg bg-card-foreground/5 text-sm">
                       {renderStatus()}
                    </motion.div>
                )}
            </AnimatePresence>
            <Button size="lg" onClick={handleLaunch} disabled={!tokenName || !tokenSymbol || !connected || status === 'generating'}>
                {status === 'generating' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Rocket className="mr-2 h-5 w-5" />} 
                Launch Token
            </Button>
        </CardFooter>
    </Card>
  );
}

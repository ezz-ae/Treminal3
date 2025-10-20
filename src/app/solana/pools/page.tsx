
'use client';

import { GanttChartSquare, PlayCircle, Terminal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomCodeBlock } from '@/components/ui/code-block';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const createPoolScript = `
import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';
import { Liquidity, Token } from '@raydium-io/raydium-sdk';
import { Wallet } from '@project-serum/anchor';
import bs58 from 'bs58';

// --- Configuration ---
const RPC_URL = 'https://api.mainnet-beta.solana.com';
const WALLET_PRIVATE_KEY = 'YOUR_WALLET_PRIVATE_KEY'; // Replace with your actual private key

const BASE_TOKEN_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC
const QUOTE_TOKEN_MINT = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'; // BONK

const LP_AMOUNT_BASE = 100; // Amount of USDC to add
const LP_AMOUNT_QUOTE = 50000000; // Amount of BONK to add

// --- Execution ---
async function createAndAddLiquidity() {
    const connection = new Connection(RPC_URL, 'confirmed');
    const owner = Keypair.fromSecretKey(bs58.decode(WALLET_PRIVATE_KEY));
    const wallet = new Wallet(owner);

    console.log('Wallet loaded:', wallet.publicKey.toBase58());

    const baseToken = await Token.fetch(connection, new PublicKey(BASE_TOKEN_MINT));
    const quoteToken = await Token.fetch(connection, new PublicKey(QUOTE_TOKEN_MINT));

    console.log('Creating liquidity pool for', baseToken.symbol, 'and', quoteToken.symbol);

    const { transaction, signers } = await Liquidity.makeCreatePoolTransaction({
        connection,
        programId: Liquidity.getProgramId(4), // Or use the appropriate version
        baseMint: baseToken.mint,
        quoteMint: quoteToken.mint,
        baseDecimals: baseToken.decimals,
        quoteDecimals: quoteToken.decimals,
        marketId: 'Associated Market ID', // You need to create this first on OpenBook/Serum
        baseAmount: new BN(LP_AMOUNT_BASE * (10 ** baseToken.decimals)),
        quoteAmount: new BN(LP_AMOUNT_QUOTE * (10 ** quoteToken.decimals)),
        owner: wallet.publicKey,
    });
    
    // Sign and send the transaction
    const txSignature = await connection.sendTransaction(transaction, [...signers, owner], {
        skipPreflight: true,
    });

    console.log('Transaction sent with signature:', txSignature);
    await connection.confirmTransaction(txSignature, 'confirmed');
    console.log('Liquidity pool created and liquidity added successfully!');

    return txSignature;
}

createAndAddLiquidity().catch(err => console.error(err));
`;

const mockOutput = [
    'Wallet loaded: Df...u7',
    'Creating liquidity pool for USDC and BONK',
    'Fetching market information...',
    'Constructing create pool transaction...',
    'Transaction sent with signature: 5hT8Y...pL9e',
    'Confirming transaction...',
    'Confirmation received. Block: 234567890',
    'Liquidity pool created and liquidity added successfully!',
    'Pool Address: 7g...Zk',
];


export default function SolanaPoolsPage() {
    const [isRunning, setIsRunning] = useState(false);
    const [outputLines, setOutputLines] = useState<string[]>([]);

    const handleRunScript = () => {
        setIsRunning(true);
        setOutputLines([]);
        
        let lineIndex = 0;
        const interval = setInterval(() => {
            if (lineIndex < mockOutput.length) {
                setOutputLines(prev => [...prev, mockOutput[lineIndex]]);
                lineIndex++;
            } else {
                clearInterval(interval);
                setIsRunning(false);
            }
        }, 300);
    }


  return (
    <div className="space-y-8">
       <header>
            <h1 className="text-4xl font-bold font-headline flex items-center gap-3">
                <GanttChartSquare className="w-10 h-10 text-primary" />
                Liquidity Pools & Scripts
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
                Manage liquidity and execute powerful on-chain scripts.
            </p>
        </header>

        <Card>
             <CardHeader>
                <CardTitle>Create New Liquidity Pool</CardTitle>
                <CardDescription>
                    This script creates a new liquidity pool on a decentralized exchange like Raydium for a given pair of tokens.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold mb-2">Script Code</h3>
                        <CustomCodeBlock code={createPoolScript} language="typescript" />
                        <Button className="w-full mt-4" onClick={handleRunScript} disabled={isRunning}>
                            <PlayCircle className="mr-2"/> {isRunning ? 'Running Script...' : 'Run Script'}
                        </Button>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Simulated Output</h3>
                        <div className="bg-card-foreground/5 p-4 rounded-lg font-mono text-xs h-[400px] overflow-y-auto flex flex-col-reverse">
                           <AnimatePresence>
                                {outputLines.slice().reverse().map((line, index) => (
                                    <motion.div 
                                        key={outputLines.length - index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex items-center gap-2"
                                    >
                                        <Terminal className="w-3 h-3 text-primary shrink-0"/>
                                        <span>{line}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                             {isRunning && outputLines.length === 0 && <p>Starting script execution...</p>}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}

    
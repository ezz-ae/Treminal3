
'use server';

import { z } from 'zod';
import { Connection, PublicKey, Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint } from '@solana/spl-token';
import { Metaplex, keypairIdentity, bundlrStorage } from '@metaplex-foundation/js';

const CreateTokenSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  decimals: z.number(),
  supply: z.number(),
  walletAddress: z.string(),
});

// This is a placeholder for a secure way to get a payer keypair.
// In a real production app, this should be handled by a secure key management service.
// For this example, we're generating a new keypair, which will need to be funded on the devnet.
const getPayer = () => {
    // For demonstration, we're creating a new keypair. 
    // You would replace this with your actual server-side wallet.
    // IMPORTANT: Never expose private keys in client-side code.
    const privateKeyString = process.env.SOLANA_PAYER_PRIVATE_KEY;
    if (!privateKeyString) {
        throw new Error('Server payer private key not configured. Please set SOLANA_PAYER_PRIVATE_KEY env variable.');
    }
    const privateKey = Uint8Array.from(JSON.parse(privateKeyString));
    return Keypair.fromSecretKey(privateKey);
};


export async function createToken(formData: z.infer<typeof CreateTokenSchema>) {
  try {
    const validation = CreateTokenSchema.safeParse(formData);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }

    const { name, symbol, description, imageUrl, decimals, supply, walletAddress } = validation.data;
    const userPublicKey = new PublicKey(walletAddress);

    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_HOST! || 'https://api.devnet.solana.com', 'confirmed');
    const payer = getPayer();
    
    console.log('--- Payer public key:', payer.publicKey.toBase58());
    console.log('--- User public key:', userPublicKey.toBase58());

    const metaplex = Metaplex.make(connection)
      .use(keypairIdentity(payer))
      .use(bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: connection.rpcEndpoint,
        timeout: 60000,
      }));

    const mintKeypair = Keypair.generate();
    const mint = mintKeypair.publicKey;
    
    console.log('--- New mint address:', mint.toBase58());

    const { uri: metadataUri } = await metaplex.nfts().uploadMetadata({
        name,
        symbol,
        description,
        image: imageUrl,
    });
    
    console.log('--- Metadata uploaded to:', metadataUri);

    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const createMintTx = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: mint,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        mint, 
        decimals, 
        userPublicKey, // Mint Authority
        userPublicKey  // Freeze Authority
      )
    );
    
    const signature = await connection.sendTransaction(createMintTx, [payer, mintKeypair]);
    await connection.confirmTransaction(signature, 'confirmed');

    console.log('--- Mint creation transaction signature:', signature);
    
    return { success: true, signature, mintAddress: mint.toBase58() };

  } catch (error) {
    console.error('Token creation failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}

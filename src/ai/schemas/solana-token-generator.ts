
import { z } from 'zod';

export const SolanaTokenGeneratorInputSchema = z.object({
  name: z.string().min(3, 'Token name must be at least 3 characters.'),
  symbol: z.string().min(2, 'Symbol must be 2-6 characters.').max(6, 'Symbol must be 2-6 characters.'),
  supply: z.coerce.number().min(1, 'Supply must be at least 1.'),
  decimals: z.coerce.number().min(0, 'Decimals cannot be negative.').max(9, 'Solana tokens should not have more than 9 decimals.'),
  description: z.string().min(20, 'Please describe your token in at least 20 characters.'),
  imageUrl: z.string().optional().describe('URL of the token image.'),
});
export type SolanaTokenGeneratorInput = z.infer<typeof SolanaTokenGeneratorInputSchema>;

export const SolanaTokenGeneratorOutputSchema = z.object({
  twitter: z.string().describe('A tweet to announce the new token launch.'),
  telegram: z.string().describe('A Telegram announcement for the community.'),
  description: z.string().describe('A summary for websites like CoinGecko or Jupiter.'),
  imageUrl: z.string().describe('URL of the AI-generated token image as a base64 data URI.'),
  tokenAddress: z.string().describe('The mock address of the newly created SPL token.'),
  signature: z.string().describe('The mock signature of the creation transaction.'),
});
export type SolanaTokenGeneratorOutput = z.infer<typeof SolanaTokenGeneratorOutputSchema>;

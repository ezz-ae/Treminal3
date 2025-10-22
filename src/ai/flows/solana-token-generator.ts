
'use server';
/**
 * @fileOverview An AI agent that generates SPL tokens on Solana and provides marketing assets.
 */

import { ai } from '@/ai/genkit';
import { SolanaTokenGeneratorInputSchema, SolanaTokenGeneratorOutput, SolanaTokenGeneratorOutputSchema, SolanaTokenGeneratorInput } from '@/ai/schemas/solana-token-generator';
import { z } from 'zod';

const MarketingCopySchema = z.object({
    twitter: z.string().describe("A punchy and engaging tweet to announce the new token launch."),
    telegram: z.string().describe("A slightly more detailed and community-focused announcement for a Telegram group."),
    description: z.string().describe("A one-paragraph summary of the token's concept and purpose."),
});

const tokenGenerationPrompt = ai.definePrompt({
  name: 'solanaTokenGeneratorPrompt',
  input: { schema: z.object({
    name: z.string(),
    symbol: z.string(),
    description: z.string(),
    supply: z.number(),
  })},
  output: { schema: MarketingCopySchema },
  prompt: `You are a Web3 marketing expert specializing in Solana token launches. Based on the user's token concept, generate a set of marketing materials to build hype.

**Token Concept:**
- **Name:** {{name}}
- **Symbol:** {{symbol}}
- **Total Supply:** {{supply}}
- **Description:** {{description}}

Your task is to generate:
1.  A punchy tweet for the official launch announcement.
2.  A more detailed Telegram announcement for the community.
3.  A one-paragraph summary description for websites like CoinGecko or Jupiter.

Provide your response in the specified JSON format.
`,
});

export async function generateSolanaToken(input: SolanaTokenGeneratorInput): Promise<SolanaTokenGeneratorOutput> {
    
    // 1. Generate the token image
    const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: `Create a cinematic, visually appealing logo for a new Solana cryptocurrency token.

**Token Details:**
- **Name:** ${input.name}
- **Symbol:** ${input.symbol}
- **Concept:** ${input.description}

**Style Guidelines:**
- **Theme:** Modern, sleek, professional.
- **Imagery:** Abstract is preferred. It could be related to the token's name or concept, but should not be too literal.
- **Color Palette:** Use a vibrant and professional color scheme.
- **Output:** The logo should be centered on a clean, dark background.

Do not include any text or letters in the image.
`,
    });

    if (!media?.url) {
        throw new Error('Failed to generate token image.');
    }
    
    // 2. Generate the marketing copy
    const { output: marketingCopy } = await tokenGenerationPrompt(input);

    if (!marketingCopy) {
        throw new Error("Failed to generate marketing copy.");
    }
    
    // 3. Simulate the on-chain creation (mock data)
    const mockTokenAddress = `TKN_${input.symbol}_${Math.random().toString(36).substring(2, 9)}`;
    const mockSignature = `5j5q...${Math.random().toString(36).substring(2, 12)}`;

    return {
        ...marketingCopy,
        imageUrl: media.url,
        tokenAddress: mockTokenAddress,
        signature: mockSignature,
    };
}

    

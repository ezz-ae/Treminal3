
'use server';
/**
 * @fileOverview An AI agent that plans dApp construction.
 *
 * - generateDapp - A function that handles the dApp building process.
 * - DappBuilderInput - The input type for the generateDapp function.
 * - DappBuilderOutput - The return type for the generateDapp function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const DappBuilderInputSchema = z.object({
  description: z.string().describe('The description of the dApp to build.'),
});
export type DappBuilderInput = z.infer<typeof DappBuilderInputSchema>;

export const DappBuilderOutputSchema = z.object({
  name: z.string().describe("A creative and fitting name for the dApp."),
  description: z.string().describe("A short, one-sentence description of the dApp."),
  components: z.array(z.string()).describe("A list of front-end components needed for the dApp (e.g., 'NFT Grid', 'Connect Wallet Button', 'Minting Form')."),
  contracts: z.array(z.string()).describe("A list of smart contracts required for the dApp (e.g., 'ERC721', 'Marketplace', 'RoyaltyContract')."),
});
export type DappBuilderOutput = z.infer<typeof DappBuilderOutputSchema>;


export async function generateDapp(input: DappBuilderInput): Promise<DappBuilderOutput> {
  return dappBuilderFlow(input);
}

const dappBuilderFlow = ai.defineFlow(
  {
    name: 'dappBuilderFlow',
    inputSchema: DappBuilderInputSchema,
    outputSchema: DappBuilderOutputSchema,
  },
  async (input) => {
    const prompt = `You are an expert Web3 architect. A user wants to build a decentralized application. Based on their description, generate a plan for them.

Business Description:
${input.description}

Your task is to generate:
1.  A creative and fitting name for the dApp.
2.  A short, one-sentence description of what it does.
3.  A list of the essential front-end UI components required.
4.  A list of the necessary smart contracts.

Provide your response in the specified JSON format.
`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.0-flash',
      output: {
        schema: DappBuilderOutputSchema,
      },
    });

    const output = llmResponse.output();
    if (!output) {
      throw new Error("Failed to generate dApp plan.");
    }
    return output;
  }
);

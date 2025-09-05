
'use server';
/**
 * @fileOverview An AI agent that plans dApp construction.
 *
 * - generateDapp - A function that handles the dApp building process.
 */

import { ai } from '@/ai/genkit';
import { DappBuilderInput, DappBuilderInputSchema, DappBuilderOutput, DappBuilderOutputSchema } from '@/ai/schemas/dapp-builder';


export async function generateDapp(input: DappBuilderInput): Promise<DappBuilderOutput> {
  return dappBuilderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dappArchitect',
  input: { schema: DappBuilderInputSchema },
  output: { schema: DappBuilderOutputSchema },
  prompt: `You are an expert Web3 architect. A user wants to build a decentralized application. Based on their description, generate a plan for them.

Business Description:
{{description}}

Your task is to generate:
1.  A creative and fitting name for the dApp.
2.  A short, one-sentence description of what it does.
3.  A list of the essential front-end UI components required.
4.  A list of the necessary smart contracts.

Provide your response in the specified JSON format.
`,
});

const dappBuilderFlow = ai.defineFlow(
  {
    name: 'dappBuilderFlow',
    inputSchema: DappBuilderInputSchema,
    outputSchema: DappBuilderOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);

    if (!output) {
      throw new Error("Failed to generate dApp plan.");
    }
    return output;
  }
);

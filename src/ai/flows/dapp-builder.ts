
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
  prompt: `You are an expert Web3 architect. A user wants to build a decentralized application. Based on their structured input, generate a plan for them.

**User's dApp Plan:**
- **dApp Name:** {{name}}
- **Core Idea:** {{coreIdea}}
- **Key Features:** {{#each features}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- **Target Industry:** {{industry}}

**Your Task:**
1.  **Use dApp Name**: Use the provided name: **{{name}}**. If it's generic, you can suggest a more creative alternative, but use the user's name in the final output.
2.  **Description**: Write a short, one-sentence description of what the dApp does, based on the core idea and features.
3.  **UI Components**: List the essential front-end UI components required to build the specified features (e.g., 'NFT Grid', 'Connect Wallet Button', 'Staking Dashboard', 'Proposal Voting Form').
4.  **Smart Contracts**: List the necessary smart contracts, referencing standard patterns where applicable (e.g., 'ERC721 Contract for NFTs', 'Marketplace Contract (for listings and sales)', 'Staking Contract (for rewards)', 'Governor Contract (for voting)').

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

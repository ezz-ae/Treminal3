
'use server';
/**
 * @fileOverview An AI agent that plans DAO governance structures.
 *
 * - generateDaoPlan - A function that handles the DAO planning process.
 */

import { ai } from '@/ai/genkit';
import { DaoGovernanceInput, DaoGovernanceInputSchema, DaoGovernanceOutput, DaoGovernanceOutputSchema } from '@/ai/schemas/dao-governance';


export async function generateDaoPlan(input: DaoGovernanceInput): Promise<DaoGovernanceOutput> {
  return daoGovernanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'daoGovernancePlanner',
  input: { schema: DaoGovernanceInputSchema },
  output: { schema: DaoGovernanceOutputSchema },
  prompt: `You are an expert in decentralized governance and DAO design. A user wants to create a Decentralized Autonomous Organization. Based on their description, generate a comprehensive plan.

User's Description:
{{description}}

Your task is to generate:
1.  A creative and fitting name for the DAO.
2.  A short, one-sentence description of the DAO's purpose.
3.  A recommended governance model (e.g., Token-Weighted Voting) with a brief explanation.
4.  A basic tokenomics plan, including a token name, symbol, and a summary of the initial distribution strategy.
5.  A list of recommended operational next steps to launch and manage the DAO.


Provide your response in the specified JSON format.
`,
});


const daoGovernanceFlow = ai.defineFlow(
  {
    name: 'daoGovernanceFlow',
    inputSchema: DaoGovernanceInputSchema,
    outputSchema: DaoGovernanceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("Failed to generate DAO plan.");
    }
    return output;
  }
);


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
  prompt: `You are an expert in decentralized governance and DAO design. A user wants to create a Decentralized Autonomous Organization (DAO). Based on their structured input, generate a comprehensive plan.

**User's DAO Plan:**
- **DAO Name:** {{name}}
- **DAO Mission:** {{mission}}
- **Chosen Governance Model:** {{governanceModel}}

**Your Task:**
1.  **Adopt DAO Name:** Use the provided name: **{{name}}**.
2.  **DAO Description:** Write a short, one-sentence description of the DAO's purpose based on its mission.
3.  **Governance Model Explanation:** Briefly explain the user's chosen model ({{governanceModel}}) and why it's a good fit for their mission.
4.  **Tokenomics Plan:**
    *   Create a fitting token name and symbol for the DAO.
    *   Outline a basic initial distribution strategy for the token (e.g., airdrop to early community, treasury allocation, team share).
5.  **Operational Next Steps:** Provide a list of recommended next steps to launch and manage the DAO based on their plan.

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


import { z } from 'zod';

export const DaoGovernanceInputSchema = z.object({
  description: z.string().describe("The user's description of the DAO they want to create."),
});
export type DaoGovernanceInput = z.infer<typeof DaoGovernanceInputSchema>;

export const DaoGovernanceOutputSchema = z.object({
  name: z.string().describe("A creative and fitting name for the DAO."),
  description: z.string().describe("A short, one-sentence description of the DAO's purpose."),
  governanceModel: z.object({
    name: z.string().describe("The name of the governance model (e.g., 'Token-Weighted Voting', 'One-Person-One-Vote')."),
    description: z.string().describe("A description of how the governance model works."),
  }),
  tokenomics: z.object({
    tokenName: z.string().describe("The name of the DAO's governance token."),
    tokenSymbol: z.string().describe("The symbol for the governance token."),
    initialDistribution: z.string().describe("A description of how the initial tokens will be distributed."),
  }),
  operationalPlan: z.array(z.string()).describe("A list of recommended next steps to launch and manage the DAO."),
});
export type DaoGovernanceOutput = z.infer<typeof DaoGovernanceOutputSchema>;

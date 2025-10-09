
import { z } from 'zod';

export const DappBuilderInputSchema = z.object({
  name: z.string().describe("The name of the dApp."),
  coreIdea: z.string().describe('The core idea of the dApp to build.'),
  features: z.array(z.string()).describe("A list of features for the dApp."),
  industry: z.string().describe("The target industry for the dApp."),
});
export type DappBuilderInput = z.infer<typeof DappBuilderInputSchema>;

export const DappBuilderOutputSchema = z.object({
  name: z.string().describe("A creative and fitting name for the dApp."),
  description: z.string().describe("A short, one-sentence description of the dApp."),
  components: z.array(z.string()).describe("A list of front-end components needed for the dApp (e.g., 'NFT Grid', 'Connect Wallet Button', 'Minting Form')."),
  contracts: z.array(z.string()).describe("A list of smart contracts required for the dApp (e.g., 'ERC721', 'Marketplace', 'RoyaltyContract')."),
});
export type DappBuilderOutput = z.infer<typeof DappBuilderOutputSchema>;

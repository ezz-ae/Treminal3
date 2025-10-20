
import { z } from 'zod';

export const TokenGeneratorInputSchema = z.object({
  name: z.string().describe("The name of the token (e.g., 'My Token')."),
  symbol: z.string().describe("The symbol of the token (e.g., 'MTK')."),
  supply: z.number().describe("The initial and total supply of the token."),
  features: z.array(z.string()).describe("A list of features to include in the token contract (e.g., 'Mintable', 'Burnable')."),
});
export type TokenGeneratorInput = z.infer<typeof TokenGeneratorInputSchema>;

export const TokenGeneratorOutputSchema = z.object({
    summary: z.string().describe("A high-level summary of the generated token contract and its features."),
    solidityCode: z.string().describe("The full Solidity code for the generated smart contract."),
});
export type TokenGeneratorOutput = z.infer<typeof TokenGeneratorOutputSchema>;

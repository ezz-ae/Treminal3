
import { z } from 'zod';

export const TokenLauncherInputSchema = z.object({
  description: z.string().describe('The user\'s description of the token they want to create.'),
});
export type TokenLauncherInput = z.infer<typeof TokenLauncherInputSchema>;

export const TokenLauncherOutputSchema = z.object({
  name: z.string().describe("The name of the token (e.g., 'Starlight')."),
  symbol: z.string().describe("The token's symbol (e.g., 'STAR')."),
  supply: z.number().describe("The total supply of the token."),
  solidityCode: z.string().describe("The complete, syntactically correct Solidity code for the ERC-20 smart contract."),
});
export type TokenLauncherOutput = z.infer<typeof TokenLauncherOutputSchema>;

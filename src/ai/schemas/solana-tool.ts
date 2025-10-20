
import { z } from 'zod';

export const SolanaToolInputSchema = z.object({
  query: z.string().describe("The user's natural language query to interact with the Solana network."),
  userWalletAddress: z.string().optional().describe("The user's connected wallet address, if available."),
});
export type SolanaToolInput = z.infer<typeof SolanaToolInputSchema>;

export const SolanaToolOutputSchema = z.object({
  result: z.string().describe("The result of the tool execution as a string."),
  toolUsed: z.string().describe("The name of the tool that was executed."),
  toolInput: z.any().describe("The input that was passed to the tool."),
});
export type SolanaToolOutput = z.infer<typeof SolanaToolOutputSchema>;

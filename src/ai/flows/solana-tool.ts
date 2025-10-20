
'use server';
/**
 * @fileOverview An AI agent that uses tools to interact with the Solana blockchain.
 *
 * - runSolanaTool - A function that interprets a natural language query and uses the appropriate tool.
 */
import { ai } from '@/ai/genkit';
import { SolanaToolInput, SolanaToolInputSchema, SolanaToolOutput, SolanaToolOutputSchema } from '@/ai/schemas/solana-tool';
import { z } from 'zod';

// Mock Tool: Get Wallet Balance
const getWalletBalance = ai.defineTool(
  {
    name: 'getWalletBalance',
    description: 'Returns the SOL balance of a given Solana wallet address.',
    inputSchema: z.object({
      address: z.string().describe('The public key of the Solana wallet.'),
    }),
    outputSchema: z.object({
        balance: z.number().describe('The wallet balance in SOL.'),
        lamports: z.number().describe('The wallet balance in lamports.'),
    }),
  },
  async (input) => {
    console.log(`TOOL: getWalletBalance called with: ${input.address}`);
    // In a real app, this would make an RPC call to the Solana network.
    const mockBalance = parseFloat((Math.random() * 100).toFixed(4));
    return {
      balance: mockBalance,
      lamports: mockBalance * 1_000_000_000,
    };
  }
);

// Mock Tool: Request Airdrop
const requestAirdrop = ai.defineTool(
  {
    name: 'requestAirdrop',
    description: 'Requests a specified amount of SOL to be airdropped to a wallet address on the devnet.',
    inputSchema: z.object({
      address: z.string().describe('The public key of the Solana wallet to receive the airdrop.'),
      amount: z.number().describe('The amount of SOL to airdrop (e.g., 1, 2). Maximum is 2.'),
    }),
    outputSchema: z.object({
        signature: z.string().describe('The transaction signature of the successful airdrop.'),
    }),
  },
  async (input) => {
    console.log(`TOOL: requestAirdrop called for ${input.address} with amount ${input.amount}`);
    // In a real app, this would make an RPC call to the Solana devnet.
     if (input.amount > 2) {
      throw new Error("Airdrop amount cannot exceed 2 SOL.");
    }
    return {
      signature: `mock_signature_${Date.now()}_${Math.random().toString(36).substring(2)}`,
    };
  }
);

// Mock Tool: Get Transaction Details
const getTransactionDetails = ai.defineTool(
    {
      name: 'getTransactionDetails',
      description: 'Fetches and describes the details of a given Solana transaction signature.',
      inputSchema: z.object({
        signature: z.string().describe('The transaction signature.'),
      }),
      outputSchema: z.object({
        slot: z.number(),
        blockTime: z.number(),
        fee: z.number(),
        status: z.string(),
        logMessages: z.array(z.string()),
      }),
    },
    async (input) => {
      console.log(`TOOL: getTransactionDetails called for signature: ${input.signature}`);
      return {
        slot: Math.floor(Math.random() * 10000000),
        blockTime: Date.now() / 1000 - Math.random() * 1000,
        fee: 5000,
        status: 'Success',
        logMessages: [
            "Program MplTokenMetadata invoke [1]",
            "Program log: Instruction: Transfer",
            "Program 11111111111111111111111111111111 invoke [2]",
            "Program 11111111111111111111111111111111 success"
        ]
      };
    }
  );


const solanaAgent = ai.definePrompt({
  name: 'solanaAgent',
  system: `You are an expert AI assistant for the Terminal3 platform, specializing in the Solana blockchain.
- Your primary function is to understand a user's natural language query and use the provided tools to interact with the Solana network.
- If the user provides a wallet address in their query, use that one.
- If the user says 'my wallet', 'my address', or similar, and a 'userWalletAddress' is provided in the input, you MUST use that address for the tool call.
- If no address is specified and 'userWalletAddress' is not available, you MUST ask the user to provide a wallet address.
- When you receive a result from a tool, present it to the user in a clear, human-readable sentence. Do not just output the raw JSON.
- For example, if getWalletBalance returns { balance: 1.23 }, respond with something like: "The balance for that wallet is 1.23 SOL."
- If requestAirdrop returns a signature, respond with: "Airdrop successful! The transaction signature is [signature]."
- Be concise and helpful.
`,
  tools: [getWalletBalance, requestAirdrop, getTransactionDetails],
  input: { schema: SolanaToolInputSchema },
  output: { schema: z.any() }, // Let the model decide the format for the final text response
});


export async function runSolanaTool(input: SolanaToolInput): Promise<SolanaToolOutput> {
    const llmResponse = await solanaAgent(input);
    const toolRequest = llmResponse.choices[0].message.toolRequest;

    if (!toolRequest) {
         return {
            result: llmResponse.text(),
            toolUsed: 'none',
            toolInput: {},
        }
    }
    
    // For this implementation, we assume only one tool is called at a time.
    const toolName = toolRequest.name;
    const toolInput = toolRequest.input;

    const toolResponse = await llamda.ai.runTool(toolRequest);

    const finalResponse = await solanaAgent(input, { toolResponse });

    return {
        result: finalResponse.text(),
        toolUsed: toolName,
        toolInput: toolInput,
    };
}

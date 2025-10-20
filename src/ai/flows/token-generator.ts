
'use server';
/**
 * @fileOverview An AI agent that generates Solidity smart contracts for fungible tokens.
 *
 * - generateTokenContract - A function that handles the token generation process.
 */

import { ai } from '@/ai/genkit';
import { TokenGeneratorInput, TokenGeneratorInputSchema, TokenGeneratorOutput, TokenGeneratorOutputSchema } from '@/ai/schemas/token-generator';

export async function generateTokenContract(input: TokenGeneratorInput): Promise<TokenGeneratorOutput> {
  return tokenGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tokenGenerator',
  input: { schema: TokenGeneratorInputSchema },
  output: { schema: TokenGeneratorOutputSchema },
  prompt: `You are an expert Solidity developer specializing in ERC-20 tokens. Based on the user's requirements, generate a secure and gas-efficient Solidity smart contract.

**User Requirements:**
- **Token Name:** {{name}}
- **Token Symbol:** {{symbol}}
- **Token Supply:** {{supply}}
- **Features:** {{#each features}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

**Your Task:**
1.  Write a Solidity ^0.8.20 smart contract for an ERC-20 token.
2.  The contract name should be the camel-cased version of the token name (e.g., "My Token" -> "MyToken").
3.  The constructor must take the name, symbol, and initial supply as arguments. The initial supply should be minted to the contract deployer.
4.  Implement the required features by importing the correct OpenZeppelin contracts.
    - 'Mintable': Use \`Ownable\` and a function \`mint(address to, uint256 amount)\` restricted to the owner.
    - 'Burnable': Use \`ERC20Burnable\`.
    - 'Pausable': Use \`Pausable\` and protect transfer functions with \`whenNotPaused\`.
    - 'Permit': Use \`ERC20Permit\`.
    - 'Votes': Use \`ERC20Votes\`.
    - 'Flash Minting': Use \`ERC20FlashMint\`.
5.  Provide a high-level summary of the generated token contract.

Provide your response in the specified JSON format. The Solidity code must be a single string with correct newlines and indentation.
`,
});


const tokenGeneratorFlow = ai.defineFlow(
  {
    name: 'tokenGeneratorFlow',
    inputSchema: TokenGeneratorInputSchema,
    outputSchema: TokenGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("Failed to generate token contract.");
    }
    return output;
  }
);

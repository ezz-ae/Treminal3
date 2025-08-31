
'use server';
/**
 * @fileOverview An AI agent that generates ERC-20 token smart contracts.
 *
 * - generateToken - A function that handles the token generation process.
 */

import { ai } from '@/ai/genkit';
import { TokenLauncherInput, TokenLauncherInputSchema, TokenLauncherOutput, TokenLauncherOutputSchema } from '@/ai/schemas/token-launcher';

export async function generateToken(input: TokenLauncherInput): Promise<TokenLauncherOutput> {
  return tokenLauncherFlow(input);
}

const tokenLauncherFlow = ai.defineFlow(
  {
    name: 'tokenLauncherFlow',
    inputSchema: TokenLauncherInputSchema,
    outputSchema: TokenLauncherOutputSchema,
  },
  async (input) => {
    const prompt = `
You are an expert Solidity developer specializing in ERC-20 tokens. A user wants to create a new cryptocurrency. Based on their description, generate a complete, secure, and deployable Solidity smart contract for an ERC-20 token.

**User's Description:**
${input.description}

**Your Task:**
1.  **Parse Details:** Extract the desired token name, symbol, and total supply from the user's description.
2.  **Generate Solidity Code:** Write a complete Solidity smart contract for the token.
    *   The contract must be compliant with the ERC-20 standard.
    *   Use a recent, secure version of Solidity (e.g., \`pragma solidity ^0.8.20;\`).
    *   Import the ERC-20 implementation from OpenZeppelin contracts (\`@openzeppelin/contracts/token/ERC20/ERC20.sol\`).
    *   The contract should be named after the token.
    *   In the constructor, mint the total supply to the deployer of the contract (\`msg.sender\`). The total supply should be calculated correctly considering the standard 18 decimals for ERC-20 tokens (i.e., \`supply * (10 ** 18)\`).
3.  **Format Output:** Provide the extracted details and the full Solidity code in the specified JSON format. Ensure the Solidity code is a single string with correct newlines.

**Example Output Structure:**
{
  "name": "Example Token",
  "symbol": "EXM",
  "supply": 1000000,
  "solidityCode": "pragma solidity ^0.8.20;\\n\\nimport \\"@openzeppelin/contracts/token/ERC20/ERC20.sol\\";\\n\\ncontract ExampleToken is ERC20 {\\n    constructor() ERC20(\\"Example Token\\", \\"EXM\\") {\\n        _mint(msg.sender, 1000000 * (10 ** 18));\\n    }\\n}"
}
`;

    const { output } = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.0-flash',
      output: {
        schema: TokenLauncherOutputSchema,
      },
    });

    if (!output) {
      throw new Error("Failed to generate token contract. The AI model did not return a valid plan.");
    }
    return output;
  }
);

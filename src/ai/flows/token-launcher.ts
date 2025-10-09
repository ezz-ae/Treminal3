
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

const prompt = ai.definePrompt({
  name: 'tokenContractGenerator',
  input: { schema: TokenLauncherInputSchema },
  output: { schema: TokenLauncherOutputSchema },
  prompt: `
You are an expert Solidity developer specializing in ERC-20 tokens. A user wants to create a new cryptocurrency based on the following structured inputs. Generate a complete, secure, and deployable Solidity smart contract.

**User's Token Specification:**
- **Token Name:** {{name}}
- **Token Symbol:** {{symbol}}
- **Total Supply:** {{supply}}
- **Is Mintable?** {{isMintable}}
- **Is Burnable?** {{isBurnable}}

**Your Task:**
1.  **Adopt Details:** Use the user-provided **Name**, **Symbol**, and **Total Supply** directly.
2.  **Generate Solidity Code:** Write a complete Solidity smart contract for the token.
    *   The contract must be compliant with the ERC-20 standard.
    *   Use a recent, secure version of Solidity (\`pragma solidity ^0.8.20;\`).
    *   The contract name should be the user's specified Token Name, sanitized for Solidity syntax (e.g., "My Token" becomes "MyToken").
    *   Import the base \`@openzeppelin/contracts/token/ERC20/ERC20.sol\`.
    *   In the constructor, mint the total supply to the deployer of the contract (\`msg.sender\`). The total supply should be calculated correctly considering the standard 18 decimals for ERC-20 tokens (i.e., \`supply * (10 ** 18)\`).
    *   **Conditional Features**:
        *   If **Is Burnable** is \`true\`, import and use \`@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol\`. The contract must inherit from it.
        *   If **Is Mintable** is \`true\`, import and use \`@openzeppelin/contracts/access/Ownable.sol\` (and set the initial owner to the deployer in the constructor). The contract must inherit from \`Ownable\` and have a public \`mint\` function restricted to the contract owner (\`onlyOwner\`).
3.  **Format Output:** Provide the extracted details and the full Solidity code in the specified JSON format. Ensure the Solidity code is a single string with correct newlines.
`,
});

const tokenLauncherFlow = ai.defineFlow(
  {
    name: 'tokenLauncherFlow',
    inputSchema: TokenLauncherInputSchema,
    outputSchema: TokenLauncherOutputSchema,
  },
  async (input) => {
    // Sanitize name for contract
    const sanitizedName = input.name.replace(/[^a-zA-Z0-9]/g, '');
    const promptInput = {...input, name: sanitizedName };

    const { output } = await prompt(promptInput);

    if (!output) {
      throw new Error("Failed to generate token contract. The AI model did not return a valid plan.");
    }
     // Restore original name in the output
    output.name = input.name;
    return output;
  }
);

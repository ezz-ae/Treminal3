
'use server';
/**
 * @fileOverview An AI agent that recommends business tools.
 *
 * - recommendBusinessTools - A function that handles the business tool recommendation process.
 */

import { ai } from '@/ai/genkit';
import { BusinessToolRecommendationInputSchema, BusinessToolRecommendationOutput, BusinessToolRecommendationOutputSchema, BusinessToolRecommendationInput } from '@/ai/schemas/business-tool-recommendation';


export async function recommendBusinessTools(input: BusinessToolRecommendationInput): Promise<BusinessToolRecommendationOutput> {
  return businessToolRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'businessToolRecommender',
  input: { schema: BusinessToolRecommendationInputSchema },
  output: { schema: BusinessToolRecommendationOutputSchema },
  prompt: `You are an expert business consultant specializing in Web3. Based on the following business description, recommend up to 3 tools from the list provided that would be most beneficial for the user. For each tool, provide a brief explanation of how it would help their specific business. For each recommendation, also provide a step-by-step "flow" of actions the user should take to utilize the tool effectively for their business.

Business Description:
{{business_description}}

Available Tools:
- dApp Builder: Create and deploy decentralized applications with our intuitive builder.
- Token Launcher: Design and launch your own custom cryptocurrency tokens in minutes.
- Trading Bot Platform: Develop and deploy automated trading bots on major exchanges.
- AI Agents: Deploy autonomous AI agents to interact with your dApps and automate tasks.
- Custom Wallets: Build and brand your own secure crypto wallets for your users.
- Smart Contract Templates: Use our audited templates to create secure smart contracts without the hassle.
- Manual Transactions: Interact directly with the blockchain for custom operations and analysis.
- On-chain Analytics: Get deep insights into on-chain data with our powerful analytics engine.
- Decentralized Storage: Upload and manage files on IPFS and other decentralized storage networks.
- Security Audits: Run automated security audits on your smart contracts to find vulnerabilities.
- DAO Governance: Manage your decentralized autonomous organization with our governance tools.

Provide your recommendations in the specified JSON format.
`,
});


const businessToolRecommendationFlow = ai.defineFlow(
  {
    name: 'businessToolRecommendationFlow',
    inputSchema: BusinessToolRecommendationInputSchema,
    outputSchema: BusinessToolRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("Failed to generate business tool recommendations.");
    }
    return output;
  }
);

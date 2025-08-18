'use server';
/**
 * @fileOverview An AI agent that recommends business tools.
 *
 * - recommendBusinessTools - A function that handles the business tool recommendation process.
 * - BusinessToolRecommendationInput - The input type for the recommendBusinessTools function.
 * - BusinessToolRecommendationOutput - The return type for the recommendBusinessTools function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const BusinessToolRecommendationInputSchema = z.object({
  business_description: z.string().describe('The description of the business.'),
});
export type BusinessToolRecommendationInput = z.infer<typeof BusinessToolRecommendationInputSchema>;

const BusinessToolRecommendationOutputSchema = z.object({
  recommendations: z.array(z.object({
    name: z.string().describe('The name of the recommended tool.'),
    description: z.string().describe('A description of why the tool is recommended for the business.'),
    icon: z.string().describe('The name of a lucide-react icon for the tool. Must be one of: AppWindow, Bot, Puzzle, Wallet, FileJson, Network, BotMessageSquare, AreaChart, FileArchive, ShieldCheck, Vote'),
    flow: z.array(z.string()).describe('A step-by-step flow of actions to take to use the tool for their business.'),
  })),
});
export type BusinessToolRecommendationOutput = z.infer<typeof BusinessToolRecommendationOutputSchema>;


export async function recommendBusinessTools(input: BusinessToolRecommendationInput): Promise<BusinessToolRecommendationOutput> {
  return businessToolRecommendationFlow(input);
}

const businessToolRecommendationFlow = ai.defineFlow(
  {
    name: 'businessToolRecommendationFlow',
    inputSchema: BusinessToolRecommendationInputSchema,
    outputSchema: BusinessToolRecommendationOutputSchema,
  },
  async (input) => {
    const prompt = `You are an expert business consultant specializing in Web3. Based on the following business description, recommend up to 3 tools from the list provided that would be most beneficial for the user. For each tool, provide a brief explanation of how it would help their specific business. For each recommendation, also provide a step-by-step "flow" of actions the user should take to utilize the tool effectively for their business.

Business Description:
${input.business_description}

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
`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.0-flash',
      output: {
        schema: BusinessToolRecommendationOutputSchema,
      },
    });

    return llmResponse.output() || { recommendations: [] };
  }
);

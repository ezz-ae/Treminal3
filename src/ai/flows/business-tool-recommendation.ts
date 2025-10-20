
'use server';
/**
 * @fileOverview An AI agent that recommends business tools and provides strategic workflows.
 *
 * - recommendBusinessTools - A function that handles the business tool recommendation process.
 */

import { ai } from '@/ai/genkit';
import { BusinessToolRecommendationInputSchema, BusinessToolRecommendationOutput, BusinessToolRecommendationOutputSchema, BusinessToolRecommendationInput } from '@/ai/schemas/business-tool-recommendation';

/**
 * Invokes the AI flow to get business tool recommendations.
 * @param {BusinessToolRecommendationInput} input - The business profile provided by the user.
 * @returns {Promise<BusinessToolRecommendationOutput>} A promise that resolves to the AI-generated recommendations.
 */
export async function recommendBusinessTools(input: BusinessToolRecommendationInput): Promise<BusinessToolRecommendationOutput> {
  return businessToolRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'businessToolRecommender',
  input: { schema: BusinessToolRecommendationInputSchema },
  output: { schema: BusinessToolRecommendationOutputSchema },
  prompt: `You are an expert business consultant specializing in Web3. Based on the following structured business profile, recommend up to 3 tools from the list provided that would be most beneficial for the user. For each tool, provide a brief explanation of how it would help their specific business. For each recommendation, also provide a step-by-step "flow" of actions the user should take to utilize the tool effectively for their business.

**Business Profile:**
- **Industry:** {{industry}}
- **Stage:** {{stage}}
- **Primary Goals:** {{#each goals}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- **Description:** {{description}}

**Available Tools:**
- AI Business Architect: Plan your project with an AI consultant.
- Bot Creator: Develop and deploy automated trading bots.
- Solana Command Center: Interact with the Solana network via AI.
- Security Audits: Run automated security audits on your smart contracts.
- On-chain Analytics: Get deep insights into on-chain data.
- Staking: Stake assets to earn rewards.
- Developer Tools: A suite of utilities for Web3 developers.
- Documentation: Access guides, tutorials, and API references.

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

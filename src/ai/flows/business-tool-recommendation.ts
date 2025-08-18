'use server';

/**
 * @fileOverview Provides personalized business tool recommendations based on user input.
 *
 * - getBusinessToolRecommendations - A function that returns personalized business tool recommendations.
 * - BusinessToolRecommendationInput - The input type for the getBusinessToolRecommendations function.
 * - BusinessToolRecommendationOutput - The return type for the getBusinessToolRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BusinessToolRecommendationInputSchema = z.object({
  businessType: z.string().describe('The type of business, e.g., e-commerce, freelancing, etc.'),
  businessNeeds: z.string().describe('Specific needs or challenges the business faces.'),
  budget: z.string().describe('The budget available for implementing new tools.'),
});
export type BusinessToolRecommendationInput = z.infer<typeof BusinessToolRecommendationInputSchema>;

const BusinessToolRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      toolName: z.string().describe('The name of the recommended tool.'),
      toolCategory: z.string().describe('The category of the tool.'),
      toolDescription: z.string().describe('A brief description of the tool and its benefits.'),
    })
  ).describe('A list of recommended business tools.'),
});
export type BusinessToolRecommendationOutput = z.infer<typeof BusinessToolRecommendationOutputSchema>;

export async function getBusinessToolRecommendations(input: BusinessToolRecommendationInput): Promise<BusinessToolRecommendationOutput> {
  return businessToolRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'businessToolRecommendationPrompt',
  input: {schema: BusinessToolRecommendationInputSchema},
  output: {schema: BusinessToolRecommendationOutputSchema},
  prompt: `You are an AI assistant that provides personalized business tool recommendations.

  Based on the type of business, their needs, and budget, recommend the most suitable tools.

  Business Type: {{{businessType}}}
  Business Needs: {{{businessNeeds}}}
  Budget: {{{budget}}}

  Provide a list of tool recommendations, including the tool name, tool category, and a brief description of its benefits.

  Ensure the recommendations are relevant and practical for the given business context.
`,
});

const businessToolRecommendationFlow = ai.defineFlow(
  {
    name: 'businessToolRecommendationFlow',
    inputSchema: BusinessToolRecommendationInputSchema,
    outputSchema: BusinessToolRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

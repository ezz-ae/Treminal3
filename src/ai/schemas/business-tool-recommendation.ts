
import { z } from 'zod';

export const BusinessToolRecommendationInputSchema = z.object({
  business_description: z.string().describe('The description of the business.'),
});
export type BusinessToolRecommendationInput = z.infer<typeof BusinessToolRecommendationInputSchema>;

export const BusinessToolRecommendationOutputSchema = z.object({
  recommendations: z.array(z.object({
    name: z.string().describe('The name of the recommended tool.'),
    description: z.string().describe('A description of why the tool is recommended for the business.'),
    icon: z.string().describe('The name of a lucide-react icon for the tool. Must be one of: AppWindow, Bot, Puzzle, Wallet, FileJson, Network, BotMessageSquare, AreaChart, FileArchive, ShieldCheck, Vote'),
    flow: z.array(z.string()).describe('A step-by-step flow of actions to take to use the tool for their business.'),
  })),
});
export type BusinessToolRecommendationOutput = z.infer<typeof BusinessToolRecommendationOutputSchema>;

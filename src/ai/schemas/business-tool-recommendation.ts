
import { z } from 'zod';

export const BusinessToolRecommendationInputSchema = z.object({
  industry: z.string().describe("The industry the business operates in."),
  stage: z.string().describe("The current stage of the business (e.g., Idea, MVP, Growth)."),
  goals: z.array(z.string()).describe("The primary goals of the business."),
  description: z.string().describe('A brief description of the business project.'),
});
export type BusinessToolRecommendationInput = z.infer<typeof BusinessToolRecommendationInputSchema>;

export const BusinessToolRecommendationOutputSchema = z.object({
  recommendations: z.array(z.object({
    name: z.string().describe('The name of the recommended tool.'),
    description: z.string().describe('A description of why the tool is recommended for the business.'),
    icon: z.enum(['AppWindow', 'Bot', 'Puzzle', 'Wallet', 'FileJson', 'Network', 'BotMessageSquare', 'AreaChart', 'FileArchive', 'ShieldCheck', 'Vote', 'BrainCircuit', 'Wind', 'Wand2', 'ChevronsRight', 'Plus', 'X']).describe('The name of a lucide-react icon for the tool.'),
    flow: z.array(z.string()).describe('A step-by-step flow of actions to take to use the tool for their business.'),
  })),
});
export type BusinessToolRecommendationOutput = z.infer<typeof BusinessToolRecommendationOutputSchema>;

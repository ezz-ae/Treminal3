
import { z } from 'zod';
import { iconMap } from '@/lib/icon-map';

// Dynamically create the enum from the keys of iconMap
const iconKeys = Object.keys(iconMap) as [string, ...string[]];
const IconEnum = z.enum(iconKeys);

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
    icon: IconEnum.describe('The name of a lucide-react icon for the tool.'),
    flow: z.array(z.string()).describe('A step-by-step flow of actions to take to use the tool for their business.'),
  })),
});
export type BusinessToolRecommendationOutput = z.infer<typeof BusinessToolRecommendationOutputSchema>;

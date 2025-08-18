'use server';

import {
  getBusinessToolRecommendations,
  type BusinessToolRecommendationInput,
  type BusinessToolRecommendationOutput
} from '@/ai/flows/business-tool-recommendation';

export async function getRecommendations(
  input: BusinessToolRecommendationInput
): Promise<BusinessToolRecommendationOutput | { error: string }> {
  try {
    const result = await getBusinessToolRecommendations(input);
    return result;
  } catch (e) {
    console.error('Error getting recommendations:', e);
    // You can customize the error message based on the error type
    return { error: 'An unexpected error occurred while generating recommendations. Please try again later.' };
  }
}

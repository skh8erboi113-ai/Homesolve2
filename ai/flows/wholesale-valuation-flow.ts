'use server';
/**
 * @fileOverview An AI agent that provides a wholesale-specific valuation using the 90% rule.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WholesaleValuationInputSchema = z.object({
  propertyAddress: z.string().describe('The street address of the property.'),
  estimatedARV: z.number().describe('The After Repair Value (ARV) of the property.'),
  estimatedRepairs: z.number().describe('The estimated cost of repairs.'),
});

const WholesaleValuationOutputSchema = z.object({
  arv: z.number(),
  repairCosts: z.number(),
  wholesaleOffer: z.number().describe('The calculated wholesale offer price.'),
  formulaExplanation: z.string().describe('Explanation of the 90% rule calculation.'),
  potentialAssignmentFee: z.number().describe('Estimated assignment fee (spread).'),
});

export type WholesaleValuationInput = z.infer<typeof WholesaleValuationInputSchema>;
export type WholesaleValuationOutput = z.infer<typeof WholesaleValuationOutputSchema>;

export async function calculateWholesaleValuation(input: WholesaleValuationInput): Promise<WholesaleValuationOutput> {
  return wholesaleValuationFlow(input);
}

const wholesaleValuationFlow = ai.defineFlow(
  {
    name: 'wholesaleValuationFlow',
    inputSchema: WholesaleValuationInputSchema,
    outputSchema: WholesaleValuationOutputSchema,
  },
  async (input) => {
    // Formula: (ARV * 0.9) - (repairs * 2)
    // He emphasizes this rule for hedge funds.
    const wholesaleOffer = (input.estimatedARV * 0.9) - (input.estimatedRepairs * 2);

    // Typically wholesalers want to make k - 0k per deal
    const potentialAssignmentFee = 10000;

    return {
      arv: input.estimatedARV,
      repairCosts: input.estimatedRepairs,
      wholesaleOffer: Math.max(0, wholesaleOffer),
      formulaExplanation: "Calculated using the 90% rule for institutional buyers: (ARV * 0.9) - (Estimated Repairs * 2). This ensures a sufficient margin for hedge funds and professional investors.",
      potentialAssignmentFee
    };
  }
);

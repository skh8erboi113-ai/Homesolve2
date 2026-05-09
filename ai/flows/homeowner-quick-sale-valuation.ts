'use server';
/**
 * @fileOverview An AI agent that provides an estimated quick-sale market value for a property.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HomeownerQuickSaleValuationInputSchema = z.object({
  address: z.string().describe('The full address of the property.'),
  propertyType: z.string().describe('Type of property (e.g., house, condo, townhouse).'),
  squareFootage: z.number().describe('The total square footage of the property.'),
  numberOfBedrooms: z.number().describe('The number of bedrooms.'),
  numberOfBathrooms: z.number().describe('The number of bathrooms.'),
  condition: z.string().describe('The current condition of the property.'),
  yearBuilt: z.number().describe('The year the property was built.'),
  specialFeatures: z.string().optional().describe('Any special features or amenities.'),
  foreclosureStatus: z.string().describe('The current foreclosure status.'),
  urgency: z.string().describe('How quickly the homeowner needs to sell.'),
  photoDataUri: z.string().optional(),
});
export type HomeownerQuickSaleValuationInput = z.infer<typeof HomeownerQuickSaleValuationInputSchema>;

const HomeownerQuickSaleValuationOutputSchema = z.object({
  estimatedValue: z.number().describe('The estimated quick-sale market value.'),
  currency: z.string().default('USD'),
  valuationExplanation: z.string().describe('Justification for the valuation.'),
  disclaimer: z.string().describe('Standard appraisal disclaimer.'),
});
export type HomeownerQuickSaleValuationOutput = z.infer<typeof HomeownerQuickSaleValuationOutputSchema>;

export async function homeownerQuickSaleValuation(input: HomeownerQuickSaleValuationInput): Promise<HomeownerQuickSaleValuationOutput> {
  return homeownerQuickSaleValuationFlow(input);
}

const quickSaleValuationPrompt = ai.definePrompt({
  name: 'quickSaleValuationPrompt',
  input: { schema: HomeownerQuickSaleValuationInputSchema },
  output: { schema: HomeownerQuickSaleValuationOutputSchema },
  prompt: `You are an expert real estate valuer specializing in wholesale valuations and foreclosure situations.
Provide a quick-sale valuation for the following property:
- Address: {{{address}}}
- Type: {{{propertyType}}}
- Sq Ft: {{{squareFootage}}}
- Beds/Baths: {{{numberOfBedrooms}}}/{{{numberOfBathrooms}}}
- Condition: {{{condition}}}
- Foreclosure Status: {{{foreclosureStatus}}}

VALUATION METHODOLOGY (Mandatory):
You MUST calculate the valuation using the "90% Rule" for wholesale acquisitions:
Valuation = (ARV * 0.9) - (Estimated Repairs * 2)

Where:
1. ARV (After Repair Value): The estimated retail market value of the property if it were in excellent condition.
2. Estimated Repairs: Your estimate of the repair costs needed based on the current condition ({{{condition}}}) and square footage ({{{squareFootage}}}).

EXPLANATION:
In your explanation, explicitly mention the ARV you estimated and the repair costs you calculated to show how you arrived at the final quick-sale value.
Consider that quick sales in foreclosure require this significant discount to attract cash investors and provide immediate liquidity.`,
});

const homeownerQuickSaleValuationFlow = ai.defineFlow(
  {
    name: 'homeownerQuickSaleValuationFlow',
    inputSchema: HomeownerQuickSaleValuationInputSchema,
    outputSchema: HomeownerQuickSaleValuationOutputSchema,
  },
  async (input) => {
    const {output} = await quickSaleValuationPrompt(input);
    return output!;
  }
);

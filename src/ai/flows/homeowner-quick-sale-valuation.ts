'use server';
/**
 * @fileOverview An AI agent that provides an estimated quick-sale market value for a property.
 *
 * - homeownerQuickSaleValuation - A function that handles the property quick-sale valuation process.
 * - HomeownerQuickSaleValuationInput - The input type for the homeownerQuickSaleValuation function.
 * - HomeownerQuickSaleValuationOutput - The return type for the homeownerQuickSaleValuation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HomeownerQuickSaleValuationInputSchema = z.object({
  address: z.string().describe('The full address of the property.'),
  propertyType: z.string().describe('Type of property (e.g., house, condo, townhouse).'),
  squareFootage: z.number().describe('The total square footage of the property.'),
  numberOfBedrooms: z.number().describe('The number of bedrooms.'),
  numberOfBathrooms: z.number().describe('The number of bathrooms.'),
  condition: z.string().describe('The current condition of the property (e.g., excellent, good, fair, poor).'),
  yearBuilt: z.number().describe('The year the property was built.'),
  specialFeatures: z.string().optional().describe('Any special features or amenities (e.g., pool, large yard, recent renovations).'),
  foreclosureStatus: z.string().describe('The current foreclosure status (e.g., pre-foreclosure, notice of default, auction scheduled).'),
  urgency: z.string().describe('How quickly the homeowner needs to sell (e.g., very urgent, somewhat urgent, flexible).'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo of the property, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type HomeownerQuickSaleValuationInput = z.infer<typeof HomeownerQuickSaleValuationInputSchema>;

const HomeownerQuickSaleValuationOutputSchema = z.object({
  estimatedValue: z.number().describe('The estimated quick-sale market value of the property.'),
  currency: z.string().describe('The currency of the estimated value (e.g., USD).'),
  valuationExplanation: z.string().describe('A detailed explanation justifying the valuation, including market factors considered and quick-sale adjustments.'),
  disclaimer: z.string().describe('A disclaimer stating that this is an estimate and not a formal appraisal.'),
});
export type HomeownerQuickSaleValuationOutput = z.infer<typeof HomeownerQuickSaleValuationOutputSchema>;

export async function homeownerQuickSaleValuation(input: HomeownerQuickSaleValuationInput): Promise<HomeownerQuickSaleValuationOutput> {
  return homeownerQuickSaleValuationFlow(input);
}

const quickSaleValuationPrompt = ai.definePrompt({
  name: 'quickSaleValuationPrompt',
  input: { schema: HomeownerQuickSaleValuationInputSchema },
  output: { schema: HomeownerQuickSaleValuationOutputSchema },
  prompt: `You are an expert real estate valuer specializing in quick sales and properties under foreclosure.
Your task is to provide a realistic estimated quick-sale market value for the given property.
Consider all provided property details, its current condition, special features, and the urgency of the sale due to its foreclosure status.

Property Details:
Address: {{{address}}}
Property Type: {{{propertyType}}}
Square Footage: {{{squareFootage}}} sq ft
Bedrooms: {{{numberOfBedrooms}}}
Bathrooms: {{{numberOfBathrooms}}}
Condition: {{{condition}}}
Year Built: {{{yearBuilt}}}
Special Features: {{{specialFeatures}}}}
Foreclosure Status: {{{foreclosureStatus}}}
Urgency for Sale: {{{urgency}}}

{{#if photoDataUri}}Photo: {{media url=photoDataUri}}{{/if}}

Provide the estimated quick-sale market value, the currency, a detailed explanation of your valuation taking into account market conditions and foreclosure quick-sale factors, and a clear disclaimer.
`,
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

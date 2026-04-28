'use server';
/**
 * @fileOverview An AI agent that generates marketing outreach content for property listings.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OutreachInputSchema = z.object({
  propertyAddress: z.string().describe('The street address of the property.'),
  askingPrice: z.number().describe('The asking price of the property.'),
  bedrooms: z.number().describe('Number of bedrooms.'),
  bathrooms: z.number().describe('Number of bathrooms.'),
  foreclosureStatus: z.string().describe('The foreclosure status.'),
  targetPlatform: z.enum(['LinkedIn', 'Facebook', 'Twitter', 'Direct Message']).describe('The platform for the post.'),
});

const OutreachOutputSchema = z.object({
  headline: z.string().describe('A catchy headline for the post.'),
  body: z.string().describe('The main content of the marketing post.'),
  hashtags: z.array(z.string()).describe('A list of relevant hashtags.'),
});

export type OutreachInput = z.infer<typeof OutreachInputSchema>;
export type OutreachOutput = z.infer<typeof OutreachOutputSchema>;

export function generateOutreach(input: OutreachInput): Promise<OutreachOutput> {
  return generateOutreachFlow(input);
}

const outreachPrompt = ai.definePrompt({
  name: 'outreachPrompt',
  input: { schema: OutreachInputSchema },
  output: { schema: OutreachOutputSchema },
  prompt: `You are a world-class real estate marketing expert specializing in distressed properties and quick sales.
Your task is to create a highly engaging outreach post for the following property on the platform: {{{targetPlatform}}}.

Property Details:
- Address: {{{propertyAddress}}}
- Price: USD {{{askingPrice}}}
- Specs: {{{bedrooms}}} beds, {{{bathrooms}}} baths
- Status: {{{foreclosureStatus}}}

Guidelines:
1. Tone: Professional, empathetic, and highlights the urgency without being "spammy".
2. Call to Action: Direct people to view the listing on HomeSolve.
3. Structure: Clear headline, benefit-driven body, and a strong closing.
4. Format: Tailor the length and style specifically for {{{targetPlatform}}}.

Generate the headline, body text, and hashtags.`,
});

const generateOutreachFlow = ai.defineFlow(
  {
    name: 'generateOutreachFlow',
    inputSchema: OutreachInputSchema,
    outputSchema: OutreachOutputSchema,
  },
  async (input) => {
    const { output } = await outreachPrompt(input);
    return output!;
  }
);

'use server';
/**
 * @fileOverview An AI agent that generates empathetic probate-specific outreach content.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProbateOutreachInputSchema = z.object({
  deceasedName: z.string().describe('The name of the deceased individual.'),
  representativeName: z.string().describe('The name of the heir or personal representative.'),
  propertyAddress: z.string().describe('The street address of the property.'),
  targetPlatform: z.enum(['Phone Script', 'SMS', 'Email', 'Letter']).describe('The medium for the outreach.'),
});

const ProbateOutreachOutputSchema = z.object({
  headline: z.string().describe('A respectful subject line or opening.'),
  body: z.string().describe('The main content of the outreach message.'),
  tips: z.array(z.string()).describe('Communication tips for this specific situation.'),
});

export type ProbateOutreachInput = z.infer<typeof ProbateOutreachInputSchema>;
export type ProbateOutreachOutput = z.infer<typeof ProbateOutreachOutputSchema>;

export async function generateProbateOutreach(input: ProbateOutreachInput): Promise<ProbateOutreachOutput> {
  return probateOutreachFlow(input);
}

const probateOutreachPrompt = ai.definePrompt({
  name: 'probateOutreachPrompt',
  input: { schema: ProbateOutreachInputSchema },
  output: { schema: ProbateOutreachOutputSchema },
  prompt: `You are an empathetic real estate acquisition specialist who helps families navigate the probate process.
Your goal is to offer a helpful solution for the property at {{{propertyAddress}}} following the passing of {{{deceasedName}}}.

Contacting: {{{representativeName}}} via {{{targetPlatform}}}.

Guidelines:
1. Tone: Deeply respectful, patient, and helpful. Avoid being "salesy".
2. Position yourself as a facilitator who can buy the house "as-is" for cash, helping the family avoid the stress of repairs and traditional listings.
3. Acknowledge that this is a difficult time.
4. Call to Action: A simple request for a brief conversation to see if you can be of service.

Generate the opening/headline, the main body text, and 3 communication tips.`,
});

const probateOutreachFlow = ai.defineFlow(
  {
    name: 'probateOutreachFlow',
    inputSchema: ProbateOutreachInputSchema,
    outputSchema: ProbateOutreachOutputSchema,
  },
  async (input) => {
    const { output } = await probateOutreachPrompt(input);
    return output!;
  }
);

'use server';

/**
 * @fileOverview An AI agent that generates empathetic outreach content for probate real estate leads.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProbateOutreachInputSchema = z.object({
  deceasedName: z.string().describe('Name of the deceased individual.'),
  heirName: z.string().describe('Name of the heir being contacted.'),
  propertyAddress: z.string().describe('Address of the probate property.'),
  relationshipToDeceased: z.string().describe('The heir\'s relationship to the deceased.'),
  tone: z.enum(['Empathetic', 'Professional', 'Direct']).default('Empathetic'),
});

const ProbateOutreachOutputSchema = z.object({
  subjectLine: z.string().describe('A respectful subject line for the email or letter.'),
  messageBody: z.string().describe('The main content of the outreach message.'),
  callToAction: z.string().describe('A gentle next step for the heir.'),
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
  prompt: `You are a compassionate real estate specialist who helps families navigate the sale of inherited property during probate.
Your goal is to reach out to {{{heirName}}} regarding the property at {{{propertyAddress}}} formerly owned by {{{deceasedName}}}.

Tone: {{{tone}}}
Relationship: {{{relationshipToDeceased}}}

Guidelines:
1. Empathy First: Acknowledge the loss and offer genuine condolences.
2. Value Proposition: Explain that you specialize in helping families settle estates quickly and without the stress of traditional listings.
3. No Pressure: Ensure the message feels supportive, not predatory.
4. Professionalism: Maintain high standards of respect and clarity.`,
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

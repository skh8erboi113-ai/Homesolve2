import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * Genkit initialization.
 * The googleAI plugin automatically looks for the GOOGLE_GENAI_API_KEY 
 * environment variable in the process environment.
 */
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

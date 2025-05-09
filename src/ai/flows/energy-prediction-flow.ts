'use server';
/**
 * @fileOverview Predicts the energy consumption of AI models based on architecture and data size.
 *
 * - energyPrediction - Predicts energy consumption of a given AI model.
 * - EnergyPredictionInput - Input type for the energyPrediction function.
 * - EnergyPredictionOutput - Return type for the energyPrediction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnergyPredictionInputSchema = z.object({
  modelArchitecture: z
    .string()
    .describe('The architecture of the AI model (e.g., CNN, Transformer).'),
  dataSize: z
    .string()
    .describe('The size of the input data used by the model (e.g., 1GB, 100MB).'),
});
export type EnergyPredictionInput = z.infer<typeof EnergyPredictionInputSchema>;

const EnergyPredictionOutputSchema = z.object({
  predictedEnergyConsumption: z
    .string()
    .describe('The predicted energy consumption of the AI model (e.g., in Watts, kWh).'),
  visualizationType: z
    .string()
    .describe('Suggested visualization type for energy consumption (e.g., bar chart, pie chart).'),
  confidenceLevel: z
    .string()
    .describe('The confidence level of the prediction (e.g., high, medium, low).'),
});
export type EnergyPredictionOutput = z.infer<typeof EnergyPredictionOutputSchema>;

export async function energyPrediction(input: EnergyPredictionInput): Promise<EnergyPredictionOutput> {
  return energyPredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'energyPredictionPrompt',
  input: {schema: EnergyPredictionInputSchema},
  output: {schema: EnergyPredictionOutputSchema},
  prompt: `You are an expert in AI model energy consumption prediction.

You will receive the AI model's architecture and the size of the data it processes.
Based on this information, you will predict the energy consumption of the model, suggest a visualization type to represent the results, and provide a confidence level for the prediction.

Model Architecture: {{{modelArchitecture}}}
Data Size: {{{dataSize}}}

Respond in a JSON format with the following keys:
- predictedEnergyConsumption: The predicted energy consumption of the AI model.
- visualizationType: A suitable visualization type for the predicted energy consumption.
- confidenceLevel: The confidence level of the prediction.
`,
});

const energyPredictionFlow = ai.defineFlow(
  {
    name: 'energyPredictionFlow',
    inputSchema: EnergyPredictionInputSchema,
    outputSchema: EnergyPredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

"use client";

import type { EnergyPredictionOutput } from "@/ai/flows/energy-prediction-flow";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer, Bar } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart";
import { EnergyDisplayCard } from "./energy-display-card";
import { Zap, BarChart2, PieChart as PieChartIcon, TrendingUp } from "lucide-react"; // PieChart is already a component name

interface EnergyPredictionResultsProps {
  result: EnergyPredictionOutput;
}

// Helper to parse numerical value from string like "150 kWh" or "150"
const parseEnergyValue = (energyString: string): number => {
  const match = energyString.match(/(\d+(\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
};

export function EnergyPredictionResults({ result }: EnergyPredictionResultsProps) {
  const { predictedEnergyConsumption, visualizationType, confidenceLevel } = result;
  const energyValue = parseEnergyValue(predictedEnergyConsumption);
  // Extract unit if present, default to "units"
  const energyUnit = predictedEnergyConsumption.replace(/[\d\.\s,]/g, '') || "units";


  const chartData = [{ name: "Prediction", value: energyValue }];
  const chartConfig = {
    value: {
      label: energyUnit,
      color: "hsl(var(--chart-1))", // Green
    },
  } satisfies ChartConfig;

  const renderChart = () => {
    // For now, we'll use a BarChart for any suggestion.
    // More sophisticated mapping can be added later.
    switch (visualizationType?.toLowerCase()) {
      case "bar chart":
      case "histogram": // Simplified histogram as a bar
        return (
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <RechartsBarChart accessibilityLayer data={chartData} layout="vertical">
              <CartesianGrid horizontal={false} vertical strokeDasharray="3 3" />
              <XAxis type="number" dataKey="value" />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
              <RechartsTooltip 
                cursor={{ fill: 'hsl(var(--muted))' }} 
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} />
            </RechartsBarChart>
          </ChartContainer>
        );
      case "pie chart":
         // A pie chart for a single value isn't very informative unless compared to a total.
         // We'll show it as a full pie for now, or could use a gauge-like component if available.
        return (
           <ChartContainer config={chartConfig} className="min-h-[200px] w-full aspect-square">
            <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart accessibilityLayer data={chartData} layout="vertical">
              <CartesianGrid horizontal={false} vertical strokeDasharray="3 3" />
              <XAxis type="number" dataKey="value" />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
              <RechartsTooltip 
                cursor={{ fill: 'hsl(var(--muted))' }} 
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} />
            </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        );
      default:
        return <p className="text-muted-foreground">Visualization type '{visualizationType}' not yet supported. Displaying as bar chart.</p>;
    }
  };

  return (
    <Card className="w-full max-w-2xl mt-8 bg-card text-card-foreground shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Prediction Results</CardTitle>
        <CardDescription>
          Estimated energy consumption based on your inputs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <EnergyDisplayCard
          title="Predicted Consumption"
          value={energyValue}
          unit={energyUnit}
          icon={Zap}
          description={`Confidence: ${confidenceLevel || "N/A"}`}
          colorClass="text-accent"
        />

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            {visualizationType ? `Visualization (${visualizationType})` : "Visualization"}
          </h3>
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  );
}

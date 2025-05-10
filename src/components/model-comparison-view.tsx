
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { GitCompareArrows } from "lucide-react";

export function ModelComparisonView() {
  return (
    <div className="grid gap-6">
      <Card className="bg-card text-card-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-primary">
            <GitCompareArrows className="w-5 h-5" />
            Model Energy Comparison
          </CardTitle>
          <CardDescription>Compare the estimated energy usage of different AI models.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This feature will allow you to input details for two or more AI models and
            receive a comparative analysis of their potential energy consumption.
            Helps in making informed decisions when selecting models for deployment.
          </p>
          <div className="mt-4 relative h-48 w-full rounded-md overflow-hidden" data-ai-hint="comparison chart">
            <Image
              src="https://picsum.photos/seed/aura-model-compare/600/400"
              alt="Model comparison concept"
              layout="fill"
              objectFit="cover"
              data-ai-hint="comparison chart"
            />
          </div>
           <div className="space-y-2 pt-4">
            <h3 className="text-lg font-semibold text-primary">Planned Features:</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Side-by-side energy prediction inputs for multiple models</li>
              <li>Visual comparison of results (e.g., bar charts)</li>
              <li>Highlight key differences in architecture, data size, and predicted energy</li>
              <li>Option to save or export comparison reports</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

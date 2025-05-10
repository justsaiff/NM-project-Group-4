
"use client";

import * as React from "react";
import { EnergyPredictorForm } from "./energy-predictor-form";
import { EnergyPredictionResults } from "./energy-prediction-results";
import type { EnergyPredictionOutput } from "@/ai/flows/energy-prediction-flow";

export function EnergyPredictor() {
  const [predictionResult, setPredictionResult] = React.useState<EnergyPredictionOutput | null>(null);

  const handlePredictionResult = (result: EnergyPredictionOutput) => {
    setPredictionResult(result);
  };

  return (
    <div className="space-y-8 flex flex-col items-center">
      <EnergyPredictorForm onPredictionResult={handlePredictionResult} />
      {predictionResult && (
        <div className="w-full max-w-2xl animate-in fade-in-0 zoom-in-95 duration-500">
          <EnergyPredictionResults result={predictionResult} />
        </div>
      )}
    </div>
  );
}


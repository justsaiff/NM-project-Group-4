
/**
 * @fileOverview Types related to saved reports for model comparisons.
 */

export interface ModelReportDetails {
  name: string;
  selectedModel: string; // Name of the selected base model or "Custom"
  selectedFramework?: string; // e.g., "tensorflow", "pytorch", "scikit-learn"
  architecture: string;
  dataSize: string;
  predictedEnergyConsumption: string; // e.g., "150 kWh"
  confidenceLevel: string;
  parsedEnergyValue: number; // Numerical value of energy
  energyUnit: string; // e.g., "kWh"
}

export interface ReportChartData {
  name: string; // "Model A" or "Model B"
  energy: number;
  unit: string;
}

export interface SavedReport {
  id: string; // Unique identifier for the report
  reportTitle: string;
  generatedAt: string; // ISO date string
  modelA: ModelReportDetails;
  modelB: ModelReportDetails;
  comparisonSummary: {
    chartData: ReportChartData[];
  };
}

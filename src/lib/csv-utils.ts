/**
 * @fileOverview Utility functions for CSV generation and download.
 */

import { format } from 'date-fns';
import type { SavedReport, ModelReportDetails } from '@/types/reports';

export const frameworkNameMapping: { [key: string]: string } = {
  tensorflow: "TensorFlow",
  pytorch: "PyTorch",
  "scikit-learn": "scikit-learn",
  other: "Other/Custom"
};

/**
 * Escapes a cell string for CSV compatibility.
 * If the string contains a comma, double quote, or newline, it wraps it in double quotes
 * and escapes any existing double quotes by doubling them up.
 * @param cell - The cell content (string, number, null, or undefined).
 * @returns The escaped CSV cell string.
 */
export const escapeCsvCell = (cell: any): string => {
  if (cell === null || cell === undefined) {
    return '';
  }
  const cellString = String(cell);
  if (cellString.includes(',') || cellString.includes('"') || cellString.includes('\n')) {
    return `"${cellString.replace(/"/g, '""')}"`;
  }
  return cellString;
};

/**
 * Converts a 2D array of data into a CSV string.
 * @param data - An array of arrays, where each inner array represents a row.
 * @returns A string formatted as CSV.
 */
export const arrayToCsv = (data: (string | number | undefined | null)[][]): string => {
  return data.map(row =>
    row.map(escapeCsvCell).join(',')
  ).join('\n');
};

/**
 * Triggers a browser download for a CSV string.
 * @param csvString - The CSV data as a string.
 * @param filename - The desired filename for the downloaded file (e.g., "report.csv").
 */
export const downloadCsv = (csvString: string, filename: string) => {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  if (link.download !== undefined) { // Feature detection
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

/**
 * Converts a SavedReport object into a 2D array suitable for CSV conversion.
 * @param report - The SavedReport object.
 * @returns A 2D array representing the report data.
 */
export const convertReportToCsvDataArray = (report: SavedReport): (string | number | undefined | null)[][] => {
  const data: (string | number | undefined | null)[][] = [];

  data.push(["Report ID", report.id]);
  data.push(["Report Title", report.reportTitle]);
  data.push(["Generated At", format(new Date(report.generatedAt), "yyyy-MM-dd HH:mm:ss")]);
  data.push([]); // Spacer row

  data.push(["Property", "Model A", "Model B"]);
  
  // Define the order and labels for properties
  const properties: Array<{ key: keyof ModelReportDetails; label: string }> = [
    { key: "selectedModel", label: "Selected Base Model" },
    { key: "selectedFramework", label: "Framework" },
    { key: "architecture", label: "Architecture" },
    { key: "dataSize", label: "Data Size" },
    { key: "predictedEnergyConsumption", label: "Predicted Energy Consumption (Raw)" },
    { key: "parsedEnergyValue", label: "Parsed Energy Value" },
    { key: "energyUnit", label: "Energy Unit" },
    { key: "confidenceLevel", label: "Confidence Level" },
  ];

  properties.forEach(propInfo => {
    let modelAValue = report.modelA[propInfo.key];
    let modelBValue = report.modelB[propInfo.key];

    if (propInfo.key === 'selectedFramework') {
      modelAValue = report.modelA.selectedFramework ? frameworkNameMapping[report.modelA.selectedFramework] || report.modelA.selectedFramework : 'N/A';
      modelBValue = report.modelB.selectedFramework ? frameworkNameMapping[report.modelB.selectedFramework] || report.modelB.selectedFramework : 'N/A';
    }
     // For parsedEnergyValue, combine with unit for clarity if needed, or handle as separate columns
    // Currently, parsedEnergyValue and energyUnit are separate rows as per the property list.

    data.push([propInfo.label, modelAValue, modelBValue]);
  });

  data.push([]); // Spacer row
  data.push(["Chart Data Comparison"]);
  data.push(["Name", "Energy Value", "Unit"]);
  report.comparisonSummary.chartData.forEach(cd => {
    data.push([cd.name, cd.energy, cd.unit]);
  });

  return data;
};

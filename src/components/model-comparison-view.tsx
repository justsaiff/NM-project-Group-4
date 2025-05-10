

"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { energyPrediction, type EnergyPredictionOutput } from "@/ai/flows/energy-prediction-flow";
import { useToast } from "@/hooks/use-toast";
import { GitCompareArrows, Loader2, FileDown, Save, Sheet as SheetIcon } from "lucide-react";
import { ModelSelector } from "./model-selector";
import { FrameworkSelector } from "./framework-selector";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { SavedReport, ModelReportDetails, ReportChartData } from "@/types/reports";
import { convertReportToCsvDataArray, arrayToCsv, downloadCsv } from "@/lib/csv-utils";


const comparisonFormSchema = z.object({
  modelA_selectedModel: z.string().optional(),
  modelA_selectedFramework: z.string().optional(), 
  modelA_architecture: z.string().min(3, { message: "Model architecture must be at least 3 characters." }),
  modelA_dataSize: z.string().min(1, { message: "Data size is required (e.g., 1GB, 100MB)." }),
  
  modelB_selectedModel: z.string().optional(),
  modelB_selectedFramework: z.string().optional(), 
  modelB_architecture: z.string().min(3, { message: "Model architecture must be at least 3 characters." }),
  modelB_dataSize: z.string().min(1, { message: "Data size is required (e.g., 1GB, 100MB)." }),
});

type ComparisonFormValues = z.infer<typeof comparisonFormSchema>;

interface ExtendedPredictionResult extends EnergyPredictionOutput {
  parsedEnergyValue: number;
  energyUnit: string;
}

const parseEnergyValueAndUnit = (energyString: string): { value: number; unit: string } => {
  const valueMatch = energyString.match(/(\d+(\.\d+)?)/);
  const value = valueMatch ? parseFloat(valueMatch[1]) : 0;
  const unit = energyString.replace(/[\d\.\s,]/g, '') || "units";
  return { value, unit };
};

interface ModelComparisonViewProps {
  onSaveReport?: (report: Omit<SavedReport, 'id'>) => void; 
}

export function ModelComparisonView({ onSaveReport }: ModelComparisonViewProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modelAResult, setModelAResult] = React.useState<ExtendedPredictionResult | null>(null);
  const [modelBResult, setModelBResult] = React.useState<ExtendedPredictionResult | null>(null);
  const { toast } = useToast();

  const form = useForm<ComparisonFormValues>({
    resolver: zodResolver(comparisonFormSchema),
    defaultValues: {
      modelA_architecture: "",
      modelA_dataSize: "",
      modelA_selectedModel: undefined,
      modelA_selectedFramework: undefined,
      modelB_architecture: "",
      modelB_dataSize: "",
      modelB_selectedModel: undefined,
      modelB_selectedFramework: undefined,
    },
  });

  const modelASelected = form.watch("modelA_selectedModel");
  const modelAFramework = form.watch("modelA_selectedFramework");
  const modelBSelected = form.watch("modelB_selectedModel");
  const modelBFramework = form.watch("modelB_selectedFramework");

  React.useEffect(() => {
    if (modelASelected) {
      let arch = form.getValues("modelA_architecture") || "";
      let framework = modelAFramework;
      if (modelASelected.includes("resnet")) { arch = "CNN (ResNet-like)"; if(!framework) framework = "tensorflow"; }
      else if (modelASelected.includes("bert")) { arch = "Transformer (BERT-like)"; if(!framework) framework = "pytorch"; }
      else if (modelASelected.includes("gpt")) { arch = "Transformer (GPT-like)"; if(!framework) framework = "pytorch"; }
      else if (modelASelected.includes("skl_")) { if(!framework) framework = "scikit-learn"; }
      form.setValue("modelA_architecture", arch);
      if(framework && framework !== modelAFramework) form.setValue("modelA_selectedFramework", framework);
    }
  }, [modelASelected, modelAFramework, form]);

  React.useEffect(() => {
    if (modelBSelected) {
      let arch = form.getValues("modelB_architecture") || "";
      let framework = modelBFramework;
      if (modelBSelected.includes("resnet")) { arch = "CNN (ResNet-like)"; if(!framework) framework = "tensorflow"; }
      else if (modelBSelected.includes("bert")) { arch = "Transformer (BERT-like)"; if(!framework) framework = "pytorch"; }
      else if (modelBSelected.includes("gpt")) { arch = "Transformer (GPT-like)"; if(!framework) framework = "pytorch"; }
      else if (modelBSelected.includes("skl_")) { if(!framework) framework = "scikit-learn"; }
      form.setValue("modelB_architecture", arch);
      if(framework && framework !== modelBFramework) form.setValue("modelB_selectedFramework", framework);
    }
  }, [modelBSelected, modelBFramework, form]);


  async function onSubmit(values: ComparisonFormValues) {
    setIsLoading(true);
    setModelAResult(null);
    setModelBResult(null);

    try {
      const [resultA, resultB] = await Promise.all([
        energyPrediction({ modelArchitecture: values.modelA_architecture, dataSize: values.modelA_dataSize }),
        energyPrediction({ modelArchitecture: values.modelB_architecture, dataSize: values.modelB_dataSize })
      ]);
      
      const parsedA = parseEnergyValueAndUnit(resultA.predictedEnergyConsumption);
      setModelAResult({ ...resultA, parsedEnergyValue: parsedA.value, energyUnit: parsedA.unit });

      const parsedB = parseEnergyValueAndUnit(resultB.predictedEnergyConsumption);
      setModelBResult({ ...resultB, parsedEnergyValue: parsedB.value, energyUnit: parsedB.unit });

      toast({ title: "Comparison Ready", description: "Energy predictions for both models are available." });
    } catch (error) {
      console.error("Comparison error:", error);
      toast({
        title: "Comparison Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const chartData = React.useMemo((): ReportChartData[] => {
    if (!modelAResult || !modelBResult) return [];
    return [
      { name: "Model A", energy: modelAResult.parsedEnergyValue, unit: modelAResult.energyUnit },
      { name: "Model B", energy: modelBResult.parsedEnergyValue, unit: modelBResult.energyUnit },
    ];
  }, [modelAResult, modelBResult]);
  
  const primaryUnit = modelAResult?.energyUnit || modelBResult?.energyUnit || "units";

  const generateReportObject = (): Omit<SavedReport, 'id'> | null => {
    if (!modelAResult || !modelBResult) return null;
  
    const modelADetails: ModelReportDetails = {
      name: "Model A",
      selectedModel: form.getValues("modelA_selectedModel") || "Custom",
      selectedFramework: form.getValues("modelA_selectedFramework"),
      architecture: form.getValues("modelA_architecture"),
      dataSize: form.getValues("modelA_dataSize"),
      predictedEnergyConsumption: modelAResult.predictedEnergyConsumption,
      confidenceLevel: modelAResult.confidenceLevel,
      parsedEnergyValue: modelAResult.parsedEnergyValue,
      energyUnit: modelAResult.energyUnit,
    };
  
    const modelBDetails: ModelReportDetails = {
      name: "Model B",
      selectedModel: form.getValues("modelB_selectedModel") || "Custom",
      selectedFramework: form.getValues("modelB_selectedFramework"),
      architecture: form.getValues("modelB_architecture"),
      dataSize: form.getValues("modelB_dataSize"),
      predictedEnergyConsumption: modelBResult.predictedEnergyConsumption,
      confidenceLevel: modelBResult.confidenceLevel,
      parsedEnergyValue: modelBResult.parsedEnergyValue,
      energyUnit: modelBResult.energyUnit,
    };
  
    return {
      reportTitle: `Comparison: ${modelADetails.architecture || 'Model A'} vs ${modelBDetails.architecture || 'Model B'}`,
      generatedAt: new Date().toISOString(),
      modelA: modelADetails,
      modelB: modelBDetails,
      comparisonSummary: {
        chartData: chartData,
      },
    };
  };

  const downloadJSON = (data: object, filename: string) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveReportToApp = () => {
    const reportData = generateReportObject();
    if (reportData && onSaveReport) {
      onSaveReport(reportData);
      toast({ title: "Report Saved to App", description: "The comparison report has been saved within the application." });
    } else if (!reportData) {
      toast({ title: "No Data", description: "Please generate a comparison first.", variant: "destructive" });
    } else if (!onSaveReport) {
      toast({ title: "Save Error", description: "Cannot save report to app at this time.", variant: "destructive" });
    }
  };

  const handleExportReportToJSON = () => {
    const reportData = generateReportObject(); 
    if (reportData) {
      const fullReportDataWithIdForExport: SavedReport = {
        ...reportData,
        id: crypto.randomUUID(), 
      };
      downloadJSON(fullReportDataWithIdForExport, `aura_model_comparison_report_${new Date().toISOString().split('T')[0]}.json`);
      toast({ title: "Report Exported", description: "The comparison report has been downloaded as a JSON file." });
    } else {
      toast({ title: "No Data", description: "Please generate a comparison first.", variant: "destructive" });
    }
  };

  const handleExportReportToCSV = () => {
    const reportData = generateReportObject();
    if (reportData) {
      const fullReportDataWithIdForExport: SavedReport = {
        ...reportData,
        id: crypto.randomUUID(),
      };
      const csvDataArray = convertReportToCsvDataArray(fullReportDataWithIdForExport);
      const csvString = arrayToCsv(csvDataArray);
      downloadCsv(csvString, `aura_model_comparison_report_${new Date(fullReportDataWithIdForExport.generatedAt).toISOString().split('T')[0]}.csv`);
      toast({ title: "Report Exported to CSV", description: "The comparison report has been downloaded as a CSV file." });
    } else {
      toast({ title: "No Data", description: "Please generate a comparison first.", variant: "destructive" });
    }
  };


  return (
    <div className="space-y-8">
      <Card className="bg-card text-card-foreground shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center gap-2">
            <GitCompareArrows className="w-6 h-6" /> Model Energy Comparison
          </CardTitle>
          <CardDescription>
            Input details for two AI models to compare their estimated energy consumption.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Model A Inputs */}
                <div className="space-y-4 p-4 border rounded-lg bg-background/30 shadow-sm">
                  <h3 className="text-lg font-semibold text-primary">Model A</h3>
                  <FormField
                    control={form.control}
                    name="modelA_selectedFramework"
                    render={({ field }) => (
                      <FormItem>
                        <FrameworkSelector
                          selectedFramework={field.value}
                          onFrameworkChange={field.onChange}
                          label="Model A Framework"
                          idSuffix="modelA"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="modelA_selectedModel"
                    render={({ field }) => (
                      <FormItem>
                        <ModelSelector 
                          selectedModel={field.value} 
                          onModelChange={field.onChange} 
                          label="Optional: Select Base Model A"
                        />
                         <FormDescription>Selecting a model may pre-fill architecture and suggest a framework.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="modelA_architecture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model A Architecture</FormLabel>
                        <FormControl><Input placeholder="e.g., Transformer, CNN" {...field} className="bg-input"/></FormControl>
                         <FormDescription>Ensure this reflects the selected framework if any.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="modelA_dataSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model A Data Size</FormLabel>
                        <FormControl><Input placeholder="e.g., 1GB, 500MB" {...field} className="bg-input"/></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Model B Inputs */}
                <div className="space-y-4 p-4 border rounded-lg bg-background/30 shadow-sm">
                  <h3 className="text-lg font-semibold text-primary">Model B</h3>
                  <FormField
                    control={form.control}
                    name="modelB_selectedFramework"
                    render={({ field }) => (
                      <FormItem>
                        <FrameworkSelector
                          selectedFramework={field.value}
                          onFrameworkChange={field.onChange}
                          label="Model B Framework"
                          idSuffix="modelB"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="modelB_selectedModel"
                    render={({ field }) => (
                      <FormItem>
                        <ModelSelector 
                          selectedModel={field.value} 
                          onModelChange={field.onChange} 
                          label="Optional: Select Base Model B"
                        />
                        <FormDescription>Selecting a model may pre-fill architecture and suggest a framework.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="modelB_architecture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model B Architecture</FormLabel>
                        <FormControl><Input placeholder="e.g., Transformer, CNN" {...field} className="bg-input"/></FormControl>
                        <FormDescription>Ensure this reflects the selected framework if any.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="modelB_dataSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model B Data Size</FormLabel>
                        <FormControl><Input placeholder="e.g., 1GB, 500MB" {...field} className="bg-input"/></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button type="submit" disabled={isLoading} className="w-full max-w-xs bg-primary hover:bg-primary/90">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Comparing...</> : "Compare Models"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {modelAResult && modelBResult && (
        <Card className="bg-card text-card-foreground shadow-xl animate-in fade-in-0 zoom-in-95 duration-500">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Comparison Results</CardTitle>
            <CardDescription>Side-by-side energy prediction and key differences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-background/30">
                <CardHeader><CardTitle className="text-lg text-accent">Model A Details</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Framework:</strong> {form.getValues("modelA_selectedFramework")?.toUpperCase() || "N/A"}</p>
                  <p><strong>Base Model:</strong> {form.getValues("modelA_selectedModel") || "Custom"}</p>
                  <p><strong>Architecture:</strong> {form.getValues("modelA_architecture")}</p>
                  <p><strong>Data Size:</strong> {form.getValues("modelA_dataSize")}</p>
                  <Separator className="my-2"/>
                  <p><strong>Predicted Energy:</strong> <span className="font-semibold text-accent">{modelAResult.predictedEnergyConsumption}</span></p>
                  <p><strong>Confidence:</strong> {modelAResult.confidenceLevel}</p>
                </CardContent>
              </Card>
              <Card className="bg-background/30">
                <CardHeader><CardTitle className="text-lg text-accent">Model B Details</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Framework:</strong> {form.getValues("modelB_selectedFramework")?.toUpperCase() || "N/A"}</p>
                  <p><strong>Base Model:</strong> {form.getValues("modelB_selectedModel") || "Custom"}</p>
                  <p><strong>Architecture:</strong> {form.getValues("modelB_architecture")}</p>
                  <p><strong>Data Size:</strong> {form.getValues("modelB_dataSize")}</p>
                   <Separator className="my-2"/>
                  <p><strong>Predicted Energy:</strong> <span className="font-semibold text-accent">{modelBResult.predictedEnergyConsumption}</span></p>
                  <p><strong>Confidence:</strong> {modelBResult.confidenceLevel}</p>
                </CardContent>
              </Card>
            </div>

            <Separator />

            <div>
              <h4 className="text-xl font-semibold text-primary mb-4">Energy Consumption Chart</h4>
              {chartData.length > 0 ? (
                 <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        label={{ 
                          value: `Energy (${primaryUnit})`, 
                          angle: -90, 
                          position: 'insideLeft', 
                          fill: 'hsl(var(--muted-foreground))', 
                          style: { textAnchor: 'middle' } 
                        }} 
                      />
                       <Tooltip
                        cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--popover))', 
                          borderColor: 'hsl(var(--border))',
                          borderRadius: 'var(--radius)',
                          color: 'hsl(var(--popover-foreground))',
                          boxShadow: 'hsl(var(--shadow))'
                        }}
                        formatter={(value: number, name: string, entry: any) => {
                            const { payload } = entry;
                            return [`${value} ${payload.unit}`, name === "energy" ? "Energy" : name];
                        }}
                        labelStyle={{ color: 'hsl(var(--popover-foreground))', marginBottom: '4px', fontWeight: 'bold' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px', color: 'hsl(var(--foreground))' }} />
                      <Bar dataKey="energy" name="Energy" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-muted-foreground text-center">No chart data available. Submit models to see comparison.</p>
              )}
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Note: If energy units differ between models, the Y-axis shows the unit of the first model. Tooltips display individual units.
              </p>
            </div>
            
            <Separator />

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button onClick={handleSaveReportToApp} variant="outline" className="w-full sm:w-auto" disabled={!modelAResult || !modelBResult || !onSaveReport}>
                <Save className="mr-2 h-4 w-4" /> Save Report to App
              </Button>
              <Button onClick={handleExportReportToJSON} variant="outline" className="w-full sm:w-auto" disabled={!modelAResult || !modelBResult}>
                <FileDown className="mr-2 h-4 w-4" /> Download Report (JSON)
              </Button>
              <Button onClick={handleExportReportToCSV} variant="outline" className="w-full sm:w-auto" disabled={!modelAResult || !modelBResult}>
                <SheetIcon className="mr-2 h-4 w-4" /> Export Report (CSV)
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


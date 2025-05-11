
"use client";

import * as React from "react";
import { simulateModelTraining, type ModelTrainingSimulationOutput } from "@/ai/flows/model-training-simulation-flow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrainCircuit, Loader2, Play, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ModelTrainingSimulationView() {
  const [simulationOutput, setSimulationOutput] = React.useState<ModelTrainingSimulationOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleStartSimulation = async () => {
    setIsLoading(true);
    setSimulationOutput(null);
    try {
      const result = await simulateModelTraining();
      setSimulationOutput(result);
      toast({
        title: "Simulation Complete",
        description: "Model training simulation finished successfully.",
      });
    } catch (error) {
      console.error("Simulation error:", error);
      toast({
        title: "Simulation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred during simulation.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = React.useMemo(() => {
    if (!simulationOutput?.epochLogs) return [];
    return simulationOutput.epochLogs.map(log => ({
      name: `Epoch ${log.epoch}`,
      energy: log.estimatedEnergyUsage,
      unit: "kWh",
    }));
  }, [simulationOutput]);

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-3xl mx-auto bg-card text-card-foreground shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center gap-2">
            <BrainCircuit className="w-6 h-6" /> Model Training Simulation
          </CardTitle>
          <CardDescription>
            Simulate a PyTorch model training process including pruning and energy logging.
            This demonstrates conceptual steps and does not perform actual GPU/CPU intensive training.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Alert className="mb-6">
                <TrendingUp className="h-4 w-4" />
                <AlertTitle>Simulation Overview</AlertTitle>
                <AlertDescription>
                This tool simulates key aspects of an energy-aware model training pipeline:
                loading a pre-trained model (MobileNetV2), applying pruning, running a mock training loop
                with Automatic Mixed Precision (AMP) if CUDA were present, and logging estimated energy usage.
                The actual training calculations and GPU operations are not performed.
                </AlertDescription>
            </Alert>
        </CardContent>
        <CardFooter>
          <Button onClick={handleStartSimulation} disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Simulating...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Simulation
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {simulationOutput && (
        <Card className="w-full max-w-3xl mx-auto bg-card text-card-foreground shadow-xl mt-8 animate-in fade-in-0 zoom-in-95 duration-500">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Simulation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-accent mb-2">Model & Pruning Details</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line"><strong>Model:</strong> {simulationOutput.modelDetails}</p>
              <p className="text-sm text-muted-foreground whitespace-pre-line"><strong>Pruning:</strong> {simulationOutput.pruningDetails}</p>
            </section>
            <Separator />
            <section>
                <h3 className="text-lg font-semibold text-accent mb-2">Simulated Training Process</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{simulationOutput.trainingProcessSummary}</p>
            </section>
            <Separator />
            <section>
              <h3 className="text-lg font-semibold text-accent mb-2">Epoch Energy Logs</h3>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4 bg-background/30">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {simulationOutput.epochLogs.map((log) => (
                    <li key={log.epoch}>
                      Epoch {log.epoch}: Estimated Energy Usage - {log.estimatedEnergyUsage.toFixed(2)} kWh
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </section>
            <Separator />
            <section>
              <h3 className="text-lg font-semibold text-accent mb-2">Estimated Energy Usage Chart</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))"/>
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))', style: { textAnchor: 'middle' } }}
                    />
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                        contentStyle={{ 
                            backgroundColor: 'hsl(var(--popover))', 
                            borderColor: 'hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                            color: 'hsl(var(--popover-foreground))'
                        }}
                        formatter={(value: number, name: string, entry: any) => {
                            const { payload } = entry;
                            return [`${value} ${payload.unit}`, name === "energy" ? "Energy" : name];
                        }}
                        labelStyle={{ color: 'hsl(var(--popover-foreground))', marginBottom: '4px', fontWeight: 'bold' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px', color: 'hsl(var(--foreground))' }}/>
                    <Bar dataKey="energy" name="Est. Energy" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} barSize={Math.max(20, 80 / chartData.length)}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
            <Separator />
            <section>
                <h3 className="text-lg font-semibold text-accent mb-2">Final Message</h3>
                <p className="text-sm font-semibold text-primary">{simulationOutput.finalMessage}</p>
            </section>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

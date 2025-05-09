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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { energyPrediction, type EnergyPredictionInput, type EnergyPredictionOutput } from "@/ai/flows/energy-prediction-flow";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { ModelSelector } from "./model-selector";


const formSchema = z.object({
  selectedModel: z.string().optional(),
  modelArchitecture: z.string().min(3, {
    message: "Model architecture must be at least 3 characters.",
  }),
  dataSize: z.string().min(1, {
    message: "Data size is required (e.g., 1GB, 100MB).",
  }),
});

type EnergyPredictorFormValues = z.infer<typeof formSchema>;

interface EnergyPredictorFormProps {
  onPredictionResult: (result: EnergyPredictionOutput) => void;
}

export function EnergyPredictorForm({ onPredictionResult }: EnergyPredictorFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<EnergyPredictorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelArchitecture: "",
      dataSize: "",
      selectedModel: undefined,
    },
  });
  
  const selectedModelValue = form.watch("selectedModel");

  React.useEffect(() => {
    if (selectedModelValue) {
      // Placeholder: In a real app, you might fetch model details based on selectedModelValue
      // and pre-fill architecture or typical data size.
      if (selectedModelValue.includes("resnet")) {
        form.setValue("modelArchitecture", "CNN (ResNet-like)");
      } else if (selectedModelValue.includes("bert")) {
        form.setValue("modelArchitecture", "Transformer (BERT-like)");
      } else if (selectedModelValue.includes("gpt")) {
        form.setValue("modelArchitecture", "Transformer (GPT-like)");
      }
    }
  }, [selectedModelValue, form]);


  async function onSubmit(values: EnergyPredictorFormValues) {
    setIsLoading(true);
    try {
      const predictionInput: EnergyPredictionInput = {
        modelArchitecture: values.modelArchitecture,
        dataSize: values.dataSize,
      };
      const result = await energyPrediction(predictionInput);
      onPredictionResult(result);
      toast({
        title: "Prediction Successful",
        description: "Energy consumption predicted.",
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Prediction Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl bg-card text-card-foreground shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Energy Predictor</CardTitle>
        <CardDescription>
          Enter AI model details to predict its energy consumption.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="selectedModel"
              render={({ field }) => (
                <FormItem>
                  <ModelSelector 
                    selectedModel={field.value} 
                    onModelChange={field.onChange}
                    label="Optionally, select a base model"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modelArchitecture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model Architecture</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Transformer, CNN, LSTM" {...field} className="bg-input text-foreground border-border"/>
                  </FormControl>
                  <FormDescription>
                    Describe the type of architecture (e.g., CNN, Transformer).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Input Data Size</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1GB, 500MB, 10TB" {...field} className="bg-input text-foreground border-border"/>
                  </FormControl>
                  <FormDescription>
                    Specify the size of the data the model processes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Predicting...
                </>
              ) : (
                "Predict Energy Consumption"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

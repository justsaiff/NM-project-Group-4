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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getModelOptimizationSuggestions, type ModelOptimizationInput, type ModelOptimizationOutput } from "@/ai/flows/model-optimization-suggestions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { ModelSelector } from "./model-selector";


const formSchema = z.object({
  selectedModel: z.string().optional(),
  modelDescription: z.string().min(20, {
    message: "Model description must be at least 20 characters.",
  }).max(2000, {
    message: "Model description must not exceed 2000 characters."
  }),
});

type ModelOptimizerFormValues = z.infer<typeof formSchema>;

interface ModelOptimizerFormProps {
  onOptimizationSuggestions: (suggestions: ModelOptimizationOutput) => void;
}

export function ModelOptimizerForm({ onOptimizationSuggestions }: ModelOptimizerFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<ModelOptimizerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelDescription: "",
      selectedModel: undefined,
    },
  });

  const selectedModelValue = form.watch("selectedModel");

  React.useEffect(() => {
    if (selectedModelValue) {
      // Placeholder: In a real app, you might fetch model details based on selectedModelValue
      // and pre-fill the description.
      let defaultDescription = `Model: ${selectedModelValue}\nArchitecture: [Specify architecture, e.g., Transformer with 12 layers, 768 hidden units]\nDataset: [Specify dataset used for training/fine-tuning]\nTask: [Specify task, e.g., text classification, image generation]\n`;
      if (selectedModelValue.includes("resnet")) {
        defaultDescription += "This is a Convolutional Neural Network commonly used for image classification.";
      } else if (selectedModelValue.includes("bert")) {
         defaultDescription += "This is a Transformer-based model often used for Natural Language Processing tasks.";
      }
      form.setValue("modelDescription", defaultDescription);
    }
  }, [selectedModelValue, form]);

  async function onSubmit(values: ModelOptimizerFormValues) {
    setIsLoading(true);
    try {
      const optimizationInput: ModelOptimizationInput = {
        modelDescription: values.modelDescription,
      };
      const result = await getModelOptimizationSuggestions(optimizationInput);
      onOptimizationSuggestions(result);
      toast({
        title: "Optimization Suggestions Received",
        description: "AI has provided model optimization tips.",
      });
    } catch (error) {
      console.error("Optimization suggestion error:", error);
      toast({
        title: "Suggestion Failed",
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
        <CardTitle className="text-2xl text-primary">Model Optimizer</CardTitle>
        <CardDescription>
          Describe your AI model to receive optimization suggestions.
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
                    label="Optionally, select a base model to pre-fill description"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modelDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of your AI model, including its architecture, layers, parameters, and intended use case..."
                      className="min-h-[150px] bg-input text-foreground border-border"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The more details you provide, the better the suggestions.
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
                  Analyzing...
                </>
              ) : (
                "Get Optimization Suggestions"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

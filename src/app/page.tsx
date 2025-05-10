
"use client";

import * as React from "react";
import { AppLayout } from "@/components/app-layout";
import { EnergyPredictor } from "@/components/energy-predictor";
import { ModelOptimizer } from "@/components/model-optimizer";
import { AppEnergyConsumptionCard } from "@/components/app-energy-consumption-card";
import { SavingTipsView } from "@/components/saving-tips-view";
import { ModelComparisonView } from "@/components/model-comparison-view";
import { BarChartBig, Settings2, Zap, Lightbulb, GitCompareArrows } from "lucide-react"; 
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type View = "dashboard" | "predictor" | "optimizer" | "savingTips" | "modelComparison";

interface NavItem {
  id: View;
  label: string;
  icon: LucideIcon;
  action: () => void;
}

function DashboardView() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-card text-card-foreground shadow-lg" data-ai-hint="technology abstract">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Welcome to Aura</CardTitle>
          <CardDescription>Your AI Energy Efficiency Companion</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Aura helps you understand and optimize the energy consumption of your AI models.
            Use the navigation menu to explore features like the Energy Predictor and Model Optimizer.
          </p>
          <div className="mt-4 relative h-40 w-full rounded-md overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/aura-welcome/600/400" 
              alt="Abstract technology background" 
              layout="fill"
              objectFit="cover"
              data-ai-hint="technology abstract"
            />
          </div>
        </CardContent>
      </Card>
       <Card className="bg-card text-card-foreground shadow-lg" data-ai-hint="energy efficiency">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-primary"><BarChartBig className="w-5 h-5"/>Energy Predictor</CardTitle>
          <CardDescription>Estimate model energy usage</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Input your model's architecture and data size to get an AI-powered prediction of its energy footprint.
          </p>
           <div className="mt-4 relative h-40 w-full rounded-md overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/aura-predictor/600/400" 
              alt="Energy prediction concept" 
              layout="fill"
              objectFit="cover"
              data-ai-hint="data graph"
            />
          </div>
        </CardContent>
      </Card>
       <Card className="bg-card text-card-foreground shadow-lg" data-ai-hint="model optimization">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-primary"><Settings2 className="w-5 h-5"/>Model Optimizer</CardTitle>
          <CardDescription>Get tips to shrink your models</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Receive suggestions like pruning and quantization to make your models smaller and faster while maintaining accuracy.
          </p>
           <div className="mt-4 relative h-40 w-full rounded-md overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/aura-optimizer/600/400" 
              alt="Model optimization concept" 
              layout="fill"
              objectFit="cover"
              data-ai-hint="circuit board"
            />
          </div>
        </CardContent>
      </Card>
      <AppEnergyConsumptionCard />
    </div>
  );
}


export default function HomePage() {
  const [activeView, setActiveView] = React.useState<View>("dashboard");

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: Zap, action: () => setActiveView("dashboard") },
    { id: "predictor", label: "Energy Predictor", icon: BarChartBig, action: () => setActiveView("predictor") },
    { id: "optimizer", label: "Model Optimizer", icon: Settings2, action: () => setActiveView("optimizer") },
    { id: "savingTips", label: "Saving Tips", icon: Lightbulb, action: () => setActiveView("savingTips") },
    { id: "modelComparison", label: "Model Comparison", icon: GitCompareArrows, action: () => setActiveView("modelComparison") },
  ];

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "predictor":
        return <EnergyPredictor />;
      case "optimizer":
        return <ModelOptimizer />;
      case "savingTips":
        return <SavingTipsView />;
      case "modelComparison":
        return <ModelComparisonView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <AppLayout navItems={navItems} activeView={activeView}>
      {renderView()}
    </AppLayout>
  );
}


"use client";

import * as React from "react";
import { AppLayout } from "@/components/app-layout";
import { EnergyPredictor } from "@/components/energy-predictor";
import { ModelOptimizer } from "@/components/model-optimizer";
import { AppEnergyConsumptionCard } from "@/components/app-energy-consumption-card";
import { SavingTipsView } from "@/components/saving-tips-view";
import { ModelComparisonView } from "@/components/model-comparison-view";
import { ChatbotView } from "@/components/chatbot-view";
import { ReportsView } from "@/components/reports-view"; 
import { EnergyReportGeneratorView } from "@/components/energy-report-generator-view";
import { ModelTrainingSimulationView } from "@/components/model-training-simulation-view";
import { BarChartBig, Settings2, Lightbulb, GitCompareArrows, MessageCircle, Home, FileText, ClipboardList, BrainCircuit, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import type { SavedReport } from "@/types/reports"; 

type View = "dashboard" | "predictor" | "optimizer" | "savingTips" | "modelComparison" | "chatbot" | "reports" | "reportGenerator" | "trainingSimulation";

interface NavItem {
  id: View;
  label: string;
  icon: LucideIcon;
  action: () => void;
}

function DashboardView({ setActiveView }: { setActiveView: (view: View) => void }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="lg:col-span-1 xl:col-span-2 space-y-4 p-6 bg-card text-card-foreground shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-primary flex items-center gap-2"><Zap className="w-6 h-6" /> Welcome to Aura</h2>
        <p className="text-muted-foreground">
          Aura is your AI Energy Efficiency Companion. It helps you understand and optimize the energy consumption of your AI models.
          Use the navigation menu or click the cards below to explore features like Energy Prediction, Model Optimization, Training Simulations, and more.
        </p>
        <div className="mt-4 relative h-48 w-full rounded-md overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/aura-welcome-main/800/400" 
            alt="Abstract technology background representing AI and energy" 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint="technology abstract"
          />
        </div>
      </div>
       <Card className="bg-card text-card-foreground shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer" onClick={() => setActiveView("predictor")}>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-primary"><BarChartBig className="w-5 h-5"/>Energy Predictor</CardTitle>
          <CardDescription>Estimate model energy usage</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Input your model's architecture, framework, and data size to get an AI-powered prediction of its energy footprint.
          </p>
           <div className="mt-4 relative h-40 w-full rounded-md overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/aura-predictor-dash/600/400" 
              alt="Energy prediction graph concept" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="data graph"
            />
          </div>
        </CardContent>
      </Card>
       <Card className="bg-card text-card-foreground shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer" onClick={() => setActiveView("optimizer")}>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-primary"><Settings2 className="w-5 h-5"/>Model Optimizer</CardTitle>
          <CardDescription>Get tips to shrink your models</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Describe your model and receive AI suggestions like pruning and quantization to make it smaller and more efficient.
          </p>
           <div className="mt-4 relative h-40 w-full rounded-md overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/aura-optimizer-dash/600/400" 
              alt="Model optimization gears concept" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="circuit gears"
            />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card text-card-foreground shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer" onClick={() => setActiveView("chatbot")}>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-primary"><MessageCircle className="w-5 h-5"/>Aura Chat</CardTitle>
          <CardDescription>Ask questions and get assistance</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Interact with AuraChat for help with AI energy optimization, application features, or general queries.
          </p>
           <div className="mt-4 relative h-40 w-full rounded-md overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/aura-chat-dash/600/400" 
              alt="Chatbot interface illustration" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="chat bubble"
            />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card text-card-foreground shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer" onClick={() => setActiveView("savingTips")}>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-primary"><Lightbulb className="w-5 h-5"/>Energy Saving Tips</CardTitle>
          <CardDescription>Learn how to optimize your AI</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Explore AI-powered explanations and practical advice on various strategies to reduce the energy footprint of your models.
          </p>
          <div className="mt-4 relative h-40 w-full rounded-md overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/aura-tips-dash/600/400" 
              alt="Lightbulb with green energy symbols" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="idea lightbulb"
            />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card text-card-foreground shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer" onClick={() => setActiveView("modelComparison")}>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-primary"><GitCompareArrows className="w-5 h-5"/>Model Comparison</CardTitle>
          <CardDescription>Compare energy of different models</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Input details for multiple AI models to see a side-by-side comparison of their estimated energy consumption. Save and export reports.
          </p>
          <div className="mt-4 relative h-40 w-full rounded-md overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/aura-compare-dash/600/400" 
              alt="Comparison chart with model icons" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="comparison chart"
            />
          </div>
        </CardContent>
      </Card>
       <Card className="bg-card text-card-foreground shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer" onClick={() => setActiveView("reports")}>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-primary"><FileText className="w-5 h-5"/>Saved Reports</CardTitle>
          <CardDescription>Access your saved reports</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Review all your previously saved energy predictions and model comparison reports in one place.
          </p>
           <div className="mt-4 relative h-40 w-full rounded-md overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/aura-reports-dash/600/400" 
              alt="Folder with saved documents" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="documents files"
            />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card text-card-foreground shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer" onClick={() => setActiveView("reportGenerator")}>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-primary"><ClipboardList className="w-5 h-5"/>Energy Report Generator</CardTitle>
          <CardDescription>Generate AI efficiency reports</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Input 'before' metrics to generate a report showing potential energy savings and CO₂ reductions after simulated AI optimization.
          </p>
           <div className="mt-4 relative h-40 w-full rounded-md overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/aura-report-gen-dash/600/400" 
              alt="Report document with checklist" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="checklist document"
            />
          </div>
        </CardContent>
      </Card>
       <Card className="bg-card text-card-foreground shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer" onClick={() => setActiveView("trainingSimulation")}>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-primary"><BrainCircuit className="w-5 h-5"/>Training Simulation</CardTitle>
          <CardDescription>Simulate training energy usage</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Observe a conceptual model training process, including pruning and energy logging, with visualizations.
          </p>
           <div className="mt-4 relative h-40 w-full rounded-md overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/aura-train-sim-dash/600/400" 
              alt="Neural network brain concept" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="neural network"
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
  const [savedReports, setSavedReports] = React.useState<SavedReport[]>([]);

  // Load reports from localStorage on component mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedReports = localStorage.getItem("auraSavedReports");
      if (storedReports) {
        try {
          const parsedReports = JSON.parse(storedReports);
          if (Array.isArray(parsedReports)) {
            setSavedReports(parsedReports);
          } else {
            console.warn("Stored reports in localStorage is not an array. Initializing with empty array.");
            setSavedReports([]);
            localStorage.setItem("auraSavedReports", JSON.stringify([]));
          }
        } catch (error) {
          console.error("Failed to parse reports from localStorage:", error);
          setSavedReports([]); 
          localStorage.setItem("auraSavedReports", JSON.stringify([]));
        }
      }
    }
  }, []);

  // Save reports to localStorage whenever savedReports state changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("auraSavedReports", JSON.stringify(savedReports));
    }
  }, [savedReports]);


  const handleSaveReport = (reportData: Omit<SavedReport, 'id'>) => {
    const newReport: SavedReport = {
      ...reportData,
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `report-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    };
    setSavedReports(prevReports => [...prevReports, newReport]);
  };


  const navItems: NavItem[] = [
    { id: "dashboard", label: "Home", icon: Home, action: () => setActiveView("dashboard") },
    { id: "predictor", label: "Energy Predictor", icon: BarChartBig, action: () => setActiveView("predictor") },
    { id: "optimizer", label: "Model Optimizer", icon: Settings2, action: () => setActiveView("optimizer") },
    { id: "chatbot", label: "Aura Chat", icon: MessageCircle, action: () => setActiveView("chatbot") },
    { id: "savingTips", label: "Saving Tips", icon: Lightbulb, action: () => setActiveView("savingTips") },
    { id: "modelComparison", label: "Model Comparison", icon: GitCompareArrows, action: () => setActiveView("modelComparison") },
    { id: "reports", label: "Saved", icon: FileText, action: () => setActiveView("reports") }, 
    { id: "reportGenerator", label: "Report Generator", icon: ClipboardList, action: () => setActiveView("reportGenerator") },
    { id: "trainingSimulation", label: "Training Simulation", icon: BrainCircuit, action: () => setActiveView("trainingSimulation") },
  ];

  const renderView = () => {
    let currentViewComponent;
    switch (activeView) {
      case "dashboard":
        currentViewComponent = <DashboardView setActiveView={setActiveView} />;
        break;
      case "predictor":
        currentViewComponent = <EnergyPredictor onSaveReport={handleSaveReport} />;
        break;
      case "optimizer":
        currentViewComponent = <ModelOptimizer />;
        break;
      case "chatbot":
        currentViewComponent = <ChatbotView />;
        break;
      case "savingTips":
        currentViewComponent = <SavingTipsView />;
        break;
      case "modelComparison":
        currentViewComponent = <ModelComparisonView onSaveReport={handleSaveReport} />; 
        break;
      case "reports":
        currentViewComponent = <ReportsView reports={savedReports} />; 
        break;
      case "reportGenerator":
        currentViewComponent = <EnergyReportGeneratorView />;
        break;
      case "trainingSimulation":
        currentViewComponent = <ModelTrainingSimulationView />;
        break;
      default:
        currentViewComponent = <DashboardView setActiveView={setActiveView} />;
    }
    return <div key={activeView} className="animate-in fade-in-50 duration-500">{currentViewComponent}</div>;
  };
  
  const activeNavItem = navItems.find(item => item.id === activeView);
  const pageTitle = activeNavItem ? activeNavItem.label : "Aura";


  return (
    <AppLayout navItems={navItems} activeView={activeView} pageTitle={pageTitle}>
      {renderView()}
    </AppLayout>
  );
}



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
import { EnergyReportGeneratorView } from "@/components/energy-report-generator-view"; // New import
import { BarChartBig, Settings2, Lightbulb, GitCompareArrows, MessageCircle, Home, FileText, ClipboardList } from "lucide-react"; // Added ClipboardList
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import type { SavedReport } from "@/types/reports"; 

type View = "dashboard" | "predictor" | "optimizer" | "savingTips" | "modelComparison" | "chatbot" | "reports" | "reportGenerator"; // Added reportGenerator

interface NavItem {
  id: View;
  label: string;
  icon: LucideIcon;
  action: () => void;
}

function DashboardView({ setActiveView }: { setActiveView: (view: View) => void }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-card text-card-foreground shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Dashboard Overview</CardTitle>
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
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="technology abstract"
            />
          </div>
        </CardContent>
      </Card>
       <Card className="bg-card text-card-foreground shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer" onClick={() => setActiveView("predictor")}>
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
            Receive suggestions like pruning and quantization to make your models smaller and faster while maintaining accuracy.
          </p>
           <div className="mt-4 relative h-40 w-full rounded-md overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/aura-optimizer/600/400" 
              alt="Model optimization concept" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="circuit board"
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
              src="https://picsum.photos/seed/aura-chat/600/400" 
              alt="Chatbot interface concept" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="chat bubble"
            />
          </div>
        </CardContent>
      </Card>
      <AppEnergyConsumptionCard />
       <Card className="bg-card text-card-foreground shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer" onClick={() => setActiveView("reports")}>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-primary"><FileText className="w-5 h-5"/>View Reports</CardTitle>
          <CardDescription>Access saved model comparison reports</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Review all your previously saved model comparison reports in one place.
          </p>
           <div className="mt-4 relative h-40 w-full rounded-md overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/aura-reports/600/400" 
              alt="Reports and documents concept" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="documents files"
            />
          </div>
        </CardContent>
      </Card>
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
    { id: "reports", label: "Reports", icon: FileText, action: () => setActiveView("reports") }, 
    { id: "reportGenerator", label: "Report Generator", icon: ClipboardList, action: () => setActiveView("reportGenerator") }, // New NavItem
  ];

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView setActiveView={setActiveView} />;
      case "predictor":
        return <EnergyPredictor />;
      case "optimizer":
        return <ModelOptimizer />;
      case "chatbot":
        return <ChatbotView />;
      case "savingTips":
        return <SavingTipsView />;
      case "modelComparison":
        return <ModelComparisonView onSaveReport={handleSaveReport} />; 
      case "reports":
        return <ReportsView reports={savedReports} />; 
      case "reportGenerator": // New case
        return <EnergyReportGeneratorView />;
      default:
        return <DashboardView setActiveView={setActiveView} />;
    }
  };

  return (
    <AppLayout navItems={navItems} activeView={activeView}>
      {renderView()}
    </AppLayout>
  );
}


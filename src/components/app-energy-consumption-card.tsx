
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EnergyDisplayCard } from "./energy-display-card";
import { Cpu } from "lucide-react";
import Image from "next/image";

export function AppEnergyConsumptionCard() {
  return (
    <Card className="bg-card text-card-foreground shadow-lg col-span-1 md:col-span-2 lg:col-span-1 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2 text-primary">
          <Cpu className="w-5 h-5" />
          App Development Footprint
        </CardTitle>
        <CardDescription>Estimated energy for Aura's creation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This card provides an illustrative estimate of the energy consumed during the development of the Aura application.
        </p>
        <EnergyDisplayCard
          title="Estimated Development Energy"
          value={25} // Placeholder value
          unit="kWh"
          icon={Zap}
          description="Based on typical development hardware and hours."
          colorClass="text-accent"
        />
         <div className="mt-4 relative h-32 w-full rounded-md overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/aura-dev-energy/600/400" 
              alt="Sustainable development concept" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="green energy"
            />
          </div>
        <p className="text-xs text-muted-foreground">
          Note: This is a conceptual estimate and not based on real-time measurement.
        </p>
      </CardContent>
    </Card>
  );
}

// Need Zap icon for EnergyDisplayCard, if it's not globally available, import it here.
import { Zap } from "lucide-react";

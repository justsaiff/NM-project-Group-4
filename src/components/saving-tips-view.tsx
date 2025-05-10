
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Lightbulb } from "lucide-react";

export function SavingTipsView() {
  return (
    <div className="grid gap-6">
      <Card className="bg-card text-card-foreground shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-primary">
            <Lightbulb className="w-5 h-5" />
            Energy Saving Tips for AI
          </CardTitle>
          <CardDescription>Best practices to reduce your AI's energy footprint.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Discover actionable tips and best practices for designing, training, and deploying energy-efficient AI models.
            This section will cover topics like model pruning, quantization, efficient hardware usage, and more.
          </p>
          <div className="mt-4 relative h-48 w-full rounded-md overflow-hidden">
            <Image
              src="https://picsum.photos/seed/aura-saving-tips/600/400"
              alt="Energy saving concept"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="green idea"
            />
          </div>
          <div className="space-y-2 pt-4">
            <h3 className="text-lg font-semibold text-primary">Coming Soon:</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Optimizing Data Preprocessing</li>
              <li>Choosing Energy-Efficient Architectures</li>
              <li>Hardware Acceleration Techniques</li>
              <li>Continuous Monitoring and Optimization</li>
              <li>Efficient Training Strategies</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

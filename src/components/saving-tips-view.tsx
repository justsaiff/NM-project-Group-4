
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Lightbulb, Cpu, Settings, Zap, Cloud, Filter, TrendingUp, Microscope } from "lucide-react";

interface TipItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const TipItem: React.FC<TipItemProps> = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-4 p-4 rounded-lg bg-background/30 shadow-sm hover:shadow-md transition-shadow">
    <Icon className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
    <div>
      <h4 className="text-md font-semibold text-primary">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);


export function SavingTipsView() {
  const savingStrategies = [
    {
      icon: Filter,
      title: "Optimizing Data Preprocessing",
      description: "Efficient data loading, cleaning, and augmentation pipelines are crucial. By streamlining these initial steps, you can significantly reduce computation time and energy consumption during both model training and inference. Consider using optimized libraries and lazy loading techniques.",
    },
    {
      icon: Cpu,
      title: "Choosing Energy-Efficient Architectures",
      description: "Opt for lighter model architectures (e.g., MobileNets, SqueezeNets, or custom smaller networks) when feasible, especially for edge devices or applications where latency and power are critical. Evaluate the trade-off between model complexity and performance for your specific use case.",
    },
    {
      icon: Zap,
      title: "Hardware Acceleration Techniques",
      description: "Leverage specialized hardware like GPUs, TPUs, or FPGAs designed for AI computations. Ensure your software stack and model are optimized to fully utilize these accelerators, for example, by using appropriate data types and batch sizes.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Monitoring and Optimization",
      description: "Regularly monitor the energy consumption, latency, and throughput of your deployed models. Use profiling tools to identify bottlenecks and collect data to inform further optimization efforts and track improvements over time.",
    },
    {
      icon: Settings,
      title: "Efficient Training Strategies",
      description: "Employ techniques like transfer learning to leverage pre-trained models, mixed-precision training to reduce memory and computation, and distributed training with optimized communication protocols to shorten overall training time and energy expenditure.",
    },
    {
      icon: Microscope,
      title: "Model Pruning and Quantization",
      description: "Pruning removes redundant weights/neurons, reducing model size and computational cost. Quantization converts weights/activations to lower precision (e.g., FP16, INT8), decreasing size and speeding up inference, often with minimal accuracy loss. Both are key for resource-constrained environments.",
    },
    {
      icon: Settings, // Re-using icon, consider a more specific one if available for algorithms
      title: "Algorithm Selection and Hyperparameter Tuning",
      description: "Select algorithms inherently more efficient for your task. Systematically tune hyperparameters not just for accuracy but also for computational efficiency and energy usage. Explore automated hyperparameter optimization (HPO) tools.",
    },
    {
      icon: Cloud,
      title: "Utilizing Cloud Efficiency Features",
      description: "Take advantage of cloud provider features like auto-scaling compute resources, using spot instances for fault-tolerant training workloads, and employing serverless functions for inference to match resource allocation closely with demand, minimizing idle energy usage and cost.",
    },
  ];


  return (
    <div className="space-y-6">
      <Card className="bg-card text-card-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-primary">
            <Lightbulb className="w-6 h-6" />
            Energy Saving Tips for AI
          </CardTitle>
          <CardDescription>Best practices to reduce your AI's energy footprint.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Discover actionable tips and best practices for designing, training, and deploying energy-efficient AI models.
            Implementing these strategies can lead to significant reductions in energy consumption and operational costs.
          </p>
          <div className="mt-4 relative h-56 w-full rounded-md overflow-hidden shadow-inner">
            <Image
              src="https://picsum.photos/seed/aura-eco-ai/800/400"
              alt="Sustainable AI and green computing concept"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              className="object-cover"
              data-ai-hint="green technology"
              priority
            />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 pt-4">
            {savingStrategies.map((strategy, index) => (
              <TipItem key={index} icon={strategy.icon} title={strategy.title} description={strategy.description} />
            ))}
          </div>
          
           <p className="text-sm text-muted-foreground pt-4 text-center">
            Stay tuned for more in-depth guides and interactive tools for each strategy!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


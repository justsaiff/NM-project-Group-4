
import { Menu, Zap } from 'lucide-react'; // Added Zap
import type { LucideProps } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface AuraLogoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconClassName?: string;
  textAlwaysVisible?: boolean;
}

export function AuraLogo({ className, iconClassName, textAlwaysVisible = false, ...props }: AuraLogoProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className={cn(
        "flex items-center gap-2 text-primary p-1 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md transition-colors",
        className
      )}
      aria-label="Toggle sidebar"
      {...props}
    >
      <Menu className={cn("h-6 w-6", iconClassName)} />
      {textAlwaysVisible ? (
        <div className="flex items-center gap-1">
          <Zap className={cn("text-primary", iconClassName)} /> 
          <span className="text-xl font-semibold text-foreground">Aura</span>
        </div>
      ) : (
        <span className={cn(
          "text-xl font-semibold text-foreground",
          "group-data-[state=collapsed]:hidden" 
        )}>Aura</span>
      )}
    </button>
  );
}


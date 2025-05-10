
import { Menu } from 'lucide-react';
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
      <span className={cn(
        "text-xl font-semibold text-foreground",
        !textAlwaysVisible && "group-data-[state=collapsed]:hidden"
      )}>Aura</span>
    </button>
  );
}


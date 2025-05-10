
"use client";

import type { LucideIcon } from "lucide-react";
import { Moon, Sun } from "lucide-react";
import * as React from "react";

import { AuraLogo } from "@/components/aura-logo";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger, 
} from "@/components/ui/sidebar";
import { SheetTitle } from "@/components/ui/sheet"; 

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  action: () => void;
}

interface AppLayoutProps {
  navItems: NavItem[];
  activeView: string;
  children: React.ReactNode;
}

export function AppLayout({ navItems, activeView, children }: AppLayoutProps) {
  const [isDarkTheme, setIsDarkTheme] = React.useState(true); 

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkTheme(prefersDark); // Set initial theme based on system preference
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDarkTheme);
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  
  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="p-4">
          <div className="flex items-center">
            <AuraLogo iconClassName="h-6 w-6" />
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={item.action}
                  isActive={activeView === item.id}
                  tooltip={{ children: item.label, className: "bg-card text-card-foreground border-border shadow-lg" }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <Separator className="my-2" />
           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={toggleTheme} tooltip={{ children: isDarkTheme ? "Switch to Light Mode" : "Switch to Dark Mode", className: "bg-card text-card-foreground border-border shadow-lg" }}>
                {isDarkTheme ? <Sun /> : <Moon />}
                <span>{isDarkTheme ? "Light Mode" : "Dark Mode"}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6 md:px-8">
          <AuraLogo 
            iconClassName="h-5 w-5" 
            className="!text-foreground p-0 hover:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-transparent"
            textAlwaysVisible={true} 
          />
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

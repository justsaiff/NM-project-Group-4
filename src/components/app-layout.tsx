"use client";

import * as React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { AuraLogo } from "@/components/aura-logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BarChartBig, Settings2, LogOut, Moon, Sun } from "lucide-react"; // Assuming LogOut, Moon, Sun for theme/logout
import type { LucideIcon } from "lucide-react";

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
  const [isDarkTheme, setIsDarkTheme] = React.useState(true); // Default to dark as per styling

  React.useEffect(() => {
    // This is a simplified theme toggle. In a real app, you'd sync with localStorage and CSS.
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
          <div className="flex items-center justify-between">
            <AuraLogo className="w-8 h-8" />
            <SidebarTrigger className="hidden md:group-data-[collapsible=icon]:flex" />
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
            {/* Placeholder for logout */}
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => alert("Logout clicked")} tooltip={{ children: "Log Out", className: "bg-card text-card-foreground border-border shadow-lg" }}>
                <LogOut />
                <span>Log Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6 md:px-8">
          <SidebarTrigger className="md:hidden" /> {/* Mobile trigger */}
          <h1 className="text-xl font-semibold text-foreground">
            {navItems.find(item => item.id === activeView)?.label || "Aura Dashboard"}
          </h1>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

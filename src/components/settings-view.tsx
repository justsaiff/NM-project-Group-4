
"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Moon, Sun, Palette } from "lucide-react"; // Added Palette icon

export function SettingsView() {
  const { toast } = useToast();
  const [isDarkTheme, setIsDarkTheme] = React.useState(true); // Default to true or load from localStorage

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('aura-theme');
      setIsDarkTheme(storedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', newTheme);
      localStorage.setItem('aura-theme', newTheme ? 'dark' : 'light');
      toast({
        title: "Theme Changed",
        description: `Switched to ${newTheme ? 'Dark' : 'Light'} Mode.`,
      });
    }
  };

  const handleClearCache = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("auraSavedReports");
      // Potentially clear other caches or session storage items here
      toast({
        title: "Cache Cleared",
        description: "Application cache (saved reports) has been cleared.",
      });
      // Optionally, trigger a state update if needed to reflect cleared data elsewhere
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card text-card-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center gap-2">
            <Palette className="w-6 h-6" /> Application Settings
          </CardTitle>
          <CardDescription>Customize your Aura experience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-background/30">
            <div>
              <h4 className="font-semibold text-foreground">Theme Preference</h4>
              <p className="text-sm text-muted-foreground">
                Current mode: {isDarkTheme ? "Dark" : "Light"}
              </p>
            </div>
            <Button variant="outline" size="icon" onClick={toggleTheme} aria-label={isDarkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              {isDarkTheme ? <Sun className="h-5 w-5 text-foreground" /> : <Moon className="h-5 w-5 text-foreground" />}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg bg-background/30">
            <div>
              <h4 className="font-semibold text-foreground">Data Management</h4>
              <p className="text-sm text-muted-foreground">
                Clear locally stored application data like saved reports.
              </p>
            </div>
            <Button variant="destructive" onClick={handleClearCache}>
              Clear Local Cache
            </Button>
          </div>
          
          {/* Placeholder for more settings */}
          <div className="p-4 border rounded-lg bg-background/30">
            <h4 className="font-semibold text-foreground">Notification Preferences (Placeholder)</h4>
            <p className="text-sm text-muted-foreground">
              Configure how you receive notifications from Aura. (Feature not yet implemented)
            </p>
            {/* Example: <Switch id="email-notifications" /> <Label htmlFor="email-notifications">Email Notifications</Label> */}
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

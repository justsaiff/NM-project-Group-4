import type { Metadata } from 'next';
import { poppins } from '@/lib/fonts';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Aura - AI Energy Optimization',
  description: 'Predict and optimize energy consumption of AI models.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          poppins.variable, 
          'font-sans antialiased', 
          'animated-gradient-bg' // Apply the animated gradient class
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

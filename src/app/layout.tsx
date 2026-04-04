import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";

import { BackgroundElements } from "@/components/BackgroundElements";

export const metadata: Metadata = {
  title: "Rexton - Portfolio",
  description: "Personal portfolio of Rexton",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <BackgroundElements />
          
          <Navigation />
          
          <main className="main-content">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

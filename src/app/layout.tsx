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
      <head>
        {/* Tech-tag brand logos are served from Iconify; warm the connection. */}
        <link rel="preconnect" href="https://api.iconify.design" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.iconify.design" />
      </head>
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

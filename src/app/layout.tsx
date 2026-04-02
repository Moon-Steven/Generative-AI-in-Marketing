import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/sidebar";
import { PageTransition } from "@/components/layout/page-transition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ConvertAI — Generative Marketing Platform",
  description: "AI-powered landing page generation and conversion optimization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <TooltipProvider>
          <Sidebar />
          <main className="lg:ml-60 min-h-screen">
            <div className="px-4 py-4 lg:px-8 lg:py-6">
              <PageTransition>{children}</PageTransition>
            </div>
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}

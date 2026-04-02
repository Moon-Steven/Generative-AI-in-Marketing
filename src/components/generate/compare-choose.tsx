"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Crown, TrendingUp, Shield } from "lucide-react";
import type { GeneratedPage, BrandConfig } from "@/lib/types/generation";

interface CompareChooseProps {
  generatedPage: GeneratedPage;
  brandConfig: BrandConfig;
  onChoose: (choice: "ai" | "original") => void;
}

export function CompareChoose({ generatedPage, brandConfig, onChoose }: CompareChooseProps) {
  const [hoveredSide, setHoveredSide] = useState<"original" | "ai" | null>(null);

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-base font-semibold mb-1">Compare & Choose</h3>
        <p className="text-xs text-muted-foreground">
          Select the version you prefer — your choice helps AI learn your style
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Original / Template LP */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onMouseEnter={() => setHoveredSide("original")}
          onMouseLeave={() => setHoveredSide(null)}
          className="flex flex-col"
        >
          <div className={`border rounded-xl overflow-hidden transition-all flex-1 flex flex-col ${
            hoveredSide === "original" ? "border-foreground/30" : "border-border"
          }`}>
            {/* Header */}
            <div className="bg-secondary/50 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Your Current Page</Badge>
              </div>
            </div>

            {/* Mock Original LP Preview */}
            <div className="bg-white p-6 flex-1">
              <div className="max-w-sm mx-auto space-y-4">
                <div className="h-8 w-32 rounded bg-gray-200" />
                <div className="h-6 w-full rounded bg-gray-100" />
                <div className="h-6 w-3/4 rounded bg-gray-100" />
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full rounded bg-gray-50" />
                  <div className="h-4 w-5/6 rounded bg-gray-50" />
                  <div className="h-4 w-4/6 rounded bg-gray-50" />
                </div>
                <div className="pt-2">
                  <div className="h-10 w-40 rounded-lg bg-gray-300" />
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="h-20 rounded bg-gray-100" />
                  <div className="h-20 rounded bg-gray-100" />
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full rounded bg-gray-50" />
                  <div className="h-4 w-3/4 rounded bg-gray-50" />
                </div>
              </div>
            </div>

            {/* Scores */}
            <div className="bg-card px-4 py-3 border-t border-border">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-[10px] text-muted-foreground">Est. CVR</p>
                  <p className="text-sm font-bold font-mono">2.8%</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Promise Align</p>
                  <p className="text-sm font-bold font-mono text-amber-400">62%</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Mobile Score</p>
                  <p className="text-sm font-bold font-mono">78</p>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="mt-3 w-full"
            onClick={() => onChoose("original")}
          >
            Keep My Current Page
          </Button>
        </motion.div>

        {/* AI-Generated LP */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onMouseEnter={() => setHoveredSide("ai")}
          onMouseLeave={() => setHoveredSide(null)}
          className="flex flex-col"
        >
          <div className={`border rounded-xl overflow-hidden transition-all flex-1 flex flex-col ${
            hoveredSide === "ai" ? "border-primary/50" : "border-primary/20"
          }`}>
            {/* Header */}
            <div className="bg-primary/10 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="text-xs bg-primary text-primary-foreground">
                  <Crown className="h-3 w-3 mr-1" /> AI-Generated
                </Badge>
                <Badge variant="outline" className="text-[10px] text-success border-success/30">
                  <TrendingUp className="h-3 w-3 mr-1" /> +34% Est. CVR Lift
                </Badge>
              </div>
            </div>

            {/* AI LP Preview — mini version */}
            <div className="bg-white p-6 flex-1" style={{ color: brandConfig.colors.text }}>
              <div className="max-w-sm mx-auto space-y-4">
                <Badge
                  className="text-[10px]"
                  style={{ backgroundColor: brandConfig.colors.primary + "20", color: brandConfig.colors.primary }}
                >
                  30% Off + Free Shipping
                </Badge>
                <h4 className="text-lg font-bold leading-tight" style={{ color: brandConfig.colors.text }}>
                  {generatedPage.blocks.find(b => b.type === "hero")
                    ? (generatedPage.blocks.find(b => b.type === "hero")!.content as { headline: string }).headline
                    : "AI-Generated Headline"}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {generatedPage.blocks.find(b => b.type === "hero")
                    ? (generatedPage.blocks.find(b => b.type === "hero")!.content as { subheadline: string }).subheadline
                    : ""}
                </p>
                <div
                  className="inline-block px-4 py-2 rounded-lg text-white text-xs font-medium"
                  style={{ backgroundColor: brandConfig.colors.primary }}
                >
                  Get 30% Off My First Order
                </div>
                <div className="grid grid-cols-4 gap-2 pt-3">
                  {["50,000+", "94%", "14 Days", "4.9★"].map((stat) => (
                    <div key={stat} className="text-center">
                      <p className="text-sm font-bold" style={{ color: brandConfig.colors.primary }}>{stat}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-2">
                  {["✓ 20% Stabilized Vitamin C", "✓ Hyaluronic Acid + Niacinamide", "✓ Clinically Tested"].map(f => (
                    <p key={f} className="text-xs text-gray-600">{f}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Scores */}
            <div className="bg-card px-4 py-3 border-t border-primary/10">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-[10px] text-muted-foreground">Est. CVR</p>
                  <p className="text-sm font-bold font-mono text-success">3.8%</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Promise Align</p>
                  <p className="text-sm font-bold font-mono text-success">{generatedPage.metadata.promiseAlignmentScore}%</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Mobile Score</p>
                  <p className="text-sm font-bold font-mono text-success">{generatedPage.metadata.mobileScore}</p>
                </div>
              </div>
            </div>
          </div>

          <Button
            className="mt-3 w-full gap-1.5"
            onClick={() => onChoose("ai")}
          >
            <Check className="h-3.5 w-3.5" />
            Use AI-Generated Page
          </Button>
        </motion.div>
      </div>

      {/* Learning hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center"
      >
        <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-lg px-4 py-2">
          <Shield className="h-3.5 w-3.5 text-primary" />
          <p className="text-xs text-muted-foreground">
            Your choice helps AI learn your style preferences — future generations will be more aligned
          </p>
        </div>
      </motion.div>
    </div>
  );
}

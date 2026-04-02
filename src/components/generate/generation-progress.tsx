"use client";

import { motion } from "framer-motion";
import { Layers, Type, Palette, Check, Loader2 } from "lucide-react";

interface GenerationProgressProps {
  phase: number; // 0 = not started, 1 = structure done, 2 = content done, 3 = style done
}

const phases = [
  {
    icon: Layers,
    title: "Deciding Page Structure",
    description: "Analyzing audience type and selecting optimal block order...",
  },
  {
    icon: Type,
    title: "Generating Content",
    description: "Creating copy anchored to ad promise for each block...",
  },
  {
    icon: Palette,
    title: "Applying Brand Styles",
    description: "Rendering brand colors, fonts, and visual identity...",
  },
];

export function GenerationProgress({ phase }: GenerationProgressProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Generation Pipeline
      </p>
      <div className="space-y-3">
        {phases.map((p, i) => {
          const isComplete = phase > i;
          const isActive = phase === i;
          return (
            <motion.div
              key={p.title}
              className={`flex items-start gap-3 rounded-lg border px-4 py-3 transition-colors ${
                isComplete
                  ? "border-success/30 bg-success/5"
                  : isActive
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-card/50"
              }`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="mt-0.5">
                {isComplete ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Check className="h-4 w-4 text-success" />
                  </motion.div>
                ) : isActive ? (
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                ) : (
                  <p.icon className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div>
                <p
                  className={`text-sm font-medium ${
                    isActive ? "text-foreground" : isComplete ? "text-success" : "text-muted-foreground"
                  }`}
                >
                  {p.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {p.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

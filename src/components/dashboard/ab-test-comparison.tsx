"use client";

import { motion } from "framer-motion";
import { Trophy, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ABTest } from "@/lib/types/campaigns";

interface ABTestComparisonProps {
  test: ABTest;
}

export function ABTestComparison({ test }: ABTestComparisonProps) {
  const [varA, varB] = test.variants;
  const liftPercent = (((varB.cvr - varA.cvr) / varA.cvr) * 100).toFixed(1);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">A/B Test Results</h3>
        <Badge className="bg-success/20 text-success text-xs">
          {test.confidence}% Confidence
        </Badge>
      </div>

      {/* Lift Banner */}
      <motion.div
        className="bg-success/10 border border-success/20 rounded-lg p-3 mb-4 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-xs text-success/80 mb-0.5">Conversion Rate Improvement</p>
        <p className="text-2xl font-bold text-success font-mono">+{liftPercent}%</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          AI-generated page outperforms original
        </p>
      </motion.div>

      {/* Variant Cards */}
      <div className="grid grid-cols-2 gap-3">
        {[varA, varB].map((variant) => {
          const isWinner = test.winner === variant.label;
          return (
            <motion.div
              key={variant.label}
              className={`rounded-lg border p-3 ${
                isWinner
                  ? "border-success/30 bg-success/5"
                  : "border-border bg-card"
              }`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: variant.label === "A" ? 0.1 : 0.2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={isWinner ? "default" : "secondary"}
                    className={`text-[10px] ${isWinner ? "bg-success text-white" : ""}`}
                  >
                    Variant {variant.label}
                  </Badge>
                  {isWinner && <Trophy className="h-3.5 w-3.5 text-success" />}
                </div>
              </div>
              <p className="text-xs font-medium mb-3">{variant.name}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">CVR</span>
                  <span className={`font-mono font-semibold ${isWinner ? "text-success" : ""}`}>
                    {variant.cvr}%
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Conversions</span>
                  <span className="font-mono">{variant.conversions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Revenue</span>
                  <span className="font-mono">${(variant.revenue / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Avg Time
                  </span>
                  <span className="font-mono">{variant.avgTimeOnPage}s</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

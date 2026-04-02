"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ROICalculator() {
  const [adSpend, setAdSpend] = useState(10000);
  const [currentCvr, setCurrentCvr] = useState(2.5);
  const [improvement, setImprovement] = useState(34);

  const newCvr = currentCvr * (1 + improvement / 100);
  const currentConversions = (adSpend / 2.5) * (currentCvr / 100); // assuming $2.5 CPC
  const newConversions = (adSpend / 2.5) * (newCvr / 100);
  const additionalConversions = newConversions - currentConversions;
  const avgOrderValue = 55;
  const additionalRevenue = additionalConversions * avgOrderValue;
  const monthlySubscription = 299;
  const roi = ((additionalRevenue - monthlySubscription) / monthlySubscription) * 100;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">ROI Calculator</h3>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label className="text-[10px] text-muted-foreground uppercase mb-1 block">
            Monthly Ad Spend
          </label>
          <div className="relative">
            <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="number"
              value={adSpend}
              onChange={(e) => setAdSpend(Number(e.target.value))}
              className="bg-background pl-7 text-sm h-8"
            />
          </div>
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase mb-1 block">
            Current CVR
          </label>
          <div className="relative">
            <Input
              type="number"
              step="0.1"
              value={currentCvr}
              onChange={(e) => setCurrentCvr(Number(e.target.value))}
              className="bg-background text-sm h-8"
            />
          </div>
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground uppercase mb-1 block">
            CVR Improvement
          </label>
          <div className="relative">
            <Input
              type="number"
              value={improvement}
              onChange={(e) => setImprovement(Number(e.target.value))}
              className="bg-background text-sm h-8 pr-7"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
              %
            </span>
          </div>
        </div>
      </div>

      {/* Results */}
      <motion.div
        className="grid grid-cols-4 gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-secondary rounded-lg p-2.5 text-center">
          <p className="text-[10px] text-muted-foreground mb-0.5">New CVR</p>
          <p className="text-sm font-bold font-mono">{newCvr.toFixed(1)}%</p>
        </div>
        <div className="bg-secondary rounded-lg p-2.5 text-center">
          <p className="text-[10px] text-muted-foreground mb-0.5">Extra Conversions</p>
          <p className="text-sm font-bold font-mono">+{Math.round(additionalConversions)}</p>
        </div>
        <div className="bg-success/10 rounded-lg p-2.5 text-center">
          <p className="text-[10px] text-success/70 mb-0.5">Added Revenue</p>
          <p className="text-sm font-bold font-mono text-success">
            +${(additionalRevenue / 1000).toFixed(1)}K
          </p>
        </div>
        <div className="bg-primary/10 rounded-lg p-2.5 text-center">
          <p className="text-[10px] text-primary/70 mb-0.5">ROI</p>
          <p className="text-sm font-bold font-mono text-primary">
            {roi.toFixed(0)}%
          </p>
        </div>
      </motion.div>
    </div>
  );
}

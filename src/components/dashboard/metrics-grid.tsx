"use client";

import { motion } from "framer-motion";
import {
  Eye,
  MousePointerClick,
  ShoppingCart,
  Percent,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { CampaignMetrics } from "@/lib/types/campaigns";

interface MetricsGridProps {
  metrics: CampaignMetrics;
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const cards = [
    {
      label: "Total Visits",
      value: metrics.visits.toLocaleString(),
      icon: Eye,
      trend: "+18.2%",
      trendUp: true,
    },
    {
      label: "CTA Clicks",
      value: metrics.ctaClicks.toLocaleString(),
      icon: MousePointerClick,
      trend: "+24.5%",
      trendUp: true,
    },
    {
      label: "Conversions",
      value: metrics.conversions.toLocaleString(),
      icon: ShoppingCart,
      trend: "+34.2%",
      trendUp: true,
    },
    {
      label: "CVR",
      value: `${metrics.cvr}%`,
      icon: Percent,
      trend: "+0.9pp",
      trendUp: true,
    },
    {
      label: "ROAS",
      value: `${metrics.roas}x`,
      icon: TrendingUp,
      trend: "+1.2x",
      trendUp: true,
    },
    {
      label: "Revenue",
      value: `$${(metrics.revenue / 1000).toFixed(1)}K`,
      icon: DollarSign,
      trend: "+42.1%",
      trendUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="pt-3 pb-3 px-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
                  {card.label}
                </span>
                <card.icon className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <p className="text-lg font-bold font-mono tracking-tight">
                {card.value}
              </p>
              <p className={`text-[10px] font-medium mt-0.5 ${card.trendUp ? "text-success" : "text-destructive"}`}>
                {card.trend} vs last period
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

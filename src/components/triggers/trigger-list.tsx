"use client";

import { motion } from "framer-motion";
import {
  MousePointerClick,
  ArrowDownFromLine,
  Clock,
  ShoppingCart,
  Mail,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BehavioralTrigger } from "@/lib/types/triggers";

interface TriggerListProps {
  triggers: BehavioralTrigger[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  exit_intent: MousePointerClick,
  scroll_depth: ArrowDownFromLine,
  time_delay: Clock,
  cart_abandonment: ShoppingCart,
  idle: Mail,
};

const segmentColors: Record<string, string> = {
  high_intent: "bg-green-500/20 text-green-400",
  hesitating: "bg-amber-500/20 text-amber-400",
  churn_risk: "bg-red-500/20 text-red-400",
};

const segmentLabels: Record<string, string> = {
  high_intent: "High Intent",
  hesitating: "Hesitating",
  churn_risk: "Churn Risk",
};

export function TriggerList({ triggers, selectedId, onSelect }: TriggerListProps) {
  return (
    <div className="space-y-2">
      {triggers.map((trigger, i) => {
        const Icon = typeIcons[trigger.type] || Clock;
        const isSelected = selectedId === trigger.id;
        return (
          <motion.button
            key={trigger.id}
            onClick={() => onSelect(trigger.id)}
            className={`w-full text-left p-3 rounded-lg border transition-all ${
              isSelected
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30 bg-card"
            }`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  isSelected ? "bg-primary/20" : "bg-secondary"
                }`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate">{trigger.name}</span>
                  <div
                    className={`h-2 w-2 rounded-full shrink-0 ${
                      trigger.enabled ? "bg-success" : "bg-muted-foreground"
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-[10px] px-1.5 py-0 ${segmentColors[trigger.intentSegment]}`}>
                    {segmentLabels[trigger.intentSegment]}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {trigger.stats.conversionRate}% CVR
                  </span>
                </div>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

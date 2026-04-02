"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Megaphone, Target, Zap } from "lucide-react";
import type { AdVariant } from "@/lib/types/generation";

interface AdVariantsProps {
  variants: AdVariant[];
  onSelect: (variant: AdVariant) => void;
}

const angleIcons: Record<string, typeof Megaphone> = {
  Transformation: Zap,
  "Social Proof": Target,
  "Urgency / Deal": Megaphone,
  "Pain Point": Zap,
  Authority: Target,
};

const angleColors: Record<string, { bg: string; text: string; border: string }> = {
  Transformation: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  "Social Proof": { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  "Urgency / Deal": { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
  "Pain Point": { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  Authority: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
};

export function AdVariants({ variants, onSelect }: AdVariantsProps) {
  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-base font-semibold mb-1">AI Generated Ad Variants</h3>
        <p className="text-xs text-muted-foreground">
          Each variant targets a different persuasion angle — select one to generate a matching landing page
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {variants.map((variant, i) => {
          const Icon = angleIcons[variant.angle] || Megaphone;
          const colors = angleColors[variant.angle] || angleColors["Transformation"];

          return (
            <motion.div
              key={variant.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <div className={`border rounded-xl p-4 ${colors.border} ${colors.bg} h-full flex flex-col`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`h-6 w-6 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <Badge className={`text-[10px] ${colors.bg} ${colors.text} border-0`}>
                    {variant.angle}
                  </Badge>
                </div>

                <h4 className="text-sm font-semibold mb-2">{variant.headline}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">
                  {variant.body}
                </p>

                <div className="bg-background/50 rounded-lg px-3 py-2 mb-3">
                  <p className="text-xs font-medium text-primary">{variant.cta}</p>
                </div>

                <div className="text-[10px] text-muted-foreground mb-3 space-y-0.5">
                  <p>Promise: <span className="text-foreground">{variant.promise.mainPromise}</span></p>
                  <p>Audience: <span className="text-foreground capitalize">{variant.promise.audiencePreset} traffic</span></p>
                </div>

                <Button
                  size="sm"
                  onClick={() => onSelect(variant)}
                  className="w-full gap-1.5 text-xs"
                >
                  Use This Variant
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

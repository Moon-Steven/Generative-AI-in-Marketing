"use client";

import { motion } from "framer-motion";
import { Eye, MousePointerClick, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { BehavioralTrigger } from "@/lib/types/triggers";

interface TriggerDetailProps {
  trigger: BehavioralTrigger;
}

const typeLabels: Record<string, string> = {
  exit_intent: "Exit Intent Detection",
  scroll_depth: "Scroll Depth Trigger",
  time_delay: "Time Delay Trigger",
  cart_abandonment: "Cart Abandonment",
  idle: "Idle Detection",
};

const actionLabels: Record<string, string> = {
  popup: "Popup Overlay",
  countdown: "Countdown Timer",
  bundle_offer: "Bundle Suggestion",
  email_capture: "Email Capture",
  discount_reveal: "Discount Reveal",
};

export function TriggerDetail({ trigger }: TriggerDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Header */}
      <div>
        <h3 className="text-base font-semibold">{trigger.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className="text-[10px]">
            {typeLabels[trigger.type]}
          </Badge>
          <Badge variant="outline" className="text-[10px]">
            {actionLabels[trigger.action]}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Trigger Condition */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Trigger Condition
        </p>
        <div className="bg-secondary rounded-lg p-3 text-xs space-y-1">
          {trigger.config.scrollThreshold && (
            <p>When user scrolls past <strong>{trigger.config.scrollThreshold}%</strong> of the page</p>
          )}
          {trigger.config.delaySeconds && (
            <p>After <strong>{trigger.config.delaySeconds}s</strong> on page</p>
          )}
          {trigger.config.idleSeconds && (
            <p>After <strong>{trigger.config.idleSeconds}s</strong> of inactivity</p>
          )}
          {trigger.type === "exit_intent" && (
            <p>When cursor moves toward <strong>browser close/back</strong></p>
          )}
          {trigger.type === "cart_abandonment" && (
            <p>When user has items in cart and <strong>attempts to leave</strong></p>
          )}
        </div>
      </div>

      {/* Content Preview */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Content
        </p>
        <div className="bg-secondary rounded-lg p-3 space-y-2">
          <p className="text-sm font-semibold">{trigger.config.headline}</p>
          <p className="text-xs text-muted-foreground">{trigger.config.body}</p>
          <div className="pt-1">
            <span className="inline-block px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md">
              {trigger.config.ctaText}
            </span>
          </div>
          {trigger.config.discountCode && (
            <p className="text-[10px] text-muted-foreground">
              Code: <code className="text-primary">{trigger.config.discountCode}</code>
            </p>
          )}
        </div>
      </div>

      {/* Bundle Products */}
      {trigger.config.bundleProducts && (
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Bundle Products
          </p>
          <div className="space-y-1.5">
            {trigger.config.bundleProducts.map((p) => (
              <div key={p.name} className="flex items-center justify-between bg-secondary rounded-lg px-3 py-2">
                <span className="text-xs">{p.name}</span>
                <span className="text-xs font-mono text-muted-foreground">${p.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Stats */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Performance
        </p>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-secondary rounded-lg p-2.5 text-center">
            <Eye className="h-3.5 w-3.5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-sm font-bold font-mono">{trigger.stats.impressions.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">Impressions</p>
          </div>
          <div className="bg-secondary rounded-lg p-2.5 text-center">
            <MousePointerClick className="h-3.5 w-3.5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-sm font-bold font-mono">{trigger.stats.conversions.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">Conversions</p>
          </div>
          <div className="bg-secondary rounded-lg p-2.5 text-center">
            <TrendingUp className="h-3.5 w-3.5 mx-auto mb-1 text-success" />
            <p className="text-sm font-bold font-mono text-success">{trigger.stats.conversionRate}%</p>
            <p className="text-[10px] text-muted-foreground">CVR</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

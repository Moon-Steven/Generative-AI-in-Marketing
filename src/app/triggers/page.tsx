"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { TriggerList } from "@/components/triggers/trigger-list";
import { TriggerDetail } from "@/components/triggers/trigger-detail";
import { BehaviorTimeline } from "@/components/triggers/behavior-timeline";
import { NextStepBanner } from "@/components/layout/next-step-banner";
import { mockTriggers } from "@/lib/mock/triggers";
import { Eye, Brain, Zap, BarChart3, ArrowRight } from "lucide-react";

const aiSteps = [
  {
    icon: Eye,
    step: 1,
    title: "Observe Signals",
    subtitle: "Scroll, time, mouse, clicks, exit",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
  },
  {
    icon: Brain,
    step: 2,
    title: "Classify Intent",
    subtitle: "High → Nudge · Hesitating → Remove friction · Churn → Rescue",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  {
    icon: Zap,
    step: 3,
    title: "Fire Trigger",
    subtitle: "Match type → Personalize content → A/B test → Attribute",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
  },
];

export default function TriggersPage() {
  const [selectedTriggerId, setSelectedTriggerId] = useState<string>(
    mockTriggers[0].id
  );

  const selectedTrigger = mockTriggers.find((t) => t.id === selectedTriggerId)!;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Behavioral Triggers"
        description="AI-driven conversion triggers that respond to real-time user behavior"
      />

      {/* How AI Decides — Lightweight banner */}
      <Card className="bg-card border-border">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              How AI Decides What to Trigger
            </h3>
          </div>
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            {aiSteps.map((step, i) => (
              <motion.div
                key={step.step}
                className="flex items-center gap-3 flex-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`border rounded-lg p-3 ${step.borderColor} ${step.bgColor} flex-1`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`h-5 w-5 rounded-md ${step.bgColor} ${step.color} flex items-center justify-center shrink-0`}>
                      <step.icon className="h-3 w-3" />
                    </div>
                    <span className={`text-xs font-semibold ${step.color}`}>{step.title}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>
                {i < aiSteps.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom row: Trigger List + Detail + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Trigger List */}
        <div className="lg:col-span-3">
          <Card className="bg-card border-border">
            <CardContent className="pt-4 pb-4">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Trigger Plays ({mockTriggers.length})
              </h3>
              <TriggerList
                triggers={mockTriggers}
                selectedId={selectedTriggerId}
                onSelect={setSelectedTriggerId}
              />
            </CardContent>
          </Card>
        </div>

        {/* Middle: Trigger Detail */}
        <div className="lg:col-span-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-4 pb-4">
              <TriggerDetail trigger={selectedTrigger} />
            </CardContent>
          </Card>
        </div>

        {/* Right: User Journey Timeline */}
        <div className="lg:col-span-5">
          <Card className="bg-card border-border">
            <CardContent className="pt-4 pb-4">
              <BehaviorTimeline />
            </CardContent>
          </Card>
        </div>
      </div>

      <NextStepBanner
        icon={BarChart3}
        label="Campaign Dashboard"
        description="View conversion metrics and A/B test results"
        href="/campaigns"
      />
    </div>
  );
}

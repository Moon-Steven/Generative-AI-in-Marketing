"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  BarChart3,
  Radio,
  FileText,
  TrendingUp,
  DollarSign,
  MousePointerClick,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/page-header";
import { NextStepBanner } from "@/components/layout/next-step-banner";

const stats = [
  { label: "Pages Generated", value: "127", icon: FileText, trend: "+12 this week", color: "text-chart-1" },
  { label: "Active Campaigns", value: "8", icon: TrendingUp, trend: "3 A/B tests running", color: "text-chart-2" },
  { label: "Avg CVR Improvement", value: "+34.2%", icon: MousePointerClick, trend: "vs original pages", color: "text-chart-3" },
  { label: "Revenue Attributed", value: "$48.2K", icon: DollarSign, trend: "Last 30 days", color: "text-chart-4" },
];

const quickActions = [
  {
    href: "/generate",
    icon: Sparkles,
    title: "Generate Landing Page",
    description: "Create an AI-powered landing page from your ad copy",
    badge: "Core",
  },
  {
    href: "/triggers",
    icon: Zap,
    title: "Behavioral Triggers",
    description: "Configure conversion triggers for your landing pages",
  },
  {
    href: "/campaigns",
    icon: BarChart3,
    title: "Campaign Dashboard",
    description: "View conversion metrics and A/B test results",
  },
  {
    href: "/tracking",
    icon: Radio,
    title: "Tracking Pixel",
    description: "Set up behavior tracking and data collection",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function HomePage() {
  return (
    <div>
      <PageHeader
        title="Overview"
        description="Your generative marketing command center"
      />

      {/* KPI Stats */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <Card className="bg-card border-border">
              <CardContent className="pt-5 pb-4 px-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </span>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold tracking-tight font-mono">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {quickActions.map((action) => (
          <motion.div key={action.href} variants={item}>
            <Link href={action.href}>
              <Card className="bg-card border-border hover:border-primary/30 hover:bg-card/80 transition-all cursor-pointer group">
                <CardContent className="pt-5 pb-4 px-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <action.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold">
                          {action.title}
                        </h3>
                        {action.badge && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            {action.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <NextStepBanner
        icon={Sparkles}
        label="Generate a Landing Page"
        description="Start the demo by creating an AI-powered LP from ad copy"
        href="/generate"
      />
    </div>
  );
}

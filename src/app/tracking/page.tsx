"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/layout/page-header";
import {
  Radio,
  Monitor,
  Database,
  Zap,
  BarChart3,
  ArrowRight,
  Copy,
  Check,
  Shield,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { NextStepBanner } from "@/components/layout/next-step-banner";

const dataFlowSteps = [
  {
    icon: Monitor,
    title: "Collection",
    description: "Tracking Pixel captures real-time user behavior on landing pages",
    events: ["page_view", "scroll_depth", "click", "form_submit", "exit_intent"],
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Database,
    title: "Processing",
    description: "Events are processed, enriched with UTM data, and stored per-tenant",
    events: ["event_enrichment", "utm_parsing", "session_stitching", "tenant_isolation"],
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    icon: Zap,
    title: "Activation",
    description: "Intent engine scores behavior and triggers conversion mechanisms",
    events: ["intent_scoring", "trigger_decision", "content_generation", "a/b_assignment"],
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    icon: BarChart3,
    title: "Reporting",
    description: "Conversion data feeds back into campaign dashboard for optimization",
    events: ["attribution", "cvr_calculation", "roi_tracking", "rule_learning"],
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
];

const codeSnippets: Record<string, string> = {
  shopify: `<!-- Add to theme.liquid before </head> -->
<script>
  (function(w,d,s,id) {
    var js, cjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://pixel.convertai.io/v1/track.js';
    js.setAttribute('data-store-id', 'YOUR_STORE_ID');
    cjs.parentNode.insertBefore(js, cjs);
  })(window, document, 'script', 'convertai-pixel');
</script>`,
  custom: `<!-- Add before </head> on your landing page -->
<script async src="https://pixel.convertai.io/v1/track.js"
  data-site-id="YOUR_SITE_ID"
  data-track-clicks="true"
  data-track-scroll="true"
  data-track-forms="true">
</script>`,
  shoplazza: `/* Shoplazza: Settings → Tracking → Custom Scripts */
<!-- ConvertAI Tracking Pixel -->
<script>
  window.ConvertAI = window.ConvertAI || {};
  ConvertAI.storeId = '{{ shop.id }}';
  ConvertAI.customerId = '{{ customer.id }}';
</script>
<script async src="https://pixel.convertai.io/v1/track.js"></script>`,
};

export default function TrackingPage() {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const handleCopy = (tab: string) => {
    navigator.clipboard.writeText(codeSnippets[tab]);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tracking Pixel"
        description="Behavior data collection architecture and integration guide"
      />

      {/* Architecture Diagram */}
      <Card className="bg-card border-border">
        <CardContent className="pt-5 pb-5">
          <h3 className="text-sm font-semibold mb-1">Architecture Overview</h3>
          <p className="text-xs text-muted-foreground mb-6">
            Self-hosted pixel for real-time behavior tracking — no third-party dependency
          </p>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-center gap-2">
            {dataFlowSteps.map((step, i) => (
              <motion.div
                key={step.title}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`border rounded-xl p-4 w-48 ${step.borderColor} ${step.bgColor}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <step.icon className={`h-4 w-4 ${step.color}`} />
                    <span className={`text-sm font-semibold ${step.color}`}>
                      {step.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-2">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {step.events.map((event) => (
                      <Badge
                        key={event}
                        variant="outline"
                        className="text-[9px] font-mono px-1 py-0"
                      >
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>
                {i < dataFlowSteps.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Integration Code */}
        <Card className="bg-card border-border">
          <CardContent className="pt-5 pb-5">
            <h3 className="text-sm font-semibold mb-4">Integration Guide</h3>
            <Tabs defaultValue="shopify" className="w-full">
              <TabsList className="mb-3">
                <TabsTrigger value="shopify" className="text-xs">Shopify</TabsTrigger>
                <TabsTrigger value="custom" className="text-xs">Custom HTML</TabsTrigger>
                <TabsTrigger value="shoplazza" className="text-xs">Shoplazza</TabsTrigger>
              </TabsList>
              {Object.entries(codeSnippets).map(([key, code]) => (
                <TabsContent key={key} value={key}>
                  <div className="relative">
                    <pre className="bg-[#0D0D0F] rounded-lg p-4 text-xs font-mono text-muted-foreground overflow-x-auto leading-relaxed border border-border">
                      {code}
                    </pre>
                    <button
                      onClick={() => handleCopy(key)}
                      aria-label="Copy code"
                      className="absolute top-2 right-2 p-1.5 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      {copiedTab === key ? (
                        <Check className="h-3.5 w-3.5 text-success" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Key Properties */}
        <Card className="bg-card border-border">
          <CardContent className="pt-5 pb-5">
            <h3 className="text-sm font-semibold mb-4">Key Design Principles</h3>
            <div className="space-y-4">
              {[
                {
                  icon: Radio,
                  title: "Self-Hosted Pixel",
                  desc: "No dependency on third-party APIs or platform policy changes. Full control over data collection and processing.",
                },
                {
                  icon: Shield,
                  title: "Tenant-Isolated Storage",
                  desc: "Customer data stored in isolated environments. No cross-tenant data leakage. GDPR and CCPA compliant by design.",
                },
                {
                  icon: Zap,
                  title: "Lightweight & Fast",
                  desc: "Pixel script < 5KB gzipped. Async loading. Zero impact on page load performance or Core Web Vitals.",
                },
                {
                  icon: Database,
                  title: "Real-Time Processing",
                  desc: "Events processed in < 100ms. Intent scoring and trigger decisions happen before the user's next action.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Compliance Badges */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs gap-1.5">
                <Shield className="h-3 w-3" /> GDPR Ready
              </Badge>
              <Badge variant="outline" className="text-xs gap-1.5">
                <Shield className="h-3 w-3" /> CCPA Compliant
              </Badge>
              <Badge variant="outline" className="text-xs gap-1.5">
                <Shield className="h-3 w-3" /> SOC 2 Planned
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <NextStepBanner
        icon={LayoutDashboard}
        label="Back to Overview"
        description="Restart the demo or explore any module"
        href="/"
      />
    </div>
  );
}

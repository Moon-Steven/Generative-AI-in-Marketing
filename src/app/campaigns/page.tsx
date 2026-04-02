"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { ConversionChart } from "@/components/dashboard/conversion-chart";
import { TrafficBreakdown } from "@/components/dashboard/traffic-breakdown";
import { ABTestComparison } from "@/components/dashboard/ab-test-comparison";
import { ROICalculator } from "@/components/dashboard/roi-calculator";
import { CampaignTable } from "@/components/dashboard/campaign-table";
import { NextStepBanner } from "@/components/layout/next-step-banner";
import { mockCampaigns, trafficSources } from "@/lib/mock/campaigns";
import { Radio } from "lucide-react";

export default function CampaignsPage() {
  const primaryCampaign = mockCampaigns[0];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Campaign Dashboard"
        description="Monitor conversion metrics, A/B tests, and ROI attribution"
      />

      {/* Active Campaign Context */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-medium">{primaryCampaign.name}</span>
          <span className="text-[10px] text-muted-foreground">Since {primaryCampaign.createdAt}</span>
        </div>
      </div>

      {/* KPI Metrics */}
      <MetricsGrid metrics={primaryCampaign.metrics} />

      {/* Charts Row */}
      <Card className="bg-card border-border">
        <CardContent className="pt-4 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9">
              <ConversionChart data={primaryCampaign.metrics.timeSeriesData} />
            </div>
            <div className="lg:col-span-3 flex items-start pt-1">
              <TrafficBreakdown data={trafficSources} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* A/B Test + ROI Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-4 pb-4">
            {primaryCampaign.abTest && (
              <ABTestComparison test={primaryCampaign.abTest} />
            )}
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-4 pb-4">
            <ROICalculator />
          </CardContent>
        </Card>
      </div>

      {/* Campaign Table */}
      <Card className="bg-card border-border">
        <CardContent className="pt-4 pb-4">
          <CampaignTable campaigns={mockCampaigns} />
        </CardContent>
      </Card>

      <NextStepBanner
        icon={Radio}
        label="Tracking Pixel"
        description="See the data collection architecture behind the scenes"
        href="/tracking"
      />
    </div>
  );
}

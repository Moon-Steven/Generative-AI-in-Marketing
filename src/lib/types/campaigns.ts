export interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  createdAt: string;
  adPlatform: "facebook" | "google" | "tiktok" | "instagram";
  metrics: CampaignMetrics;
  abTest?: ABTest;
}

export interface CampaignMetrics {
  visits: number;
  ctaClicks: number;
  conversions: number;
  revenue: number;
  adSpend: number;
  cvr: number;
  roas: number;
  cpa: number;
  timeSeriesData: Array<{
    date: string;
    visits: number;
    conversions: number;
    revenue: number;
  }>;
}

export interface ABTest {
  id: string;
  status: "running" | "completed" | "winner_declared";
  variants: [ABVariant, ABVariant];
  startDate: string;
  endDate?: string;
  confidence: number;
  winner?: "A" | "B";
}

export interface ABVariant {
  label: "A" | "B";
  name: string;
  visits: number;
  conversions: number;
  cvr: number;
  revenue: number;
  avgTimeOnPage: number;
}

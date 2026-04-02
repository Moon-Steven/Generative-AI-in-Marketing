import type { Campaign } from "@/lib/types/campaigns";

// Deterministic pseudo-random to avoid SSR/client hydration mismatch
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Generate 30-day time series with realistic patterns
function generateTimeSeries() {
  const rand = seededRandom(42);
  const data = [];
  const baseDate = new Date("2026-03-01");
  for (let i = 0; i < 30; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Realistic traffic patterns: weekends slightly higher, gradual ramp
    const baseVisits = 280 + i * 8 + (isWeekend ? 60 : 0);
    const noise = Math.round((rand() - 0.5) * 80);
    const visits = baseVisits + noise;
    const cvr = 0.032 + i * 0.0004 + (rand() - 0.5) * 0.005;
    const conversions = Math.round(visits * cvr);
    const avgOrderValue = 52 + rand() * 15;

    data.push({
      date: date.toISOString().split("T")[0],
      visits,
      conversions,
      revenue: Math.round(conversions * avgOrderValue),
    });
  }
  return data;
}

const timeSeries = generateTimeSeries();

const totalVisits = timeSeries.reduce((s, d) => s + d.visits, 0);
const totalConversions = timeSeries.reduce((s, d) => s + d.conversions, 0);
const totalRevenue = timeSeries.reduce((s, d) => s + d.revenue, 0);

export const mockCampaigns: Campaign[] = [
  {
    id: "camp-001",
    name: "GlowSkin Pro — Spring Launch",
    status: "active",
    createdAt: "2026-03-01",
    adPlatform: "facebook",
    metrics: {
      visits: totalVisits,
      ctaClicks: Math.round(totalVisits * 0.12),
      conversions: totalConversions,
      revenue: totalRevenue,
      adSpend: 12500,
      cvr: Number(((totalConversions / totalVisits) * 100).toFixed(1)),
      roas: Number((totalRevenue / 12500).toFixed(1)),
      cpa: Number((12500 / totalConversions).toFixed(2)),
      timeSeriesData: timeSeries,
    },
    abTest: {
      id: "ab-001",
      status: "winner_declared",
      variants: [
        {
          label: "A",
          name: "Original Landing Page",
          visits: Math.round(totalVisits * 0.5),
          conversions: Math.round(totalConversions * 0.38),
          cvr: 2.8,
          revenue: Math.round(totalRevenue * 0.35),
          avgTimeOnPage: 34,
        },
        {
          label: "B",
          name: "AI-Generated (ConvertAI)",
          visits: Math.round(totalVisits * 0.5),
          conversions: Math.round(totalConversions * 0.62),
          cvr: 3.76,
          revenue: Math.round(totalRevenue * 0.65),
          avgTimeOnPage: 52,
        },
      ],
      startDate: "2026-03-01",
      endDate: "2026-03-28",
      confidence: 97.3,
      winner: "B",
    },
  },
  {
    id: "camp-002",
    name: "FitFuel — Protein Launch Q1",
    status: "active",
    createdAt: "2026-03-10",
    adPlatform: "instagram",
    metrics: {
      visits: 4820,
      ctaClicks: 602,
      conversions: 168,
      revenue: 9240,
      adSpend: 3200,
      cvr: 3.5,
      roas: 2.9,
      cpa: 19.05,
      timeSeriesData: [],
    },
  },
  {
    id: "camp-003",
    name: "ChefMate — Flash Sale",
    status: "completed",
    createdAt: "2026-03-15",
    adPlatform: "facebook",
    metrics: {
      visits: 8200,
      ctaClicks: 1230,
      conversions: 410,
      revenue: 14760,
      adSpend: 4500,
      cvr: 5.0,
      roas: 3.3,
      cpa: 10.98,
      timeSeriesData: [],
    },
  },
  {
    id: "camp-004",
    name: "GlowSkin — Retargeting",
    status: "active",
    createdAt: "2026-03-20",
    adPlatform: "google",
    metrics: {
      visits: 2100,
      ctaClicks: 378,
      conversions: 126,
      revenue: 6930,
      adSpend: 1800,
      cvr: 6.0,
      roas: 3.9,
      cpa: 14.29,
      timeSeriesData: [],
    },
  },
  {
    id: "camp-005",
    name: "FitFuel — TikTok Test",
    status: "paused",
    createdAt: "2026-03-22",
    adPlatform: "tiktok",
    metrics: {
      visits: 3400,
      ctaClicks: 340,
      conversions: 85,
      revenue: 4675,
      adSpend: 2200,
      cvr: 2.5,
      roas: 2.1,
      cpa: 25.88,
      timeSeriesData: [],
    },
  },
];

export const trafficSources = [
  { name: "Facebook", value: 45, color: "#3B82F6" },
  { name: "Google", value: 28, color: "#EF4444" },
  { name: "TikTok", value: 15, color: "#06B6D4" },
  { name: "Instagram", value: 8, color: "#E879F9" },
  { name: "Direct", value: 4, color: "#71717A" },
];

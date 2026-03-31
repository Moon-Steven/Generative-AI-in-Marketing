"use client";

import { ArrowUpRight, ArrowDownRight, AlertTriangle, CheckCircle2, Bot, ChevronRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { kpiData, trendData, actionItems, agentSuggestion, campaigns } from "@/lib/mock-data";
import Link from "next/link";
import { useState } from "react";

function KpiCard({ data }: { data: { value: number; change: number; label: string; prefix: string; suffix?: string } }) {
  const isPositive = data.change > 0;
  return (
    <div className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
      <p className="text-muted-foreground text-sm mb-1">{data.label}</p>
      <p className="text-3xl font-bold text-card-foreground">
        {data.prefix}{data.value >= 100 ? data.value.toLocaleString() : data.value}
        {data.suffix || ""}
      </p>
      <div className={`flex items-center gap-1 mt-2 text-sm ${isPositive ? "text-success" : "text-danger"}`}>
        {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {isPositive ? "+" : ""}{data.change}% vs yesterday
      </div>
    </div>
  );
}

export default function HomePage() {
  const [trendMetric, setTrendMetric] = useState<"revenue" | "spend" | "orders">("revenue");
  const activeCampaigns = campaigns.filter((c) => c.status === "active");

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Good morning, Shaohua</h2>
        <p className="text-muted-foreground mt-1">Here&apos;s your growth snapshot for today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <KpiCard data={kpiData.revenue} />
        <KpiCard data={kpiData.orders} />
        <KpiCard data={{ ...kpiData.roas, suffix: "x" }} />
        <KpiCard data={kpiData.spend} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* Action Required */}
          {actionItems.length > 0 && (
            <div className="bg-card rounded-2xl border border-border shadow-sm">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                <div className="w-2 h-2 bg-danger rounded-full" />
                <h3 className="font-semibold text-sm">Action Required ({actionItems.length})</h3>
              </div>
              {actionItems.map((item) => (
                <div key={item.id} className="px-5 py-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.campaign}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.message}</p>
                    <div className="flex gap-2 mt-3">
                      <Link href={`/campaigns/${item.campaignId}`} className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition">
                        View Details
                      </Link>
                      <button className="text-xs bg-muted px-3 py-1.5 rounded-lg hover:bg-border transition">
                        Swap Creative
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Running Well */}
          <div className="bg-card rounded-2xl border border-border shadow-sm">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <h3 className="font-semibold text-sm">Running Well ({activeCampaigns.length})</h3>
            </div>
            <div className="divide-y divide-border">
              {activeCampaigns.map((c) => (
                <Link key={c.id} href={`/campaigns/${c.id}`} className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/50 transition group">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <div>
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.market}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-success">{c.roas}x ROAS</span>
                    <span className="text-xs text-muted-foreground">${c.spend} spent</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 7-Day Trend */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">7-Day Trend</h3>
              <div className="flex gap-1 bg-muted rounded-lg p-0.5">
                {(["revenue", "spend", "orders"] as const).map((m) => (
                  <button key={m} onClick={() => setTrendMetric(m)} className={`px-3 py-1 text-xs rounded-md transition ${trendMetric === m ? "bg-card shadow-sm font-medium" : "text-muted-foreground hover:text-foreground"}`}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                <Area type="monotone" dataKey={trendMetric} stroke="#6366f1" strokeWidth={2} fill="url(#colorMetric)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column — Agent */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-indigo-900">Agent Recommendation</span>
            </div>
            <p className="text-sm text-indigo-800 leading-relaxed mb-4">{agentSuggestion.message}</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-indigo-600 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-indigo-500 transition">Execute</button>
              <button className="flex-1 bg-white text-indigo-700 text-sm font-medium py-2.5 rounded-xl border border-indigo-200 hover:bg-indigo-50 transition">Later</button>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
            <h3 className="font-semibold text-sm mb-4">Quick Stats</h3>
            <div className="space-y-3">
              {[
                { label: "Active Campaigns", value: `${activeCampaigns.length}` },
                { label: "Products Listed", value: "6" },
                { label: "Total Creatives", value: "23" },
                { label: "This Month Revenue", value: "$8,240", color: "text-success" },
                { label: "This Month Spend", value: "$2,580" },
              ].map((s) => (
                <div key={s.label} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <span className={`text-sm font-semibold ${s.color || ""}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
            <h3 className="font-semibold text-sm mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { time: "2h ago", text: "Budget guardrail triggered for LED Lamp DE" },
                { time: "5h ago", text: "New creative variant generated for Earbuds US" },
                { time: "1d ago", text: "Yoga Pants EU reached ROAS 4.0 milestone" },
                { time: "2d ago", text: "Phone Cases US campaign launched" },
              ].map((a, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-xs text-muted-foreground w-12 shrink-0 pt-0.5">{a.time}</span>
                  <p className="text-xs leading-relaxed">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { campaigns } from "@/lib/mock-data";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, Pause, Calendar, DollarSign, Shield } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const creativeStatusStyle = {
  top: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Top Performer" },
  ok: { bg: "bg-blue-100", text: "text-blue-700", label: "Performing OK" },
  low: { bg: "bg-amber-100", text: "text-amber-700", label: "Underperforming" },
};

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Campaign not found</p>
      </div>
    );
  }

  const c = campaign.id === "1" ? campaign : campaigns[0];

  return (
    <div className="max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/campaigns" className="p-2 rounded-lg hover:bg-muted transition">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold">{campaign.name}</h2>
            <p className="text-muted-foreground text-sm mt-0.5">{campaign.product} · {campaign.market}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${campaign.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
            {campaign.status}
          </span>
          <button className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg text-sm hover:bg-border transition">
            <Pause className="w-4 h-4" /> Pause
          </button>
        </div>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: Calendar, label: "Started", value: campaign.startDate },
          { icon: DollarSign, label: "Daily Budget", value: `$${campaign.dailyBudget}/day` },
          { icon: Shield, label: "Guardrail", value: "Stop if ROAS < 1.0" },
          { icon: DollarSign, label: "Total Spent", value: `$${campaign.spend}` },
        ].map((m) => (
          <div key={m.label} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <m.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-sm font-semibold">{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Performance KPIs */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { label: "Spend", value: `$${campaign.spend}` },
          { label: "Revenue", value: `$${campaign.revenue.toLocaleString()}`, color: "text-success" },
          { label: "ROAS", value: `${campaign.roas}x`, color: campaign.roas >= 2 ? "text-success" : "text-danger" },
          { label: "Orders", value: campaign.orders },
          { label: "CPA", value: `$${campaign.cpa.toFixed(2)}` },
        ].map((k) => (
          <div key={k.label} className="bg-card rounded-xl border border-border p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">{k.label}</p>
            <p className={`text-2xl font-bold ${k.color || ""}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left — Charts */}
        <div className="col-span-2 space-y-6">
          {/* Performance Chart */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
            <h3 className="font-semibold text-sm mb-4">Spend vs Revenue (14 Days)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={c.performanceHistory}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} fill="url(#colorRev)" name="Revenue" />
                <Area type="monotone" dataKey="spend" stroke="#6366f1" strokeWidth={2} fill="url(#colorSpend)" name="Spend" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Active Creatives */}
          <div className="bg-card rounded-2xl border border-border shadow-sm">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-semibold text-sm">Active Creatives</h3>
            </div>
            <div className="divide-y divide-border">
              {c.creatives.map((cr) => {
                const style = creativeStatusStyle[cr.status];
                return (
                  <div key={cr.id} className="px-5 py-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                      {cr.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{cr.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{cr.headline}</p>
                    </div>
                    <div className="text-center px-4">
                      <p className="text-xs text-muted-foreground">CTR</p>
                      <p className="text-sm font-semibold">{cr.ctr}%</p>
                    </div>
                    <div className="text-center px-4">
                      <p className="text-xs text-muted-foreground">ROAS</p>
                      <p className="text-sm font-semibold">{cr.roas}x</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${style.bg} ${style.text}`}>
                      {style.label}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Agent suggestion */}
            <div className="px-5 py-4 bg-amber-50 border-t border-amber-200 rounded-b-2xl flex items-start gap-3">
              <Bot className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-amber-800">Suggestion: Pause Creative B (underperforming) and replace with a new variant.</p>
                <div className="flex gap-2 mt-2">
                  <button className="text-xs bg-amber-600 text-white px-3 py-1.5 rounded-lg hover:bg-amber-500 transition">Execute Swap</button>
                  <button className="text-xs bg-white text-amber-700 border border-amber-300 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition">Keep As Is</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Audience */}
        <div className="space-y-6">
          {/* Audience Breakdown */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
            <h3 className="font-semibold text-sm mb-4">Audience Breakdown</h3>
            <div className="space-y-3">
              {c.audienceBreakdown.map((a) => (
                <div key={a.segment}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{a.segment}</span>
                    <span className="text-xs text-muted-foreground">{a.percentage}% · ROAS {a.roas}x</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${a.roas >= 3 ? "bg-success" : a.roas >= 2 ? "bg-primary" : "bg-warning"}`}
                      style={{ width: `${a.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ROAS Trend */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
            <h3 className="font-semibold text-sm mb-4">ROAS Trend</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={c.performanceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="roas" fill="#6366f1" radius={[4, 4, 0, 0]} name="ROAS" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Agent Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-900">Campaign Agent</span>
            </div>
            <p className="text-sm text-indigo-800 leading-relaxed mb-3">
              This campaign is performing well. Top segment (25-28M) has the highest ROAS at 4.2x. Consider increasing budget allocation to this segment.
            </p>
            <button className="w-full bg-indigo-600 text-white text-sm font-medium py-2 rounded-xl hover:bg-indigo-500 transition">
              Apply Recommendation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

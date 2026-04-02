"use client";

import { Badge } from "@/components/ui/badge";
import type { Campaign } from "@/lib/types/campaigns";

interface CampaignTableProps {
  campaigns: Campaign[];
}

const platformColors: Record<string, string> = {
  facebook: "bg-blue-500/20 text-blue-400",
  google: "bg-red-500/20 text-red-400",
  tiktok: "bg-cyan-500/20 text-cyan-400",
  instagram: "bg-pink-500/20 text-pink-400",
};

const statusColors: Record<string, string> = {
  active: "bg-success/20 text-success",
  paused: "bg-amber-500/20 text-amber-400",
  completed: "bg-secondary text-muted-foreground",
};

export function CampaignTable({ campaigns }: CampaignTableProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">All Campaigns</h3>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-secondary/50">
              <th className="text-left font-medium text-muted-foreground px-3 py-2">Campaign</th>
              <th className="text-left font-medium text-muted-foreground px-3 py-2">Platform</th>
              <th className="text-left font-medium text-muted-foreground px-3 py-2">Status</th>
              <th className="text-right font-medium text-muted-foreground px-3 py-2">Visits</th>
              <th className="text-right font-medium text-muted-foreground px-3 py-2">CVR</th>
              <th className="text-right font-medium text-muted-foreground px-3 py-2">Revenue</th>
              <th className="text-right font-medium text-muted-foreground px-3 py-2">ROAS</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((camp) => (
              <tr key={camp.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                <td className="px-3 py-2.5 font-medium">{camp.name}</td>
                <td className="px-3 py-2.5">
                  <Badge className={`text-[10px] ${platformColors[camp.adPlatform]}`}>
                    {camp.adPlatform}
                  </Badge>
                </td>
                <td className="px-3 py-2.5">
                  <Badge className={`text-[10px] capitalize ${statusColors[camp.status]}`}>
                    {camp.status}
                  </Badge>
                </td>
                <td className="px-3 py-2.5 text-right font-mono">{camp.metrics.visits.toLocaleString()}</td>
                <td className="px-3 py-2.5 text-right font-mono">{camp.metrics.cvr}%</td>
                <td className="px-3 py-2.5 text-right font-mono">${(camp.metrics.revenue / 1000).toFixed(1)}K</td>
                <td className="px-3 py-2.5 text-right font-mono">{camp.metrics.roas}x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

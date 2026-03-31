"use client";

import { creativeVariants, assetLibrary } from "@/lib/mock-data";
import { Sparkles, Filter, Grid3X3, List, Eye, Rocket, Pencil } from "lucide-react";
import { useState } from "react";

const toneColors: Record<string, string> = {
  Premium: "bg-purple-100 text-purple-700",
  Active: "bg-orange-100 text-orange-700",
  Casual: "bg-blue-100 text-blue-700",
  Urgency: "bg-red-100 text-red-700",
};

const statusBadge = {
  live: "bg-emerald-100 text-emerald-700",
  draft: "bg-slate-100 text-slate-600",
  used: "bg-blue-100 text-blue-600",
};

export default function CreativeStudioPage() {
  const [selectedProduct, setSelectedProduct] = useState("Bluetooth Earbuds Pro");
  const [selectedMarket, setSelectedMarket] = useState("United States");
  const [selectedTones, setSelectedTones] = useState<string[]>(["Premium"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerated, setShowGenerated] = useState(true);

  const toggleTone = (tone: string) => {
    setSelectedTones((prev) =>
      prev.includes(tone) ? prev.filter((t) => t !== tone) : [...prev, tone]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowGenerated(true);
    }, 2000);
  };

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Creative Studio</h2>
        <p className="text-muted-foreground mt-1">Generate, manage, and test ad creatives powered by AI.</p>
      </div>

      {/* Generator */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-200 p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-indigo-900">Generate New Creatives</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-xs text-indigo-700 font-medium block mb-1.5">Product</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full bg-white border border-indigo-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option>Bluetooth Earbuds Pro</option>
              <option>FlexFit Leggings</option>
              <option>UltraShield Case</option>
              <option>SilicTip Pro Pack</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-indigo-700 font-medium block mb-1.5">Market</label>
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="w-full bg-white border border-indigo-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option>United States</option>
              <option>Europe</option>
              <option>United Kingdom</option>
              <option>Germany</option>
              <option>Japan</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-indigo-700 font-medium block mb-1.5">Tone</label>
            <div className="flex flex-wrap gap-1.5">
              {["Premium", "Casual", "Urgency", "Active"].map((tone) => (
                <button
                  key={tone}
                  onClick={() => toggleTone(tone)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border transition ${
                    selectedTones.includes(tone)
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-indigo-700 border-indigo-200 hover:border-indigo-400"
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-500 transition disabled:opacity-50 flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate 5 Variants
            </>
          )}
        </button>
      </div>

      {/* Generated Variants */}
      {showGenerated && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Generated Variants</h3>
            <span className="text-xs text-muted-foreground">{creativeVariants.length} variants</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {creativeVariants.slice(0, 3).map((v) => (
              <div key={v.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                {/* Preview */}
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                  <span className="text-6xl">{v.image}</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white/90 backdrop-blur-sm text-sm font-medium px-4 py-2 rounded-lg shadow">
                      <Eye className="w-4 h-4 inline mr-1" /> Preview
                    </button>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${toneColors[v.tone] || "bg-slate-100 text-slate-600"}`}>
                      {v.tone}
                    </span>
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <p className="text-sm font-semibold mb-1">&ldquo;{v.headline}&rdquo;</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{v.body}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">Est. CTR</span>
                      <span className={`text-sm font-bold ${v.ctr >= 2.5 ? "text-success" : v.ctr >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
                        {v.ctr}%
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge[v.status]}`}>
                      {v.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-primary-foreground text-xs font-medium py-2 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-1">
                      <Rocket className="w-3.5 h-3.5" /> Launch
                    </button>
                    <button className="flex-1 bg-muted text-xs font-medium py-2 rounded-lg hover:bg-border transition flex items-center justify-center gap-1">
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More variants in compact form */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {creativeVariants.slice(3).map((v) => (
              <div key={v.id} className="bg-card rounded-xl border border-border shadow-sm p-4 flex gap-4 hover:shadow-md transition">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-3xl shrink-0">
                  {v.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">&ldquo;{v.headline}&rdquo;</p>
                  <p className="text-xs text-muted-foreground truncate">{v.body}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground">CTR {v.ctr}%</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${toneColors[v.tone] || "bg-slate-100 text-slate-600"}`}>{v.tone}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge[v.status]}`}>{v.status}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 shrink-0">
                  <button className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-lg hover:opacity-90 transition">Launch</button>
                  <button className="bg-muted text-xs px-3 py-1.5 rounded-lg hover:bg-border transition">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Asset Library */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Asset Library ({assetLibrary.length} items)</h3>
          <div className="flex gap-2">
            <button className="p-2 bg-muted rounded-lg hover:bg-border transition">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="p-2 bg-primary/10 rounded-lg">
              <Grid3X3 className="w-4 h-4 text-primary" />
            </button>
            <button className="p-2 bg-muted rounded-lg hover:bg-border transition">
              <List className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {assetLibrary.map((a) => (
            <div key={a.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition group cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                <span className="text-3xl">🖼️</span>
                <div className="absolute top-2 right-2">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusBadge[a.status]}`}>{a.status}</span>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs font-medium truncate">{a.name}</p>
                <p className="text-[10px] text-muted-foreground">{a.usedIn > 0 ? `Used in ${a.usedIn} ads` : "Not in use"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

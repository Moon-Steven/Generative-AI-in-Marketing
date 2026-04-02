"use client";

import { Input } from "@/components/ui/input";
import type { BrandConfig as BrandConfigType } from "@/lib/types/generation";

interface BrandConfigProps {
  config: BrandConfigType;
  onChange: (config: BrandConfigType) => void;
}

export function BrandConfigPanel({ config, onChange }: BrandConfigProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Brand Name
        </label>
        <Input
          value={config.name}
          onChange={(e) => onChange({ ...config, name: e.target.value })}
          className="bg-background"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Brand Colors
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["primary", "secondary", "accent"] as const).map((key) => (
            <div key={key} className="space-y-1">
              <p className="text-[10px] uppercase text-muted-foreground tracking-wide">
                {key}
              </p>
              <div className="flex items-center gap-1.5">
                <div
                  className="h-7 w-7 rounded-md border border-border shrink-0"
                  style={{ backgroundColor: config.colors[key] }}
                />
                <Input
                  value={config.colors[key]}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      colors: { ...config.colors, [key]: e.target.value },
                    })
                  }
                  className="bg-background text-xs h-7 px-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Tone
          </label>
          <div className="flex flex-wrap gap-1.5">
            {(["professional", "casual", "luxury", "playful"] as const).map(
              (tone) => (
                <button
                  key={tone}
                  onClick={() => onChange({ ...config, tone })}
                  className={`px-2.5 py-1 rounded-md text-xs capitalize transition-colors ${
                    config.tone === tone
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {tone}
                </button>
              )
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Industry
          </label>
          <Input
            value={config.industry}
            onChange={(e) => onChange({ ...config, industry: e.target.value })}
            className="bg-background text-xs"
          />
        </div>
      </div>
    </div>
  );
}

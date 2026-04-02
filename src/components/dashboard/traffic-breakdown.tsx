"use client";

interface TrafficBreakdownProps {
  data: Array<{ name: string; value: number; color: string }>;
}

export function TrafficBreakdown({ data }: TrafficBreakdownProps) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold mb-4">Traffic Sources</h3>
      <div className="space-y-3">
        {data.map((source) => (
          <div key={source.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-foreground">{source.name}</span>
              <span className="text-xs font-mono font-medium text-muted-foreground">
                {source.value}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(source.value / max) * 100}%`,
                  backgroundColor: source.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

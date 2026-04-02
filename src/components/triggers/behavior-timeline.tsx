"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimelineEvent {
  time: string;
  label: string;
  detail: string;
  type: "action" | "signal" | "trigger" | "conversion";
}

const events: TimelineEvent[] = [
  { time: "0:00", label: "User lands on page", detail: "Source: Meta Ad — Cold traffic", type: "action" },
  { time: "0:03", label: "Hero section viewed", detail: "Promise anchored: 'Brighter skin in 14 days'", type: "signal" },
  { time: "0:08", label: "Scrolls to Social Proof", detail: "Scroll depth: 30% — Interest confirmed", type: "signal" },
  { time: "0:15", label: "Reads testimonials", detail: "Scroll depth: 55% — Building trust", type: "signal" },
  { time: "0:22", label: "Scroll depth passes 60%", detail: "AI detects: Hesitating — high engagement but no CTA click", type: "signal" },
  { time: "0:23", label: "Countdown timer triggered", detail: "15-min timer starts — urgency mechanism activated", type: "trigger" },
  { time: "0:35", label: "User pauses, cursor moves to close", detail: "AI detects: Churn risk — exit intent pattern", type: "signal" },
  { time: "0:36", label: "Exit intent popup triggered", detail: "Popup: 'Wait — Don't miss your 30% off!'", type: "trigger" },
  { time: "0:42", label: "User enters email for discount", detail: "Email captured + discount code applied", type: "action" },
  { time: "0:48", label: "User clicks CTA", detail: "Redirects to checkout with GLOW30 pre-applied", type: "conversion" },
];

const typeColors: Record<string, string> = {
  action: "bg-blue-500",
  signal: "bg-amber-500",
  trigger: "bg-primary",
  conversion: "bg-success",
};

const typeDotColors: Record<string, string> = {
  action: "bg-blue-500/20 border-blue-500",
  signal: "bg-amber-500/20 border-amber-500",
  trigger: "bg-primary/20 border-primary",
  conversion: "bg-success/20 border-success",
};

export function BehaviorTimeline() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const resetTimeline = useCallback(() => {
    setActiveIndex(-1);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    if (activeIndex >= events.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setActiveIndex((prev) => prev + 1);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isPlaying, activeIndex]);

  const togglePlay = () => {
    if (activeIndex >= events.length - 1) {
      setActiveIndex(-1);
    }
    setIsPlaying(!isPlaying);
    if (activeIndex === -1) setActiveIndex(0);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">User Journey Simulation</h3>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" onClick={togglePlay} className="h-7 px-2.5 text-xs gap-1.5">
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button variant="outline" size="sm" onClick={resetTimeline} aria-label="Reset timeline" className="h-7 px-2 text-xs">
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mb-4">
        {[
          { type: "action", label: "User Action" },
          { type: "signal", label: "AI Signal" },
          { type: "trigger", label: "Trigger Fired" },
          { type: "conversion", label: "Conversion" },
        ].map(({ type, label }) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${typeColors[type]}`} />
            <span className="text-[10px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative space-y-0">
        {events.map((event, i) => {
          const isActive = i <= activeIndex;
          const isCurrent = i === activeIndex;
          return (
            <motion.div
              key={i}
              className={`relative flex items-start gap-3 py-2 pl-6 ${
                isActive ? "opacity-100" : "opacity-30"
              }`}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
            >
              {/* Vertical line */}
              {i < events.length - 1 && (
                <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
              )}

              {/* Dot */}
              <div
                className={`relative z-10 mt-0.5 h-[10px] w-[10px] shrink-0 rounded-full border-2 transition-all ${
                  isCurrent
                    ? typeDotColors[event.type] + " scale-125"
                    : isActive
                    ? typeDotColors[event.type]
                    : "bg-secondary border-border"
                }`}
              />

              {/* Content */}
              <div className="flex-1 min-w-0 -mt-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground w-8">
                    {event.time}
                  </span>
                  <span className={`text-xs font-medium ${isCurrent ? "text-foreground" : ""}`}>
                    {event.label}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 ml-10">
                  {event.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

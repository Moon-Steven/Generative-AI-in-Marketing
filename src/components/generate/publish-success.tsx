"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Check, Copy, BarChart3 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface PublishSuccessProps {
  choice: "ai" | "original";
  pageName: string;
}

export function PublishSuccess({ choice, pageName }: PublishSuccessProps) {
  const [copied, setCopied] = useState(false);
  const mockUrl = "https://go.convertai.io/glowskin-spring-2026";

  const handleCopy = () => {
    navigator.clipboard.writeText(mockUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto text-center"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
        className="mx-auto w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-4"
      >
        <Check className="h-8 w-8 text-success" />
      </motion.div>

      <h3 className="text-xl font-semibold mb-1">Landing Page Published!</h3>
      <p className="text-sm text-muted-foreground mb-6">
        {choice === "ai"
          ? "Your AI-generated page is now live with behavioral triggers enabled."
          : "Your original page is now live. AI will continue learning your preferences."}
      </p>

      {/* Published URL */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6 text-left">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-2">Published URL</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-sm font-mono text-primary bg-primary/5 rounded-lg px-3 py-2 truncate">
            {mockUrl}
          </code>
          <Button variant="outline" size="sm" onClick={handleCopy} className="shrink-0">
            {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
          <Badge variant="outline" className="text-[10px]">
            Behavioral Triggers: Active
          </Badge>
          <Badge variant="outline" className="text-[10px]">
            A/B Testing: Enabled
          </Badge>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6 text-left">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-3">What Happens Next</p>
        <div className="space-y-2.5">
          {[
            { text: "Tracking pixel starts collecting visitor behavior", done: true },
            { text: "AI triggers fire based on real-time intent signals", done: true },
            { text: "Conversion data feeds into Campaign Dashboard", done: true },
            { text: "AI learns from results to improve next generation", done: false },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-2 text-xs"
            >
              <div className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${
                item.done ? "bg-success/20" : "bg-secondary"
              }`}>
                {item.done ? (
                  <Check className="h-2.5 w-2.5 text-success" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse" />
                )}
              </div>
              <span className={item.done ? "text-foreground" : "text-muted-foreground"}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 justify-center">
        <Link href="/triggers" className={buttonVariants({ variant: "outline", size: "sm", className: "gap-1.5" })}>
          Configure Triggers
        </Link>
        <Link href="/campaigns" className={buttonVariants({ size: "sm", className: "gap-1.5" })}>
          <BarChart3 className="h-3.5 w-3.5" />
          View Dashboard
        </Link>
      </div>
    </motion.div>
  );
}

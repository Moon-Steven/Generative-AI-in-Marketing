"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NextStepBannerProps {
  icon: LucideIcon;
  label: string;
  description: string;
  href: string;
}

export function NextStepBanner({ icon: Icon, label, description, href }: NextStepBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Link href={href}>
        <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-card px-5 py-3.5 hover:border-primary/30 hover:bg-card/80 transition-all group cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Next step</p>
              <p className="text-sm font-medium">{label}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{description}</span>
            <ArrowRight className="h-3.5 w-3.5 text-primary group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

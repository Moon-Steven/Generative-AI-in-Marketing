export type TriggerType = "exit_intent" | "scroll_depth" | "time_delay" | "cart_abandonment" | "idle";
export type TriggerAction = "popup" | "countdown" | "bundle_offer" | "email_capture" | "discount_reveal";

export interface BehavioralTrigger {
  id: string;
  name: string;
  type: TriggerType;
  action: TriggerAction;
  enabled: boolean;
  config: {
    scrollThreshold?: number;
    delaySeconds?: number;
    idleSeconds?: number;
    headline: string;
    body: string;
    ctaText: string;
    discountCode?: string;
    countdownMinutes?: number;
    bundleProducts?: Array<{ name: string; price: number; imageUrl: string }>;
  };
  intentSegment: "high_intent" | "hesitating" | "churn_risk";
  stats: {
    impressions: number;
    conversions: number;
    conversionRate: number;
  };
}

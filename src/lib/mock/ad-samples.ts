import type { AdPromise, BrandConfig, AdVariant } from "@/lib/types/generation";

export interface ProductSample {
  id: string;
  label: string;
  productUrl: string;
  productDescription: string;
  brandConfig: BrandConfig;
  /** AI-generated ad variants for this product */
  adVariants: AdVariant[];
}

/** @deprecated — kept for backward compatibility, use ProductSample */
export type AdSample = ProductSample & {
  adCopy: string;
  extractedPromise: AdPromise;
};

export const productSamples: ProductSample[] = [
  {
    id: "glowskin",
    label: "GlowSkin Pro — Skincare DTC",
    productUrl: "https://glowskinpro.com/vitamin-c-serum",
    productDescription:
      "GlowSkin Pro Vitamin C Serum — a premium skincare product featuring 20% stabilized Vitamin C, Hyaluronic Acid, and Niacinamide. Targets dark spots, uneven tone, and dullness. Clinically tested on 200+ participants with 94% reporting visible improvement in 14 days. Price: $49.99 (regular $69.99). Free shipping on all orders.",
    brandConfig: {
      name: "GlowSkin Pro",
      colors: {
        primary: "#E8985E",
        secondary: "#FDF6F0",
        accent: "#C4704F",
        background: "#FFFAF5",
        text: "#2D1810",
      },
      fonts: { heading: "Playfair Display", body: "Inter" },
      tone: "luxury",
      industry: "Skincare / Beauty",
    },
    adVariants: [
      {
        id: "glowskin-v1",
        angle: "Transformation",
        headline: "Visibly Brighter Skin in 14 Days",
        body: "Tired of dull, uneven skin? Our Vitamin C Serum delivers visible brightening — clinically proven with 94% seeing results. Join 50,000+ women who transformed their skin.",
        cta: "Get 30% Off Your First Order →",
        promise: {
          mainPromise: "Visible skin brightening in just 14 days",
          promiseType: "transformation",
          audiencePreset: "cold",
          evidenceNeeds: [
            "Clinical study results (94% improvement)",
            "Before/after social proof",
            "Ingredient breakdown (20% Vitamin C)",
            "50,000+ customer base validation",
          ],
          keywords: ["brightening", "14 days", "Vitamin C", "clinically proven"],
          tone: "luxury",
        },
      },
      {
        id: "glowskin-v2",
        angle: "Social Proof",
        headline: "50,000+ Women Can't Be Wrong",
        body: "The #1 Vitamin C Serum that dermatologists and beauty editors are raving about. 94% saw visible improvement. 4.9★ average rating. Try it risk-free with our money-back guarantee.",
        cta: "See Why Everyone's Switching →",
        promise: {
          mainPromise: "Join 50,000+ women who transformed their skin",
          promiseType: "exclusivity",
          audiencePreset: "warm",
          evidenceNeeds: [
            "Volume social proof (50K+)",
            "Expert endorsements",
            "Star rating display",
            "Risk-free guarantee",
          ],
          keywords: ["50,000+", "dermatologists", "4.9★", "risk-free"],
          tone: "luxury",
        },
      },
      {
        id: "glowskin-v3",
        angle: "Urgency / Deal",
        headline: "30% Off — This Week Only",
        body: "Premium Vitamin C serum at the lowest price this year. 20% stabilized Vitamin C + Hyaluronic Acid. Free shipping included. Stock is limited — once it's gone, it's gone.",
        cta: "Claim Your 30% Discount →",
        promise: {
          mainPromise: "Best price of the year on premium skincare",
          promiseType: "urgency",
          audiencePreset: "hot",
          evidenceNeeds: [
            "Price comparison (regular vs sale)",
            "Scarcity indicator",
            "Product quality reinforcement",
            "Free shipping highlight",
          ],
          keywords: ["30% off", "limited", "free shipping", "this week only"],
          tone: "urgent",
        },
      },
    ],
  },
  {
    id: "fitfuel",
    label: "FitFuel — Fitness Supplement",
    productUrl: "https://fitfuel.co/whey-isolate",
    productDescription:
      "FitFuel Whey Protein Isolate — 30g protein per serving, grass-fed, zero artificial sweeteners. Available in 6 flavors. Third-party tested for purity. Used by 200+ competitive CrossFit athletes. Price: $54.99 for 2lb tub (30 servings). 60-day money-back guarantee.",
    brandConfig: {
      name: "FitFuel",
      colors: {
        primary: "#10B981",
        secondary: "#F0FDF4",
        accent: "#059669",
        background: "#FFFFFF",
        text: "#111827",
      },
      fonts: { heading: "Inter", body: "Inter" },
      tone: "casual",
      industry: "Fitness / Supplements",
    },
    adVariants: [
      {
        id: "fitfuel-v1",
        angle: "Pain Point",
        headline: "Stop Wasting Money on Chalk-Flavored Protein",
        body: "FitFuel Whey Isolate: 30g protein, zero bloating, and flavors you'll actually crave. Used by 200+ CrossFit athletes. 60-day money-back guarantee.",
        cta: "Try It Risk-Free — 25% Off →",
        promise: {
          mainPromise: "Premium protein that actually tastes good with zero bloating",
          promiseType: "transformation",
          audiencePreset: "warm",
          evidenceNeeds: ["Taste comparison", "Athlete endorsements", "Purity testing", "Guarantee details"],
          keywords: ["zero bloating", "30g protein", "CrossFit", "risk-free"],
          tone: "casual",
        },
      },
      {
        id: "fitfuel-v2",
        angle: "Authority",
        headline: "Trusted by 200+ Elite CrossFit Athletes",
        body: "Third-party tested. Grass-fed. Zero artificial sweeteners. When results matter, athletes choose FitFuel. 30g of pure protein per scoop.",
        cta: "Fuel Like the Pros →",
        promise: {
          mainPromise: "The protein trusted by elite athletes",
          promiseType: "exclusivity",
          audiencePreset: "cold",
          evidenceNeeds: ["Athlete count & names", "Third-party lab results", "Ingredient sourcing", "Comparison to competitors"],
          keywords: ["200+ athletes", "third-party tested", "grass-fed", "elite"],
          tone: "professional",
        },
      },
    ],
  },
];

// Backward-compatible export for components still using old API
export const adSamples: AdSample[] = productSamples.map((p) => ({
  ...p,
  adCopy: p.adVariants[0].body,
  extractedPromise: p.adVariants[0].promise,
}));

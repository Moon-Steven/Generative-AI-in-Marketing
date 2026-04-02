export interface AdPromise {
  mainPromise: string;
  promiseType: "transformation" | "savings" | "convenience" | "exclusivity" | "urgency";
  audiencePreset: "cold" | "warm" | "hot" | "reactivation";
  evidenceNeeds: string[];
  keywords: string[];
  tone: "professional" | "casual" | "luxury" | "playful" | "urgent";
}

export interface BrandConfig {
  name: string;
  logoUrl?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  tone: "professional" | "casual" | "luxury" | "playful";
  industry: string;
}

export type LPBlockType =
  | "hero"
  | "value_props"
  | "social_proof"
  | "product_features"
  | "faq"
  | "cta"
  | "testimonials";

export interface LPBlock {
  id: string;
  type: LPBlockType;
  order: number;
  content: HeroContent | ValuePropsContent | SocialProofContent | ProductFeaturesContent | FAQContent | CTAContent | TestimonialsContent;
  rulesApplied: string[];
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaUrl: string;
  backgroundImageUrl?: string;
  badge?: string;
}

export interface ValuePropsContent {
  props: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export interface SocialProofContent {
  stats: Array<{ value: string; label: string }>;
  logos?: string[];
  reviewCount?: number;
  averageRating?: number;
}

export interface ProductFeaturesContent {
  features: Array<{
    title: string;
    description: string;
    imageUrl?: string;
  }>;
}

export interface FAQContent {
  items: Array<{ question: string; answer: string }>;
}

export interface CTAContent {
  headline: string;
  description: string;
  buttonText: string;
  urgencyText?: string;
}

export interface TestimonialsContent {
  testimonials: Array<{
    name: string;
    role: string;
    quote: string;
    avatarUrl?: string;
    rating: number;
  }>;
}

export interface GeneratedPage {
  id: string;
  createdAt: string;
  adPromise: AdPromise;
  blocks: LPBlock[];
  metadata: {
    estimatedLoadTime: string;
    mobileScore: number;
    promiseAlignmentScore: number;
  };
}

export type GenerationStep =
  | "idle"
  | "analyzing"
  | "extracted"
  | "generating_ads"
  | "ads_ready"
  | "generating"
  | "complete"
  | "comparing"
  | "published"
  | "error";

export interface AdVariant {
  id: string;
  angle: string;
  headline: string;
  body: string;
  cta: string;
  promise: AdPromise;
}

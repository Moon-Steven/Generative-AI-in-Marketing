import type {
  GeneratedPage,
  HeroContent,
  ValuePropsContent,
  SocialProofContent,
  ProductFeaturesContent,
  TestimonialsContent,
  FAQContent,
  CTAContent,
} from "@/lib/types/generation";
import { adSamples } from "./ad-samples";

const glowSkinPage: GeneratedPage = {
  id: "page-glowskin-001",
  createdAt: "2026-03-30T10:30:00Z",
  adPromise: adSamples[0].extractedPromise,
  blocks: [
    {
      id: "block-hero",
      type: "hero",
      order: 0,
      content: {
        headline: "Visibly Brighter Skin in Just 14 Days",
        subheadline:
          "Clinically proven Vitamin C serum that 50,000+ women trust for radiant, even-toned skin. See the difference — or your money back.",
        ctaText: "Get 30% Off My First Order",
        ctaUrl: "#order",
        badge: "30% Off + Free Shipping",
      } satisfies HeroContent,
      rulesApplied: [
        "Hero headline anchored to ad promise (brightening + 14 days)",
        "CTA above the fold",
        "Urgency badge matches ad offer (30% off)",
      ],
    },
    {
      id: "block-social-proof",
      type: "social_proof",
      order: 1,
      content: {
        stats: [
          { value: "50,000+", label: "Happy Customers" },
          { value: "94%", label: "Saw Visible Results" },
          { value: "14 Days", label: "Average Time to Results" },
          { value: "4.9★", label: "Average Rating" },
        ],
        reviewCount: 12847,
        averageRating: 4.9,
      } satisfies SocialProofContent,
      rulesApplied: [
        "Social proof placed before product details (cold traffic)",
        "Stats directly support ad promise claims",
        "Customer count matches ad copy (50,000+)",
      ],
    },
    {
      id: "block-value-props",
      type: "value_props",
      order: 2,
      content: {
        props: [
          {
            icon: "beaker",
            title: "20% Stabilized Vitamin C",
            description:
              "The highest effective concentration for brightening — stabilized to stay potent from first drop to last.",
          },
          {
            icon: "droplets",
            title: "Hyaluronic Acid + Niacinamide",
            description:
              "Deep hydration meets pore refinement. Your skin gets brighter and smoother simultaneously.",
          },
          {
            icon: "shield-check",
            title: "Clinically Tested on 200+ Participants",
            description:
              "Not a marketing claim — a clinical study showed 94% of participants reported visible improvement in 14 days.",
          },
        ],
      } satisfies ValuePropsContent,
      rulesApplied: [
        "Value props serve as evidence chain for main promise",
        "Each prop includes specific, quantifiable data",
        "No generic superlatives — all claims backed by data",
      ],
    },
    {
      id: "block-features",
      type: "product_features",
      order: 3,
      content: {
        features: [
          {
            title: "Targets Dark Spots & Uneven Tone",
            description:
              "The powerful combination of Vitamin C and Niacinamide works at the cellular level to inhibit melanin overproduction, gradually fading existing dark spots while preventing new ones from forming.",
          },
          {
            title: "Lightweight, Fast-Absorbing Formula",
            description:
              "No greasy residue, no pilling under makeup. The water-based serum absorbs in seconds and layers perfectly with your existing skincare routine — morning and night.",
          },
          {
            title: "Cruelty-Free & Clean Ingredients",
            description:
              "Vegan, cruelty-free, free from parabens, sulfates, and artificial fragrances. Every ingredient serves a purpose — nothing unnecessary, nothing harmful.",
          },
        ],
      } satisfies ProductFeaturesContent,
      rulesApplied: [
        "Features framed as benefits, not specifications",
        "Each feature addresses a common objection (greasy, harsh, etc.)",
      ],
    },
    {
      id: "block-testimonials",
      type: "testimonials",
      order: 4,
      content: {
        testimonials: [
          {
            name: "Sarah M.",
            role: "Verified Buyer",
            quote:
              "I was skeptical about the 14-day claim, but by day 10 my dark spots were noticeably lighter. My friends keep asking what I changed in my routine.",
            rating: 5,
          },
          {
            name: "Jennifer L.",
            role: "Verified Buyer",
            quote:
              "I've tried Drunk Elephant, SkinCeuticals, and Tatcha. This is the first Vitamin C serum that didn't irritate my sensitive skin AND actually delivered visible results.",
            rating: 5,
          },
          {
            name: "Emily R.",
            role: "Verified Buyer",
            quote:
              "The 30% off deal made me try it. The results made me subscribe. Three months in and my skin tone is completely transformed.",
            rating: 5,
          },
        ],
      } satisfies TestimonialsContent,
      rulesApplied: [
        "Testimonials selected for relevance to ad promise (brightening, 14 days)",
        "Include comparison to known brands for credibility",
        "Third testimonial references the offer — matching ad CTA",
      ],
    },
    {
      id: "block-faq",
      type: "faq",
      order: 5,
      content: {
        items: [
          {
            question: "Will I really see results in 14 days?",
            answer:
              "In our clinical study of 200+ participants, 94% reported visible improvement within 14 days. Individual results vary based on skin type and consistency of use, but most customers report noticeable brightening within the first two weeks.",
          },
          {
            question: "Is this suitable for sensitive skin?",
            answer:
              "Yes. Our formula uses stabilized Vitamin C (Ascorbyl Glucoside) which is gentler than pure L-Ascorbic Acid. We've specifically formulated it to minimize irritation while maximizing efficacy.",
          },
          {
            question: "How does the 30% discount work?",
            answer:
              "The 30% discount is automatically applied at checkout for first-time customers. No code needed. It also includes free shipping on your order, with no minimum purchase required.",
          },
          {
            question: "What's your return policy?",
            answer:
              "We offer a 60-day money-back guarantee. If you don't see visible improvement, return the product (even if empty) for a full refund. No questions asked.",
          },
        ],
      } satisfies FAQContent,
      rulesApplied: [
        "FAQ #1 directly addresses main ad promise skepticism",
        "FAQ #3 clarifies the ad offer details",
        "FAQ #4 reduces purchase risk (money-back guarantee)",
      ],
    },
    {
      id: "block-cta",
      type: "cta",
      order: 6,
      content: {
        headline: "Ready for Brighter Skin?",
        description:
          "Join 50,000+ women who transformed their skin with GlowSkin Pro. Your 30% discount and free shipping are waiting.",
        buttonText: "Claim My 30% Discount Now",
        urgencyText: "Limited time offer — discount expires when this page closes",
      } satisfies CTAContent,
      rulesApplied: [
        "CTA headline mirrors ad promise outcome",
        "Urgency text creates scarcity without false claims",
        "Button text action-oriented with first-person ('My')",
      ],
    },
  ],
  metadata: {
    estimatedLoadTime: "1.2s",
    mobileScore: 96,
    promiseAlignmentScore: 94,
  },
};

export const generatedPages: Record<string, GeneratedPage> = {
  glowskin: glowSkinPage,
};

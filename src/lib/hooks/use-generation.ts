"use client";

import { useState, useCallback } from "react";
import type {
  GenerationStep,
  AdVariant,
  GeneratedPage,
} from "@/lib/types/generation";
import type { ProductSample } from "@/lib/mock/ad-samples";
import { generatedPages } from "@/lib/mock/generated-pages";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useGeneration() {
  const [step, setStep] = useState<GenerationStep>("idle");
  const [adVariants, setAdVariants] = useState<AdVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<AdVariant | null>(null);
  const [generatedPage, setGeneratedPage] = useState<GeneratedPage | null>(null);
  const [generationPhase, setGenerationPhase] = useState(0);
  const [error, setError] = useState<string | null>(null);

  /** Step 1→2: Generate ad variants from product info */
  const generateAds = useCallback(async (sample: ProductSample) => {
    setStep("generating_ads");
    setError(null);

    try {
      await delay(2200);
      setAdVariants(sample.adVariants);
      setStep("ads_ready");
    } catch {
      setError("Ad generation failed. Please try again.");
      setStep("error");
    }
  }, []);

  /** Step 2→3: Select variant and generate LP */
  const selectVariantAndGenerate = useCallback(
    async (variant: AdVariant, sampleId: string) => {
      setSelectedVariant(variant);
      setStep("generating");
      setError(null);
      setGenerationPhase(0);

      try {
        // Phase 1: Structure decision
        await delay(1800);
        setGenerationPhase(1);

        // Phase 2: Content generation
        await delay(2500);
        setGenerationPhase(2);

        // Phase 3: Style rendering
        await delay(1500);
        setGenerationPhase(3);

        const page = generatedPages[sampleId] || generatedPages["glowskin"];
        setGeneratedPage(page);

        await delay(500);
        setStep("comparing");
      } catch {
        setError("Generation failed. Please try again.");
        setStep("error");
      }
    },
    []
  );

  /** Step 4→5: Choose version and publish */
  const publish = useCallback((choice: "ai" | "original") => {
    setStep("published");
  }, []);

  const reset = useCallback(() => {
    setStep("idle");
    setAdVariants([]);
    setSelectedVariant(null);
    setGeneratedPage(null);
    setGenerationPhase(0);
    setError(null);
  }, []);

  return {
    step,
    adVariants,
    selectedVariant,
    generatedPage,
    generationPhase,
    error,
    generateAds,
    selectVariantAndGenerate,
    publish,
    reset,
  };
}

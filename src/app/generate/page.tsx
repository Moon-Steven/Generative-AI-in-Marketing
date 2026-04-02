"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/layout/page-header";
import { BrandConfigPanel } from "@/components/generate/brand-config";
import { AdVariants } from "@/components/generate/ad-variants";
import { GenerationProgress } from "@/components/generate/generation-progress";
import { CompareChoose } from "@/components/generate/compare-choose";
import { PublishSuccess } from "@/components/generate/publish-success";
import { NextStepBanner } from "@/components/layout/next-step-banner";
import { useGeneration } from "@/lib/hooks/use-generation";
import { productSamples, type ProductSample } from "@/lib/mock/ad-samples";
import type { BrandConfig } from "@/lib/types/generation";

const defaultBrand: BrandConfig = {
  name: "",
  colors: {
    primary: "#6366F1",
    secondary: "#F0F0FF",
    accent: "#4F46E5",
    background: "#FFFFFF",
    text: "#111827",
  },
  fonts: { heading: "Inter", body: "Inter" },
  tone: "professional",
  industry: "",
};

const stepIndicators = [
  { key: "product", label: "Product" },
  { key: "ads", label: "Ad Variants" },
  { key: "generate", label: "Generation" },
  { key: "compare", label: "Compare" },
  { key: "publish", label: "Published" },
];

export default function GeneratePage() {
  const {
    step,
    adVariants,
    selectedVariant,
    generatedPage,
    generationPhase,
    generateAds,
    selectVariantAndGenerate,
    publish,
    reset,
  } = useGeneration();

  const [productUrl, setProductUrl] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(defaultBrand);
  const [selectedSample, setSelectedSample] = useState<ProductSample | null>(null);
  const [publishChoice, setPublishChoice] = useState<"ai" | "original">("ai");

  // Auto-select first sample on mount for demo convenience
  useEffect(() => {
    const sample = productSamples[0];
    setSelectedSample(sample);
    setProductUrl(sample.productUrl);
    setProductDescription(sample.productDescription);
    setBrandConfig(sample.brandConfig);
  }, []);

  const handleSelectSample = (sample: ProductSample) => {
    setSelectedSample(sample);
    setProductUrl(sample.productUrl);
    setProductDescription(sample.productDescription);
    setBrandConfig(sample.brandConfig);
  };

  const handleGenerateAds = () => {
    if (!selectedSample) return;
    generateAds(selectedSample);
  };

  const handleReset = () => {
    reset();
    const sample = productSamples[0];
    setSelectedSample(sample);
    setProductUrl(sample.productUrl);
    setProductDescription(sample.productDescription);
    setBrandConfig(sample.brandConfig);
  };

  const handleChoose = (choice: "ai" | "original") => {
    setPublishChoice(choice);
    publish(choice);
  };

  // Map step to indicator index
  const getActiveIndex = () => {
    switch (step) {
      case "idle": return 0;
      case "generating_ads": return 0;
      case "ads_ready": return 1;
      case "generating": return 2;
      case "comparing": return 3;
      case "published": return 4;
      default: return 0;
    }
  };

  const activeIndex = getActiveIndex();

  return (
    <div>
      <PageHeader
        title="Generate Landing Page"
        description="From product info to a complete conversion-optimized landing page"
      >
        {step !== "idle" && step !== "generating_ads" && (
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
            Start Over
          </Button>
        )}
      </PageHeader>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-6">
        {stepIndicators.map(({ key, label }, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          return (
            <div key={key} className="flex items-center gap-2">
              {i > 0 && <div className={`w-8 h-px ${isPast || isActive ? "bg-primary" : "bg-border"}`} />}
              <Badge
                className={`text-xs ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isPast
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {label}
              </Badge>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Product Input */}
        {step === "idle" && (
          <motion.div
            key="product-input"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left: Product Info */}
              <Card className="bg-card border-border">
                <CardContent className="pt-4 pb-4">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-mono">1</span>
                    Product Info
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Product URL
                      </label>
                      <Input
                        placeholder="https://yourstore.com/products/..."
                        value={productUrl}
                        onChange={(e) => setProductUrl(e.target.value)}
                        className="bg-background"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Product Description
                      </label>
                      <Textarea
                        placeholder="Describe your product: features, pricing, target audience..."
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        className="min-h-[140px] resize-none bg-background"
                      />
                    </div>

                    {/* Quick Demo Presets */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                        Quick Demo Presets
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {productSamples.map((sample) => (
                          <button
                            key={sample.id}
                            onClick={() => handleSelectSample(sample)}
                            className={`text-left px-3 py-2 rounded-lg border text-xs transition-colors ${
                              selectedSample?.id === sample.id
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span className="font-medium">{sample.label}</span>
                            {selectedSample?.id === sample.id && (
                              <Badge variant="secondary" className="ml-2 text-[9px] px-1 py-0">
                                Selected
                              </Badge>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right: Brand Config */}
              <Card className="bg-card border-border">
                <CardContent className="pt-4 pb-4">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-mono">2</span>
                    Brand Config
                  </h3>
                  <BrandConfigPanel config={brandConfig} onChange={setBrandConfig} />
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-6">
              <Button
                size="lg"
                onClick={handleGenerateAds}
                disabled={!productDescription.trim()}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Generate Ad Variants
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 1.5: Generating ads loader */}
        {step === "generating_ads" && (
          <motion.div
            key="generating-ads"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="bg-card border-border max-w-md mx-auto">
              <CardContent className="pt-6 pb-6">
                <div className="flex flex-col items-center py-12">
                  <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                  <p className="text-sm font-medium mb-1">Generating Ad Variants</p>
                  <p className="text-xs text-muted-foreground">
                    AI is analyzing your product and creating multiple persuasion angles...
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Ad Variants Selection */}
        {step === "ads_ready" && (
          <motion.div
            key="ad-variants"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <AdVariants
              variants={adVariants}
              onSelect={(variant) => selectVariantAndGenerate(variant, selectedSample?.id || "glowskin")}
            />
          </motion.div>
        )}

        {/* Step 3: Generation Progress */}
        {step === "generating" && (
          <motion.div
            key="generating"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="bg-card border-border max-w-lg mx-auto">
              <CardContent className="pt-6 pb-6">
                <GenerationProgress phase={generationPhase} />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Compare & Choose */}
        {step === "comparing" && generatedPage && (
          <motion.div
            key="comparing"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <CompareChoose
              generatedPage={generatedPage}
              brandConfig={brandConfig}
              onChoose={handleChoose}
            />
          </motion.div>
        )}

        {/* Step 5: Published */}
        {step === "published" && (
          <motion.div
            key="published"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <PublishSuccess
              choice={publishChoice}
              pageName={brandConfig.name || "Landing Page"}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

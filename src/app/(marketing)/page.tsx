import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { CTA } from "@/components/landing/cta";

export default function MarketingPage() {
  return (
    <main>
      <Hero />
      <Features />
      <Pricing />
      <CTA />
    </main>
  );
}

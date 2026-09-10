import { DosageCalculator } from "@/components/DosageCalculator";
import { FeatureGrid } from "@/components/FeatureGrid";
import { FinalCTA } from "@/components/FinalCTA";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductCatalogue } from "@/components/ProductCatalogue";
import { Testimonials } from "@/components/Testimonials";
import { VerificationSection } from "@/components/VerificationSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductCatalogue />
      <DosageCalculator />
      <FeatureGrid />
      <VerificationSection />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

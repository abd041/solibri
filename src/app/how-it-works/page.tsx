import type { Metadata } from "next";
import { HowItWorksFaq } from "@/components/how-it-works/HowItWorksFaq";
import { brandedOgImage } from "@/lib/site";
import { HowItWorksHero } from "@/components/how-it-works/HowItWorksHero";
import { HowItWorksKits } from "@/components/how-it-works/HowItWorksKits";
import { HowItWorksShipping } from "@/components/how-it-works/HowItWorksShipping";
import { HowItWorksSteps } from "@/components/how-it-works/HowItWorksSteps";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "How It Works · Aurelius Biosciences",
  description:
    "From choosing your peptide to storing it correctly — see how Aurelius Biosciences' kits, batch testing and UK dispatch work, step by step.",
  keywords: [
    "peptides",
    "research peptides",
    "premium peptides",
    "10ml vials",
    "peptide pen kit",
    "Aurelius Biosciences",
  ],
  alternates: {
    canonical: "/how-it-works",
  },
  openGraph: {
    title: "Aurelius Biosciences — Research-Grade Peptides",
    description:
      "Premium research peptides. Choose your peptide, then your kit — Standard or Premium Pen. Batch-tested, precisely dosed.",
    images: [brandedOgImage],
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksHero />
      <HowItWorksSteps />
      <HowItWorksKits />
      <HowItWorksShipping />
      <HowItWorksFaq />
      <FinalCTA />
    </>
  );
}

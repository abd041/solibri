import type { Metadata } from "next";
import { AboutContact } from "@/components/about/AboutContact";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutPrinciples } from "@/components/about/AboutPrinciples";
import { AboutReviews } from "@/components/about/AboutReviews";
import { AboutStory } from "@/components/about/AboutStory";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "About · Solibri Labs",
  description:
    "Why Solibri Labs exists: research-grade peptides, batch-tested for purity, precisely reconstituted and kitted in the UK — with nothing hidden.",
  keywords: [
    "peptides",
    "research peptides",
    "premium peptides",
    "10ml vials",
    "peptide pen kit",
    "Solibri Labs",
    "Solibri",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Solibri Labs — Research-Grade Peptides",
    description:
      "Premium research peptides. Choose your peptide, then your kit — Standard or Premium Pen. Batch-tested, precisely dosed.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutPrinciples />
      <AboutReviews />
      <AboutContact />
      <FinalCTA />
    </>
  );
}

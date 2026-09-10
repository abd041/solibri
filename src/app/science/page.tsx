import type { Metadata } from "next";
import { ScienceAssurance } from "@/components/science/ScienceAssurance";
import { ScienceHero } from "@/components/science/ScienceHero";
import { ScienceMethodology } from "@/components/science/ScienceMethodology";
import { ScienceProcess } from "@/components/science/ScienceProcess";
import { ScienceStats } from "@/components/science/ScienceStats";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "The Science · Solibri Labs",
  description:
    "How Solibri Labs works: research-grade peptides, batch-tested for purity, precisely reconstituted, and kitted to a consistent standard — from vial to kit.",
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
    canonical: "/science",
  },
  openGraph: {
    title: "Solibri Labs — Research-Grade Peptides",
    description:
      "Premium research peptides. Choose your peptide, then your kit — Standard or Premium Pen. Batch-tested, precisely dosed.",
  },
};

export default function SciencePage() {
  return (
    <>
      <ScienceHero />
      <ScienceMethodology />
      <ScienceStats />
      <ScienceProcess />
      <ScienceAssurance />
      <FinalCTA />
    </>
  );
}

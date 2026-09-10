import type { Metadata } from "next";
import { GuidesCta } from "@/components/guides/GuidesCta";
import { GuidesFaq } from "@/components/guides/GuidesFaq";
import { GuidesGrid } from "@/components/guides/GuidesGrid";
import { GuidesHero } from "@/components/guides/GuidesHero";
import { guidesFaqJsonLd } from "@/data/guides";

export const metadata: Metadata = {
  title: "Research Guides · Solibri Labs",
  description: "Peptide reconstitution, storage, safety, and research best practices from Solibri Labs.",
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: "Solibri Labs — Research-Grade Peptides",
    description:
      "Premium research peptides. Choose your peptide, then your kit — Standard or Premium Pen. Batch-tested, precisely dosed.",
  },
};

export default function GuidesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guidesFaqJsonLd) }} />
      <GuidesHero />
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-16 px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        <GuidesGrid />
        <GuidesFaq />
        <GuidesCta />
      </div>
    </>
  );
}

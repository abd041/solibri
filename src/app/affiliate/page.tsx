import type { Metadata } from "next";
import { AffiliateCommission } from "@/components/affiliate/AffiliateCommission";
import { brandedOgImage } from "@/lib/site";
import { AffiliateHero } from "@/components/affiliate/AffiliateHero";
import { AffiliateJoin } from "@/components/affiliate/AffiliateJoin";
import { AffiliateSteps } from "@/components/affiliate/AffiliateSteps";
import { AffiliateTerms } from "@/components/affiliate/AffiliateTerms";

export const metadata: Metadata = {
  title: "Aurelius Biosciences — Research-Grade Peptides",
  description:
    "Premium research peptides from Aurelius Biosciences. Choose your peptide, then your kit — a Standard Kit with sterile water or a Premium Pen Kit with a disposable injection pen. Batch-tested, precisely dosed.",
  alternates: {
    canonical: "/affiliate",
  },
  openGraph: {
    title: "Aurelius Biosciences — Research-Grade Peptides",
    description:
      "Premium research peptides. Choose your peptide, then your kit — Standard or Premium Pen. Batch-tested, precisely dosed.",
    images: [brandedOgImage],
  },
};

export default function AffiliatePage() {
  return (
    <>
      <AffiliateHero />
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-16 px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        <AffiliateJoin />
        <AffiliateSteps />
        <AffiliateCommission />
        <AffiliateTerms />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { RecoverUpdateForm } from "@/components/auth/RecoverUpdateForm";
import { brandedOgImage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solibri Labs — Research-Grade Peptides",
  description:
    "Premium research peptides from Solibri Labs. Choose your peptide, then your kit — a Standard Kit with sterile water or a Premium Pen Kit with a disposable injection pen. Batch-tested, precisely dosed.",
  keywords: ["peptides", "research peptides", "premium peptides", "10ml vials", "peptide pen kit", "Solibri Labs", "Solibri"],
  alternates: {
    canonical: "/recover/update",
  },
  openGraph: {
    title: "Solibri Labs — Research-Grade Peptides",
    description:
      "Premium research peptides. Choose your peptide, then your kit — Standard or Premium Pen. Batch-tested, precisely dosed.",
    images: [brandedOgImage],
  },
};

export default function RecoverUpdatePage() {
  return <RecoverUpdateForm />;
}

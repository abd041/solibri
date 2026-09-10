import type { Metadata } from "next";
import { VerifyBatch } from "@/components/verify/VerifyBatch";

export const metadata: Metadata = {
  title: "Verify your batch · Solibri Labs",
  description: "Check that your Solibri Labs peptide is genuine by entering its unique batch verification code.",
  alternates: {
    canonical: "/verify",
  },
  openGraph: {
    title: "Solibri Labs — Research-Grade Peptides",
    description:
      "Premium research peptides. Choose your peptide, then your kit — Standard or Premium Pen. Batch-tested, precisely dosed.",
  },
};

export default function VerifyPage() {
  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="glow-orb"
          style={{
            width: "40rem",
            height: "40rem",
            opacity: 0.22,
            background: "radial-gradient(circle, rgba(52,211,153,0.9) 0%, rgba(52,211,153,0) 70%)",
            top: "-15%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">Batch verification</p>
            <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3rem)] font-extrabold text-fg">Verify your batch</h1>
            <p className="mt-3 text-pretty text-fg-muted">
              Enter the unique code from your vial or kit packaging. We&apos;ll confirm it&apos;s a genuine Solibri Labs batch.
            </p>
          </div>
          <VerifyBatch />
        </div>
      </section>
    </>
  );
}

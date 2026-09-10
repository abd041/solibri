import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact · Solibri Labs",
  description: "Contact Solibri Labs for order support, product questions, wholesale enquiries, and partnerships.",
  keywords: ["peptides", "research peptides", "premium peptides", "10ml vials", "peptide pen kit", "Solibri Labs", "Solibri"],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Solibri Labs — Research-Grade Peptides",
    description:
      "Premium research peptides. Choose your peptide, then your kit — Standard or Premium Pen. Batch-tested, precisely dosed.",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div
          aria-hidden="true"
          className="glow-orb"
          style={{
            width: "40rem",
            height: "40rem",
            opacity: 0.32,
            background: "radial-gradient(circle, rgba(37,99,235,0.9) 0%, rgba(37,99,235,0) 70%)",
            top: "-55%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <div className="reveal flex flex-col items-center" style={{ "--reveal-delay": "0ms" } as CSSProperties}>
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-brand-600/18 bg-brand-600/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-300">
              Support
            </span>
            <h1 className="text-gradient font-display text-[clamp(2.2rem,5.5vw,3.75rem)] font-extrabold leading-[1.05]">
              Contact Solibri Labs
            </h1>
            <p className="mt-3 max-w-2xl text-[clamp(0.9rem,1.6vw,1.05rem)] leading-relaxed text-fg-muted">
              Questions about an order, a batch, or a partnership? Send us a message — we typically reply within one
              business day.
            </p>
          </div>
        </div>
      </section>
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-xl">
          <ContactForm />
        </div>
      </div>
    </>
  );
}

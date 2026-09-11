import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "Aurelius Biosciences — Research-Grade Peptides",
  robots: {
    index: false,
  },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-5 py-20 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 15%, rgba(212,175,55,0.22), transparent 70%), radial-gradient(40% 35% at 80% 80%, rgba(212,175,55,0.08), transparent 65%)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-lg">
        <p className="font-display text-[clamp(4.5rem,16vw,8rem)] font-black leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_rgba(212,175,55,0.55)]">
          404
        </p>
        <h1 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.02em] text-fg sm:text-3xl">
          This page took the day off
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-fg-muted sm:text-[15px]">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Head back home, or browse the shop.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/" variant="primaryHover500" size="md">
            Back home
          </ButtonLink>
          <ButtonLink href="/shop" variant="outline" size="md">
            Shop products
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

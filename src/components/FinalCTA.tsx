import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="reveal">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-16 text-center sm:px-12">
            <div className="honeycomb-texture pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.06] tracking-tight text-white">
                Precision peptides, delivered.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[clamp(1rem,1.8vw,1.15rem)] leading-relaxed text-white/85">
                Batch-tested vials, kitted your way — a Standard Kit with sterile water or a Premium Pen Kit. Discreetly
                dispatched from the UK.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  className="inline-flex h-[3.25rem] items-center justify-center rounded-full bg-white px-8 text-[15px] font-semibold text-[#9b3a07] transition-transform duration-200 ease-[var(--ease-smooth)] hover:bg-white/92 active:scale-[0.98]"
                  href="/shop"
                >
                  Shop peptides
                </Link>
                <Link
                  className="inline-flex h-[3.25rem] items-center justify-center rounded-full border border-white/40 px-8 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                  href="/how-it-works"
                >
                  How it works
                </Link>
              </div>
              <p className="mt-6 text-xs text-white/75">
                Discreet UK dispatch. A batch certificate is included with every order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

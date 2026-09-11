import { AFFILIATE_RATE } from "@/data/affiliate";

export function AffiliateHero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-50" />
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
        <div className="reveal flex flex-col items-center">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-brand-600/18 bg-brand-600/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-300">
            Affiliate Programme
          </span>
          <h1 className="text-gradient font-display text-[clamp(2.2rem,5.5vw,3.75rem)] font-extrabold leading-[1.05]">
            Partner with Aurelius Biosciences — earn {AFFILIATE_RATE}% on every order you refer
          </h1>
          <p className="mt-3 max-w-2xl text-[clamp(0.9rem,1.6vw,1.05rem)] leading-relaxed text-fg-muted">
            Share your link. Your audience gets {AFFILIATE_RATE}% off at checkout automatically, and you earn{" "}
            {AFFILIATE_RATE}% commission on every paid order.
          </p>
        </div>
      </div>
    </section>
  );
}

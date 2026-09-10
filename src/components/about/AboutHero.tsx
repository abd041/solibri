export function AboutHero() {
  return (
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
        <div className="reveal flex flex-col items-center">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-brand-600/18 bg-brand-600/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-300">
            Our mission
          </span>
          <h1 className="text-gradient font-display text-[clamp(2.2rem,5.5vw,3.75rem)] font-extrabold leading-[1.05]">
            Research peptides, done properly
          </h1>
          <p className="mt-3 max-w-2xl text-[clamp(0.9rem,1.6vw,1.05rem)] leading-relaxed text-fg-muted">
            Solibri Labs was founded to bring a proper standard to research peptides — batch-tested for purity, precisely
            dosed, and kitted in the UK with nothing to hide.
          </p>
        </div>
      </div>
    </section>
  );
}

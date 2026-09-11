import { scienceChecks } from "@/data/science";

export function ScienceAssurance() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="glow-orb"
        style={{
          width: "34rem",
          height: "34rem",
          opacity: 0.28,
          background: "radial-gradient(circle, rgba(212,175,55,0.9) 0%, rgba(212,175,55,0) 70%)",
          top: "-10%",
          right: "-15%",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="reveal mb-12 flex flex-col items-center gap-4 text-center sm:mb-16">
          <span className="text-[12px] font-semibold capitalize tracking-wide text-brand-500">Quality assurance</span>
          <h2 className="max-w-[20ch] font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold leading-[1.06] tracking-tight text-fg">
            Testing you can verify
          </h2>
          <p className="max-w-[60ch] text-[clamp(0.95rem,1.6vw,1.075rem)] leading-relaxed text-fg-muted">
            No vague claims, no trust-me sourcing. Here's a look at the checks every batch passes before it's kitted, and
            why each one matters.
          </p>
        </div>
        <div className="reveal">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-2 sm:p-3">
            <div className="hidden grid-cols-[2fr_1fr_3fr] gap-4 border-b border-line px-6 py-4 text-xs font-semibold uppercase tracking-wide text-fg-faint sm:grid">
              <span>Check</span>
              <span>Method</span>
              <span>Why it matters</span>
            </div>
            <div className="flex flex-col divide-y divide-[color:var(--color-line)]">
              {scienceChecks.map((row) => (
                <div
                  key={row.check}
                  className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-[2fr_1fr_3fr] sm:items-center sm:gap-4"
                >
                  <span className="font-display text-[15px] font-bold text-fg">{row.check}</span>
                  <span className="font-display text-sm font-bold text-brand-400 sm:text-base">{row.method}</span>
                  <span className="text-[13px] leading-relaxed text-fg-muted">{row.why}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="reveal" style={{ ["--reveal-delay" as string]: "120ms" }}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-relaxed text-fg-faint">
            The checks shown are representative of our process. Every batch is tested before it’s kitted, and batch details
            are available from our team on request.
          </p>
        </div>
      </div>
    </section>
  );
}

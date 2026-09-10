import { CheckIcon, FlaskIcon } from "@/components/icons";
import { aboutChecks, aboutStats, aboutStory } from "@/data/about";

export function AboutStory() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
      <div
        aria-hidden="true"
        className="glow-orb"
        style={{
          width: "36rem",
          height: "36rem",
          opacity: 0.28,
          background: "radial-gradient(circle, rgba(226,89,14,0.9) 0%, rgba(226,89,14,0) 70%)",
          top: "-10%",
          left: "-15%",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-brand-600/18 bg-brand-600/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-300">
              Why Solibri exists
            </span>
            <h2 className="text-gradient font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold leading-[1.05]">
              Research peptides, held to a proper standard
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-[15px] leading-relaxed text-fg-muted">
              {aboutStory.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="reveal" style={{ ["--reveal-delay" as string]: "120ms" }}>
            <div className="glass-strong relative overflow-hidden rounded-3xl p-7 sm:p-9">
              <div
                aria-hidden="true"
                className="glow-orb"
                style={{
                  width: "22rem",
                  height: "22rem",
                  opacity: 0.32,
                  background: "radial-gradient(circle, rgba(243,152,90,0.9) 0%, rgba(243,152,90,0) 70%)",
                  top: "-30%",
                  right: "-20%",
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-400/12 text-brand-300 ring-1 ring-inset ring-brand-400/20">
                    <FlaskIcon size={22} />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-fg">Built on testing</p>
                    <p className="text-xs text-fg-faint">Not on marketing hype</p>
                  </div>
                </div>
                <div className="divider-glow my-6" />
                <div className="grid grid-cols-2 gap-5">
                  {aboutStats.map((stat) => (
                    <div key={stat.value}>
                      <p className="font-display text-2xl font-extrabold text-brand-400 sm:text-3xl">{stat.value}</p>
                      <p className="mt-1 text-xs leading-snug text-fg-muted">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="divider-glow my-6" />
                <ul className="flex flex-col gap-2.5">
                  {aboutChecks.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-fg">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-400/15 text-brand-300">
                        <CheckIcon size={13} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

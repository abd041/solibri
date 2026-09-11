import type { ReactNode } from "react";
import { CrosshairIcon, FlaskIcon, SearchIcon } from "@/components/icons";
import { howItWorksSteps } from "@/data/how-it-works";

const icons: Record<(typeof howItWorksSteps)[number]["icon"], ReactNode> = {
  search: <SearchIcon size={22} />,
  flask: <FlaskIcon size={22} />,
  crosshair: <CrosshairIcon size={22} />,
};

export function HowItWorksSteps() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="reveal mb-12 flex flex-col items-center gap-4 text-center sm:mb-16">
          <span className="text-[12px] font-semibold capitalize tracking-wide text-brand-500">The process</span>
          <h2 className="max-w-[20ch] font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold leading-[1.06] tracking-tight text-fg">
            Three steps from peptide to prepared
          </h2>
          <p className="max-w-[60ch] text-[clamp(0.95rem,1.6vw,1.075rem)] leading-relaxed text-fg-muted">
            Research peptides without the guesswork. Here's exactly what happens from the moment you choose Solibri.
          </p>
        </div>
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-12 hidden h-px md:block"
            style={{ background: "linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent)" }}
          />
          {howItWorksSteps.map((step, index) => (
            <div key={step.n} className="reveal" style={{ ["--reveal-delay" as string]: `${index * 120}ms` }}>
              <div className="glass relative flex h-full flex-col rounded-3xl p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-400/12 text-brand-300 ring-1 ring-inset ring-brand-400/20">
                    {icons[step.icon]}
                  </span>
                  <span className="font-display text-4xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(212,175,55,0.35)] sm:text-5xl">
                    {step.n}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-fg sm:text-[22px]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.body}</p>
                <ul className="mt-5 flex flex-col gap-2.5 border-t border-line pt-5">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[13px] leading-snug text-fg">
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

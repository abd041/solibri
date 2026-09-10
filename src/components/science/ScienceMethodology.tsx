import type { ReactNode } from "react";
import { CrosshairIcon, FeatherIcon, FlaskIcon, ShieldCheckIcon } from "@/components/icons";
import { scienceThemes } from "@/data/science";

const icons: Record<(typeof scienceThemes)[number]["icon"], ReactNode> = {
  flask: <FlaskIcon size={22} />,
  shield: <ShieldCheckIcon size={22} />,
  feather: <FeatherIcon size={22} />,
  crosshair: <CrosshairIcon size={22} />,
};

export function ScienceMethodology() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="reveal mb-12 flex flex-col items-center gap-4 text-center sm:mb-16">
          <span className="text-[12px] font-semibold capitalize tracking-wide text-brand-500">Our methodology</span>
          <h2 className="max-w-[20ch] font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold leading-[1.06] tracking-tight text-fg">
            A testing-led approach
          </h2>
          <p className="max-w-[60ch] text-[clamp(0.95rem,1.6vw,1.075rem)] leading-relaxed text-fg-muted">
            Research peptides are too often sold on trust alone. Solibri flips that: every batch is tested for purity, and
            every kit is prepared to the same standard.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scienceThemes.map((item, index) => (
            <div
              key={item.title}
              className="reveal"
              style={{ ["--reveal-delay" as string]: `${index === 3 ? 240 : index * 100}ms` }}
            >
              <div className="glass flex h-full flex-col gap-4 rounded-3xl p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-400/12 text-brand-300 ring-1 ring-inset ring-brand-400/20">
                  {icons[item.icon]}
                </span>
                <div>
                  <h3 className="font-display text-[15px] font-bold text-fg">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

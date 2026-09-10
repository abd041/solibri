import type { ReactNode } from "react";
import { FeatherIcon, ShieldCheckIcon, TruckIcon } from "@/components/icons";
import { howItWorksShipping } from "@/data/how-it-works";

const icons: Record<(typeof howItWorksShipping)[number]["icon"], ReactNode> = {
  truck: <TruckIcon size={22} />,
  feather: <FeatherIcon size={22} />,
  shield: <ShieldCheckIcon size={22} />,
};

export function HowItWorksShipping() {
  return (
    <section id="shipping" className="relative scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="reveal mb-12 flex flex-col items-center gap-4 text-center sm:mb-16">
          <span className="text-[12px] font-semibold capitalize tracking-wide text-brand-500">Shipping & returns</span>
          <h2 className="max-w-[20ch] font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold leading-[1.06] tracking-tight text-fg">
            Fast, discreet, dependable
          </h2>
          <p className="max-w-[60ch] text-[clamp(0.95rem,1.6vw,1.075rem)] leading-relaxed text-fg-muted">
            From the moment you order to the moment your kit arrives — here's how delivery and returns work.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {howItWorksShipping.map((item, index) => (
            <div key={item.title} className="reveal" style={{ ["--reveal-delay" as string]: `${index * 100}ms` }}>
              <div className="glass flex h-full flex-col gap-4 rounded-3xl p-6 sm:p-7">
                <span
                  className={
                    item.tone === "cyan"
                      ? "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/12 text-cyan-300 ring-1 ring-inset ring-cyan-400/25"
                      : "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-400/12 text-brand-300 ring-1 ring-inset ring-brand-400/20"
                  }
                >
                  {icons[item.icon]}
                </span>
                <h3 className="font-display text-lg font-bold text-fg">{item.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

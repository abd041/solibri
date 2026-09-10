import type { ReactNode } from "react";
import { ButtonLink } from "@/components/Button";
import { ClockIcon, CrosshairIcon, HeartIcon, TruckIcon } from "@/components/icons";
import { howItWorksKits } from "@/data/how-it-works";

const icons: Record<(typeof howItWorksKits)[number]["icon"], ReactNode> = {
  crosshair: <CrosshairIcon size={20} />,
  truck: <TruckIcon size={20} />,
  clock: <ClockIcon size={20} />,
  heart: <HeartIcon size={20} />,
};

export function HowItWorksKits() {
  return (
    <section id="kits" className="relative scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="reveal">
          <div
            className="relative overflow-hidden rounded-[28px] border border-line-strong px-6 py-10 sm:px-10 sm:py-14 lg:px-14"
            style={{
              clipPath: "polygon(0% 0%, calc(100% - 22px) 0%, 100% 22px, 100% 100%, 0% 100%)",
              background:
                "linear-gradient(160deg, rgba(226,89,14,0.14) 0%, rgba(20,14,10,0.85) 45%, rgba(10,7,4,0.95) 100%)",
            }}
          >
            <div
              aria-hidden="true"
              className="glow-orb"
              style={{
                width: "34rem",
                height: "34rem",
                opacity: 0.4,
                background: "radial-gradient(circle, rgba(226,89,14,0.9) 0%, rgba(226,89,14,0) 70%)",
                top: "-45%",
                right: "-10%",
              }}
            />
            <div
              aria-hidden="true"
              className="glow-orb"
              style={{
                width: "26rem",
                height: "26rem",
                opacity: 0.3,
                background: "radial-gradient(circle, rgba(243,152,90,0.9) 0%, rgba(243,152,90,0) 70%)",
                bottom: "-35%",
                left: "-10%",
              }}
            />
            <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
              <div>
                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-600/18 bg-brand-600/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-300">
                  Choose your kit
                </span>
                <h2 className="text-gradient-cyan font-display text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold leading-[1.08]">
                  One peptide, two ways to kit it.
                </h2>
                <p className="mt-4 max-w-md text-[clamp(0.95rem,1.6vw,1.05rem)] leading-relaxed text-fg-muted">
                  Once you’ve chosen your peptide, choose how it arrives. Pick the Standard Kit for everything you need to
                  reconstitute, or the Premium Pen Kit for a presentation box with a disposable injection pen.
                </p>
                <div className="mt-7">
                  <ButtonLink href="/shop" variant="primary" size="lg">
                    Browse peptides
                  </ButtonLink>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {howItWorksKits.map((item, index) => (
                  <div
                    key={item.title}
                    className="reveal"
                    style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}
                  >
                    <div className="glass flex h-full flex-col gap-3 rounded-2xl p-5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/12 text-cyan-300 ring-1 ring-inset ring-cyan-400/25">
                        {icons[item.icon]}
                      </span>
                      <h3 className="font-display text-[15px] font-bold text-fg">{item.title}</h3>
                      <p className="text-[13px] leading-snug text-fg-muted">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

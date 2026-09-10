import type { ReactNode } from "react";
import { FeatherIcon, FlaskIcon, ShieldCheckIcon, TruckIcon } from "@/components/icons";

const features: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Lab-Verified Purity",
    body: "Every batch is HPLC-tested and ships with a certificate of analysis.",
    icon: <FlaskIcon size={21} />,
  },
  {
    title: "Precisely Dosed",
    body: "Exact peptide content per vial, so every reconstitution is consistent.",
    icon: <ShieldCheckIcon size={21} />,
  },
  {
    title: "Your Choice of Kit",
    body: "A Standard Kit with sterile water, or a Premium Pen Kit with a disposable pen.",
    icon: <FeatherIcon size={21} />,
  },
  {
    title: "Discreet UK Dispatch",
    body: "Cold-safe, unbranded packaging, dispatched quickly from the UK.",
    icon: <TruckIcon size={21} />,
  },
];

export function FeatureGrid() {
  return (
    <section className="relative border-y border-line bg-ink-800 py-14">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={feature.title} className="reveal" style={{ ["--reveal-delay" as string]: `${index * 70}ms` }}>
              <div className="flex h-full items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 ring-1 ring-inset ring-brand-500/20">
                  {feature.icon}
                </span>
                <div>
                  <h3 className="font-display text-[15px] font-bold text-fg">{feature.title}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-fg-muted">{feature.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { scienceStats } from "@/data/science";

export function ScienceStats() {
  return (
    <section className="relative py-4 sm:py-6">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="reveal">
          <div className="glass grid grid-cols-2 gap-6 rounded-3xl px-6 py-10 sm:grid-cols-4 sm:gap-4 sm:px-10 sm:py-12">
            {scienceStats.map((stat) => (
              <div key={stat.value} className="flex flex-col items-center text-center">
                <span className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-none text-brand-400">
                  {stat.value}
                </span>
                <span className="mt-2 text-[12px] font-medium uppercase tracking-wide text-fg-muted sm:text-[13px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

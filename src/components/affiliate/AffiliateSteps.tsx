import { affiliateSteps } from "@/data/affiliate";

export function AffiliateSteps() {
  return (
    <div className="flex flex-col gap-8">
      <div className="reveal flex flex-col items-center gap-4 text-center">
        <span className="text-[12px] font-semibold capitalize tracking-wide text-brand-500">How it works</span>
        <h2 className="max-w-[20ch] font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold leading-[1.06] tracking-tight text-fg">
          Three steps to your first payout
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {affiliateSteps.map((item, index) => (
          <div
            key={item.title}
            className="reveal glass rounded-2xl border border-line p-6"
            style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 font-display text-sm font-extrabold text-fg-on-brand">
              {item.step}
            </span>
            <h3 className="mt-4 font-display text-base font-bold text-fg">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

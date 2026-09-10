import { scienceProcess } from "@/data/science";

export function ScienceProcess() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="reveal mb-12 flex flex-col items-center gap-4 text-center sm:mb-16">
          <span className="text-[12px] font-semibold capitalize tracking-wide text-brand-500">Our quality process</span>
          <h2 className="max-w-[20ch] font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold leading-[1.06] tracking-tight text-fg">
            From vial to kit
          </h2>
          <p className="max-w-[60ch] text-[clamp(0.95rem,1.6vw,1.075rem)] leading-relaxed text-fg-muted">
            Every Solibri peptide passes through the same rigorous pipeline — built to make sure what's on the label is
            exactly what's in the vial.
          </p>
        </div>
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-9 hidden h-px md:block"
            style={{ background: "linear-gradient(90deg,transparent,rgba(226,89,14,0.3),transparent)" }}
          />
          {scienceProcess.map((step, index) => (
            <div key={step.n} className="reveal" style={{ ["--reveal-delay" as string]: `${index === 3 ? 240 : index * 100}ms` }}>
              <div className="glass relative flex h-full flex-col rounded-3xl p-6">
                <span className="font-display text-5xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(226,89,14,0.4)]">
                  {step.n}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-fg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

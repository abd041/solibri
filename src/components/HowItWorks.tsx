const steps = [
  {
    n: "01",
    title: "Choose your peptide",
    body: "Browse our research peptides, each batch-tested for purity, and pick the one you need.",
  },
  {
    n: "02",
    title: "Choose your kit",
    body: "Pick a Standard Kit with sterile water, or a Premium Pen Kit with a disposable injection pen.",
  },
  {
    n: "03",
    title: "Reconstitute & store",
    body: "Reconstitute with the supplied sterile water and store your kit as directed.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="reveal mb-14 flex flex-col items-center gap-4 text-center">
          <h2 className="max-w-[20ch] font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold leading-[1.06] tracking-tight text-fg">
            How Solibri works
          </h2>
          <p className="max-w-[60ch] text-[clamp(0.95rem,1.6vw,1.075rem)] leading-relaxed text-fg-muted">
            Research peptides without the guesswork. Three steps from peptide to prepared.
          </p>
        </div>
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-line md:block" />
          {steps.map((step, index) => (
            <div key={step.n} className="reveal" style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}>
              <div className="relative flex h-full flex-col rounded-2xl border border-line bg-ink-700 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600/10 font-display text-lg font-extrabold text-brand-300">
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

import Image from "next/image";

export function ShopHero() {
  return (
    <section className="shop-hero w-full bg-black" aria-label="Catalogue hero">
      <div className="relative flex h-[clamp(110px,22vh,130px)] items-start overflow-hidden bg-black sm:h-[clamp(120px,22vh,170px)]">
        <Image
          src="/brand/shop-banner.jpg"
          alt=""
          width={1600}
          height={400}
          priority
          className="pointer-events-none absolute inset-y-0 right-0 h-full w-auto max-w-none object-cover object-right"
        />
        <div className="relative z-[1] mx-auto flex w-full max-w-[1200px] items-start px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8">
          <div className="max-w-[min(92vw,22rem)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-400">Catalogue</p>
            <h1 className="mt-1 max-w-[16ch] text-balance font-display text-[clamp(1.2rem,2.4vw,1.75rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-fg">
              Premium Research Peptides
            </h1>
            <p className="mt-1 hidden max-w-[28ch] text-[13px] leading-snug text-fg-muted min-[700px]:block">
              Lab-tested. Verified purity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

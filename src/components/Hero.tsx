import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";

export function Hero() {
  return (
    <section className="hero-stage relative -mt-24 min-h-[1040px] overflow-hidden bg-transparent pt-24 text-white md:-mt-28 md:min-h-[1100px] md:pt-28 lg:min-h-[100svh]">
      <div className="absolute left-[7%] top-[22%] h-[44%] w-[43%] bg-[radial-gradient(ellipse,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.32)_50%,transparent_78%)]" />
      <div className="hero-scene">
        <div className="hero-scene__keylight" />
        <div className="hero-scene__floor" />
        <div className="hero-scene__horizon" />
        <div className="hero-scene__ao" />
        <div className="hero-scene__contact" />
        <div className="hero-scene__reflection">
          <div className="hero-scene__reflection-inner">
            <Image
              src="/brand/solibri-hero-box-trimmed.png"
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 1023px) 56vw, 340px"
              priority
            />
          </div>
        </div>
        <div className="hero-scene__product">
          <Image
            src="/brand/solibri-hero-box-trimmed.png"
            alt="Matte-black Solibri Labs product carton"
            fill
            className="object-contain"
            sizes="(max-width: 1023px) 56vw, 340px"
            priority
          />
        </div>
      </div>
      <div className="relative z-10 mx-auto grid w-[calc(100%-2rem)] max-w-[1180px] grid-cols-1 items-center gap-3 pb-12 pt-8 sm:w-[88%] md:pt-5 lg:min-h-[calc(100svh-7rem)] lg:w-[80.5%] lg:translate-y-[22px] lg:grid-cols-[0.94fr_1.06fr] lg:gap-2 lg:pb-8">
        <div className="relative z-20 flex flex-col items-start py-8 lg:py-0">
          <div className="mb-5 flex items-center font-mono text-[10px] font-semibold uppercase tracking-[0.31em] text-brand-400 sm:text-[11px]">
            Research-grade peptides
          </div>
          <h1 className="max-w-[650px] font-display text-[clamp(3.05rem,5.25vw,4.75rem)] font-extrabold leading-[0.96] tracking-[-0.045em] text-white">
            Choose your
            <span className="block">peptide.</span>
            <span className="mt-1 block text-brand-500">Then your kit.</span>
          </h1>
          <p className="mt-6 max-w-[390px] text-[15px] leading-[1.65] text-white/58 sm:text-[16px]">
            Premium research peptides, batch-tested for purity — supplied as a Standard Kit with sterile water, or a
            Premium Pen Kit with a disposable injection pen.
          </p>
          <div className="relative z-10 mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link className="hero-gloss-cta hero-gloss-cta--shop" href="/shop">
              <span className="hero-gloss-cta__blob" />
              <span className="hero-gloss-cta__inner">
                <span className="hero-gloss-cta__label">Shop peptides</span>
              </span>
            </Link>
            <Link className="hero-gloss-cta hero-gloss-cta--calc hero-gloss-cta--animated" href="/#calculator">
              <span className="hero-gloss-cta__blob" />
              <span className="hero-gloss-cta__inner">
                <span className="hero-gloss-cta__label">
                  Syringe calculator
                  <ChevronRightIcon size={16} />
                </span>
              </span>
            </Link>
          </div>
          <div>
            <dl className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[9px] font-medium uppercase tracking-[0.15em] text-white/50 sm:text-[10px]">
              <div className="flex items-center gap-4">
                <dt>HPLC-verified</dt>
              </div>
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="text-brand-500/70">
                  /
                </span>
                <dt>COA with every batch</dt>
              </div>
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="text-brand-500/70">
                  /
                </span>
                <dt>Discreet UK dispatch</dt>
              </div>
            </dl>
          </div>
        </div>
        <div className="hidden min-h-[min(72vh,660px)] w-full self-stretch lg:block" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/25 to-transparent" />
    </section>
  );
}

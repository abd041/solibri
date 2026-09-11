"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FeatherIcon,
  FlaskIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@/components/icons";
import { HOW_TO_USE, SHIPPING_COPY, type Product } from "@/data/products";
import { formatGBP } from "@/lib/money";
import { ProductPurchase } from "./ProductPurchase";

export function ProductView({ product, related }: { product: Product; related: Product[] }) {
  const [expanded, setExpanded] = useState(false);
  const [openSection, setOpenSection] = useState<"composition" | "use" | "shipping" | null>(
    product.specs?.length ? "composition" : null,
  );
  const saved = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <>
      <div className="mx-auto w-full max-w-[1200px] px-5 pt-3 max-lg:pb-8 sm:px-6 sm:pt-4 lg:px-8">
        <nav className="flex flex-wrap items-center gap-1 text-[11px] text-fg-faint/80" aria-label="Breadcrumb">
          <Link className="transition-colors hover:text-fg-muted" href="/">
            Home
          </Link>
          <ChevronRightIcon size={11} className="shrink-0 opacity-40" />
          <Link className="transition-colors hover:text-fg-muted" href="/shop">
            Shop
          </Link>
          <ChevronRightIcon size={11} className="shrink-0 opacity-40" />
          <Link className="transition-colors hover:text-fg-muted" href={`/shop?category=${product.category}`}>
            {product.categoryLabel}
          </Link>
          <ChevronRightIcon size={11} className="shrink-0 opacity-40" />
          <span className="truncate text-fg-muted/90">{product.name}</span>
        </nav>
      </div>

      <section className="relative overflow-hidden py-4 sm:py-6 lg:py-7">
        <div
          aria-hidden="true"
          className="glow-orb"
          style={{
            width: "40rem",
            height: "40rem",
            opacity: 0.2,
            background: "radial-gradient(circle, rgba(212,175,55,0.9) 0%, rgba(212,175,55,0) 70%)",
            top: "-18%",
            left: "-12%",
          }}
        />
        <div className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-start gap-5 px-5 sm:px-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-8 lg:px-8 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)] xl:gap-10">
          <div className="relative lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col gap-3">
              <div className="relative w-full">
                {product.badge ? (
                  <span className="absolute left-[3px] top-[3px] z-20 text-[9px] font-bold uppercase tracking-[0.12em] text-brand-300">
                    {product.badge}
                  </span>
                ) : null}
                <div
                  className="relative flex aspect-[4/5] max-h-[520px] w-full items-center justify-center lg:aspect-square lg:max-h-none"
                  style={{ background: "#151312", filter: "drop-shadow(0 0 0.6px rgba(212, 175, 55, 0.5))" }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(58% 52% at 50% 44%, rgba(212,175,55,0.24), transparent 72%)" }}
                  />
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={560}
                    height={560}
                    className="relative z-10 h-[72%] w-auto object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.55)]"
                    sizes="(max-width: 1024px) 92vw, 420px"
                    priority
                  />
                  {product.sizeLabel ? (
                    <span className="absolute bottom-3 right-3 z-20 rounded-md bg-ink-900 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-fg-muted">
                      {product.sizeLabel}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col lg:max-w-xl">
            <Link
              className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-300/80 transition-colors hover:text-brand-200"
              href={`/shop?category=${product.category}`}
            >
              {product.categoryLabel}
            </Link>
            <h1 className="mt-1 text-balance font-display text-[1.55rem] font-extrabold leading-[1.15] tracking-[-0.02em] text-fg sm:text-[1.75rem] lg:text-[1.85rem]">
              {product.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[11px] text-fg-faint/70">·</span>
              {product.inStock ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  In stock
                </span>
              ) : (
                <span className="text-[11px] font-medium text-fg-muted">Sold out</span>
              )}
            </div>
            <div className="mt-3.5 flex flex-wrap items-baseline gap-2">
              <span className="font-display text-[1.45rem] font-extrabold leading-none tabular-nums text-fg sm:text-[1.55rem]">
                {formatGBP(product.price)}
              </span>
              {product.originalPrice ? (
                <span className="text-sm tabular-nums text-fg-faint/70 line-through">{formatGBP(product.originalPrice)}</span>
              ) : null}
              {saved > 0 ? (
                <span className="text-[11px] font-semibold text-brand-300/90">Save {formatGBP(saved)}</span>
              ) : null}
            </div>
            <p className="mt-2.5 max-w-prose text-[13px] leading-snug text-fg-muted/75">{product.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-y border-line/70 py-2.5 text-[12px]">
              <span>
                <span className="text-fg-faint/70">Form </span>
                <span className="font-medium text-fg/90">{product.format}</span>
              </span>
              {product.purity ? (
                <span>
                  <span className="text-fg-faint/70">Purity </span>
                  <span className="font-medium text-fg/90">{product.purity}</span>
                </span>
              ) : null}
            </div>
            <div className="mt-3 text-[13px] leading-relaxed text-fg-muted/75">
              <p className={`text-pretty ${expanded ? "" : "line-clamp-2"}`}>{product.description}</p>
              <button
                type="button"
                className="mt-0.5 text-[11px] font-semibold text-brand-300/90 transition-colors hover:text-brand-200"
                aria-expanded={expanded}
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "less" : "…more"}
              </button>
            </div>
            {product.benefits?.length ? (
              <ul className="mt-3.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-1.5">
                {product.benefits.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-[12.5px] leading-snug text-fg/85">
                    <CheckIcon size={12} className="mt-0.5 shrink-0 text-brand-300/80" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-5">
              <ProductPurchase product={product} />
            </div>

            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-line/70 pt-3.5">
              {product.certificates?.length ? (
                <li className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-fg-faint/80">
                  <ShieldCheckIcon size={12} className="text-brand-300/70" />
                  COA included
                </li>
              ) : null}
              <li className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-fg-faint/80">
                <FeatherIcon size={12} className="text-brand-300/70" />
                Secure pay
              </li>
              <li className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-fg-faint/80">
                <TruckIcon size={12} className="text-brand-300/70" />
                Discreet ship
              </li>
              <li className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-fg-faint/80">
                <FlaskIcon size={12} className="text-brand-300/70" />
                Verified
              </li>
            </ul>

            {product.certificates?.length ? (
              <div className="mt-4 rounded-[12px] border border-line bg-ink-700 px-3 py-2.5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h2 className="flex items-center gap-1.5 text-[12px] font-semibold text-fg/90">
                    <FlaskIcon size={13} className="text-brand-300/80" />
                    Lab report
                  </h2>
                  <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-emerald-400/85">Verified</span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {product.certificates.map((cert) => (
                    <li key={cert.url}>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-2 rounded-lg px-1 py-1.5 text-[12.5px] text-fg/85 transition-colors hover:text-fg"
                      >
                        <span className="truncate">{cert.label}</span>
                        <span className="shrink-0 text-[11px] font-semibold text-brand-300/80 group-hover:text-brand-200">
                          View →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-4">
              <div className="flex flex-col divide-y divide-[color:var(--color-line)] border-y border-line">
                <Accordion
                  title="Composition"
                  open={openSection === "composition"}
                  onToggle={() => setOpenSection((v) => (v === "composition" ? null : "composition"))}
                >
                  {product.specs?.length ? (
                    <ul className="flex flex-col gap-1.5">
                      {product.specs.map((spec) => (
                        <li
                          key={spec.label}
                          className="flex items-center justify-between gap-4 border-b border-line/50 pb-1.5 last:border-0 last:pb-0"
                        >
                          <span className="text-[13px] text-fg/80">{spec.label}</span>
                          <span className="text-[13px] font-semibold text-brand-200/90">{spec.value}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Accordion>
                <Accordion
                  title="How to use"
                  open={openSection === "use"}
                  onToggle={() => setOpenSection((v) => (v === "use" ? null : "use"))}
                >
                  <p className="text-[13px] leading-relaxed text-fg-muted/85">{HOW_TO_USE}</p>
                </Accordion>
                <Accordion
                  title="Shipping & guarantee"
                  open={openSection === "shipping"}
                  onToggle={() => setOpenSection((v) => (v === "shipping" ? null : "shipping"))}
                >
                  <p className="text-[13px] leading-relaxed text-fg-muted/85">{SHIPPING_COPY}</p>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-14 sm:py-16">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-extrabold text-fg sm:text-3xl">Customer reviews</h2>
            <div className="mt-8 flex flex-col gap-4">
              <p className="rounded-2xl border border-dashed border-line bg-surface-subtle px-6 py-10 text-center text-sm text-fg-muted">
                No reviews yet — be the first.
              </p>
            </div>
            <div className="mt-8">
              <div className="rounded-2xl border border-line p-6 text-center">
                <p className="text-sm text-fg-muted">Have you tried {product.name}?</p>
                <ButtonLink
                  href={`/login?next=/product/${product.slug}`}
                  variant="outline"
                  size="sm"
                  className="mt-3"
                >
                  Sign in to leave a review
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="py-8 sm:py-11">
          <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
            <h2 className="mb-4 font-display text-lg font-extrabold tracking-[-0.02em] text-fg sm:mb-5 sm:text-xl">
              You may also like
            </h2>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
              {related.map((item, index) => (
                <ProductCard key={item.slug} product={item} delay={index * 40} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function Accordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button type="button" aria-expanded={open} className="flex w-full items-center justify-between gap-4 py-3 text-left" onClick={onToggle}>
        <span className="text-[13px] font-semibold text-fg/90">{title}</span>
        <ChevronDownIcon
          size={14}
          className={`shrink-0 text-brand-300/70 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className="grid transition-all duration-300 ease-[var(--ease-smooth)]" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <div className="pb-3.5 text-[13px] leading-relaxed text-fg-muted/80">{children}</div>
        </div>
      </div>
    </div>
  );
}

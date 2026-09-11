"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { CartIcon, PlusIcon } from "@/components/icons";

function formatPrice(value: number) {
  return `£${value.toFixed(2)}`;
}

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const { addProduct } = useCart();

  return (
    <div className="reveal h-full" style={{ ["--reveal-delay" as string]: `${delay}ms` }}>
      <article className="group relative flex h-full flex-col">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-visible opacity-0 transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-100"
        >
          <div
            className="absolute -inset-1.5 rounded-[18px] blur-2xl"
            style={{ background: "radial-gradient(55% 55% at 50% 25%, rgba(212,175,55,0.35), transparent 72%)" }}
          />
        </div>
        <div className="relative flex h-full flex-row transition-transform duration-300 ease-out sm:flex-col [@media(hover:hover)]:group-hover:-translate-y-0.5">
          {product.badge ? (
            <span className="absolute left-[2px] top-[2px] z-20 text-[7px] font-bold uppercase tracking-[0.1em] text-brand-300">
              {product.badge}
            </span>
          ) : null}
          <div
            className="relative z-10 flex h-full min-h-0 w-full flex-row rounded-[16px] sm:flex-col"
            style={{
              background: "linear-gradient(160deg, rgba(26, 19, 13, 0.98) 0%, rgba(11, 9, 8, 0.99) 100%)",
              filter: "drop-shadow(0 0 0.55px rgba(212, 175, 55, 0.55))",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30 hidden opacity-0 transition-opacity duration-300 [@media(hover:hover)]:block [@media(hover:hover)]:group-hover:opacity-100"
              style={{
                background: "radial-gradient(140px 140px at 50% 0%, rgba(232,208,122,0.16), transparent 70%)",
              }}
            />
            <Link
              aria-label={product.name}
              className="relative w-[90px] shrink-0 self-stretch overflow-hidden sm:aspect-[5/4] sm:w-full sm:self-auto"
              href={product.href}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(130% 105% at 50% 34%, transparent 0%, transparent 50%, rgba(7,7,7,0.68) 100%)",
                }}
              />
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="relative z-10 object-contain p-2.5 drop-shadow-[0_10px_18px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:p-4"
                sizes="(max-width: 640px) 90px, (max-width: 1024px) 45vw, 300px"
              />
              {product.size ? (
                <span className="absolute bottom-1 right-1 z-20 rounded-md bg-ink-900/75 px-1 py-0.5 text-[9px] font-medium tabular-nums text-fg-muted backdrop-blur-sm sm:bottom-1.5 sm:right-1.5 sm:text-[10px]">
                  {product.size}
                </span>
              ) : null}
            </Link>
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-2.5 py-2 sm:justify-start sm:gap-1.5 sm:px-2.5 sm:pb-2.5 sm:pt-0.5">
              <div className="min-w-0">
                <Link className="block min-w-0" href={product.href}>
                  <h3 className="text-pretty font-display text-[0.8rem] font-bold leading-snug text-fg transition-colors group-hover:text-brand-200 sm:text-[0.88rem]">
                    <span className="line-clamp-2">{product.name}</span>
                  </h3>
                </Link>
              </div>
              <div className="flex items-end justify-between gap-1.5 border-t border-line pt-1.5 sm:mt-auto sm:items-center sm:pt-2">
                <div className="min-w-0 leading-none">
                  <span className="block whitespace-nowrap font-display text-[0.9rem] font-extrabold tabular-nums text-fg sm:text-[1rem]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice ? (
                    <span className="mt-0.5 block whitespace-nowrap text-[10px] tabular-nums text-fg-faint line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  ) : null}
                </div>
                {product.action === "configure" ? (
                  <Link
                    href={product.href}
                    aria-label="Configure"
                    className="inline-flex h-8 min-w-8 shrink-0 items-center justify-center gap-1 rounded-full bg-brand-600 px-2.5 text-[11px] font-bold text-fg-on-brand transition-[background-color,transform,color] duration-200 ease-[var(--ease-smooth)] hover:bg-brand-500 active:scale-[0.96] [@media(pointer:coarse)]:h-10 [@media(pointer:coarse)]:min-w-10 sm:h-8 sm:min-w-0 sm:px-2.5 sm:text-[11px]"
                  >
                    <PlusIcon size={14} className="sm:hidden" />
                    <CartIcon size={14} className="hidden sm:block" />
                    <span>Configure</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-label="Add"
                    className="inline-flex h-8 min-w-8 shrink-0 items-center justify-center gap-1 rounded-full bg-brand-600 px-2.5 text-[11px] font-bold text-fg-on-brand transition-[background-color,transform,color] duration-200 ease-[var(--ease-smooth)] hover:bg-brand-500 active:scale-[0.96] disabled:pointer-events-none disabled:opacity-45 [@media(pointer:coarse)]:h-10 [@media(pointer:coarse)]:min-w-10 sm:h-8 sm:min-w-0 sm:px-2.5 sm:text-[11px]"
                    onClick={() => addProduct(product)}
                  >
                    <PlusIcon size={14} className="sm:hidden" />
                    <CartIcon size={14} className="hidden sm:block" />
                    <span>Add</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

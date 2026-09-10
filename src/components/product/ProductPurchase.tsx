"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/Button";
import { CartIcon, CheckIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { useCart } from "@/context/CartContext";
import { isConfigurableProduct } from "@/data/kits";
import type { Product } from "@/data/products";
import { kitOptionNames } from "@/lib/kits";
import { formatGBP } from "@/lib/money";
import { ConfigureKitModal } from "./ConfigureKitModal";

export function ProductPurchase({ product }: { product: Product }) {
  if (isConfigurableProduct(product.category) || product.action === "configure") {
    return <ConfigurePurchase product={product} />;
  }
  return <SimplePurchase product={product} />;
}

function ConfigurePurchase({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const names = kitOptionNames().join(" · ");

  function openKit() {
    if (product.inStock) setOpen(true);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border border-line bg-ink-700/60 px-3.5 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-faint/80">Kit options</p>
        <p className="mt-1 text-[12px] leading-snug text-fg-muted">{names}</p>
        <p className="mt-2 text-[13px] font-semibold tabular-nums text-fg">From {formatGBP(product.price)}</p>
      </div>
      <Button
        size="md"
        fullWidth
        className="hidden h-12 rounded-full text-[13px] md:inline-flex"
        onClick={openKit}
        disabled={!product.inStock}
      >
        {product.inStock ? "Configure kit" : "Sold out"}
      </Button>
      <div className="h-20 md:hidden" aria-hidden="true" />
      {mounted
        ? createPortal(
            <div
              className="pointer-events-none fixed inset-x-0 z-[55] md:hidden"
              style={{ bottom: 0, paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
            >
              <div className="pointer-events-auto mx-auto w-[calc(100%-1.25rem)] max-w-lg p-1.5">
                <Button
                  size="md"
                  fullWidth
                  className="h-12 rounded-full text-[13px] shadow-[0_-8px_32px_-12px_rgba(0,0,0,0.65)]"
                  onClick={openKit}
                  disabled={!product.inStock}
                >
                  {product.inStock ? `Configure · from ${formatGBP(product.price)}` : "Sold out"}
                </Button>
              </div>
            </div>,
            document.body,
          )
        : null}
      {open ? <ConfigureKitModal product={product} onClose={() => setOpen(false)} /> : null}
    </div>
  );
}

function SimplePurchase({ product }: { product: Product }) {
  const { addProduct, openCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const total = product.price * qty;

  function add() {
    if (!product.inStock) return;
    addProduct(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  const addLabel = product.inStock ? (
    added ? (
      <>
        <CheckIcon size={16} /> Added
      </>
    ) : (
      <>
        <CartIcon size={16} />
        <span className="truncate">Add · {formatGBP(total)}</span>
      </>
    )
  ) : (
    "Sold out"
  );

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center justify-between gap-3 rounded-[12px] border border-brand-300/70 bg-ink-700 px-3 py-2.5">
        <div className="min-w-0">
          <span className="block text-[13px] font-bold text-fg">One-time purchase</span>
          {product.format ? <span className="mt-0.5 block text-[11px] text-fg-muted/70">{product.format}</span> : null}
        </div>
        <span className="shrink-0 font-display text-[15px] font-extrabold tabular-nums text-fg">
          {formatGBP(product.price)}
        </span>
      </div>
      <div className="hidden items-stretch gap-2 md:flex">
        <div className="inline-flex h-12 w-36 shrink-0 items-center justify-between rounded-full border border-line bg-ink-700 px-1">
          <button
            type="button"
            onClick={() => setQty((n) => Math.max(1, n - 1))}
            aria-label="Decrease quantity"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fg-muted transition-[transform,background-color,color] duration-150 ease-out hover:bg-surface-raised hover:text-fg active:scale-[0.96]"
          >
            <MinusIcon size={14} />
          </button>
          <span className="min-w-7 text-center text-sm font-semibold tabular-nums text-fg">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((n) => Math.min(99, n + 1))}
            aria-label="Increase quantity"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fg-muted transition-[transform,background-color,color] duration-150 ease-out hover:bg-surface-raised hover:text-fg active:scale-[0.96]"
          >
            <PlusIcon size={14} />
          </button>
        </div>
        <Button
          size="md"
          fullWidth
          className={`h-12 min-w-0 flex-1 rounded-full text-[13px] tabular-nums ${added ? "bg-emerald-600 hover:bg-emerald-600" : ""}`}
          onClick={add}
          disabled={!product.inStock}
        >
          {addLabel}
        </Button>
      </div>
      {product.inStock ? (
        <button
          type="button"
          onClick={openCart}
          className="hidden text-center text-[11px] font-medium text-brand-200/80 transition-colors hover:text-fg md:block"
        >
          View cart →
        </button>
      ) : null}
      <div className="h-20 md:hidden" aria-hidden="true" />
      {mounted
        ? createPortal(
            <div
              className="pointer-events-none fixed inset-x-0 z-[55] md:hidden"
              style={{ bottom: 0, paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
            >
              <div className="pointer-events-auto mx-auto flex w-[calc(100%-1.25rem)] max-w-lg items-stretch gap-2 rounded-full border border-line bg-ink-900/95 p-1.5 shadow-[0_-8px_32px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl">
                <div className="inline-flex h-12 w-[7.25rem] shrink-0 items-center justify-between rounded-full border border-line bg-ink-700 px-0.5">
                  <button
                    type="button"
                    onClick={() => setQty((n) => Math.max(1, n - 1))}
                    aria-label="Decrease quantity"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full text-fg-muted active:scale-[0.96]"
                  >
                    <MinusIcon size={14} />
                  </button>
                  <span className="min-w-6 text-center text-sm font-semibold tabular-nums text-fg">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((n) => Math.min(99, n + 1))}
                    aria-label="Increase quantity"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full text-fg-muted active:scale-[0.96]"
                  >
                    <PlusIcon size={14} />
                  </button>
                </div>
                <Button
                  size="md"
                  fullWidth
                  className={`h-12 min-w-0 flex-1 rounded-full text-[13px] tabular-nums ${added ? "bg-emerald-600 hover:bg-emerald-600" : ""}`}
                  onClick={add}
                  disabled={!product.inStock}
                >
                  {addLabel}
                </Button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

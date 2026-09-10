"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { CartIcon, CheckIcon, CloseIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { useCart } from "@/context/CartContext";
import { KIT_SETTINGS, colourLabel, type KitFormatId, type PenColour } from "@/data/kits";
import type { Product } from "@/data/products";
import { formatExtraCents, kitCartLines, kitTotalCents, type FormatQty } from "@/lib/kits";
import { formatGBP, fromCents } from "@/lib/money";

export function ConfigureKitModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addLines, openCart } = useCart();
  const formats = KIT_SETTINGS.formatOptions.filter((option) => option.active);
  const [rows, setRows] = useState<Record<KitFormatId, { quantity: number; colour: PenColour; extrasOpen: boolean }>>(
    () => {
      const initial = {} as Record<KitFormatId, { quantity: number; colour: PenColour; extrasOpen: boolean }>;
      formats.forEach((option, index) => {
        initial[option.id] = {
          quantity: index === 0 ? 1 : 0,
          colour: KIT_SETTINGS.penColours[0],
          extrasOpen: false,
        };
      });
      return initial;
    },
  );
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const formatQty: FormatQty[] = useMemo(
    () => formats.map((option) => ({ id: option.id, quantity: rows[option.id].quantity, colour: rows[option.id].colour })),
    [formats, rows],
  );
  const total = kitTotalCents(product, formatQty);
  const selectedCount = formatQty.reduce((sum, row) => sum + row.quantity, 0);

  function setQty(id: KitFormatId, quantity: number) {
    setRows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity: Math.max(0, Math.min(20, quantity)),
        extrasOpen: quantity > 0 || prev[id].extrasOpen,
      },
    }));
  }

  function addToCart() {
    if (selectedCount <= 0 || !product.inStock) return;
    addLines(kitCartLines(product, formatQty));
    setAdded(true);
    window.setTimeout(() => {
      setAdded(false);
      onClose();
      openCart();
    }, 700);
  }

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-black/65" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Configure ${product.name}`}
        className="fixed inset-x-0 bottom-0 z-[95] flex max-h-[92vh] flex-col rounded-t-[20px] border border-line bg-ink-800 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.7)] sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:h-auto sm:w-full sm:max-h-[min(88vh,720px)] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[20px]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-4 py-3.5 sm:px-5">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-300/80">Configure kit</p>
            <h2 className="truncate font-display text-lg font-extrabold text-fg">{product.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-fg-muted hover:bg-surface-subtle hover:text-fg"
          >
            <CloseIcon size={18} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          <p className="mb-3 text-[12px] text-fg-muted">Pick a format, then optional extras. Total updates as you go.</p>
          <ul className="space-y-2">
            {formats.map((option) => {
              const row = rows[option.id];
              const active = row.quantity > 0;
              const extra = formatExtraCents(option.id);
              const showColour = option.id === "reusable" || option.id === "premium";
              return (
                <li
                  key={option.id}
                  className={`rounded-xl border px-3 py-2.5 transition ${
                    active ? "border-brand-300/80 bg-brand-400/5" : "border-line bg-ink-700/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-bold text-fg">{option.name}</span>
                        {active ? <CheckIcon size={12} className="shrink-0 text-brand-300" /> : null}
                      </div>
                      {option.description ? (
                        <p className="mt-0.5 text-[11px] text-fg-muted/70">{option.description}</p>
                      ) : null}
                      {option.id === "vial" ? (
                        <p className="mt-1 text-[11px] font-semibold text-emerald-300">Includes sterile water</p>
                      ) : null}
                      {option.id === "premium" ? (
                        <p className="mt-1 text-[11px] font-semibold text-emerald-300">
                          Includes hard case
                          {KIT_SETTINGS.premiumDiscountCents > 0
                            ? ` · ${formatGBP(fromCents(KIT_SETTINGS.premiumDiscountCents))} kit discount`
                            : ""}
                        </p>
                      ) : null}
                      <p className="mt-1 text-[12px] tabular-nums text-brand-300">
                        {extra > 0 ? `+${formatGBP(fromCents(extra))}` : "Included in base price"}
                      </p>
                    </div>
                    <div className="inline-flex h-9 items-center rounded-full border border-line px-1">
                      <button
                        type="button"
                        onClick={() => setQty(option.id, row.quantity - 1)}
                        aria-label={`Decrease ${option.name}`}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-fg-muted hover:bg-surface-subtle hover:text-fg"
                      >
                        <MinusIcon size={12} />
                      </button>
                      <span className="min-w-6 text-center text-xs font-bold tabular-nums text-fg">{row.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQty(option.id, row.quantity + 1)}
                        aria-label={`Increase ${option.name}`}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-fg-muted hover:bg-surface-subtle hover:text-fg"
                      >
                        <PlusIcon size={12} />
                      </button>
                    </div>
                  </div>
                  {active && showColour ? (
                    <div className="mt-2.5 border-t border-line/70 pt-2.5">
                      <button
                        type="button"
                        onClick={() =>
                          setRows((prev) => ({ ...prev, [option.id]: { ...row, extrasOpen: !row.extrasOpen } }))
                        }
                        className="flex w-full items-center justify-between text-left text-[11px] font-semibold text-fg"
                      >
                        <span>Kit options</span>
                        <span className="text-fg-faint">{row.extrasOpen ? "Hide" : "Show"}</span>
                      </button>
                      {row.extrasOpen ? (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {KIT_SETTINGS.penColours.map((colour) => (
                            <button
                              key={colour}
                              type="button"
                              onClick={() => setRows((prev) => ({ ...prev, [option.id]: { ...row, colour } }))}
                              className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                                row.colour === colour
                                  ? "border-brand-500 bg-brand-600 text-fg-on-brand"
                                  : "border-line text-fg-muted"
                              }`}
                            >
                              {colourLabel(colour)}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className="shrink-0 border-t border-line bg-ink-800/95 px-4 py-3 backdrop-blur sm:px-5"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <Button
            size="md"
            fullWidth
            className={`h-12 rounded-full text-[13px] tabular-nums ${added ? "bg-emerald-600 hover:bg-emerald-600" : ""}`}
            onClick={addToCart}
            disabled={!product.inStock || selectedCount <= 0}
          >
            {!product.inStock ? (
              "Sold out"
            ) : added ? (
              <>
                <CheckIcon size={14} /> Added
              </>
            ) : (
              <>
                <CartIcon size={14} /> Add to cart · {formatGBP(fromCents(total))}
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}

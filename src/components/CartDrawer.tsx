"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ButtonLink } from "@/components/Button";
import { CartIcon, CloseIcon } from "@/components/icons";
import { useCart } from "@/context/CartContext";

function formatPrice(value: number) {
  return `£${value.toFixed(2)}`;
}

export function CartDrawer() {
  const { isOpen, closeCart, items, itemCount, subtotal, setQuantity, removeItem } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  return (
    <>
      <div
        className={`overlay-backdrop fixed inset-0 z-[80] transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />
      <aside
        className={`cart-panel fixed right-0 top-0 z-[85] flex h-full w-full max-w-[440px] flex-col border-l border-line-strong transition-transform duration-450 ease-[var(--ease-smooth)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal={isOpen}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="flex items-center gap-2.5 font-display text-lg font-bold text-fg">
            <CartIcon size={20} className="text-brand-300" />
            Your Cart
            <span className="text-sm font-medium text-fg-faint">( {itemCount} )</span>
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-muted hover:bg-surface-subtle hover:text-fg"
            onClick={closeCart}
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-subtle text-fg-faint">
              <CartIcon size={28} />
            </div>
            <p className="text-fg-muted">Your cart is empty.</p>
            <ButtonLink href="/shop" variant="outline" size="sm" onClick={closeCart}>
              Browse products
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3 rounded-2xl border border-line bg-ink-700/70 p-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-ink-800">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1.5" sizes="64px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate font-display text-sm font-bold text-fg">{item.name}</p>
                        <p className="shrink-0 font-display text-sm font-extrabold tabular-nums text-fg">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                      <p className="mt-0.5 text-xs tabular-nums text-fg-faint">{formatPrice(item.price)} each</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-line">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name} quantity`}
                            className="h-8 w-8 text-fg-muted hover:text-fg"
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span className="min-w-6 text-center text-sm tabular-nums text-fg">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Increase ${item.name} quantity`}
                            className="h-8 w-8 text-fg-muted hover:text-fg"
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="text-xs text-fg-faint hover:text-fg"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-line px-5 py-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-fg-muted">Subtotal</span>
                <span className="font-display text-base font-extrabold tabular-nums text-fg">{formatPrice(subtotal)}</span>
              </div>
              <button
                type="button"
                className="relative inline-flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-8 text-[15px] font-semibold text-fg-on-brand transition-[background-color,transform] duration-200 ease-[var(--ease-smooth)] hover:bg-brand-700 active:scale-[0.96]"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ButtonLink } from "@/components/Button";
import { CartIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon } from "@/components/icons";
import { useCart } from "@/context/CartContext";
import { freeShippingProgress, isQtyControlled, kitCaption, remainingForFreeShipping } from "@/lib/cart";
import { formatGBP } from "@/lib/money";

export function CartDrawer() {
  const { isOpen, closeCart, items, itemCount, subtotal, setQuantity, removeItem } = useCart();
  const remaining = remainingForFreeShipping(subtotal);
  const progress = freeShippingProgress(subtotal);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
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
            <span className="text-sm font-medium text-fg-faint">({itemCount})</span>
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
            <div className="px-5 pt-4">
              <p className="text-xs text-fg-muted">
                {remaining > 0 ? (
                  <>
                    You&apos;re <span className="font-semibold tabular-nums text-brand-200">{formatGBP(remaining)}</span>{" "}
                    away from free shipping.
                  </>
                ) : (
                  <span className="font-semibold text-cyan-300">You&apos;ve unlocked free shipping! 🎉</span>
                )}
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-raised">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#d4af37,#dfc056)] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-3">
                {items.map((item) => {
                  const controlled = isQtyControlled(item);
                  const caption = kitCaption(item);
                  return (
                    <li key={item.id} className="glass flex gap-3 rounded-2xl p-3">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-subtle"
                      >
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1.5" sizes="80px" />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="truncate text-sm font-semibold text-fg hover:text-brand-200"
                          >
                            {item.name}
                          </Link>
                          {controlled ? (
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="shrink-0 text-fg-faint transition-colors hover:text-red-400"
                            >
                              <TrashIcon size={16} />
                            </button>
                          ) : null}
                        </div>
                        {item.format ? <p className="truncate text-xs text-fg-faint">{item.format}</p> : null}
                        {caption ? (
                          <p
                            className={`truncate text-[11px] font-semibold ${
                              item.role === "primary" ? "text-brand-200" : "text-emerald-300"
                            }`}
                          >
                            {caption}
                          </p>
                        ) : null}
                        <div className="mt-auto flex items-center justify-between pt-2">
                          {controlled ? (
                            <div className="inline-flex items-center rounded-full border border-line">
                              <button
                                type="button"
                                aria-label={`Decrease ${item.name} quantity`}
                                className="inline-flex h-8 w-8 items-center justify-center text-fg-muted transition-[transform,color] duration-150 ease-out hover:text-fg active:scale-[0.96]"
                                onClick={() => setQuantity(item.id, item.quantity - 1)}
                              >
                                <MinusIcon size={14} />
                              </button>
                              <span className="w-7 text-center text-sm font-semibold tabular-nums text-fg">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label={`Increase ${item.name} quantity`}
                                className="inline-flex h-8 w-8 items-center justify-center text-fg-muted transition-[transform,color] duration-150 ease-out hover:text-fg active:scale-[0.96]"
                                onClick={() => setQuantity(item.id, item.quantity + 1)}
                              >
                                <PlusIcon size={14} />
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs font-semibold tabular-nums text-fg-muted">× {item.quantity}</span>
                          )}
                          <span className="text-sm font-bold tabular-nums text-fg">
                            {formatGBP(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="border-t border-line px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-fg-muted">Subtotal</span>
                <span className="font-display text-xl font-bold tabular-nums text-fg">{formatGBP(subtotal)}</span>
              </div>
              <p className="mb-3 text-xs text-fg-faint">Shipping & taxes calculated at checkout.</p>
              <ButtonLink
                href="/checkout"
                variant="primary"
                size="lg"
                fullWidth
                className="rounded-xl"
                onClick={closeCart}
              >
                Checkout
              </ButtonLink>
              <button
                type="button"
                className="mt-1 w-full py-2 text-sm font-semibold text-fg-muted transition-colors hover:text-fg"
                onClick={closeCart}
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

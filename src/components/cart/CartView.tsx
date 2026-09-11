"use client";

import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { CartIcon, ChevronRightIcon, MinusIcon, PlusIcon, TrashIcon } from "@/components/icons";
import { useCart } from "@/context/CartContext";
import {
  FREE_SHIPPING_THRESHOLD,
  isQtyControlled,
  kitCaption,
  remainingForFreeShipping,
  shippingGbp,
} from "@/lib/cart";
import { formatGBP } from "@/lib/money";

export function CartView() {
  const { items, itemCount, subtotal, setQuantity, removeItem } = useCart();
  const shipping = shippingGbp(subtotal);
  const remaining = remainingForFreeShipping(subtotal);
  const total = subtotal + shipping;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8 max-lg:pb-28">
      <h1 className="mb-8 font-display text-[clamp(1.9rem,4vw,2.75rem)] font-extrabold text-fg">
        Your Cart{" "}
        {itemCount > 0 ? (
          <span className="text-xl font-medium text-fg-faint">
            · {itemCount} item{itemCount === 1 ? "" : "s"}
          </span>
        ) : null}
      </h1>

      {items.length === 0 ? (
        <div className="glass flex flex-col items-center gap-5 rounded-3xl py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-subtle text-fg-faint">
            <CartIcon size={28} />
          </div>
          <p className="text-fg-muted">Your cart is empty.</p>
          <ButtonLink href="/shop" variant="primary" size="md">
            Browse products
          </ButtonLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
          <ul className="flex flex-col gap-4">
            {items.map((item) => {
              const controlled = isQtyControlled(item);
              const caption = kitCaption(item);
              return (
                <li key={item.id} className="glass flex gap-4 rounded-2xl p-4">
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-subtle"
                  >
                    <Image src={item.image} alt={item.name} fill sizes="96px" className="object-contain p-2" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-display font-bold text-fg hover:text-brand-200"
                        >
                          {item.name}
                        </Link>
                        {item.format ? <p className="text-xs text-fg-faint">{item.format}</p> : null}
                        {caption ? (
                          <p
                            className={`text-[11px] font-semibold ${
                              item.role === "primary" ? "text-brand-200" : "text-emerald-300"
                            }`}
                          >
                            {caption}
                          </p>
                        ) : null}
                      </div>
                      <span className="shrink-0 font-display text-lg font-bold tabular-nums text-fg">
                        {formatGBP(item.price * item.quantity)}
                      </span>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      {controlled ? (
                        <div className="inline-flex items-center rounded-full border border-line">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                            aria-label={`Decrease ${item.name} quantity`}
                            className="inline-flex h-9 w-9 items-center justify-center text-fg-muted transition-[transform,color] duration-150 ease-out hover:text-fg active:scale-[0.96]"
                          >
                            <MinusIcon size={15} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold tabular-nums text-fg">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                            aria-label={`Increase ${item.name} quantity`}
                            className="inline-flex h-9 w-9 items-center justify-center text-fg-muted transition-[transform,color] duration-150 ease-out hover:text-fg active:scale-[0.96]"
                          >
                            <PlusIcon size={15} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm font-semibold tabular-nums text-fg-muted">× {item.quantity}</span>
                      )}
                      {controlled ? (
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="inline-flex items-center gap-1.5 text-xs text-fg-faint transition-colors hover:text-red-400"
                        >
                          <TrashIcon size={15} /> Remove
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-emerald-300">Included in kit</span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass rounded-3xl p-6">
              <h2 className="font-display text-lg font-bold text-fg">Order summary</h2>
              <dl className="mt-5 flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-fg-muted">Subtotal</dt>
                  <dd className="font-semibold tabular-nums text-fg">{formatGBP(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-fg-muted">Shipping</dt>
                  <dd className="font-semibold tabular-nums text-fg">{shipping === 0 ? "Free" : formatGBP(shipping)}</dd>
                </div>
                {subtotal < FREE_SHIPPING_THRESHOLD ? (
                  <p className="text-xs text-brand-200">Add {formatGBP(remaining)} more for free shipping.</p>
                ) : null}
                <div className="divider-glow my-1 h-px w-full" />
                <div className="flex justify-between text-base">
                  <dt className="font-bold text-fg">Total</dt>
                  <dd className="font-display text-xl font-extrabold tabular-nums text-fg">{formatGBP(total)}</dd>
                </div>
              </dl>
              <div className="mt-6">
                <ButtonLink href="/checkout" variant="primary" size="lg" fullWidth className="rounded-full">
                  Checkout <ChevronRightIcon size={16} />
                </ButtonLink>
              </div>
              <Link href="/shop" className="mt-3 block text-center text-xs font-medium text-fg-muted hover:text-fg">
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

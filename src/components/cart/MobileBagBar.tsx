"use client";

import { usePathname } from "next/navigation";
import { CartIcon } from "@/components/icons";
import { useCart } from "@/context/CartContext";
import { formatGBP } from "@/lib/money";

export const MOBILE_BAG_CLEARANCE = "max(5.25rem, calc(4.25rem + env(safe-area-inset-bottom)))";

function isHidden(pathname: string) {
  return (
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/account/orders")
  );
}

export function MobileBagBar() {
  const pathname = usePathname();
  const { itemCount, subtotal, openCart } = useCart();
  if (itemCount === 0 || isHidden(pathname)) return null;

  return (
    <>
      <div className="pointer-events-none lg:hidden" style={{ height: MOBILE_BAG_CLEARANCE }} aria-hidden="true" />
      <div
        className="bar-slide-up fixed inset-x-0 bottom-0 z-[55] p-3 lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        data-mobile-bag-bar
      >
        <button
          type="button"
          onClick={openCart}
          className="flex w-full items-center justify-between gap-3 rounded-full bg-brand-600 px-5 py-3.5 text-fg-on-brand shadow-[0_10px_34px_-6px_rgba(226,89,14,0.6)] transition-transform active:scale-[0.98]"
        >
          <span className="flex items-center gap-2 font-semibold">
            <CartIcon size={18} />
            View bag · {itemCount}
          </span>
          <span className="font-display text-base font-extrabold tabular-nums">{formatGBP(subtotal)}</span>
        </button>
      </div>
    </>
  );
}

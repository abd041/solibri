export const FREE_SHIPPING_THRESHOLD = 75;
export const STANDARD_SHIPPING_GBP = 5.95;

export type CartLineRole = "primary" | "component" | "included";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  format?: string;
  kitLabel?: string;
  kitId?: string;
  role: CartLineRole;
};

export type CartItemInput = CartItem;

export function shippingGbp(subtotal: number) {
  if (subtotal <= 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return STANDARD_SHIPPING_GBP;
}

export function remainingForFreeShipping(subtotal: number) {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
}

export function freeShippingProgress(subtotal: number) {
  return Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
}

export function isQtyControlled(item: CartItem) {
  return item.role === "primary";
}

export function kitCaption(item: CartItem) {
  if (item.role === "included" || item.role === "component") return "Included in kit";
  return item.kitLabel ?? null;
}

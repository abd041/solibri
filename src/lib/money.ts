export function formatGBP(amount: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount);
}

export function toCents(amount: number) {
  return Math.round(amount * 100);
}

export function fromCents(cents: number) {
  return cents / 100;
}

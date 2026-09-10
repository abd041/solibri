import { AFFILIATE_RATE } from "@/data/affiliate";

export function AffiliateCommission() {
  return (
    <div className="reveal glass rounded-3xl border border-line p-8 text-center">
      <h3 className="font-display text-xl font-bold text-fg">
        {AFFILIATE_RATE}% commission · {AFFILIATE_RATE}% customer discount
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
        Every affiliate starts on the same fixed rates. Your referral link applies the customer discount automatically at
        checkout — no code to remember — and your commission is tracked on every paid order.
      </p>
    </div>
  );
}

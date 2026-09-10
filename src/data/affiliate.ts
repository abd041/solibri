export const AFFILIATE_RATE = 5;

export const affiliateSteps = [
  {
    step: 1,
    title: "Share your link",
    description: "Grab your personal referral link and drop it anywhere — socials, a video description, a group chat.",
  },
  {
    step: 2,
    title: "Friends save at checkout",
    description: "Anyone who clicks through gets an automatic discount at checkout — no code to remember or type.",
  },
  {
    step: 3,
    title: "You earn on every paid order",
    description: "Once the order is paid, your commission confirms. Track visits, orders and earnings from this dashboard.",
  },
] as const;

export const affiliateTerms = [
  {
    title: "Commission & earnings",
    items: [
      `Commission is a fixed percentage of the merchandise subtotal (currently ${AFFILIATE_RATE}%) — it excludes shipping and tax.`,
      `Referred customers receive a fixed checkout discount (currently ${AFFILIATE_RATE}%) applied automatically through your link.`,
      "Earnings confirm once the order is paid, and are voided if the order is later refunded or cancelled.",
      "Rates may change prospectively; orders already placed keep the rate that applied when they were referred.",
    ],
  },
  {
    title: "Payouts",
    items: [
      "Request a payout any time your confirmed balance reaches the minimum threshold; every request is reviewed manually before it's paid.",
    ],
  },
  {
    title: "Eligibility & fair use",
    items: [
      "Self-purchases made through your own referral link never qualify for commission.",
      "One affiliate account per person.",
      "Abuse — self-dealing, spam, or misleading claims — leads to suspension and forfeiture of unconfirmed earnings.",
      "Solibri Labs may close the affiliate programme at any time, with notice.",
    ],
  },
] as const;

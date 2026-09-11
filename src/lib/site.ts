export const SITE_ORIGIN = "https://solibrilabs.co.uk";
export const SITE_NAME = "Aurelius Biosciences";

export const brandedOgImage = {
  url: "/brand/shop-banner.jpg",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
} as const;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/updated-logo.png`,
  description:
    "Premium research peptides, batch-tested for purity and precisely kitted for laboratory research.",
} as const;

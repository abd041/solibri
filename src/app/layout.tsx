import type { Metadata, Viewport } from "next";
import { OrganizationJsonLd } from "@/components/OrganizationJsonLd";
import { SiteShell } from "@/components/SiteShell";
import { SITE_ORIGIN } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: "Aurelius Biosciences — Research-Grade Peptides",
  description:
    "Premium research peptides from Aurelius Biosciences. Choose your peptide, then your kit — a Standard Kit with sterile water or a Premium Pen Kit with a disposable injection pen. Batch-tested, precisely dosed.",
  keywords: ["research peptides", "Aurelius Biosciences", "BPC-157", "TB-500", "Ipamorelin", "peptide calculator"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aurelius Biosciences — Research-Grade Peptides",
    description:
      "Premium research peptides. Choose your peptide, then your kit — Standard or Premium Pen. Batch-tested, precisely dosed.",
    siteName: "Aurelius Biosciences",
    type: "website",
    images: [
      {
        url: "/brand/shop-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Aurelius Biosciences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurelius Biosciences — Research-Grade Peptides",
    description: "Premium research peptides. Choose your peptide, then your kit — Standard or Premium Pen.",
    images: ["/brand/shop-banner.jpg"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#070707",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <OrganizationJsonLd />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.solibrilabs.co.uk"),
  title: "Solibri Labs — Research-Grade Peptides",
  description:
    "Premium research peptides from Solibri Labs. Choose your peptide, then your kit — a Standard Kit with sterile water or a Premium Pen Kit with a disposable injection pen. Batch-tested, precisely dosed.",
  keywords: ["research peptides", "Solibri Labs", "BPC-157", "TB-500", "Ipamorelin", "peptide calculator"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Solibri Labs — Research-Grade Peptides",
    description:
      "Premium research peptides. Choose your peptide, then your kit — Standard or Premium Pen. Batch-tested, precisely dosed.",
    siteName: "Solibri Labs",
    type: "website",
    images: [
      {
        url: "/brand/shop-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Solibri Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solibri Labs — Research-Grade Peptides",
    description: "Premium research peptides. Choose your peptide, then your kit — Standard or Premium Pen.",
    images: ["/brand/shop-banner.jpg"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>
          <main className="relative min-h-screen pt-[4.75rem] sm:pt-24 md:pt-28">{children}</main>
        </SiteShell>
      </body>
    </html>
  );
}

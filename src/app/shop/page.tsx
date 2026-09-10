import type { Metadata } from "next";
import { ShopCatalogue } from "@/components/shop/ShopCatalogue";

export const metadata: Metadata = {
  title: "Shop All Products · Solibri Labs",
  description:
    "Browse Solibri Labs' full range of batch-tested, lab-verified research peptides. Filter by category and find your peptide.",
  alternates: {
    canonical: "/shop",
  },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  return <ShopCatalogue initialCategory={params.category} />;
}

import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Cart · Solibri Labs",
  description:
    "Premium research peptides from Solibri Labs. Choose your peptide, then your kit — a Standard Kit with sterile water or a Premium Pen Kit with a disposable injection pen. Batch-tested, precisely dosed.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/cart",
  },
};

export default function CartPage() {
  return <CartView />;
}

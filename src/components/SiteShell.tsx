"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HoneycombBackground } from "@/components/HoneycombBackground";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <HoneycombBackground />
      <Header />
      {children}
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}

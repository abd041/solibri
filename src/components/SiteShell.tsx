"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileBagBar } from "@/components/cart/MobileBagBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HoneycombBackground } from "@/components/HoneycombBackground";
import { NavProgress } from "@/components/NavProgress";

function isAuthPath(pathname: string) {
  return pathname === "/login" || pathname === "/signup" || pathname === "/recover" || pathname.startsWith("/recover/");
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuth = isAuthPath(pathname);

  return (
    <CartProvider>
      <NavProgress />
      {isAuth ? (
        children
      ) : (
        <>
          <HoneycombBackground />
          <Header />
          <main className="relative min-h-screen pt-[4.75rem] sm:pt-24 md:pt-28">{children}</main>
          <Footer />
          <CartDrawer />
          <MobileBagBar />
        </>
      )}
    </CartProvider>
  );
}

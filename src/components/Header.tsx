"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mobileNav, primaryNav, telegramUrl } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import { ButtonLink } from "@/components/Button";
import { CartIcon, SearchIcon, TelegramIcon, UserIcon } from "@/components/icons";

function isNavItemActive(href: string, pathname: string, hash: string) {
  const currentHash = hash.replace(/^#/, "");
  const [path, itemHash] = href.split("#");
  const itemPath = path || "/";

  if (itemHash) {
    return pathname === itemPath && currentHash === itemHash;
  }

  if (itemPath === "/guides") {
    const onGuides = pathname === "/guides" || pathname.startsWith("/guides/");
    if (!onGuides) return false;
    if (pathname === "/guides" && currentHash === "faq") return false;
    return true;
  }

  if (pathname !== itemPath) return false;
  if (itemPath === "/" && currentHash === "calculator") return false;
  return true;
}

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart, cartPulse } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");
  const [underline, setUnderline] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLElement>(null);
  const cartLabel = `Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`;

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const active = nav.querySelector<HTMLElement>("[data-active='true']");
    if (!active) {
      setUnderline((u) => ({ ...u, opacity: 0 }));
      return;
    }
    const navBox = nav.getBoundingClientRect();
    const box = active.getBoundingClientRect();
    setUnderline({
      left: box.left - navBox.left + 8,
      width: Math.max(box.width - 16, 12),
      opacity: 1,
    });
  }, [pathname, hash]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[70] flex flex-col items-center px-2.5 pt-3 sm:px-4 lg:px-5">
        <div
          className={`navbar-pill pointer-events-auto relative grid h-14 w-full max-w-[1320px] grid-cols-[auto_1fr_auto] items-center gap-1.5 rounded-full px-2.5 transition-all duration-300 ease-[var(--ease-smooth)] sm:px-3.5 lg:flex lg:w-[min(98%,1320px)] lg:justify-between lg:gap-2 lg:px-4 ${
            scrolled ? "navbar-pill--scrolled" : "navbar-pill--rest"
          }`}
        >
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-subtle lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span
                className={`absolute block h-[1.5px] w-4 rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "translate-y-0 rotate-45" : "-translate-y-[5px]"
                }`}
              />
              <span
                className={`absolute block h-[1.5px] w-3 rounded-full bg-current transition-all duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute block h-[1.5px] w-4 rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[5px]"
                }`}
              />
            </span>
          </button>

          <div className="flex justify-center lg:justify-start lg:shrink-0">
            <Link aria-label="Solibri Labs — home" className="inline-flex shrink-0" href="/" onClick={() => setHash("")}>
              <Image
                src="/brand/solibri-shield-logo.png"
                alt="Solibri Labs"
                width={140}
                height={36}
                className="h-9 w-auto shrink-0"
                priority
              />
            </Link>
          </div>

          <nav
            ref={navRef}
            className="relative hidden min-w-0 flex-1 items-center justify-center gap-0 lg:flex"
            aria-label="Primary"
          >
            {primaryNav.map((item) => {
              const active = isNavItemActive(item.href, pathname, hash);
              return (
                <Link
                  key={item.href + item.label}
                  data-active={active}
                  className={`relative whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] font-semibold tracking-wide transition-colors duration-200 xl:px-2.5 xl:text-[12px] ${
                    active ? "text-brand-400" : "text-fg-muted hover:bg-surface-subtle hover:text-fg"
                  }`}
                  href={item.href}
                  onClick={() => {
                    const nextHash = item.href.includes("#") ? `#${item.href.split("#")[1]}` : "";
                    setHash(nextHash);
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            <span
              className="pointer-events-none absolute bottom-0.5 h-[2px] rounded-full bg-brand-500 transition-[left,width,opacity] duration-300 ease-[var(--ease-smooth)]"
              style={underline}
            />
          </nav>

          <button
            type="button"
            aria-label={cartLabel}
            className={`relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface-subtle hover:text-fg lg:hidden ${
              cartPulse ? "cart-pop" : ""
            }`}
            onClick={openCart}
          >
            <CartIcon size={18} />
            {itemCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-fg-on-brand">
                {itemCount}
              </span>
            ) : null}
          </button>

          <div className="nav-cut-rail hidden lg:flex" role="group" aria-label="Quick actions">
            <Link aria-label="Search products" className="nav-cut-seg" href="/shop">
              <span className="nav-cut-inner">
                <SearchIcon size={16} />
              </span>
            </Link>
            <Link aria-label="Sign in" className="nav-cut-seg" href="/login">
              <span className="nav-cut-inner">
                <UserIcon size={18} />
              </span>
            </Link>
            <a href={telegramUrl} className="nav-cut-seg">
              <span className="nav-cut-inner gap-1.5 text-[11px] font-semibold">
                <TelegramIcon size={14} />
                Join
              </span>
            </a>
            <button type="button" aria-label={cartLabel} className="nav-cut-seg nav-cut-seg--brand" onClick={openCart}>
              <span className={`nav-cut-inner gap-1.5 text-[11px] font-bold tracking-wide ${cartPulse ? "cart-pop" : ""}`}>
                <CartIcon size={16} />
                <span className="leading-none">Cart</span>
                {itemCount > 0 ? <span className="leading-none tabular-nums opacity-90">{itemCount}</span> : null}
              </span>
            </button>
          </div>
        </div>

        <div
          className={`mt-2 w-full max-w-[1320px] lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex max-h-[min(78vh,560px)] flex-col gap-1.5 overflow-y-auto pb-2">
            {mobileNav.map((item, index) => {
              const active = isNavItemActive(item.href, pathname, hash);
              return (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  onClick={() => {
                    const nextHash = item.href.includes("#") ? `#${item.href.split("#")[1]}` : "";
                    setHash(nextHash);
                    setMenuOpen(false);
                  }}
                  className={`mobile-nav-pill relative flex cursor-pointer items-center justify-between rounded-full px-5 py-3 text-[13px] font-semibold tracking-wide ${
                    active ? "mobile-nav-pill--active" : "mobile-nav-pill--default text-fg-muted"
                  }`}
                  style={{
                    transitionProperty: "opacity, transform",
                    transitionDuration: "320ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    transitionDelay: `${index * 28}ms`,
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
                  }}
                >
                  <span className={active ? "text-brand-400" : ""}>{item.label}</span>
                  {active ? <span className="relative z-10 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" /> : null}
                </Link>
              );
            })}
            <div
              className="mt-1 grid gap-1.5 border-t border-line pt-3"
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "320ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "224ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
              }}
            >
              <a
                href={telegramUrl}
                className="mobile-nav-pill mobile-nav-pill--default flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-[13px] font-semibold text-fg"
              >
                <TelegramIcon size={14} />
                Join Telegram
              </a>
              <ButtonLink href="/shop" variant="primary" size="lg" className="w-full" onClick={() => setMenuOpen(false)}>
                Shop All Products
              </ButtonLink>
              <div className="grid grid-cols-2 gap-1.5">
                <Link
                  className="mobile-nav-pill mobile-nav-pill--default flex min-h-12 items-center justify-center rounded-full px-4 text-[13px] font-semibold text-fg-muted"
                  href="/login"
                >
                  Sign in
                </Link>
                <Link
                  className="mobile-nav-pill mobile-nav-pill--active flex min-h-12 items-center justify-center rounded-full px-4 text-[13px] font-semibold text-brand-400"
                  href="/signup"
                >
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`overlay-backdrop fixed inset-0 z-[60] transition-opacity duration-400 lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />
    </>
  );
}

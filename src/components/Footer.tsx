"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { footerCompany, footerShop, footerSupport } from "@/data/navigation";
import { FeatherIcon, FlaskIcon, ShieldCheckIcon, TruckIcon } from "@/components/icons";

const trustItems = [
  { label: "Batch-tested", icon: <FlaskIcon size={18} /> },
  { label: "Lab-verified purity", icon: <ShieldCheckIcon size={18} /> },
  { label: "Premium kitting", icon: <FeatherIcon size={18} /> },
  { label: "Discreet UK dispatch", icon: <TruckIcon size={18} /> },
];

export function Footer() {
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <footer className="relative mt-24 border-t border-line bg-ink-800">
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-line bg-ink-700 px-4 py-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                {item.icon}
              </span>
              <span className="text-[12.5px] font-medium text-fg-muted">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link aria-label="Aurelius Biosciences — home" className="inline-flex shrink-0" href="/">
              <Image
                src="/updated-logo.png"
                alt="Aurelius Biosciences"
                width={1254}
                height={1254}
                className="h-9 w-auto shrink-0"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              Premium research peptides, batch-tested for purity and precisely kitted. Choose your peptide, then your kit
              — a Standard Kit with sterile water or a Premium Pen Kit.
            </p>
            <form className="mt-6 flex max-w-sm items-center gap-2" onSubmit={onSubmit}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                aria-label="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="h-11 flex-1 rounded-full border border-line bg-surface-subtle px-4 text-sm text-fg placeholder:text-fg-faint focus:border-brand-400/50 focus:outline-none"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-full bg-brand-600 px-5 text-sm font-semibold text-fg-on-brand transition-colors hover:bg-brand-500"
              >
                Join
              </button>
            </form>
          </div>
          <nav aria-label="Shop">
            <h3 className="kicker mb-4">Shop</h3>
            <ul className="flex flex-col gap-2.5">
              {footerShop.map((link) => (
                <li key={link.label}>
                  <Link className="text-sm text-fg-muted transition-colors hover:text-fg" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h3 className="kicker mb-4">Company</h3>
            <ul className="flex flex-col gap-2.5">
              {footerCompany.map((link) => (
                <li key={link.label}>
                  <Link className="text-sm text-fg-muted transition-colors hover:text-fg" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Support">
            <h3 className="kicker mb-4">Support</h3>
            <ul className="flex flex-col gap-2.5">
              {footerSupport.map((link) => (
                <li key={link.label}>
                  <Link className="text-sm text-fg-muted transition-colors hover:text-fg" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 h-px w-full bg-line" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-fg-muted">© 2026 Aurelius Biosciences. All rights reserved.</p>
          <p className="max-w-2xl text-[11px] leading-relaxed text-fg-muted">
            Products are supplied for laboratory and research purposes only. Not for human or veterinary use, and not
            intended to diagnose, treat, cure or prevent any condition.
          </p>
          <div className="flex gap-4 text-xs text-fg-muted">
            <Link className="hover:text-fg" href="/about">
              Privacy
            </Link>
            <Link className="hover:text-fg" href="/about">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

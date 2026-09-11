import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export const AUTH_FIELD_CLASS =
  "w-full rounded-lg border border-line bg-surface-subtle px-3 py-2.5 text-sm text-fg placeholder:text-fg-muted focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-ink-800 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Link aria-label="Solibri Labs — home" href="/" className="inline-flex shrink-0">
            <Image
              src="/brand/solibri-shield-logo.png"
              alt=""
              aria-hidden={true}
              width={766}
              height={832}
              className="h-12 w-auto shrink-0"
              priority
            />
          </Link>
        </div>
        <div className="rounded-2xl border border-line bg-surface-subtle p-6">
          <h1 className="font-display text-xl font-extrabold text-fg">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-fg-muted">{subtitle}</p> : null}
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </main>
  );
}

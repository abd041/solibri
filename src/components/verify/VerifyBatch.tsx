"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";
import { CheckIcon, ShieldCheckIcon } from "@/components/icons";
import { Turnstile } from "@/components/verify/Turnstile";
import { verifyProductCode, type VerifyResult } from "@/lib/verify";

export function VerifyBatch() {
  const [code, setCode] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed || !token) return;
    startTransition(async () => {
      setResult(null);
      const next = await verifyProductCode({ code: trimmed });
      setResult(next);
      setToken(null);
    });
  }

  return (
    <div className="mx-auto max-w-xl">
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your code, e.g. SOLIBRI-A1B2C3D4"
            aria-label="Product authenticity code"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="min-h-12 flex-1 rounded-full border border-line bg-surface-subtle px-5 font-mono text-sm text-fg placeholder:text-fg-faint focus:border-brand-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={pending || code.trim().length === 0 || !token}
            className="min-h-12 rounded-full bg-brand-500 px-6 text-sm font-semibold text-fg-on-brand hover:bg-brand-400 disabled:opacity-50"
          >
            {pending ? "Checking…" : "Verify"}
          </button>
        </div>
        <Turnstile onToken={setToken} />
      </form>
      <div aria-live="polite" className="mt-6">
        {result?.ok ? (
          <div className="flex items-center gap-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-subtle">
              <Image src={result.product.image} alt={result.product.name} fill sizes="80px" className="object-contain" />
            </div>
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-sm font-bold text-emerald-500">
                <CheckIcon size={16} /> Authentic product
              </p>
              <p className="mt-0.5 truncate font-display text-lg font-bold text-fg">{result.product.name}</p>
              {result.product.tagline ? <p className="truncate text-sm text-fg-muted">{result.product.tagline}</p> : null}
              {result.product.active ? (
                <Link
                  href={`/product/${result.product.slug}`}
                  className="mt-1 inline-block text-sm font-semibold text-brand-300 hover:text-brand-200"
                >
                  View product →
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
        {result && !result.ok ? (
          <div className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-5">
            <p className="text-sm font-bold text-amber-500">We couldn&apos;t verify this code</p>
            <p className="mt-1 text-sm text-fg-muted">
              Double-check for typos — codes are case-sensitive. If it still won&apos;t verify, this may not be a genuine
              Solibri Labs product. Contact support and we&apos;ll help.
            </p>
          </div>
        ) : null}
      </div>
      <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-fg-faint">
        <ShieldCheckIcon size={13} /> Every genuine Solibri Labs product carries a unique verification code.
      </p>
    </div>
  );
}

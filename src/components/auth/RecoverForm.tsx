"use client";

import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";
import { Turnstile } from "@/components/verify/Turnstile";
import { AUTH_FIELD_CLASS, AuthLayout } from "@/components/auth/AuthLayout";

export function RecoverForm() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!token) {
      setError("Please complete the security check.");
      return;
    }
    startTransition(() => {
      setToken(null);
      setCaptchaKey((key) => key + 1);
      setError("Something went wrong. Please try again.");
    });
  }

  return (
    <AuthLayout title="Reset your password" subtitle="We'll email you a reset link.">
      <form className="space-y-4" onSubmit={onSubmit}>
        {error ? (
          <p role="alert" className="rounded-lg border border-red-500/40 bg-red-950/60 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        ) : null}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-fg">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={AUTH_FIELD_CLASS}
          />
        </div>
        <Turnstile key={captchaKey} onToken={setToken} />
        <button
          type="submit"
          disabled={pending || !token}
          className="min-h-11 w-full rounded-full bg-brand-500 px-5 text-sm font-semibold text-fg-on-brand hover:bg-brand-400 disabled:opacity-50"
        >
          {pending ? "Sending…" : "Send reset link"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-fg-muted">
        <Link href="/login" className="font-semibold text-brand-300 hover:text-fg">
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

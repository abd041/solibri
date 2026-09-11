"use client";

import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";
import { Turnstile } from "@/components/verify/Turnstile";
import { AUTH_FIELD_CLASS, AuthLayout } from "@/components/auth/AuthLayout";

export function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <AuthLayout title="Create your account" subtitle="Join Aurelius Biosciences.">
      <form className="space-y-4" onSubmit={onSubmit}>
        {error ? (
          <p role="alert" className="rounded-lg border border-red-500/40 bg-red-950/60 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        ) : null}
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-fg">
            Full name
          </label>
          <input
            id="fullName"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={AUTH_FIELD_CLASS}
          />
        </div>
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
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-fg">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={12}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={AUTH_FIELD_CLASS}
          />
          <p className="mt-1 text-xs text-fg-muted">At least 12 characters.</p>
        </div>
        <Turnstile key={captchaKey} onToken={setToken} />
        <button
          type="submit"
          disabled={pending || !token}
          className="min-h-11 w-full rounded-full bg-brand-500 px-5 text-sm font-semibold text-fg-on-brand hover:bg-brand-400 disabled:opacity-50"
        >
          {pending ? "Creating…" : "Create account"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-fg-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-300 hover:text-fg">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

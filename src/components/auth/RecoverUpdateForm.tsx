"use client";

import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";
import { AUTH_FIELD_CLASS, AuthLayout } from "@/components/auth/AuthLayout";

export function RecoverUpdateForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const hasRecoverySession = false;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    startTransition(() => {
      setError("Something went wrong. Please try again.");
    });
  }

  return (
    <AuthLayout title="Choose a new password" subtitle="Almost done.">
      {hasRecoverySession ? (
        <form className="space-y-4" onSubmit={onSubmit}>
          {error ? (
            <p role="alert" className="rounded-lg border border-red-500/40 bg-red-950/60 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          ) : null}
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-fg">
              New password
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
          <button
            type="submit"
            disabled={pending}
            className="min-h-11 w-full rounded-full bg-brand-500 px-5 text-sm font-semibold text-fg-on-brand hover:bg-brand-400 disabled:opacity-50"
          >
            {pending ? "Updating…" : "Update password"}
          </button>
        </form>
      ) : (
        <p className="text-sm text-fg-muted">
          Open this page from the reset link in your email. If you got here directly, request a new link on the{" "}
          <Link href="/recover" className="text-brand-300 hover:text-fg">
            reset page
          </Link>
          .
        </p>
      )}
    </AuthLayout>
  );
}

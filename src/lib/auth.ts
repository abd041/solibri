import type { Metadata } from "next";
import { redirect } from "next/navigation";

/** Allow only same-origin relative paths from the `next` query param. */
export function safeNextPath(value: string | null): string | null {
  if (!value || !value.startsWith("/")) return null;
  try {
    const url = new URL(value, "https://internal.local");
    if (url.origin !== "https://internal.local" || url.pathname.startsWith("//")) return null;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

export const gatedPageMetadata: Metadata = {
  title: "Solibri Labs — Research-Grade Peptides",
  robots: {
    index: false,
    follow: false,
  },
};

/** Server-side login gate. Never renders a dashboard. */
export function redirectToLogin(nextPath: string): never {
  const safe = safeNextPath(nextPath);
  redirect(safe ? `/login?next=${encodeURIComponent(safe)}` : "/login");
}

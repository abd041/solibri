"use client";

import { useEffect, useId, useRef } from "react";

const SCRIPT_ID = "cf-turnstile-api";
const SITE_KEY = "1x00000000000000000000AA";

let scriptPromise: Promise<void> | null = null;

function loadTurnstile() {
  if (typeof window !== "undefined" && window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Turnstile failed to load")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Turnstile failed to load"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      theme: "dark" | "light";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function Turnstile({ onToken, className = "" }: { onToken: (token: string | null) => void; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const uid = useId();
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!hostRef.current) return;
    let cancelled = false;

    loadTurnstile()
      .then(() => {
        if (cancelled || !hostRef.current || !window.turnstile) return;
        if (widgetRef.current) {
          try {
            window.turnstile.remove(widgetRef.current);
          } catch {}
          widgetRef.current = null;
        }
        hostRef.current.innerHTML = "";
        widgetRef.current = window.turnstile.render(hostRef.current, {
          sitekey: SITE_KEY,
          theme: "dark",
          callback: (token) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(null),
          "error-callback": () => onTokenRef.current(null),
        });
      })
      .catch(() => onTokenRef.current(null));

    return () => {
      cancelled = true;
      if (widgetRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetRef.current);
        } catch {}
        widgetRef.current = null;
      }
    };
  }, [uid]);

  return <div className={`flex justify-center overflow-hidden ${className}`.trim()} ref={hostRef} data-turnstile={uid} />;
}

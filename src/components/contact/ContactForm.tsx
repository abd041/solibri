"use client";

import { FormEvent, useState, useTransition } from "react";
import { Button } from "@/components/Button";
import { CheckIcon } from "@/components/icons";
import { Turnstile } from "@/components/verify/Turnstile";
import { CONTACT_SUBJECTS, submitContact, type ContactSubject } from "@/lib/contact";

const fieldClass =
  "h-12 rounded-xl border border-line bg-surface-subtle px-4 text-sm text-fg placeholder:text-fg-faint focus:border-brand-400/50 focus:outline-none";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<ContactSubject>("general");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function resetForm() {
    setName("");
    setEmail("");
    setSubject("general");
    setMessage("");
    setToken(null);
    setError(null);
    setSent(false);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!token) {
      setError("Please complete the security check.");
      return;
    }
    startTransition(async () => {
      const result = await submitContact({
        name: name.trim(),
        email: email.trim(),
        subject,
        message: message.trim(),
        turnstileToken: token,
      });
      if (result.ok) {
        setSent(true);
      } else {
        setError(result.error);
      }
      setToken(null);
    });
  }

  if (sent) {
    return (
      <div className="glass-strong flex flex-col items-center gap-4 rounded-3xl p-8 text-center sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-400/15 text-brand-300 shadow-[0_0_30px_-4px_rgba(226,89,14,0.8)]">
          <CheckIcon size={26} />
        </span>
        <h3 className="font-display text-xl font-extrabold text-fg">Message sent</h3>
        <p className="max-w-sm text-sm leading-relaxed text-fg-muted">
          Thanks for reaching out — our team will get back to you within one business day.
        </p>
        <Button type="button" variant="outline" onClick={resetForm}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className="glass rounded-3xl p-6 sm:p-8" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-fg-muted">Name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-fg-muted">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-fg-muted">Subject</span>
          <select
            name="subject"
            disabled={pending}
            value={subject}
            onChange={(e) => setSubject(e.target.value as ContactSubject)}
            className={`${fieldClass} appearance-none`}
          >
            {CONTACT_SUBJECTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-fg-muted">Message</span>
          <textarea
            name="message"
            required
            placeholder="How can we help?"
            disabled={pending}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[140px] resize-y rounded-xl border border-line bg-surface-subtle px-4 py-3 text-sm text-fg placeholder:text-fg-faint focus:border-brand-400/50 focus:outline-none"
          />
        </label>
      </div>
      {error ? (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-4">
        <Turnstile onToken={setToken} />
      </div>
      <div className="mt-6">
        <Button type="submit" size="lg" fullWidth disabled={pending || !token}>
          {pending ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

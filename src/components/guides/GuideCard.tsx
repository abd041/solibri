import Link from "next/link";
import type { GuideCardItem } from "@/data/guides";

export function GuideCard({ title, description, href }: GuideCardItem) {
  return (
    <Link
      href={href}
      className="glass block h-full rounded-2xl border border-line p-5 transition hover:border-brand-400/50"
    >
      <h2 className="font-display text-lg font-bold text-fg">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{description}</p>
    </Link>
  );
}

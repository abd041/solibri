import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold select-none whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 ease-[var(--ease-smooth)] active:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900";

const variants = {
  primary: "text-fg-on-brand bg-brand-600 hover:bg-brand-700",
  primaryHover500: "text-fg-on-brand bg-brand-600 hover:bg-brand-500",
  outline: "text-fg bg-transparent border border-line-strong hover:bg-surface-subtle",
} as const;

const sizes = {
  lg: "h-[3.25rem] px-8 text-[15px]",
  md: "h-12 px-7 text-[14px]",
  sm: "h-10 px-5 text-[13px]",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth,
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "outline",
  size = "sm",
  className = "",
  ...props
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Link>
  );
}

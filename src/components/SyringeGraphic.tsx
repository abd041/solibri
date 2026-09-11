"use client";

import { useId } from "react";

const ZERO_X = 230;
const MAX_X = 1010;
const MAX_UNITS = 100;
const UNIT_STEP = (MAX_X - ZERO_X) / MAX_UNITS;
const LIQUID_X0 = 220;
const LIQUID_MAX_WIDTH = MAX_X - LIQUID_X0;

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function SyringeGraphic({
  units,
  overflow = false,
}: {
  units: number | null;
  overflow?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const gid = (name: string) => `syr-${uid}-${name}`;

  const raw = units == null ? 0 : Math.max(units, 0);
  const drawn = overflow ? MAX_UNITS : Math.min(raw, MAX_UNITS);
  const fillScale = Math.max(0, (ZERO_X + drawn * UNIT_STEP - LIQUID_X0) / LIQUID_MAX_WIDTH);
  const unitsLabel = units == null ? null : raw % 1 ? raw.toFixed(1) : String(Math.round(raw));

  const ariaLabel =
    units == null
      ? "Insulin syringe diagram — enter your values to see the draw level"
      : overflow
        ? `Insulin syringe full at 100 units — calculated draw is ${unitsLabel} units, which exceeds the barrel`
        : `Insulin syringe drawn to ${unitsLabel} of ${MAX_UNITS} units`;

  const ticks = Array.from({ length: MAX_UNITS / 2 + 1 }, (_, i) => {
    const mark = i * 2;
    const kind = mark % 10 === 0 ? "major" : mark % 5 === 0 ? "mid" : "minor";
    return { mark, x: ZERO_X + mark * UNIT_STEP, kind };
  });

  return (
    <figure className="m-0 w-full">
      <div
        className={cn(
          "syringe-stage relative mx-auto w-full max-w-[640px]",
          overflow && "rounded-lg ring-2 ring-amber-500/50 ring-offset-2 ring-offset-transparent",
        )}
        style={{ aspectRatio: "1200 / 168" }}
      >
        <svg
          viewBox="0 0 1200 168"
          role="img"
          aria-label={ariaLabel}
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={gid("barrel")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5c5c5c" />
              <stop offset="10%" stopColor="#cfcfcf" />
              <stop offset="28%" stopColor="#f7f7f7" />
              <stop offset="45%" stopColor="#ffffff" />
              <stop offset="58%" stopColor="#d8d8d8" />
              <stop offset="75%" stopColor="#9a9a9a" />
              <stop offset="90%" stopColor="#6a6a6a" />
              <stop offset="100%" stopColor="#3a3a3a" />
            </linearGradient>
            <linearGradient id={gid("barrelEdge")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2e2e2e" />
              <stop offset="50%" stopColor="#8a8a8a" />
              <stop offset="100%" stopColor="#1e1e1e" />
            </linearGradient>
            <linearGradient id={gid("hub")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ead48a" />
              <stop offset="18%" stopColor="#d8b84a" />
              <stop offset="45%" stopColor="#d4af37" />
              <stop offset="72%" stopColor="#a68622" />
              <stop offset="100%" stopColor="#7a6418" />
            </linearGradient>
            <linearGradient id={gid("hubShine")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={gid("liquid")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0dc9a" stopOpacity="0.95" />
              <stop offset="18%" stopColor="#e0c25c" stopOpacity="0.92" />
              <stop offset="48%" stopColor="#d4af37" stopOpacity="0.9" />
              <stop offset="78%" stopColor="#a68622" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#6b5714" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id={gid("liquidEdge")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="88%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id={gid("seal")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a4542" />
              <stop offset="30%" stopColor="#2a2624" />
              <stop offset="70%" stopColor="#1a1816" />
              <stop offset="100%" stopColor="#0e0d0c" />
            </linearGradient>
            <linearGradient id={gid("steel")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a0a0a0" />
              <stop offset="40%" stopColor="#e8e8e8" />
              <stop offset="100%" stopColor="#707070" />
            </linearGradient>
            <linearGradient id={gid("plastic")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d0d0d0" />
              <stop offset="35%" stopColor="#f2f2f2" />
              <stop offset="65%" stopColor="#b8b8b8" />
              <stop offset="100%" stopColor="#808080" />
            </linearGradient>
            <linearGradient id={gid("rod")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b8b8b8" />
              <stop offset="40%" stopColor="#ececec" />
              <stop offset="100%" stopColor="#8a8a8a" />
            </linearGradient>
            <filter id={gid("softShadow")} x="-6%" y="-40%" width="112%" height="180%">
              <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
            </filter>
            <clipPath id={gid("bore")}>
              <rect x="210" y="31" width="836" height="106" rx="12" />
            </clipPath>
          </defs>
          <rect x="8" y="82.2" width="88" height="3.6" rx="1" fill={`url(#${gid("steel")})`} />
          <polygon points="8,84 20,82.2 20,85.8" fill="#d8d8d8" />
          <g filter={`url(#${gid("softShadow")})`}>
            <path
              d="M 94 78 L 148 62 L 168 58 L 212 58 L 212 110 L 168 110 L 148 106 L 94 90 Z"
              fill={`url(#${gid("hub")})`}
            />
            <path d="M 102 79 L 148 65 L 208 62 L 208 70 L 148 73 L 102 83 Z" fill={`url(#${gid("hubShine")})`} />
            <rect x="168" y="58" width="4" height="52" fill="#000" opacity="0.18" />
          </g>
          <rect x="1054" y="74" width="94" height="20" rx="3" fill={`url(#${gid("plastic")})`} />
          <g filter={`url(#${gid("softShadow")})`}>
            <rect
              x="208"
              y="28"
              width="840"
              height="112"
              rx="14"
              fill={`url(#${gid("barrel")})`}
              stroke={`url(#${gid("barrelEdge")})`}
              strokeWidth="1.5"
              opacity="0.92"
            />
          </g>
          <g clipPath={`url(#${gid("bore")})`}>
            <rect x="246" y="76" width="790" height="16" rx="3" fill={`url(#${gid("rod")})`} opacity="0.85" />
            {drawn > 0.05 ? (
              <g
                className="syringe-anim"
                style={{
                  transform: `scaleX(${fillScale})`,
                  transformOrigin: "220px 84px",
                  transformBox: "view-box",
                }}
              >
                <rect x="220" y="34" width="790" height="100" fill={`url(#${gid("liquid")})`} />
                <rect x="220" y="34" width="790" height="100" fill={`url(#${gid("liquidEdge")})`} />
                <rect x="1000" y="38" width="10" height="92" fill="#fff" opacity="0.22" />
              </g>
            ) : null}
            <g
              className="syringe-anim"
              style={{
                transform: `translateX(${drawn * UNIT_STEP}px)`,
                transformBox: "view-box",
              }}
            >
              <rect x="228" y="32" width="18" height="104" rx="4" fill={`url(#${gid("seal")})`} />
              <rect x="232" y="38" width="3" height="92" rx="1" fill="#5a5552" />
              <rect x="238" y="38" width="3" height="92" rx="1" fill="#5a5552" />
              <rect x="231" y="40" width="4" height="88" fill="#fff" opacity="0.12" />
            </g>
          </g>
          <rect x="220" y="34" width="812" height="11" rx="5.5" fill="#ffffff" opacity="0.32" />
          <rect x="226" y="124" width="800" height="5" rx="2.5" fill="#000000" opacity="0.14" />
          <g stroke="#141414" strokeLinecap="round">
            {ticks.map((tick) => {
              const height = tick.kind === "major" ? 48 : tick.kind === "mid" ? 34 : 20;
              const width = tick.kind === "major" ? 2.4 : tick.kind === "mid" ? 1.8 : 1.2;
              return (
                <line
                  key={tick.mark}
                  x1={tick.x}
                  y1="46"
                  x2={tick.x}
                  y2={46 + height}
                  strokeWidth={width}
                />
              );
            })}
          </g>
          <g fill="#141414" fontFamily="Arial, Helvetica, sans-serif" fontSize="26" fontWeight="700" textAnchor="middle">
            {ticks
              .filter((tick) => tick.kind === "major" && tick.mark > 0)
              .map((tick) => (
                <text key={tick.mark} x={tick.x} y="78">
                  {tick.mark}
                </text>
              ))}
          </g>
          <rect
            x="1036"
            y="18"
            width="24"
            height="132"
            rx="6"
            fill={`url(#${gid("plastic")})`}
            stroke="#6a6a6a"
            strokeWidth="1"
          />
          <rect
            x="1144"
            y="56"
            width="44"
            height="56"
            rx="8"
            fill={`url(#${gid("plastic")})`}
            stroke="#6a6a6a"
            strokeWidth="1"
          />
          <rect x="1150" y="62" width="8" height="44" rx="3" fill="#fff" opacity="0.25" />
        </svg>
      </div>
      <figcaption
        className={cn(
          "mt-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.16em] sm:mt-3",
          overflow ? "text-amber-400/90" : "text-fg-faint",
        )}
      >
        {overflow && unitsLabel ? `Exceeds 100 units — calculated ${unitsLabel} units` : "Insulin syringe (100 units)"}
      </figcaption>
    </figure>
  );
}

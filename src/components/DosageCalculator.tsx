"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  DEFAULT_CALCULATOR_VALUES,
  formatQty,
  resolveCalculatorResult,
  type CalculatorResult,
} from "@/lib/calculator";
import { ChartIcon, DropletIcon, FlaskIcon, ShieldCheckIcon, SyringeIcon } from "@/components/icons";
import { SyringeGraphic } from "@/components/SyringeGraphic";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function HelpTip({ label }: { label: string }) {
  return (
    <span
      title={label}
      className="inline-flex h-4 w-4 shrink-0 cursor-help items-center justify-center rounded-full border border-brand-500/40 text-[10px] font-bold text-brand-400"
      aria-label={label}
    >
      ?
    </span>
  );
}

function Field({
  id,
  label,
  hint,
  unit,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  unit: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <label htmlFor={id} className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-muted">
          {label}
        </label>
        <HelpTip label={hint} />
      </div>
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full rounded-xl border border-line bg-surface-subtle pl-4 pr-14 text-sm text-fg placeholder:text-fg-faint focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400/50"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-semibold uppercase tracking-wide text-fg-faint"
        >
          {unit}
        </span>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  hint,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div className="flex items-center gap-2 text-brand-500">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/10">{icon}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">{label}</span>
      </div>
      <p className="font-display text-lg font-bold leading-tight tabular-nums text-fg sm:text-xl">{value}</p>
      {hint ? <p className="text-xs text-fg-muted">{hint}</p> : null}
    </div>
  );
}

function LimitCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1 rounded-lg border border-amber-500/25 bg-amber-500/5 px-4 py-3">
      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-400/80">{label}</span>
      <p className="font-display text-xl font-bold tabular-nums text-amber-50">
        {value}
        <span className="ml-1 text-sm font-semibold text-amber-200/70">{unit}</span>
      </p>
    </div>
  );
}

function ResultAlerts({ result }: { result: CalculatorResult }) {
  if (!result.valid) return null;

  if (result.doseExceedsPeptide) {
    return (
      <div
        role="alert"
        className="mt-5 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/6 px-4 py-3.5"
      >
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-xs font-bold text-red-400">
          !
        </span>
        <div className="min-w-0 text-sm leading-relaxed">
          <p className="font-semibold text-red-200">Dose exceeds vial amount</p>
          <p className="mt-0.5 text-red-300/80">Lower the desired dose to match the peptide in your vial.</p>
        </div>
      </div>
    );
  }

  if (!result.exceedsSyringe) return null;

  const draw = formatQty(result.drawVolumeMl, 2);
  const units = formatQty(result.insulinUnits, 0);
  const maxDose = formatQty(result.maxDoseMgForSyringe, 2);
  const maxWater = formatQty(result.maxBacWaterMlForSyringe, 1);

  return (
    <div role="alert" className="mt-5 rounded-lg border border-amber-500/30 bg-amber-500/6 px-4 py-4 sm:px-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-xs font-bold text-amber-400">
          !
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-amber-100">
            Exceeds 100-unit syringe
            <span className="ml-2 font-normal tabular-nums text-amber-300/70">
              ({draw} ml · {units} units)
            </span>
          </p>
          <p className="mt-1 text-xs leading-relaxed text-amber-200/60">
            Less water concentrates the solution and reduces draw volume.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
        <LimitCard label="Max BAC water" value={`≤ ${maxWater}`} unit="ml" />
        <LimitCard label="Max dose" value={`≤ ${maxDose}`} unit="mg" />
      </div>
    </div>
  );
}

function CalculatorResults({ result }: { result: CalculatorResult }) {
  const draw = formatQty(result.drawVolumeMl, 2);
  const units = formatQty(result.insulinUnits, 1);
  const concentration = result.valid ? `${formatQty(result.concentrationMgPerMl, 1)} mg / ml` : "—";
  const mlPerUnit = formatQty(result.mlPerUnit, 2);
  const mlPerMg = formatQty(result.mlPerMg, 2);
  const unitsPerMg = formatQty(result.unitsPerMg, 1);
  const totalDoses = formatQty(result.totalDoses, 1);
  const warned = result.valid && (result.exceedsSyringe || result.doseExceedsPeptide);

  return (
    <div className="mt-8 border-t border-line pt-8">
      <div
        className={cn(
          "rounded-xl border bg-surface-subtle/30 p-5 sm:p-6",
          warned ? "border-amber-500/35" : "border-line/80",
        )}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-500">
          Draw this amount on insulin syringe
        </p>
        <div className="mt-5 grid grid-cols-1 items-center gap-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-6 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-8">
          <div className="shrink-0 text-center md:text-left">
            <p className="sr-only">Syringe draw amount</p>
            <p
              className={cn(
                "font-display text-[clamp(2.5rem,5vw,3rem)] font-extrabold leading-none tabular-nums",
                warned ? "text-amber-200" : "text-fg",
              )}
            >
              <span className="inline-block min-w-[5ch]">{draw}</span>
              <span className="ml-1.5 text-[clamp(1rem,2.4vw,1.35rem)] font-bold text-fg-muted">ml</span>
            </p>
            <p
              className={cn(
                "mt-1.5 text-lg font-semibold tabular-nums",
                warned ? "text-amber-400" : "text-brand-400",
              )}
            >
              <span className="inline-block min-w-[4ch]">{units}</span>
              <span className="ml-1 text-sm font-medium opacity-80">units</span>
            </p>
          </div>
          <div className="min-w-0">
            <SyringeGraphic units={result.valid ? result.insulinUnits : null} overflow={result.exceedsSyringe} />
          </div>
        </div>
        <ResultAlerts result={result} />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-5 border-t border-line pt-8 sm:grid-cols-4 sm:gap-4">
        <Stat icon={<FlaskIcon size={16} />} label="Concentration" value={concentration} hint="Your dilution" />
        <Stat
          icon={<SyringeIcon size={16} />}
          label="Each unit"
          value={`${mlPerUnit} ml`}
          hint="On insulin syringe"
        />
        <Stat
          icon={<DropletIcon size={16} />}
          label="Each mg"
          value={`${mlPerMg} ml`}
          hint={result.valid ? `(${unitsPerMg} units)` : undefined}
        />
        <Stat
          icon={<ChartIcon size={16} />}
          label="Total doses"
          value={result.valid ? totalDoses : "—"}
          hint={result.valid ? `(${draw} ml each)` : undefined}
        />
      </div>
    </div>
  );
}

export function DosageCalculator() {
  const [peptide, setPeptide] = useState(DEFAULT_CALCULATOR_VALUES.peptideMg);
  const [water, setWater] = useState(DEFAULT_CALCULATOR_VALUES.bacWaterMl);
  const [dose, setDose] = useState(DEFAULT_CALCULATOR_VALUES.desiredDoseMg);

  const result = useMemo(
    () => resolveCalculatorResult({ peptideMg: peptide, bacWaterMl: water, desiredDoseMg: dose }),
    [peptide, water, dose],
  );

  return (
    <section id="calculator" className="relative scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-16">
          <div className="reveal lg:sticky lg:top-28">
            <div className="max-w-lg">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-500">Research tool</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-fg">
                Peptide <span className="text-brand-500">dosage</span> calculator
              </h2>
              <p className="mt-4 text-[clamp(0.95rem,1.6vw,1.05rem)] leading-relaxed text-fg-muted">
                Calculate the exact syringe draw volume for your reconstituted peptide. Enter your vial size,
                bacteriostatic water volume, and target dose — the calculator handles the rest.
              </p>
              <aside className="mt-8 rounded-xl border border-brand-500/30 bg-brand-500/5 p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400">
                    <ShieldCheckIcon size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-400">Important</p>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      This calculator is for research purposes only. It does not constitute medical advice. Always verify
                      calculations independently before use.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
          <div className="reveal">
            <div className="rounded-2xl border border-line bg-ink-700/80 p-5 backdrop-blur-sm sm:p-7 lg:p-8">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-500">
                    Input your reconstitution details
                  </h3>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      id="calc-peptideMg"
                      label="Peptide amount"
                      hint="Total milligrams of peptide in your vial before reconstitution."
                      unit="mg"
                      placeholder="e.g. 10"
                      value={peptide}
                      onChange={setPeptide}
                    />
                    <Field
                      id="calc-bacWaterMl"
                      label="BAC water amount"
                      hint="Millilitres of bacteriostatic water added to the vial."
                      unit="ml"
                      placeholder="e.g. 2"
                      value={water}
                      onChange={setWater}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-500">
                    Enter your desired dosage
                  </h3>
                  <div className="mt-4">
                    <Field
                      id="calc-desiredDoseMg"
                      label="Desired dose"
                      hint="Target dose per injection in milligrams."
                      unit="mg"
                      placeholder="e.g. 1.25"
                      value={dose}
                      onChange={setDose}
                    />
                  </div>
                </div>
              </div>
              <CalculatorResults result={result} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { affiliateTerms } from "@/data/affiliate";

export function AffiliateTerms() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div id="affiliate-terms" className="flex scroll-mt-24 flex-col gap-6">
      <div className="reveal flex flex-col items-center gap-4 text-center">
        <span className="text-[12px] font-semibold capitalize tracking-wide text-brand-500">The fine print</span>
        <h2 className="max-w-[20ch] font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold leading-[1.06] tracking-tight text-fg">
          Terms & payout details
        </h2>
      </div>
      <div className="mx-auto w-full max-w-[720px]">
        <div className="flex flex-col divide-y divide-[color:var(--color-line)] border-y border-line">
          {affiliateTerms.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.title}>
                <button
                  type="button"
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-3 text-left"
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span className="text-[13px] font-semibold text-fg/90">{item.title}</span>
                  <ChevronDownIcon
                    size={14}
                    className={`shrink-0 text-brand-300/70 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-[var(--ease-smooth)]"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-3.5 text-[13px] leading-relaxed text-fg-muted/80">
                      <ul className="list-disc space-y-1.5 pl-5">
                        {item.items.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

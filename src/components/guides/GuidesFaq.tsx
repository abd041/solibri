"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { guideFaqs } from "@/data/guides";

export function GuidesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24">
      <h2 className="mb-6 font-display text-2xl font-extrabold text-fg">Common questions</h2>
      <div className="flex flex-col divide-y divide-[color:var(--color-line)] border-y border-line">
        {guideFaqs.map((item, index) => {
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
                  <div className="pb-3.5 text-[13px] leading-relaxed text-fg-muted/80">{item.content}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

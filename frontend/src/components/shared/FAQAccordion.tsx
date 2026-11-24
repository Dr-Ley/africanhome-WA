"use client";

import { useState } from "react";
import type { FaqItem } from "@/types";

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-sand border-y border-sand">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : index)}
              >
                <span className="font-display text-2xl text-charcoal">{item.question}</span>
                <span className="text-gold" aria-hidden="true">
                  {expanded ? "–" : "+"}
                </span>
              </button>
            </h3>
            {expanded ? <p className="pb-5 pr-8 leading-relaxed text-charcoal/75">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

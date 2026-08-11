import React from "react";
import { Heading, Body, Mono } from "@/components/ui/typography";
import { Rise } from "@/components/ui/rise";

export interface ServiceIncludedProps {
  items: string[];
}

export function ServiceIncluded({ items }: ServiceIncludedProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="pt-12 pb-10 border-b border-rule">
      <Rise>
        <Mono className="text-[11px] uppercase tracking-[0.16em] text-ink-2 mb-3">
          Scope & Deliverables
        </Mono>
        <Heading level={3} className="text-[length:var(--step-2)] text-ink mb-8">
          What&apos;s included
        </Heading>

        {/* Hairline separated list (strictly without numbers) */}
        <ul className="flex flex-col border-t border-rule divide-y divide-rule" role="list">
          {items.map((item, index) => (
            <li
              key={index}
              className="py-4 sm:py-5 flex items-start gap-4 group"
            >
              {/* Restrained subtle dash indicator, no numbering */}
              <span
                className="font-mono text-red text-[length:var(--step-0)] leading-none select-none shrink-0 mt-1"
                aria-hidden="true"
              >
                —
              </span>
              <Body size="base" className="text-ink font-medium leading-relaxed">
                {item}
              </Body>
            </li>
          ))}
        </ul>

      </Rise>
    </div>
  );
}

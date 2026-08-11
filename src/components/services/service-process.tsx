import React from "react";
import { Heading, Body, Mono } from "@/components/ui/typography";
import { Rise } from "@/components/ui/rise";

export interface ServiceProcessProps {
  steps: string[];
}

export function ServiceProcess({ steps }: ServiceProcessProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className="pt-12 pb-6">
      <Rise>
        <Mono className="text-[11px] uppercase tracking-[0.16em] text-ink-2 mb-3">
          Methodology
        </Mono>
        <Heading level={3} className="text-[length:var(--step-2)] text-ink mb-8">
          Our process
        </Heading>

        {/* Stepped sequence with mono step numbers and vertical hairline connectors */}
        <div className="flex flex-col relative" role="list">
          {steps.map((step, index) => {
            const stepNum = String(index + 1).padStart(2, "0");
            const isLast = index === steps.length - 1;

            return (
              <div
                key={index}
                className="flex items-start gap-6 relative group"
                role="listitem"
              >
                {/* Stepped Number Rail & Hairline Connector */}
                <div className="flex flex-col items-center self-stretch shrink-0">
                  {/* Mono Step Number Circle/Box */}
                  <div className="w-9 h-9 flex items-center justify-center bg-paper-2 border border-rule text-ink font-mono text-[11px] font-semibold rounded-[var(--radius)] group-hover:border-red group-hover:text-red transition-colors shrink-0">
                    {stepNum}
                  </div>

                  {/* Vertical Hairline Connector */}
                  {!isLast && (
                    <div
                      className="w-[1px] bg-rule grow my-2 min-h-[32px] group-hover:bg-red/40 transition-colors"
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Step Content */}
                <div className="pt-1 pb-8 grow">
                  <Body size="base" className="text-ink font-medium leading-relaxed">
                    {step}
                  </Body>
                </div>
              </div>
            );
          })}
        </div>

      </Rise>
    </div>
  );
}

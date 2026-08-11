import React from "react";
import { Check } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Mono } from "@/components/ui/typography";
import { Rise } from "@/components/ui/rise";
import { Project } from "@/lib/content";

export interface CaseStudyOutcomeProps {
  project: Project;
}

export function CaseStudyOutcome({ project }: CaseStudyOutcomeProps) {
  const deliverables = project.deliverables ?? [];
  const quote = project.quote;
  const outcomeText = project.outcome;
  const reach = project.reach;

  if (deliverables.length === 0 && !quote && !outcomeText) {
    return null;
  }

  return (
    <Section variant="tint" id="outcome" className="py-12 md:py-20 border-t border-rule">
      <Container>
        <div className="grid grid-cols-1 min-[900px]:grid-cols-12 gap-8 min-[900px]:gap-16 items-start">
          {/* Left Column: Heading & Deliverables Mono List (6 cols) */}
          <div className="min-[900px]:col-span-6 flex flex-col">
            <Rise>
              <Eyebrow className="mb-2">The Outcome</Eyebrow>
              <Display level={2} className="mb-6 max-w-[20ch]">
                Delivery &amp; Impact
              </Display>

              {outcomeText && (
                <p className="text-[length:var(--step-0)] text-ink leading-relaxed mb-8">
                  {outcomeText}
                </p>
              )}

              {/* Deliverables as a Mono List */}
              {deliverables.length > 0 && (
                <div>
                  <Mono className="text-[11px] text-ink-2 mb-3 block">
                    Master Deliverables Suite
                  </Mono>
                  <ul className="divide-y divide-rule border-y border-rule font-mono text-[length:var(--step--1)] tracking-[0.14em] uppercase text-ink">
                    {deliverables.map((item, idx) => (
                      <li key={idx} className="py-3 flex items-center justify-between">
                        <span>{item}</span>
                        <Check className="w-3.5 h-3.5 text-red stroke-[3]" aria-hidden="true" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}


              {/* Reach Metric (Only rendered if supplied) */}
              {reach && (
                <div className="mt-6 pt-4 border-t border-rule">
                  <Mono className="text-[10px] text-ink-2 block">Verified Reach</Mono>
                  <span className="font-black text-[length:var(--step-2)] text-ink">
                    {reach}
                  </span>
                </div>
              )}
            </Rise>
          </div>

          {/* Right Column: Client Quote with 3px red left border (6 cols) */}
          {quote ? (
            <div className="min-[900px]:col-span-6 min-[900px]:pt-12">
              <Rise>
                <div className="border-l-[3px] border-red pl-6 py-2 flex flex-col justify-between">
                  <blockquote className="m-0 text-[clamp(20px,2.4vw,30px)] font-bold tracking-[-0.01em] leading-[1.3] text-ink italic mb-6">
                    &ldquo;{quote.quote}&rdquo;
                  </blockquote>

                  <div>
                    <span className="font-mono text-[length:var(--step--1)] tracking-[0.16em] uppercase text-ink font-semibold block">
                      {quote.author}
                    </span>
                    {quote.role && (
                      <Mono className="text-[10px] text-ink-2 mt-0.5 block">
                        {quote.role}
                      </Mono>
                    )}
                  </div>
                </div>
              </Rise>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

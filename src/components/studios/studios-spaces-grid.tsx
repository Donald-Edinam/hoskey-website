import React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Heading, Body, Mono } from "@/components/ui/typography";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Rise } from "@/components/ui/rise";
import { StudioSpace } from "@/lib/content";

export interface StudiosSpacesGridProps {
  spaces: StudioSpace[];
}

export function StudiosSpacesGrid({ spaces }: StudiosSpacesGridProps) {
  if (!spaces || spaces.length === 0) {
    return null;
  }

  return (
    <Section variant="tint" id="spaces" className="py-14 sm:py-20 border-b border-rule">
      <Container>
        <Rise>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14">
            <div>
              <Eyebrow className="mb-2">Bookable Spaces</Eyebrow>
              <Display level={2}>Spaces &amp; Rates</Display>
            </div>
            <Mono className="text-[11px] text-ink-2">
              Flexible Hourly &amp; Day Booking
            </Mono>
          </div>
        </Rise>

        {/* Stacked Cards Grid (2 columns on desktop, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {spaces.map((space) => {
            const hasHourly = typeof space.hourlyRate === "number" && space.hourlyRate > 0;
            const hasDay = typeof space.dayRate === "number" && space.dayRate > 0;

            const whatsappMessage = `Hello Hoskey Production, I would like to book or inquire about the ${space.name} at Demes shr Studios.`;

            return (
              <div
                key={space.slug}
                className="bg-paper border border-rule rounded-[var(--radius)] p-6 sm:p-8 flex flex-col justify-between transition-shadow hover:shadow-xs group"
              >
                <div>
                  {/* Top Bar: Capacity & Minimum Hours Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-rule/70">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2">
                      {space.capacity ? `Capacity · Up to ${space.capacity}` : "Studio space"}
                    </span>

                    {space.minimumHours && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 bg-paper-2 border border-rule text-ink-2 rounded-[var(--radius)]">
                        Min. {space.minimumHours} hrs
                      </span>
                    )}
                  </div>

                  {/* Space Name */}
                  <Heading
                    level={3}
                    className="text-[length:var(--step-1)] leading-[1.2] text-ink group-hover:text-red transition-colors mb-3"
                  >
                    {space.name}
                  </Heading>

                  {/* Rate Block (Prominent in Display/Mono type) */}
                  <div className="my-4 py-3 px-4 bg-paper-2 border border-rule rounded-[var(--radius)] flex flex-wrap items-baseline justify-between gap-2">
                    {hasHourly ? (
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-black text-[length:var(--step-1)] text-ink tracking-tight">
                          GH₵ {space.hourlyRate}
                        </span>
                        <span className="font-mono text-[10px] uppercase text-ink-2 tracking-[0.12em]">
                          / hour
                        </span>
                      </div>
                    ) : (
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink font-semibold">
                        Rates on request
                      </span>
                    )}

                    {hasDay && (
                      <span className="font-mono text-[10px] uppercase text-ink-2 tracking-[0.12em]">
                        Day rate: GH₵ {space.dayRate}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <Body size="sm" className="text-ink-2 leading-relaxed mb-6">
                    {space.description}
                  </Body>

                  {/* What's Included (Mono List) */}
                  {space.included && space.included.length > 0 && (
                    <div className="pt-4 pb-2 border-t border-rule/60">
                      <Mono className="text-[10px] uppercase tracking-[0.16em] text-ink-2 block mb-3 font-semibold">
                        Included with space:
                      </Mono>
                      <ul className="space-y-2" role="list">
                        {space.included.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-ink text-[length:var(--step--1)] leading-snug font-mono"
                          >
                            <span className="text-red font-mono select-none shrink-0" aria-hidden="true">
                              +
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card Action */}
                <div className="mt-8 pt-5 border-t border-rule">
                  <WhatsAppButton
                    context="studio"
                    customText={whatsappMessage}
                    size="sm"
                    variant="ghost"
                    className="w-full justify-between group-hover:border-ink group-hover:bg-ink group-hover:text-paper transition-all"
                  >
                    <span>Book this space</span>
                    <span aria-hidden="true">→</span>
                  </WhatsAppButton>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

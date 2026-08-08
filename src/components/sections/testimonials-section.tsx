import React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Mono } from "@/components/ui/typography";
import { Testimonial } from "@/lib/content";

export interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  // S6: Renders only if >= 1 testimonial exists.
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const displayTestimonials = testimonials.slice(0, 3);

  return (
    <Section variant="default" id="testimonials">
      <Container>
        <Eyebrow className="mb-4">Endorsements</Eyebrow>
        <Display level={2} className="mb-12 max-w-[20ch]">
          Client & Partner Trust
        </Display>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map((t, index) => (
            <div
              key={index}
              className="border-l-[3px] border-red pl-6 py-2 flex flex-col justify-between"
            >
              <blockquote className="m-0 text-[clamp(18px,2vw,24px)] font-bold tracking-[-0.01em] leading-[1.3] text-ink italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div>
                <span className="font-mono text-[length:var(--step--1)] tracking-[0.16em] uppercase text-ink font-semibold block">
                  {t.name}
                </span>
                {(t.role || t.organisation) && (
                  <Mono className="text-[10px] text-ink-2 mt-0.5 block">
                    {[t.role, t.organisation].filter(Boolean).join(" · ")}
                  </Mono>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

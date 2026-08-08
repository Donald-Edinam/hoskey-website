import React from "react";
import Link from "next/link";
import { Container, Section, Eyebrow, Grid, GridCell } from "@/components/ui/layout";
import { Display, Heading, Body, Mono } from "@/components/ui/typography";
import { Rise } from "@/components/ui/rise";
import { Service } from "@/lib/content";

export interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <Section variant="tint" id="services">
      <Container>
        <Rise>
          <Eyebrow className="mb-4">What we do</Eyebrow>
          <Display level={2} className="mb-8 md:mb-12 max-w-[24ch]">
            Every stage of the production process.
          </Display>
        </Rise>

        {/* Hairline Grid with 1px gaps (1 col mobile, 2 at 640px, 3 at 1000px) */}
        <Grid cols={3} className="bg-rule border border-rule">
          {services.map((service, index) => {
            const indexStr = String(index + 1).padStart(2, "0");
            return (
              <GridCell key={service.slug} className="group relative p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Mono className="text-[11px] text-ink-2 group-hover:text-red transition-colors">
                      {indexStr}
                    </Mono>
                  </div>
                  <Heading level={3} className="text-[length:var(--step-1)] leading-[1.2] mb-3 group-hover:text-red transition-colors">
                    {service.title}
                  </Heading>
                  <Body size="sm" className="text-ink-2 leading-relaxed">
                    {service.summary}
                  </Body>
                </div>

                <div className="mt-6 pt-4 border-t border-rule/40 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-2 group-hover:text-ink">
                    Learn more
                  </span>
                  <span className="text-ink-2 group-hover:text-red group-hover:translate-x-1 transition-all" aria-hidden="true">
                    →
                  </span>
                </div>

                <Link
                  href={`/services#${service.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={`${service.title} service details`}
                />
              </GridCell>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}

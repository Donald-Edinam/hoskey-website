import React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display } from "@/components/ui/typography";
import { Rise } from "@/components/ui/rise";
import { Service } from "@/lib/content";
import { ServiceGrid } from "@/components/services/service-grid";

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

        {/* Shared Hairline Grid with variant="home" */}
        <ServiceGrid services={services} variant="home" />
      </Container>
    </Section>
  );
}


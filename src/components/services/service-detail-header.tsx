import React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Lede, Body, Heading, Mono } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Rise } from "@/components/ui/rise";
import { Service } from "@/lib/content";
import { SITE } from "@/lib/config";
import { getServiceWhatsAppMessage } from "@/lib/whatsapp";
import { ServiceIncluded } from "./service-included";
import { ServiceProcess } from "./service-process";

export interface ServiceDetailHeaderProps {
  service: Service;
}

export function ServiceDetailHeader({ service }: ServiceDetailHeaderProps) {
  const phone = SITE.phone;
  const whatsappMessage = getServiceWhatsAppMessage(service.slug, service.title);

  return (
    <Section variant="default" className="pt-[clamp(40px,6vw,80px)] pb-[clamp(48px,8vw,96px)]">
      <Container>
        {/* Two-column layout at 900px */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-[1fr_360px] lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">
          {/* Left Column: Narrative Content, Inclusions, and Stepped Process */}
          <div className="flex flex-col">
            <Rise>
              {/* Eyebrow */}
              <Eyebrow className="mb-4">Production Service</Eyebrow>

              {/* Service Title */}
              <Display level={1} className="text-ink mb-6 [text-wrap:balance]">
                {service.title}
              </Display>

              {/* Service Summary Lede */}
              <Lede className="text-ink-2 mb-8 leading-relaxed">
                {service.summary}
              </Lede>

              {/* Extended Description */}
              {service.description && (
                <div className="pb-10 border-b border-rule">
                  <Body size="base" className="text-ink-2 leading-relaxed text-[length:var(--step-0)]">
                    {service.description}
                  </Body>
                </div>
              )}
            </Rise>

            {/* S4: What's Included (No decorative numbering) */}
            {service.included && service.included.length > 0 && (
              <ServiceIncluded items={service.included} />
            )}

            {/* S5: Stepped Process Sequence (Numbered with hairline connectors) */}
            {service.process && service.process.length > 0 && (
              <ServiceProcess steps={service.process} />
            )}
          </div>

          {/* Right Column: Sticky CTA Conversion Card (Desktop >= 900px follows scroll; inline on mobile) */}
          <aside className="w-full min-[900px]:sticky min-[900px]:top-24 mt-4 min-[900px]:mt-0">
            <div className="p-6 sm:p-8 bg-paper-2 border border-rule rounded-[var(--radius)] flex flex-col shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-rule">
                <Mono className="text-[11px] text-ink-2 uppercase tracking-[0.16em] font-medium">
                  Direct inquiry
                </Mono>
                {service.priceBand && (
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-paper border border-rule text-ink font-semibold rounded-[var(--radius)]">
                    {service.priceBand}
                  </span>
                )}
              </div>

              <Heading level={3} className="text-[length:var(--step-0)] text-ink mb-2">
                Discuss {service.title}
              </Heading>

              <Body size="sm" className="text-ink-2 mb-6 leading-relaxed">
                Connect directly with our production desk on WhatsApp. We provide quick feasibility, crew availability, and custom rate cards.
              </Body>

              {/* WhatsApp Conversion CTA */}
              <div className="flex flex-col gap-3 mb-6">
                <WhatsAppButton
                  context="production"
                  customText={whatsappMessage}
                  size="md"
                  variant="primary"
                  className="w-full justify-center"
                >
                  Start on WhatsApp
                </WhatsAppButton>

                {phone && (
                  <Button
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    variant="ghost"
                    size="md"
                    className="w-full justify-center"
                  >
                    Call {phone}
                  </Button>
                )}
              </div>


              {/* Response & Operational Guarantees */}
              <div className="pt-5 border-t border-rule flex flex-col gap-2 font-mono text-[10px] text-ink-2 tracking-[0.14em] uppercase">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
                  <span>Response: Same-day reply</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rule shrink-0" aria-hidden="true" />
                  <span>Hours: Mon – Sat · 08:00 – 18:00 GMT</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rule shrink-0" aria-hidden="true" />
                  <span>Location: Accra & nationwide Ghana</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}

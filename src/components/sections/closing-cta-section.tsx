import React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Lede } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Rise } from "@/components/ui/rise";
import { SiteSettings } from "@/lib/content";

export interface ClosingCtaSectionProps {
  settings: SiteSettings;
}

export function ClosingCtaSection({ settings }: ClosingCtaSectionProps) {
  const phone = settings.phone ?? "+233 59 794 8979";
  const email = settings.email;

  return (
    <Section
      variant="dark"
      id="contact"
      data-contact-section
      className="text-center py-[clamp(64px,10vw,128px)]"
    >
      <Container className="max-w-3xl flex flex-col items-center">
        <Rise>
          <Eyebrow dot={false} className="mb-4 text-paper-2">
            Get in touch
          </Eyebrow>

          <Display level={2} className="text-paper mb-6 [text-wrap:balance]">
            Bring your vision to life.
          </Display>

          <Lede className="text-paper-2 text-center mx-auto mb-10 max-w-[48ch]">
            Tell us about your broadcast, documentary, or studio recording project. We reply on the same business day.
          </Lede>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full sm:w-auto">
            <WhatsAppButton
              context="project"
              size="md"
              variant="primary"
              className="w-full sm:w-auto"
            >
              Start on WhatsApp
            </WhatsAppButton>

            <Button
              href={`tel:${phone.replace(/\s+/g, "")}`}
              variant="onDark"
              size="md"
              className="w-full sm:w-auto"
            >
              Call {phone}
            </Button>
          </div>

          {/* Meta row: Email (if set), Hours, Guarantee */}
          <div className="pt-8 border-t border-white/15 w-full flex flex-wrap items-center justify-center gap-6 text-paper-2 font-mono text-[11px] tracking-[0.16em] uppercase">
            {email && (
              <span>
                Email · <a href={`mailto:${email}`} className="text-paper hover:underline">{email}</a>
              </span>
            )}
            <span>Hours · Mon – Sat · 08:00 – 18:00 GMT</span>
            <span>Response · Same-day reply</span>
          </div>
        </Rise>
      </Container>
    </Section>
  );
}

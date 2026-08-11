import React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Lede } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Rise } from "@/components/ui/rise";
import { SiteSettings } from "@/lib/content";

export interface StudiosBookingCtaProps {
  settings: SiteSettings;
  /**
   * Toggle for online booking flow (M9).
   * Defaults to false until M9 ships, making WhatsApp the primary conversion path.
   */
  enableOnlineBooking?: boolean;
}

export function StudiosBookingCta({
  settings,
  enableOnlineBooking = false,
}: StudiosBookingCtaProps) {
  const phone = settings.phone ?? "+233 59 794 8979";
  const studioWhatsappMessage =
    "Hello Hoskey Production, I am inquiring about Demes shr Studios availability and booking.";

  return (
    <Section
      variant="dark"
      id="book-studio"
      className="text-center py-[clamp(64px,10vw,128px)]"
    >
      <Container className="max-w-3xl flex flex-col items-center">
        <Rise>
          <Eyebrow dot={false} className="mb-4 text-paper-2">
            Demes shr Studios · Booking
          </Eyebrow>

          <Display level={2} className="text-paper mb-6 [text-wrap:balance]">
            Book your session today.
          </Display>

          <Lede className="text-paper-2 text-center mx-auto mb-10 max-w-[48ch]">
            Lock in studio hours, podcast filming slots, or creator desk time with our studio manager.
          </Lede>

          {/* Action CTAs: Dual Path (WhatsApp primary until M9 ships) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full sm:w-auto">
            {enableOnlineBooking ? (
              <>
                <Button
                  href="/studios/book"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  Book a session
                </Button>

                <WhatsAppButton
                  context="studio"
                  customText={studioWhatsappMessage}
                  size="md"
                  variant="onDark"
                  className="w-full sm:w-auto"
                >
                  Chat on WhatsApp
                </WhatsAppButton>
              </>
            ) : (
              <>
                <WhatsAppButton
                  context="studio"
                  customText={studioWhatsappMessage}
                  size="md"
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  Book on WhatsApp
                </WhatsAppButton>

                <Button
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  variant="onDark"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  Call {phone}
                </Button>
              </>
            )}
          </div>

          {/* Meta row: Operating Info */}
          <div className="pt-8 border-t border-white/15 w-full flex flex-wrap items-center justify-center gap-6 text-paper-2 font-mono text-[11px] tracking-[0.16em] uppercase">
            <span>Hours · Mon – Sat · 08:00 – 18:00 GMT</span>
            <span>Response · Same-day confirmation</span>
            <span>Location · Accra &amp; Walawala, Ghana</span>
          </div>
        </Rise>
      </Container>
    </Section>
  );
}

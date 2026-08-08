import React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Lede, Mono } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Rise } from "@/components/ui/rise";

export function HeroSection() {
  return (
    <Section variant="default" className="pt-[clamp(40px,6vw,80px)] pb-[clamp(32px,5vw,64px)]">
      <Container>
        <Rise>
          {/* Eyebrow */}
          <Eyebrow className="mb-4 md:mb-6">
            Broadcast & media production — Ghana
          </Eyebrow>

          {/* H1 Headline — max 15ch measure */}
          <h1 className="font-black text-[clamp(38px,8.2vw,104px)] tracking-[-0.02em] leading-[0.98] [text-wrap:balance] max-w-[15ch] text-ink mb-6 md:mb-8">
            Every story deserves to be seen, heard, and felt.
          </h1>

          {/* Lede summary */}
          <Lede className="mb-8 md:mb-10 text-[length:var(--step-1)] leading-[1.4] max-w-[54ch]">
            Television, brand films, documentaries, live broadcasts — concept through final delivery.
          </Lede>

          {/* CTAs: Stack on 320px, flex-wrap on larger screens */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12 md:mb-16">
            <WhatsAppButton context="project" size="md" className="w-full sm:w-auto">
              Start a project
            </WhatsAppButton>
            <Button href="#work" variant="ghost" size="md" className="w-full sm:w-auto">
              See the work
            </Button>
          </div>
        </Rise>

        {/* Meta Rail separated by a hairline rule */}
        <div className="pt-6 border-t border-rule">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-ink-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" aria-hidden="true" />
              <Mono className="text-[11px]">Est. December 2024</Mono>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" aria-hidden="true" />
              <Mono className="text-[11px]">Television · Digital · Live</Mono>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" aria-hidden="true" />
              <Mono className="text-[11px]">Full in-house crew</Mono>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

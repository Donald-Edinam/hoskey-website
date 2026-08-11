import React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Lede } from "@/components/ui/typography";
import { Img } from "@/components/ui/img";
import { Rise } from "@/components/ui/rise";


export const STUDIO_FACILITIES = [
  "Podcast studio",
  "Recording studio",
  "Co-working space",
  "Workshop space",
  "Musical jams",
  "Chop bar",
] as const;

export function StudiosHeader() {
  return (
    <Section
      variant="dark"
      className="relative overflow-hidden -mt-16 pt-[clamp(80px,11vw,128px)] pb-[clamp(44px,7vw,80px)] border-b border-white/10"
    >

      {/* Cinematic Studio Background Image with Smooth Gradient Blend into Header */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <Img
          src="/images/studio/studios-hero-bg.png"
          alt="Demes shr Studios panoramic broadcast studio background"
          fill
          priority
          className="object-cover object-right md:object-center opacity-60 scale-100"
        />
        {/* Layered dark gradients for seamless header blend & crystal-clear typography readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/90" />
      </div>

      <Container className="relative z-10">


        <Rise>
          {/* Eyebrow */}
          <Eyebrow dot={false} className="mb-4 text-paper-2">
            Demes shr Studios
          </Eyebrow>

          {/* S1: H1 Display — Their own tagline */}
          <Display level={1} className="text-paper mb-4 [text-wrap:balance]">
            Create. Capture. Inspire.
          </Display>

          {/* S1: Lede */}
          <Lede className="text-paper-2 mb-10 max-w-[54ch]">
            Bookable by the hour or the day. Acoustically conditioned suites, multi-camera podcast setups, creator editing desks, and live performance staging in Ghana.
          </Lede>

          {/* S2: Facilities Mono Tag Pills */}
          <div className="pt-6 border-t border-white/15">
            <span className="sr-only">Studio facilities:</span>
            <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center">
              {STUDIO_FACILITIES.map((facility) => (
                <span
                  key={facility}
                  className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] px-3.5 py-1.5 border border-white/[0.28] rounded-[var(--radius)] text-paper bg-white/[0.04] transition-colors hover:border-red hover:text-white select-none whitespace-nowrap"
                >
                  {facility}
                </span>
              ))}
            </div>
          </div>
        </Rise>
      </Container>
    </Section>
  );
}

import React from "react";
import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Body, Mono } from "@/components/ui/typography";
import { Frame } from "@/components/ui/frame";
import { Img } from "@/components/ui/img";
import { Rise } from "@/components/ui/rise";

export function StoryTeaserSection() {
  return (
    <Section variant="default" id="about-teaser">
      <Container>
        <div className="grid grid-cols-1 min-[900px]:grid-cols-12 gap-12 min-[900px]:gap-16 items-center">
          {/* Left Column: Text & Story Teaser (7 cols) */}
          <div className="min-[900px]:col-span-7 flex flex-col items-start">
            <Rise>
              <Eyebrow className="mb-4">Our Story</Eyebrow>
              <Display level={2} className="mb-6">
                Founded in northern Ghana, built for broadcast standards.
              </Display>

              <Body className="text-[length:var(--step-0)] text-ink-2 leading-relaxed mb-6">
                Founded on December 1, 2024, in Walawala, northern Ghana, Hoskey Production grew from a small community with big ambition to bridge regional narratives with world-class broadcast craft.
              </Body>

              {/* Pull-quote */}
              <blockquote className="my-6 border-l-2 border-red pl-5 py-1 text-[length:var(--step-1)] font-bold text-ink italic leading-snug">
                &ldquo;We believe that even the smallest beginnings can create a lasting impact.&rdquo;
              </blockquote>

              <div className="mt-4">
                <Link
                  href="/about"
                  className="font-mono text-[length:var(--step--1)] tracking-[0.16em] uppercase text-ink hover:text-red transition-colors inline-flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-red py-2"
                >
                  <span>Read our story</span>
                  <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </Rise>
          </div>

          {/* Right Column: Founder Portrait (5 cols) */}
          <div className="min-[900px]:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm">
              <Frame ratio="3/4" label="Portrait">
                <Img
                  src="/images/about/founder-ziblim.png"
                  alt="Ziblim Abu James — Founder of Hoskey Production"
                  fill
                  className="object-cover"
                />
              </Frame>
              {/* Frame caption sits outside the frame in mono */}
              <Mono className="text-[11px] text-ink-2 mt-3 block text-center">
                Ziblim Abu James — Founder
              </Mono>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

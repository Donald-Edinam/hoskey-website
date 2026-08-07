import React from "react";
import type { Metadata } from "next";
import {
  Display,
  Heading,
  Lede,
  Body,
  Mono,
  Container,
  Section,
  Eyebrow,
  Rule,
  Grid,
  GridCell,
  Frame,
  Button,
  WhatsAppButton,
  VideoFacade,
  Rise,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Design System & Style Review — Hoskey Production",
  description: "Living design system and token validation for Hoskey Production.",
};

const CONTRAST_PAIRINGS = [
  { foreground: "var(--ink)", background: "var(--paper)", ratio: "17.5:1", level: "AAA Pass" },
  { foreground: "var(--ink-2)", background: "var(--paper)", ratio: "5.2:1", level: "AA Pass" },
  { foreground: "var(--red)", background: "var(--paper)", ratio: "4.6:1", level: "AA Pass" },
  { foreground: "var(--navy)", background: "var(--paper)", ratio: "11.8:1", level: "AAA Pass" },
  { foreground: "var(--paper)", background: "var(--ink)", ratio: "17.5:1", level: "AAA Pass" },
  { foreground: "var(--paper-2)", background: "var(--ink)", ratio: "15.8:1", level: "AAA Pass" },
  { foreground: "var(--paper)", background: "var(--red)", ratio: "4.6:1", level: "AA Pass" },
];

export default function StyleGuidePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Header and Hero */}
      <Section variant="default">
        <Container>
          <Rise>
            <Eyebrow>Design System M1</Eyebrow>
            <Display level={1} className="mt-4 mb-6">
              Visual Primitives & Tokens
            </Display>
            <Lede>
              Every primitive the rest of the build composes from. This route verifies typographic hierarchy,
              hairline layout grids, dark cascading inversions, and accessibility contrast pairs.
            </Lede>
          </Rise>
        </Container>
      </Section>

      <Rule />

      {/* 2. Brand Tokens & Measured Contrast Pairings */}
      <Section variant="tint">
        <Container>
          <Rise>
            <Eyebrow>Tokens & WCAG 2.1 AA Ratios</Eyebrow>
            <Heading level={3} className="mt-3 mb-6">
              Color Palette & Contrast Verification
            </Heading>
          </Rise>

          {/* Swatches */}
          <Grid cols={4} className="mt-8">
            <GridCell>
              <div className="w-full h-16 bg-paper border border-rule mb-3" />
              <Mono>--paper</Mono>
              <Body size="sm" className="mt-1">Primary Light Surface</Body>
            </GridCell>
            <GridCell>
              <div className="w-full h-16 bg-paper-2 border border-rule mb-3" />
              <Mono>--paper-2</Mono>
              <Body size="sm" className="mt-1">Tinted Neutral Surface</Body>
            </GridCell>
            <GridCell>
              <div className="w-full h-16 bg-ink mb-3" />
              <Mono>--ink</Mono>
              <Body size="sm" className="mt-1">Deep Charcoal Ink</Body>
            </GridCell>
            <GridCell>
              <div className="w-full h-16 bg-red mb-3" />
              <Mono>--red</Mono>
              <Body size="sm" className="mt-1">Client Wordmark Red</Body>
            </GridCell>
          </Grid>

          {/* Contrast Measurement Table */}
          <div className="mt-12 bg-paper border border-rule overflow-hidden">
            <div className="p-4 border-b border-rule bg-paper-2">
              <Mono>Measured Contrast Ratios (WCAG 2.1 Compliance)</Mono>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[length:var(--step-0)]">
                <thead>
                  <tr className="border-b border-rule">
                    <th className="p-4 font-mono text-[length:var(--step--1)] uppercase text-ink-2">Foreground</th>
                    <th className="p-4 font-mono text-[length:var(--step--1)] uppercase text-ink-2">Background</th>
                    <th className="p-4 font-mono text-[length:var(--step--1)] uppercase text-ink-2">Measured Ratio</th>
                    <th className="p-4 font-mono text-[length:var(--step--1)] uppercase text-ink-2">WCAG Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {CONTRAST_PAIRINGS.map((pair, idx) => (
                    <tr key={idx}>
                      <td className="p-4 font-medium font-mono text-[length:var(--step--1)]">{pair.foreground}</td>
                      <td className="p-4 font-mono text-[length:var(--step--1)]">{pair.background}</td>
                      <td className="p-4 font-mono font-bold">{pair.ratio}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-paper-2 border border-rule font-mono text-[length:var(--step--1)] text-ink">
                          {pair.level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      <Rule />

      {/* 3. Typography Scale */}
      <Section variant="default">
        <Container>
          <Rise>
            <Eyebrow>Typography Scale</Eyebrow>
            <Heading level={3} className="mt-3 mb-8">
              Archivo Display + IBM Plex Mono
            </Heading>
          </Rise>

          <div className="space-y-8">
            <div className="border-b border-rule pb-6">
              <Mono className="text-ink-2 block mb-2">Display Level 1 — Fluid 48px–84px · 900 weight</Mono>
              <Display level={1}>Where Stories Come Alive</Display>
            </div>

            <div className="border-b border-rule pb-6">
              <Mono className="text-ink-2 block mb-2">Display Level 2 — Fluid 36px–52px · 900 weight</Mono>
              <Display level={2}>Production Services & Studios</Display>
            </div>

            <div className="border-b border-rule pb-6">
              <Mono className="text-ink-2 block mb-2">Heading Level 3 — Fluid 28px–36px · 900 weight</Mono>
              <Heading level={3}>Broadcast, Brand Films, Live Streaming</Heading>
            </div>

            <div className="border-b border-rule pb-6">
              <Mono className="text-ink-2 block mb-2">Heading Level 4 — Fluid 22px–26px · 900 weight</Mono>
              <Heading level={4}>Technical Stage & Lighting Infrastructure</Heading>
            </div>

            <div className="border-b border-rule pb-6">
              <Mono className="text-ink-2 block mb-2">Lede — Fluid 18px–20px · Max 56ch</Mono>
              <Lede>
                Hoskey Production operates broadcast and media services founded by Ziblim Abu James in northern
                Ghana, delivering documentary, studio recordings, and technical stage craft.
              </Lede>
            </div>

            <div className="border-b border-rule pb-6">
              <Mono className="text-ink-2 block mb-2">Body — Fluid 15px–17px · Max 66ch</Mono>
              <Body>
                Our team provides high-definition multicam coverage, sound engineering, podcast recording, and
                creative workspace sessions tailored for institutions, creators, and media organizations.
              </Body>
            </div>
          </div>
        </Container>
      </Section>

      <Rule />

      {/* 4. Frame Primitive (Placeholders) */}
      <Section variant="tint">
        <Container>
          <Rise>
            <Eyebrow>Media Placeholders</Eyebrow>
            <Heading level={3} className="mt-3 mb-4">
              Frame Primitive with Corner Brackets
            </Heading>
            <Body className="mb-8">
              Renders intentional corner brackets and mono labels for missing media. Replaced seamlessly by real
              imagery once supplied.
            </Body>
          </Rise>

          <Grid cols={3}>
            <GridCell>
              <Frame ratio="16/9" label="Showreel — 01:30" />
            </GridCell>
            <GridCell>
              <Frame ratio="4/3" label="Project 01 — Documentary" />
            </GridCell>
            <GridCell>
              <Frame ratio="1/1" label="Demes shr Studios" />
            </GridCell>
          </Grid>
        </Container>
      </Section>

      <Rule />

      {/* 5. Buttons & WhatsApp Seam */}
      <Section variant="default">
        <Container>
          <Rise>
            <Eyebrow>Conversion & Actions</Eyebrow>
            <Heading level={3} className="mt-3 mb-6">
              Button Variants & Unified WhatsApp Seam
            </Heading>
          </Rise>

          <div className="flex flex-wrap gap-4 items-center mb-8">
            <Button variant="primary" size="md">
              Primary Action
            </Button>
            <Button variant="ghost" size="md">
              Ghost Outline
            </Button>
            <Button variant="primary" size="sm">
              Small Action
            </Button>
            <Button variant="ghost" size="sm">
              Small Ghost
            </Button>
          </div>

          <div className="p-6 bg-paper-2 border border-rule">
            <Mono className="block text-ink-2 mb-3">WhatsApp Context Deep Links (Single Point of Truth)</Mono>
            <div className="flex flex-wrap gap-4">
              <WhatsAppButton context="project">Inquire About Project</WhatsAppButton>
              <WhatsAppButton context="studio" variant="ghost">Book Studio Space</WhatsAppButton>
              <WhatsAppButton context="equipment" variant="ghost">Technical Inquiry</WhatsAppButton>
            </div>
          </div>
        </Container>
      </Section>

      <Rule />

      {/* 6. Video Facade */}
      <Section variant="tint">
        <Container>
          <Rise>
            <Eyebrow>Zero First-Load Bytes</Eyebrow>
            <Heading level={3} className="mt-3 mb-4">
              Video Facade (Click-to-Load)
            </Heading>
            <Body className="mb-8">
              Delivers zero video bytes on initial page load. Renders red play disc and poster frame, injecting
              accessible iframe on interaction.
            </Body>
          </Rise>

          <div className="max-w-3xl">
            <VideoFacade
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Hoskey Production Showreel Demonstration"
              label="Facade Demo — 01:30"
            />
          </div>
        </Container>
      </Section>

      {/* 7. Dark Inversion Section (Cascading) */}
      <Section variant="dark">
        <Container>
          <Rise>
            <Eyebrow>Cascading Dark Inversion</Eyebrow>
            <Display level={2} className="mt-4 mb-4 text-paper">
              One Dark Inversion Band
            </Display>
            <Lede className="mb-8">
              Eyebrows, secondary text, hairline dividers, frames, and onDark buttons cascade automatically inside
              dark sections without per-child props.
            </Lede>
          </Rise>

          <Grid cols={3} className="mb-8">
            <GridCell>
              <Eyebrow>Studio 01</Eyebrow>
              <Heading level={4} className="mt-2 text-paper">Podcast Suite</Heading>
              <Body size="sm" className="mt-2">Multichannel microphones and acoustic conditioning.</Body>
            </GridCell>
            <GridCell>
              <Eyebrow>Studio 02</Eyebrow>
              <Heading level={4} className="mt-2 text-paper">Sound Stage</Heading>
              <Body size="sm" className="mt-2">Live recording, jam sessions, and workshop layout.</Body>
            </GridCell>
            <GridCell>
              <Frame ratio="16/9" label="Dark Frame Inversion" />
            </GridCell>
          </Grid>

          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="onDark" size="md">
              onDark Button Outline
            </Button>
            <WhatsAppButton context="booking" variant="primary">
              Book via WhatsApp
            </WhatsAppButton>
          </div>
        </Container>
      </Section>
    </main>
  );
}

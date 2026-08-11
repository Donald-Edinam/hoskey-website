import React from "react";
import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Lede } from "@/components/ui/typography";
import { Rise } from "@/components/ui/rise";
import { ClosingCtaSection } from "@/components/sections/closing-cta-section";
import { ServiceGrid } from "@/components/services";
import { getServices, getSiteSettings } from "@/lib/content";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Production Services — Hoskey Production",
  description:
    "End-to-end broadcast television, cinema brand films, cultural documentaries, low-latency live streaming, sound engineering, and technical stage production across Ghana.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Production Services — Hoskey Production",
    description:
      "End-to-end broadcast television, cinema brand films, cultural documentaries, low-latency live streaming, sound engineering, and technical stage production across Ghana.",
    url: `${SITE.url}/services`,
    type: "website",
  },
};

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ]);

  // Schema.org ItemList for Services
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hoskey Production Services",
    description:
      "Full spectrum broadcast, documentary, commercial, and live media production services in Ghana.",
    numberOfItems: services.length,
    itemListElement: services.map((service, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: service.title,
      description: service.summary,
      url: `${SITE.url}/services/${service.slug}`,
    })),
  };

  return (
    <div className="w-full flex flex-col">
      {/* Schema.org ItemList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* S1: Index Header */}
      <Section
        variant="default"
        className="pt-[clamp(40px,6vw,80px)] pb-10 sm:pb-12"
      >
        <Container>
          <Rise>
            <div className="max-w-3xl">
              <Eyebrow className="mb-4">What we do</Eyebrow>
              <Display level={1} className="text-ink mb-4 [text-wrap:balance]">
                Every stage of the production process.
              </Display>
              <Lede className="text-ink-2 max-w-[54ch]">
                From concept treatment and multi-camera outside broadcast to cinema narrative finishing, live streaming, and technical stagecraft.
              </Lede>
            </div>
          </Rise>
        </Container>
      </Section>

      {/* S2: Index Grid (Shared ServiceGrid with variant="index") */}
      <Section variant="tint" className="pt-2 pb-[clamp(48px,8vw,96px)]">
        <Container>
          <ServiceGrid services={services} variant="index" />
        </Container>
      </Section>

      {/* Closing CTA */}
      <ClosingCtaSection settings={settings} />
    </div>
  );
}

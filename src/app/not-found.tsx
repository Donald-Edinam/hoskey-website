import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Lede, Body } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The requested page does not exist or has been relocated.",
};

export default function NotFound() {
  return (
    <Section variant="default" className="min-h-[70vh] flex items-center justify-center">
      <Container className="max-w-2xl">
        <Eyebrow>404 — Not Found</Eyebrow>

        <Display level={1} className="mt-4 mb-6">
          Page Not Found
        </Display>

        <Lede className="mb-6">
          The address you requested does not correspond to an active page on this server. It may have been relocated
          or removed.
        </Lede>

        <Body className="mb-8">
          You can return to the primary sections below, review our latest production projects, or reach out
          directly via WhatsApp.
        </Body>

        <div className="flex flex-wrap gap-4 items-center">
          <Button href="/services" variant="primary" size="md">
            Production Services
          </Button>
          <Button href="/work" variant="ghost" size="md">
            Selected Work
          </Button>
          <WhatsAppButton context="general" variant="ghost" size="md">
            Inquire via WhatsApp
          </WhatsAppButton>
          <Link
            href="/"
            className="font-mono text-[length:var(--step--1)] text-ink-2 hover:text-ink tracking-[0.16em] uppercase ml-2 py-2 focus-visible:outline-2 focus-visible:outline-red"
          >
            ← Return to Home
          </Link>
        </div>
      </Container>
    </Section>
  );
}

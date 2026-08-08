"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Lede, Body } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime errors for diagnostics
    console.error("Runtime application error:", error);
  }, [error]);

  return (
    <Section variant="default" className="min-h-[70vh] flex items-center justify-center">
      <Container className="max-w-2xl">
        <Eyebrow>500 — Application Error</Eyebrow>

        <Display level={1} className="mt-4 mb-6">
          Unable to Load Page
        </Display>

        <Lede className="mb-6">
          An unexpected application error occurred while processing this request. The issue has been recorded for
          investigation.
        </Lede>

        <Body className="mb-8">
          You can attempt to reload the view, return to the main homepage, or message our production desk directly
          for immediate assistance.
        </Body>

        <div className="flex flex-wrap gap-4 items-center">
          <Button onClick={() => reset()} variant="primary" size="md">
            Retry Request
          </Button>
          <WhatsAppButton context="general" variant="ghost" size="md">
            Message Support
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

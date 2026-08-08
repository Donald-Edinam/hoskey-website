import React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display } from "@/components/ui/typography";

export default function Loading() {
  return (
    <Section variant="default" className="min-h-[50vh] flex items-center justify-center">
      <Container className="max-w-xl text-center flex flex-col items-center">
        <Eyebrow>Hoskey Production</Eyebrow>
        <Display level={2} className="mt-4 mb-4 animate-pulse text-ink-2">
          Loading...
        </Display>
        <div className="w-16 h-[2px] bg-red mt-2 animate-pulse" />
      </Container>
    </Section>
  );
}

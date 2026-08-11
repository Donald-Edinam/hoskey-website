import React from "react";
import { Container, Section } from "@/components/ui/layout";

export default function StudiosLoading() {
  return (
    <div className="w-full flex flex-col animate-pulse" aria-hidden="true">
      {/* Dark Header Skeleton */}
      <Section variant="dark" className="pt-[clamp(48px,8vw,96px)] pb-[clamp(40px,6vw,72px)]">
        <Container>
          <div className="max-w-2xl">
            <div className="h-4 w-32 bg-white/10 rounded mb-4" />
            <div className="h-12 w-3/4 bg-white/10 rounded mb-4" />
            <div className="h-6 w-full bg-white/10 rounded mb-8" />
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/15">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-7 w-28 bg-white/10 rounded" />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Gallery Skeleton */}
      <Section variant="default" className="py-12 md:py-16 border-b border-rule">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="col-span-1 md:col-span-8 h-80 bg-paper-2 border border-rule rounded" />
            <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
              <div className="h-36 bg-paper-2 border border-rule rounded" />
              <div className="h-36 bg-paper-2 border border-rule rounded" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Spaces Grid Skeleton */}
      <Section variant="tint" className="py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="h-72 bg-paper border border-rule rounded p-6" />
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}

import React from "react";
import { Container, Section } from "@/components/ui/layout";

export default function ServicesLoading() {
  return (
    <div className="w-full flex flex-col animate-pulse" aria-hidden="true">
      {/* Header Skeleton */}
      <Section variant="default" className="pt-[clamp(40px,6vw,80px)] pb-10">
        <Container>
          <div className="max-w-2xl">
            <div className="h-4 w-28 bg-paper-2 border border-rule rounded mb-4" />
            <div className="h-12 w-3/4 bg-paper-2 border border-rule rounded mb-4" />
            <div className="h-6 w-full bg-paper-2 border border-rule rounded" />
          </div>
        </Container>
      </Section>

      {/* Grid Skeleton */}
      <Section variant="tint" className="pt-2 pb-[clamp(48px,8vw,96px)]">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-paper p-6 sm:p-8 flex flex-col justify-between h-56"
              >
                <div>
                  <div className="h-3 w-8 bg-paper-2 rounded mb-4" />
                  <div className="h-6 w-3/4 bg-paper-2 rounded mb-3" />
                  <div className="h-4 w-full bg-paper-2 rounded mb-2" />
                  <div className="h-4 w-2/3 bg-paper-2 rounded" />
                </div>
                <div className="h-3 w-20 bg-paper-2 rounded pt-4 border-t border-rule" />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}

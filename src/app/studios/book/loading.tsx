import React from "react";
import { Container, Section } from "@/components/ui/layout";

export default function StudiosBookLoading() {
  return (
    <Section variant="default" className="pt-[clamp(32px,5vw,64px)] pb-[clamp(64px,8vw,112px)]">
      <Container>
        {/* Header Skeleton */}
        <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col items-center gap-3">
          <div className="w-36 h-4 bg-paper-2 rounded animate-pulse" />
          <div className="w-64 sm:w-80 h-10 bg-paper-2 rounded animate-pulse" />
          <div className="w-96 max-w-full h-4 bg-paper-2 rounded animate-pulse" />
        </div>

        {/* Progress Rail Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-paper-2 border border-rule rounded-[var(--radius)] animate-pulse" />
          ))}
        </div>

        {/* Space Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-paper-2 border border-rule rounded-[var(--radius)] animate-pulse" />
          ))}
        </div>
      </Container>
    </Section>
  );
}

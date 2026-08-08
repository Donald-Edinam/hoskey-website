import React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Lede } from "@/components/ui/typography";
import { WorkCardSkeleton } from "@/components/work/work-card-skeleton";

export default function WorkLoading() {
  return (
    <div className="w-full flex flex-col animate-pulse" aria-busy="true">
      {/* S1: Header Skeleton */}
      <Section variant="default" className="pt-[clamp(40px,6vw,80px)] pb-8">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-rule">
            <div>
              <Eyebrow className="mb-3">Selected work</Eyebrow>
              <Display level={1} className="text-ink">
                Productions.
              </Display>
              <Lede className="mt-3 text-ink-2 max-w-[54ch]">
                Broadcast television, brand films, and documentary productions created across Ghana.
              </Lede>
            </div>

            <div className="w-28 h-9 bg-paper-2 border border-rule rounded-[var(--radius)]" />
          </div>

          {/* Filter Pills Skeleton */}
          <div className="pt-8 flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-20 sm:w-24 h-8 bg-paper-2 border border-rule rounded-[var(--radius)]"
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* S3: Card Grid Skeletons matching exact dimensions */}
      <Section variant="default" className="pt-2 pb-[clamp(48px,8vw,96px)]">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <WorkCardSkeleton label="Loading" />
            <WorkCardSkeleton label="Loading" />
            <WorkCardSkeleton label="Loading" />
          </div>
        </Container>
      </Section>
    </div>
  );
}

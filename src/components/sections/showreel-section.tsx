import React from "react";
import { Container } from "@/components/ui/layout";
import { Frame } from "@/components/ui/frame";
import { VideoFacade } from "@/components/ui/video-facade";
import { Rise } from "@/components/ui/rise";

export interface ShowreelSectionProps {
  showreelId?: string | null;
}

export function ShowreelSection({ showreelId }: ShowreelSectionProps) {
  return (
    <section aria-label="Hoskey Production Showreel" className="w-full pb-[clamp(48px,8vw,96px)]">
      <Container>
        <Rise>
          {showreelId ? (
            <VideoFacade
              src={`https://www.youtube-nocookie.com/embed/${showreelId}`}
              title="Hoskey Production Showreel"
              label="Showreel — 01:30"
              ratio="16/9"
            />
          ) : (
            <Frame ratio="16/9" label="Showreel — 01:30" />
          )}
        </Rise>
      </Container>
    </section>
  );
}

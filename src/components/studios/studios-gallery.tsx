"use client";

import React, { useState, useRef, useCallback } from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Mono } from "@/components/ui/typography";
import { Frame } from "@/components/ui/frame";
import { Img } from "@/components/ui/img";
import { Rise } from "@/components/ui/rise";
import { Lightbox } from "@/components/ui/lightbox";
import { Image as ImageType } from "@/lib/content";
import { cn } from "@/lib/utils";

export interface StudiosGalleryProps {
  images?: ImageType[];
}

export function StudiosGallery({ images = [] }: StudiosGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const hasRealImages = images.length > 0;

  const handleOpen = (index: number) => {
    if (!hasRealImages) return;
    setActiveIndex(index);
  };

  const handleClose = useCallback(() => {
    if (activeIndex !== null) {
      const returnTrigger = triggerRefs.current[activeIndex];
      setActiveIndex(null);
      setTimeout(() => {
        returnTrigger?.focus();
      }, 50);
    }
  }, [activeIndex]);

  return (
    <Section variant="default" id="gallery" className="py-12 md:py-16 border-b border-rule">

      <Container>
        <Rise>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10">
            <div>
              <Eyebrow className="mb-2">Space &amp; Environment</Eyebrow>
              <Display level={2}>Studio Spaces &amp; Setup</Display>
            </div>
            <Mono className="text-[11px] text-ink-2">
              {hasRealImages ? `${String(images.length).padStart(2, "0")} Studio Views` : "Demes shr Studios · Ghana"}
            </Mono>
          </div>
        </Rise>

        {/* Asymmetric 3-Frame Layout (1 large, 2 small) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Frame 1: The Room (Large, spanning 8 cols on desktop) */}
          <div className="col-span-1 md:col-span-8">
            {hasRealImages && images[0] ? (
              <button
                ref={(el) => {
                  triggerRefs.current[0] = el;
                }}
                type="button"
                onClick={() => handleOpen(0)}
                aria-label={`View full-screen ${images[0].alt || "The room"}`}
                className={cn(
                  "w-full text-left cursor-pointer rounded-[var(--radius)] overflow-hidden group relative",
                  "focus-visible:outline-2 focus-visible:outline-red focus-visible:outline-offset-4"
                )}
              >
                <Frame ratio="16/9" label="The room">
                  <Img
                    src={images[0].src}
                    alt={images[0].alt || "The room — main studio floor"}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-ink/80 text-white p-1.5 rounded-[var(--radius)] text-xs font-mono">
                    <span aria-hidden="true">⤢</span>
                  </div>
                </Frame>
              </button>
            ) : (
              <Frame ratio="16/9" label="The room" />
            )}
          </div>

          {/* Right Column with 2 Stacked Small Frames (Booth & Desk) */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
            {/* Frame 2: Booth */}
            <div>
              {hasRealImages && images[1] ? (
                <button
                  ref={(el) => {
                    triggerRefs.current[1] = el;
                  }}
                  type="button"
                  onClick={() => handleOpen(1)}
                  aria-label={`View full-screen ${images[1].alt || "Booth"}`}
                  className={cn(
                    "w-full text-left cursor-pointer rounded-[var(--radius)] overflow-hidden group relative",
                    "focus-visible:outline-2 focus-visible:outline-red focus-visible:outline-offset-4"
                  )}
                >
                  <Frame ratio="4/3" label="Booth">
                    <Img
                      src={images[1].src}
                      alt={images[1].alt || "Booth — isolation recording suite"}
                      fill
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-ink/80 text-white p-1.5 rounded-[var(--radius)] text-xs font-mono">
                      <span aria-hidden="true">⤢</span>
                    </div>
                  </Frame>
                </button>
              ) : (
                <Frame ratio="4/3" label="Booth" />
              )}
            </div>

            {/* Frame 3: Desk */}
            <div>
              {hasRealImages && images[2] ? (
                <button
                  ref={(el) => {
                    triggerRefs.current[2] = el;
                  }}
                  type="button"
                  onClick={() => handleOpen(2)}
                  aria-label={`View full-screen ${images[2].alt || "Desk"}`}
                  className={cn(
                    "w-full text-left cursor-pointer rounded-[var(--radius)] overflow-hidden group relative",
                    "focus-visible:outline-2 focus-visible:outline-red focus-visible:outline-offset-4"
                  )}
                >
                  <Frame ratio="4/3" label="Desk">
                    <Img
                      src={images[2].src}
                      alt={images[2].alt || "Desk — post-production & editing station"}
                      fill
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-ink/80 text-white p-1.5 rounded-[var(--radius)] text-xs font-mono">
                      <span aria-hidden="true">⤢</span>
                    </div>
                  </Frame>
                </button>
              ) : (
                <Frame ratio="4/3" label="Desk" />
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Lightbox for Real Images */}
      {hasRealImages && (
        <Lightbox
          isOpen={activeIndex !== null}
          onClose={handleClose}
          images={images}
          activeIndex={activeIndex ?? 0}
          onIndexChange={(newIdx) => setActiveIndex(newIdx)}
          title="Demes shr Studios"
        />
      )}
    </Section>
  );
}

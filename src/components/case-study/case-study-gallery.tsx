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

export interface CaseStudyGalleryProps {
  gallery?: ImageType[];
  title: string;
}

export function CaseStudyGallery({ gallery, title }: CaseStudyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const images = gallery ?? [];

  const handleOpen = (index: number) => {
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

  if (images.length === 0) {
    return null;
  }

  // Define alternating asymmetric layout rhythm for stills
  const getLayoutClasses = (index: number) => {
    const pattern = index % 5;
    if (pattern === 0) {
      return { colSpan: "col-span-1 md:col-span-12", ratio: "21/9" };
    }
    if (pattern === 1) {
      return { colSpan: "col-span-1 md:col-span-7", ratio: "16/9" };
    }
    if (pattern === 2) {
      return { colSpan: "col-span-1 md:col-span-5", ratio: "4/3" };
    }
    if (pattern === 3) {
      return { colSpan: "col-span-1 md:col-span-6", ratio: "3/2" };
    }
    return { colSpan: "col-span-1 md:col-span-6", ratio: "16/9" };
  };

  return (
    <Section variant="default" id="gallery" className="py-12 md:py-20 border-t border-rule">
      <Container>
        <Rise>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-12">
            <div>
              <Eyebrow className="mb-2">Visual Archive</Eyebrow>
              <Display level={2}>Stills &amp; Production Frames</Display>
            </div>
            <Mono className="text-[11px] text-ink-2">
              {String(images.length).padStart(2, "0")} Selected Frames
            </Mono>
          </div>
        </Rise>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {images.map((img, idx) => {
            const { colSpan, ratio } = getLayoutClasses(idx);
            const label = `Still 0${idx + 1}`;

            return (
              <button
                key={idx}
                ref={(el) => {
                  triggerRefs.current[idx] = el;
                }}
                type="button"
                onClick={() => handleOpen(idx)}
                aria-label={`View full-screen ${img.alt || label}`}
                className={cn(
                  colSpan,
                  "group relative text-left cursor-pointer rounded-[var(--radius)] overflow-hidden",
                  "focus-visible:outline-2 focus-visible:outline-red focus-visible:outline-offset-4"
                )}
              >
                <Frame ratio={ratio} label={label}>
                  <Img
                    src={img.src}
                    alt={img.alt || `${title} still ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  />
                  {/* Subtle expand icon overlay on hover */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-ink/80 text-white p-1.5 rounded-[var(--radius)] text-xs font-mono">
                    <span aria-hidden="true">⤢</span>
                  </div>
                </Frame>
              </button>
            );
          })}
        </div>
      </Container>

      {/* Reusable Lightbox */}
      <Lightbox
        isOpen={activeIndex !== null}
        onClose={handleClose}
        images={images}
        activeIndex={activeIndex ?? 0}
        onIndexChange={(newIdx) => setActiveIndex(newIdx)}
        title={title}
      />
    </Section>
  );
}

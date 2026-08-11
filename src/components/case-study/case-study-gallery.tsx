"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Mono } from "@/components/ui/typography";
import { Frame } from "@/components/ui/frame";
import { Img } from "@/components/ui/img";
import { Rise } from "@/components/ui/rise";
import { Image as ImageType } from "@/lib/content";
import { cn } from "@/lib/utils";

export interface CaseStudyGalleryProps {
  gallery?: ImageType[];
  title: string;
}

export function CaseStudyGallery({ gallery, title }: CaseStudyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    setActiveIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    setActiveIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : images.length - 1
    );
  }, [images.length]);

  // Keyboard navigation & Escape handling
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Tab") {
        // Simple focus trap inside modal
        if (modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length > 0) {
            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll while open
    document.body.style.overflow = "hidden";

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, handleClose, handleNext, handlePrev]);

  if (images.length === 0) {
    return null;
  }

  // Define alternating asymmetric layout rhythm for stills
  const getLayoutClasses = (index: number) => {
    const pattern = index % 5;
    if (pattern === 0) {
      // Full-bleed wide 21:9 or 16:9 spanning all columns
      return { colSpan: "col-span-1 md:col-span-12", ratio: "21/9" };
    }
    if (pattern === 1) {
      // 7-column contained 16:9
      return { colSpan: "col-span-1 md:col-span-7", ratio: "16/9" };
    }
    if (pattern === 2) {
      // 5-column contained 4:3
      return { colSpan: "col-span-1 md:col-span-5", ratio: "4/3" };
    }
    if (pattern === 3) {
      // 6-column 3:2
      return { colSpan: "col-span-1 md:col-span-6", ratio: "3/2" };
    }
    // 6-column 16:9
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

      {/* Accessible Full-Screen Lightbox Modal */}
      {activeIndex !== null && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image gallery lightbox`}
          className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fade-in"
          onClick={handleClose}
        >
          {/* Top Bar: Counter & Close Button */}
          <div
            className="flex items-center justify-between w-full max-w-7xl mx-auto z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Mono className="text-paper-2 text-[11px]">
              Frame {activeIndex + 1} of {images.length} · {title}
            </Mono>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              aria-label="Close image lightbox"
              className="p-2 text-paper hover:text-red transition-colors focus-visible:outline-2 focus-visible:outline-red font-mono text-sm uppercase tracking-widest cursor-pointer"
            >
              Close [ESC] ✕
            </button>
          </div>

          {/* Center: Active Image Frame */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 text-paper/70 hover:text-white bg-black/40 hover:bg-black/80 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-red cursor-pointer"
            >
              ←
            </button>

            <div className="relative w-full h-full max-h-[78vh] flex items-center justify-center">
              <Img
                src={images[activeIndex].src}
                alt={images[activeIndex].alt || `${title} still ${activeIndex + 1}`}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 text-paper/70 hover:text-white bg-black/40 hover:bg-black/80 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-red cursor-pointer"
            >
              →
            </button>
          </div>

          {/* Bottom Bar: Image Caption (if any) */}
          <div
            className="w-full max-w-7xl mx-auto text-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {images[activeIndex].alt && (
              <p className="text-paper-2 font-mono text-[11px] tracking-[0.14em] uppercase">
                {images[activeIndex].alt}
              </p>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}

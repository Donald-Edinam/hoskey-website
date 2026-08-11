"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { Img } from "./img";
import { Mono } from "./typography";

export interface LightboxImage {
  src: string;
  alt?: string;
}

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImage[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  title?: string;
}

export function Lightbox({
  isOpen,
  onClose,
  images,
  activeIndex,
  onIndexChange,
  title,
}: LightboxProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    onIndexChange((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, onIndexChange]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    onIndexChange((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, onIndexChange]);

  // Keyboard navigation & Focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Tab") {
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
    document.body.style.overflow = "hidden";

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || images.length === 0 || activeIndex < 0 || activeIndex >= images.length) {
    return null;
  }

  const currentImage = images[activeIndex];

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} image lightbox` : "Image lightbox"}
      className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fade-in"
      onClick={onClose}
    >
      {/* Top Bar: Counter & Close Button */}
      <div
        className="flex items-center justify-between w-full max-w-7xl mx-auto z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Mono className="text-paper-2 text-[11px]">
          Frame {activeIndex + 1} of {images.length} {title ? `· ${title}` : ""}
        </Mono>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close image lightbox"
          className="p-2 text-paper hover:text-red transition-colors focus-visible:outline-2 focus-visible:outline-red font-mono text-sm uppercase tracking-widest cursor-pointer"
        >
          Close [ESC] ✕
        </button>
      </div>

      {/* Center: Active Image & Navigation Arrows */}
      <div
        className="relative flex-1 flex items-center justify-center my-4 max-w-6xl w-full mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 text-paper/70 hover:text-white bg-black/40 hover:bg-black/80 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-red cursor-pointer"
          >
            ←
          </button>
        )}

        <div className="relative w-full h-full max-h-[78vh] flex items-center justify-center">
          <Img
            src={currentImage.src}
            alt={currentImage.alt || (title ? `${title} frame ${activeIndex + 1}` : `Frame ${activeIndex + 1}`)}
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 text-paper/70 hover:text-white bg-black/40 hover:bg-black/80 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-red cursor-pointer"
          >
            →
          </button>
        )}
      </div>

      {/* Bottom Bar: Image Caption (if any) */}
      <div
        className="w-full max-w-7xl mx-auto text-center z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {currentImage.alt && (
          <p className="text-paper-2 font-mono text-[11px] tracking-[0.14em] uppercase">
            {currentImage.alt}
          </p>
        )}
      </div>
    </div>
  );
}

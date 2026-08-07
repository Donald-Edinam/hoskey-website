"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import { Frame } from "./frame";
import { Img } from "./img";
import { cn } from "@/lib/utils";

export interface VideoFacadeProps {
  src: string; // Video iframe embed URL (e.g. YouTube / Vimeo / Cloudflare Stream)
  poster?: string; // Poster image URL
  title?: string; // Descriptive title for accessibility
  label?: string; // Optional bottom-left label for the Frame
  ratio?: "16/9" | "4/3" | "21/9" | "1/1" | string;
  className?: string;
}

export function VideoFacade({
  src,
  poster,
  title = "Play video",
  label,
  ratio = "16/9",
  className,
}: VideoFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    // Move focus to the iframe once injected
    setTimeout(() => {
      iframeRef.current?.focus();
    }, 100);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePlay();
    }
  };

  // Ensure autoplay query param on embed
  const embedUrl = src.includes("?")
    ? `${src}&autoplay=1&playsinline=1`
    : `${src}?autoplay=1&playsinline=1`;

  if (isPlaying) {
    return (
      <Frame ratio={ratio} label={label} className={className}>
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0 absolute inset-0"
        />
      </Frame>
    );
  }

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label={`${title} (click to play)`}
      onClick={handlePlay}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative w-full cursor-pointer select-none",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red",
        className
      )}
    >
      <Frame ratio={ratio} label={label}>
        {poster ? (
          <Img
            src={poster}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : null}

        {/* Play button overlay: red disc with centered play triangle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div
            className={cn(
              "w-16 h-16 rounded-full bg-red text-white flex items-center justify-center shadow-lg",
              "transition-all duration-200 group-hover:scale-110 group-active:scale-95",
              "border border-white/20"
            )}
          >
            <svg
              className="w-6 h-6 ml-1 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
      </Frame>
    </div>
  );
}

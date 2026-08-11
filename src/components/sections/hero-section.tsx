"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Eyebrow } from "@/components/ui/layout";

import { Display, Lede } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Img } from "@/components/ui/img";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  id: string;
  image: string;
  category: string;
  title: string;
  lede: string;
  href: string;
  ctaText: string;
  techBadge: string;
  tabLabel: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "music-video",
    image: "/images/projects/music-video.png",
    category: "Music Videos · Visual Direction",
    title: "Every beat deserves to be seen, heard, and felt.",
    lede: "High-concept music video production, stylized cinematography, and visionary creative direction bringing West African sound to the global stage.",
    href: "/work",
    ctaText: "Explore music videos",
    techBadge: "4K RAW · Steadicam Cine Glass",
    tabLabel: "01 Music Videos",
  },

  {
    id: "broadcast",
    image: "/images/projects/broadcast-tv.png",
    category: "Outside Broadcast · Live TV",
    title: "Live television and multi-camera broadcast engineering.",
    lede: "5-Camera outside broadcast packages, redundant optical SDI vision switching, and multi-track master ISO recording.",
    href: "/work/ghana-now-outside-broadcast",
    ctaText: "Explore Outside Broadcast",
    techBadge: "1080i50 · Optical Fiber SDI",
    tabLabel: "02 Outside Broadcast",
  },
  {
    id: "brand-film",
    image: "/images/projects/brand-film.png",
    category: "Brand Films · Commercial",
    title: "Cinematic commercial films for ambitious institutions.",
    lede: "Executive narrative blocking, cinematic lighting, and precision colour grading designed for television and digital distribution.",
    href: "/work/accra-fintech-brand-narrative",
    ctaText: "Explore Brand Campaign",
    techBadge: "ProRes 4444 · Prime Glass",
    tabLabel: "03 Brand Films",
  },
  {
    id: "live-stream",
    image: "/images/projects/live-concert.png",
    category: "Live Streaming · Concert Production",
    title: "Global live streaming with zero-compromise audio fidelity.",
    lede: "Stadium-grade live event multicam capture, Dante digital audio routing, and low-latency worldwide content distribution.",
    href: "/work/accra-fusion-live-concert",
    ctaText: "Explore Concert Stream",
    techBadge: "1080p60 · Multi-Track Dante",
    tabLabel: "04 Live Streaming",
  },
  {
    id: "studios",
    image: "/images/studio/studios-hero-bg.png",
    category: "Demes shr Studios · Physical Space",
    title: "Demes shr Studios — Create. Capture. Inspire.",
    lede: "Acoustically conditioned podcast suites, audio recording booths, and creator editing workstations bookable by the hour.",
    href: "/studios",
    ctaText: "Explore Demes shr Studios",
    techBadge: "Acoustic Treated · Multi-Mic",
    tabLabel: "05 Demes shr Studios",
  },
];

const AUTO_PLAY_INTERVAL = 6000; // 6 seconds per slide

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay management
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  const activeSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      className="relative w-full min-h-screen -mt-16 pt-20 sm:pt-24 flex flex-col justify-between bg-ink text-paper overflow-hidden select-none group/hero"
      onMouseEnter={() => setIsPaused(true)}

      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-label="Hoskey Production Featured Showcase Carousel"
      role="region"
      aria-roledescription="carousel"
    >
      {/* Background Production Images with Cinematic Crossfade & Ambient Shading */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              )}
              aria-hidden={!isActive}
            >
              <Img
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className={cn(
                  "object-cover object-center transition-transform duration-3000 ease-out",
                  isActive ? "scale-100" : "scale-105"
                )}
              />

              {/* Layered cinematic vignette and text contrast scrims */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/75" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-transparent" />
            </div>
          );
        })}
      </div>

      {/* Main Narrative Hero Content (Animated Slide-by-Slide Text Transitions) */}
      <div className="relative z-20 py-16 sm:py-24 lg:py-28 my-auto">
        <Container>
          <div key={activeSlide.id} className="max-w-3xl">
            {/* Category Eyebrow */}
            <div className="mb-4 sm:mb-6 animate-hero-eyebrow">
              <Eyebrow dot={true} className="text-paper-2 text-xs sm:text-sm">
                {activeSlide.category}
              </Eyebrow>
            </div>

            {/* Bold H1 Headline */}
            <div className="animate-hero-title">
              <Display
                level={1}
                className="text-paper text-[clamp(36px,7.5vw,88px)] font-black tracking-[-0.025em] leading-[0.98] mb-6 [text-wrap:balance]"
              >
                {activeSlide.title}
              </Display>
            </div>

            {/* Lede Summary */}
            <div className="animate-hero-lede">
              <Lede className="text-paper-2 text-[clamp(16px,2vw,20px)] leading-[1.4] max-w-[50ch] mb-8 sm:mb-10">
                {activeSlide.lede}
              </Lede>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-hero-cta">
              <WhatsAppButton context="project" size="md" variant="primary" className="w-full sm:w-auto">
                Start a project
              </WhatsAppButton>

              <Button
                href={activeSlide.href}
                variant="ghost"
                size="md"
                className="w-full sm:w-auto text-paper border-white/30 hover:bg-white/10 hover:text-white"
              >
                {activeSlide.ctaText} →
              </Button>
            </div>
          </div>
        </Container>
      </div>


      {/* Minimal Sleek Bottom Controls (Floating over background without heavy boxes) */}
      <div className="relative z-20 pb-8 sm:pb-10">
        <Container>
          <div className="flex items-center justify-between gap-6 border-t border-white/15 pt-5">
            {/* Minimalist Progress Indicators */}
            <div className="flex items-center gap-2 sm:gap-3 grow max-w-md">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === currentIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}: ${slide.tabLabel}`}
                    className="relative flex-1 h-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors overflow-hidden cursor-pointer py-1 -my-1"
                  >
                    {isActive && (
                      <span
                        className={cn(
                          "absolute inset-y-0 left-0 bg-red rounded-full transition-all",
                          !isPaused && "animate-[grow-width_6s_linear]"
                        )}
                        style={{
                          width: isPaused ? "100%" : undefined,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Counter and Navigation Arrows */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="font-mono text-xs text-paper-2 tracking-[0.16em]">
                <span className="text-paper font-semibold">{String(currentIndex + 1).padStart(2, "0")}</span>
                <span className="text-white/30 mx-1">/</span>
                <span>{String(HERO_SLIDES.length).padStart(2, "0")}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="w-8 h-8 rounded-[var(--radius)] border border-white/20 hover:border-red hover:bg-red/80 text-paper flex items-center justify-center transition-colors cursor-pointer text-xs"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="w-8 h-8 rounded-[var(--radius)] border border-white/20 hover:border-red hover:bg-red/80 text-paper flex items-center justify-center transition-colors cursor-pointer text-xs"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

    </section>
  );
}

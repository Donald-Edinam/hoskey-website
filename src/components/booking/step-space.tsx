"use client";

import React from "react";
import { Check } from "lucide-react";
import { Img } from "@/components/ui/img";
import { Heading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

import { SPACE_CONFIGS } from "@/lib/booking";
import { cn } from "@/lib/utils";

export interface StepSpaceProps {
  selectedSpaceSlug: string;
  onSelectSpace: (slug: string) => void;
  onNext: () => void;
}

export function StepSpace({
  selectedSpaceSlug,
  onSelectSpace,
  onNext,
}: StepSpaceProps) {
  const spaces = Object.values(SPACE_CONFIGS);

  return (
    <div className="w-full flex flex-col">
      {/* Header instructions */}
      <div className="mb-6 sm:mb-8">
        <Heading level={3} className="text-ink mb-2">
          Step 1: Select a studio space
        </Heading>
        <p className="text-ink-2 text-sm sm:text-base max-w-[54ch]">
          Choose the creative room, isolation booth, or live stage setup tailored for your production.
        </p>
      </div>

      {/* Grid of 6 studio spaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {spaces.map((space) => {
          const isSelected = selectedSpaceSlug === space.spaceSlug;

          return (
            <div
              key={space.spaceSlug}
              onClick={() => onSelectSpace(space.spaceSlug)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectSpace(space.spaceSlug);
                }
              }}
              className={cn(
                "group relative bg-paper rounded-[var(--radius)] border-2 transition-all duration-200 cursor-pointer flex flex-col overflow-hidden select-none",
                isSelected
                  ? "border-red ring-2 ring-red/30 shadow-lg"
                  : "border-rule hover:border-ink hover:shadow-md"
              )}
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-paper-2">
                <Img
                  src={space.image}
                  alt={space.name}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-500",
                    isSelected ? "scale-105" : "group-hover:scale-105"
                  )}
                />

                {/* Selected Indicator Badge (Distinguishable without color alone) */}
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-red text-white px-2.5 py-1 rounded-[var(--radius)] text-[10px] font-mono uppercase font-bold tracking-[0.16em] flex items-center gap-1 shadow-md">
                    <Check className="w-3 h-3 text-white stroke-[3]" aria-hidden="true" />
                    <span>Selected</span>
                  </div>
                )}

                {/* Capacity Badge */}
                <div className="absolute bottom-3 left-3 bg-ink/80 text-paper backdrop-blur-xs px-2 py-0.5 rounded-[var(--radius)] font-mono text-[10px] tracking-[0.12em] uppercase">
                  Up to {space.capacity} {space.capacity === 1 ? "person" : "people"}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-paper">
                <div>
                  <h3 className="font-bold text-lg text-ink mb-1 group-hover:text-red transition-colors">
                    {space.name}
                  </h3>

                  {/* Rate display */}
                  <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-rule">
                    <span className="font-black text-2xl text-ink tracking-tight">
                      GH₵ {space.hourlyRate.toLocaleString()}
                    </span>
                    <span className="font-mono text-xs text-ink-2">/ hr</span>
                    <span className="ml-auto font-mono text-[11px] text-ink-2">
                      Min {space.minDurationHours} hrs
                    </span>
                  </div>

                  {/* Key inclusions */}
                  <ul className="space-y-1.5 mb-6">
                    {space.inclusions.slice(0, 3).map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-ink-2 flex items-start gap-2 leading-relaxed"
                      >
                        <span className="text-red font-bold" aria-hidden="true">
                          •
                        </span>
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select affordance */}
                <button
                  type="button"
                  className={cn(
                    "w-full py-2.5 px-4 font-mono text-xs font-semibold tracking-[0.14em] uppercase rounded-[var(--radius)] transition-colors text-center border flex items-center justify-center gap-1.5",
                    isSelected
                      ? "bg-red text-white border-red"
                      : "bg-paper text-ink border-rule group-hover:border-ink"
                  )}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white stroke-[3]" aria-hidden="true" />
                      <span>Selected</span>
                    </>
                  ) : (
                    "Select Space"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>


      {/* Navigation Footer */}
      <div className="pt-6 border-t border-rule flex items-center justify-between">
        <div className="font-mono text-xs text-ink-2">
          {selectedSpaceSlug ? (
            <span>
              Selected: <strong className="text-ink">{SPACE_CONFIGS[selectedSpaceSlug]?.name}</strong>
            </span>
          ) : (
            <span>Please select a space above to continue.</span>
          )}
        </div>

        <Button
          type="button"
          onClick={onNext}
          disabled={!selectedSpaceSlug}
          variant="primary"
          size="md"
        >
          Continue to Date →
        </Button>
      </div>
    </div>
  );
}

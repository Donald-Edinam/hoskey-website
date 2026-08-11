"use client";

import React from "react";
import { Check } from "lucide-react";
import { BookingStep } from "@/lib/booking";
import { cn } from "@/lib/utils";

export interface BookingProgressProps {
  currentStep: BookingStep;
  onStepClick?: (step: BookingStep) => void;
  canNavigateToStep?: (step: BookingStep) => boolean;
}

export const BOOKING_STEPS: { key: BookingStep; label: string; number: string }[] = [
  { key: "space", label: "Space", number: "01" },
  { key: "date", label: "Date", number: "02" },
  { key: "time", label: "Time & Duration", number: "03" },
  { key: "details", label: "Details", number: "04" },
  { key: "confirm", label: "Confirm", number: "05" },
];

export function BookingProgress({
  currentStep,
  onStepClick,
  canNavigateToStep,
}: BookingProgressProps) {
  const currentIndex = BOOKING_STEPS.findIndex((s) => s.key === currentStep);

  return (
    <nav aria-label="Booking steps" className="w-full mb-8 sm:mb-12">
      <ol className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
        {BOOKING_STEPS.map((step, index) => {
          const isCurrent = step.key === currentStep;
          const isCompleted = index < currentIndex;
          const isAccessible = canNavigateToStep ? canNavigateToStep(step.key) : isCompleted;

          return (
            <li key={step.key} className="flex-1">
              <button
                type="button"
                onClick={() => isAccessible && onStepClick?.(step.key)}
                disabled={!isAccessible}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "w-full text-left p-3 sm:p-4 rounded-[var(--radius)] border transition-all text-xs font-mono select-none flex flex-col justify-between min-h-[64px]",
                  isCurrent
                    ? "bg-ink text-paper border-red ring-1 ring-red"
                    : isCompleted
                    ? "bg-paper text-ink border-rule hover:border-ink cursor-pointer"
                    : "bg-paper-2/60 text-ink-2/60 border-rule/60 cursor-not-allowed opacity-75"
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={cn(
                      "text-[10px] tracking-[0.16em] uppercase font-bold",
                      isCurrent ? "text-red" : isCompleted ? "text-ink-2" : "text-ink-2/50"
                    )}
                  >
                    {step.number}
                  </span>
                  {isCompleted && (
                    <Check className="w-3 h-3 text-red stroke-[3] shrink-0" aria-hidden="true" />
                  )}
                </div>


                <span
                  className={cn(
                    "text-xs sm:text-[13px] font-semibold tracking-tight line-clamp-1",
                    isCurrent ? "text-paper" : isCompleted ? "text-ink" : "text-ink-2/70"
                  )}
                >
                  {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

"use client";

import React, { useMemo } from "react";
import { AlertCircle, Sparkles } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

import {
  SPACE_CONFIGS,
  getAvailability,
  calculateBookingPrice,
  timeToMinutes,
  minutesToTime,
} from "@/lib/booking";
import { cn } from "@/lib/utils";


export interface StepTimeProps {
  selectedSpaceSlug: string;
  selectedDate: string;
  startTime: string; // "HH:mm"
  durationHours: number;
  onSelectStartTime: (time: string) => void;
  onChangeDuration: (hours: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepTime({
  selectedSpaceSlug,
  selectedDate,
  startTime,
  durationHours,
  onSelectStartTime,
  onChangeDuration,
  onNext,
  onBack,
}: StepTimeProps) {
  const space = SPACE_CONFIGS[selectedSpaceSlug] ?? SPACE_CONFIGS["podcast-suite"];

  // Fetch slot availability for chosen date
  const slots = useMemo(() => {
    return getAvailability(selectedSpaceSlug, selectedDate);
  }, [selectedSpaceSlug, selectedDate]);

  // Available starting times (must have status === "available")
  const availableStartSlots = slots.filter((s) => s.status === "available");

  // Calculate session end time
  const endTime = useMemo(() => {
    if (!startTime) return null;
    const startM = timeToMinutes(startTime);
    const endM = startM + durationHours * 60;
    return minutesToTime(endM);
  }, [startTime, durationHours]);

  // Live Price Calculation with Day Rate Crossover
  const pricing = useMemo(() => {
    return calculateBookingPrice(selectedSpaceSlug, durationHours);
  }, [selectedSpaceSlug, durationHours]);

  // Check if current duration exceeds 18:00 GMT closing time
  const isClosingExceeded = useMemo(() => {
    if (!startTime) return false;
    const startM = timeToMinutes(startTime);
    const endM = startM + durationHours * 60;
    return endM > 18 * 60; // 18:00
  }, [startTime, durationHours]);

  const formattedDate = useMemo(() => {
    if (!selectedDate) return "";
    const d = new Date(`${selectedDate}T00:00:00Z`);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  }, [selectedDate]);

  return (
    <div className="w-full flex flex-col">
      {/* Header instructions */}
      <div className="mb-6 sm:mb-8">
        <Heading level={3} className="text-ink mb-1">
          Step 3: Select time & duration
        </Heading>
        <p className="text-ink-2 text-sm sm:text-base">
          Booking <strong className="text-ink">{space.name}</strong> for{" "}
          <strong className="text-ink">{formattedDate}</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Left: Start Time Slot Chips (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-sm text-ink font-display uppercase tracking-wider">
              1. Choose Starting Time
            </h4>
            <span className="font-mono text-xs text-ink-2">Accra Time (GMT)</span>
          </div>

          {availableStartSlots.length === 0 ? (
            <div className="p-8 border border-rule rounded-[var(--radius)] text-center text-ink-2 font-mono text-sm bg-paper-2/40">
              No available slots remaining on this date. Please choose another day.
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {availableStartSlots.map((slot) => {
                const isSelected = startTime === slot.start;

                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => onSelectStartTime(slot.start)}
                    aria-pressed={isSelected}
                    className={cn(
                      "py-3 px-2 rounded-[var(--radius)] font-mono text-xs font-semibold transition-all border text-center cursor-pointer select-none",
                      isSelected
                        ? "bg-ink text-paper border-red ring-2 ring-red/30 shadow-md font-bold"
                        : "bg-paper text-ink border-rule hover:border-ink hover:bg-paper-2"
                    )}
                  >
                    {slot.displayTime}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Duration Stepper & Live Price Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-paper border border-rule rounded-[var(--radius)] p-6 flex flex-col justify-between h-full shadow-sm">
            <div>
              <h4 className="font-bold text-sm text-ink font-display uppercase tracking-wider mb-4 pb-2 border-b border-rule">
                2. Session Duration
              </h4>

              {/* Duration Stepper */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-ink-2">Hours Needed:</span>
                  <span className="font-mono text-[11px] text-ink-2">
                    Min {space.minDurationHours} hrs · Max {space.maxDurationHours} hrs
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={durationHours <= space.minDurationHours}
                    onClick={() => onChangeDuration(durationHours - 1)}
                    aria-label="Decrease duration"
                    className="w-11 h-11 rounded-[var(--radius)] border border-rule hover:border-ink disabled:opacity-30 disabled:hover:border-rule flex items-center justify-center font-mono text-lg font-bold transition-colors cursor-pointer"
                  >
                    −
                  </button>

                  <div className="flex-1 py-2 px-4 rounded-[var(--radius)] bg-paper-2 border border-rule text-center font-mono text-base font-bold text-ink">
                    {durationHours} {durationHours === 1 ? "Hour" : "Hours"}
                  </div>

                  <button
                    type="button"
                    disabled={durationHours >= space.maxDurationHours || isClosingExceeded}
                    onClick={() => onChangeDuration(durationHours + 1)}
                    aria-label="Increase duration"
                    className="w-11 h-11 rounded-[var(--radius)] border border-rule hover:border-ink disabled:opacity-30 disabled:hover:border-rule flex items-center justify-center font-mono text-lg font-bold transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {isClosingExceeded && (
                  <p className="mt-2 text-xs text-red font-mono flex items-center gap-1.5" role="alert">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>Session would end past 18:00 closing time.</span>
                  </p>
                )}
              </div>

              {/* Live Session Time Range */}
              {startTime && endTime && (
                <div className="mb-6 p-3 bg-paper-2 rounded-[var(--radius)] border border-rule text-xs font-mono text-ink-2 flex items-center justify-between">
                  <span>Reserved Slot:</span>
                  <strong className="text-ink font-bold">
                    {startTime} – {endTime} GMT
                  </strong>
                </div>
              )}

              {/* Day Rate Crossover Callout Banner */}
              {pricing.isDayRateApplied && (
                <div className="mb-6 p-3.5 bg-red/10 border border-red/30 rounded-[var(--radius)] text-xs text-ink">
                  <div className="font-bold text-red flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-red" aria-hidden="true" />
                    <span>Day Rate Discount Applied</span>
                  </div>
                  <p className="text-ink-2 leading-relaxed">
                    Automatically switched from hourly rate to the full day rate, saving you{" "}
                    <strong>GH₵ {pricing.savings.toLocaleString()}</strong>.
                  </p>
                </div>
              )}
            </div>


            {/* Price Total Card */}
            <div className="pt-4 border-t border-rule">
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-2">
                  Total Estimated Fee
                </span>
                <span className="font-black text-2xl sm:text-3xl text-ink tracking-tight">
                  GH₵ {pricing.total.toLocaleString()}
                </span>
              </div>
              <p className="font-mono text-[11px] text-ink-2 text-right">
                {pricing.rateExplanation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-rule flex items-center justify-between">
        <Button type="button" onClick={onBack} variant="ghost" size="md">
          ← Back to Date
        </Button>

        <Button
          type="button"
          onClick={onNext}
          disabled={!startTime || isClosingExceeded}
          variant="primary"
          size="md"
        >
          Continue to Details →
        </Button>
      </div>
    </div>
  );
}

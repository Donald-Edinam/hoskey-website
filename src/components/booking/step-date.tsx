"use client";

import React, { useState, useMemo } from "react";
import { Heading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

import {
  SPACE_CONFIGS,
  isDateAvailable,
  getAccraToday,
  FORWARD_BOOKING_DAYS,
} from "@/lib/booking";
import { cn } from "@/lib/utils";

export interface StepDateProps {
  selectedSpaceSlug: string;
  selectedDate: string; // "YYYY-MM-DD"
  onSelectDate: (date: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function StepDate({
  selectedSpaceSlug,
  selectedDate,
  onSelectDate,
  onNext,
  onBack,
}: StepDateProps) {
  const space = SPACE_CONFIGS[selectedSpaceSlug] ?? SPACE_CONFIGS["podcast-suite"];
  const todayStr = getAccraToday();

  // Calendar month state (defaults to current month)
  const [currentMonthDate, setCurrentMonthDate] = useState(() => {
    if (selectedDate) return new Date(`${selectedDate}T00:00:00Z`);
    return new Date(`${todayStr}T00:00:00Z`);
  });

  const year = currentMonthDate.getUTCFullYear();
  const month = currentMonthDate.getUTCMonth(); // 0-indexed

  const monthName = currentMonthDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  // Calculate calendar grid days for this month
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
    const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));
    const daysInMonth = lastDayOfMonth.getUTCDate();

    // Weekday of 1st day (0 = Sunday -> map to 6, 1 = Monday -> map to 0)
    let startDayOffset = firstDayOfMonth.getUTCDay() - 1;
    if (startDayOffset === -1) startDayOffset = 6;

    const days: {
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      available: boolean;
      reason?: string;
      isToday: boolean;
      isSelected: boolean;
    }[] = [];

    // Empty padding days for previous month
    for (let i = 0; i < startDayOffset; i++) {
      const prevDate = new Date(Date.UTC(year, month, 1 - (startDayOffset - i)));
      const pDateStr = prevDate.toISOString().split("T")[0];
      days.push({
        dateStr: pDateStr,
        dayNumber: prevDate.getUTCDate(),
        isCurrentMonth: false,
        available: false,
        reason: "Different month",
        isToday: pDateStr === todayStr,
        isSelected: pDateStr === selectedDate,
      });
    }

    // Days in current month
    const maxBookingDate = new Date();
    maxBookingDate.setUTCDate(maxBookingDate.getUTCDate() + FORWARD_BOOKING_DAYS);
    const maxBookingDateStr = maxBookingDate.toISOString().split("T")[0];

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(Date.UTC(year, month, d));
      const dateStr = dateObj.toISOString().split("T")[0];
      const isPast = dateStr < todayStr;
      const isBeyondWindow = dateStr > maxBookingDateStr;

      let available = false;
      let reason: string | undefined;

      if (isPast) {
        reason = "Past date";
      } else if (isBeyondWindow) {
        reason = "Beyond 60-day window";
      } else {
        const availCheck = isDateAvailable(selectedSpaceSlug, dateStr);
        available = availCheck.available;
        reason = availCheck.reason;
      }

      days.push({
        dateStr,
        dayNumber: d,
        isCurrentMonth: true,
        available,
        reason,
        isToday: dateStr === todayStr,
        isSelected: dateStr === selectedDate,
      });
    }

    return days;
  }, [year, month, todayStr, selectedDate, selectedSpaceSlug]);

  const prevMonth = () => {
    setCurrentMonthDate(new Date(Date.UTC(year, month - 1, 1)));
  };

  const nextMonth = () => {
    setCurrentMonthDate(new Date(Date.UTC(year, month + 1, 1)));
  };

  // Human-readable formatted selected date display
  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return null;
    const d = new Date(`${selectedDate}T00:00:00Z`);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }, [selectedDate]);

  return (
    <div className="w-full flex flex-col">
      {/* Header instructions */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Heading level={3} className="text-ink mb-1">
            Step 2: Choose booking date
          </Heading>
          <p className="text-ink-2 text-sm sm:text-base">
            Select an available date for your session in the <strong className="text-ink">{space.name}</strong>.
          </p>
        </div>

        <div className="font-mono text-xs text-ink-2 flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red" aria-hidden="true" />
            Mon – Sat (08:00 – 18:00)
          </span>
          <span className="flex items-center gap-1.5 text-ink-2/60">
            <span className="w-2 h-2 rounded-full bg-rule" aria-hidden="true" />
            Sundays Closed
          </span>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="bg-paper border border-rule rounded-[var(--radius)] p-6 sm:p-8 max-w-2xl mx-auto w-full mb-10 shadow-sm">
        {/* Month switcher header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-rule">
          <h4 className="font-bold text-lg text-ink font-display">{monthName}</h4>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              className="w-8 h-8 rounded-[var(--radius)] border border-rule hover:border-ink flex items-center justify-center font-mono text-xs transition-colors cursor-pointer"
            >
              ←
            </button>
            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className="w-8 h-8 rounded-[var(--radius)] border border-rule hover:border-ink flex items-center justify-center font-mono text-xs transition-colors cursor-pointer"
            >
              →
            </button>
          </div>
        </div>

        {/* Weekday headers (Monday start) */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
          {WEEKDAYS.map((wd) => (
            <span
              key={wd}
              className="font-mono text-[11px] font-semibold text-ink-2 uppercase tracking-wider py-1"
            >
              {wd}
            </span>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2" role="grid" aria-label={monthName}>
          {calendarDays.map((day, idx) => {
            if (!day.isCurrentMonth) {
              return (
                <div
                  key={idx}
                  className="aspect-square flex items-center justify-center text-ink-2/20 text-xs font-mono select-none"
                  aria-hidden="true"
                >
                  {day.dayNumber}
                </div>
              );
            }

            return (
              <button
                key={day.dateStr}
                type="button"
                disabled={!day.available}
                onClick={() => onSelectDate(day.dateStr)}
                title={day.reason}
                aria-label={`${day.dateStr}${day.isToday ? " (Today)" : ""}${
                  !day.available ? ` - ${day.reason}` : ""
                }`}
                aria-pressed={day.isSelected}
                className={cn(
                  "aspect-square rounded-[var(--radius)] flex flex-col items-center justify-center font-mono text-xs transition-all relative select-none",
                  day.isSelected
                    ? "bg-ink text-paper font-bold ring-2 ring-red shadow-md"
                    : day.available
                    ? "bg-paper text-ink border border-rule hover:border-ink hover:bg-paper-2 cursor-pointer font-medium"
                    : "bg-paper-2/40 text-ink-2/30 border border-rule/30 cursor-not-allowed line-through"
                )}
              >
                <span>{day.dayNumber}</span>

                {/* Today dot indicator */}
                {day.isToday && (
                  <span
                    className={cn(
                      "w-1 h-1 rounded-full absolute bottom-1.5",
                      day.isSelected ? "bg-red" : "bg-red"
                    )}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-rule flex items-center justify-between">
        <Button type="button" onClick={onBack} variant="ghost" size="md">
          ← Back to Space
        </Button>

        <div className="font-mono text-xs text-ink-2 hidden sm:block">
          {formattedSelectedDate ? (
            <span>
              Date: <strong className="text-ink">{formattedSelectedDate}</strong>
            </span>
          ) : (
            <span>Select a date from the calendar to proceed.</span>
          )}
        </div>

        <Button
          type="button"
          onClick={onNext}
          disabled={!selectedDate}
          variant="primary"
          size="md"
        >
          Continue to Time →
        </Button>
      </div>
    </div>
  );
}

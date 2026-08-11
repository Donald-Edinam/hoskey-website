"use client";

import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

import {
  BookingDraft,
  validateContactDetails,
  SPACE_CONFIGS,
  formatGhanaPhone,
} from "@/lib/booking";
import { cn } from "@/lib/utils";


export interface StepDetailsProps {
  draft: BookingDraft;
  onChangeDraft: (fields: Partial<BookingDraft>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepDetails({
  draft,
  onChangeDraft,
  onNext,
  onBack,
}: StepDetailsProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const space = SPACE_CONFIGS[draft.spaceSlug] ?? SPACE_CONFIGS["podcast-suite"];

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const result = validateContactDetails(draft);
    setErrors(result.errors);
  };

  const handlePhoneBlur = () => {
    handleBlur("phone");
    if (draft.phone) {
      onChangeDraft({ phone: formatGhanaPhone(draft.phone) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      phone: true,
      email: true,
      projectType: true,
      headcount: true,
    });

    const result = validateContactDetails(draft);
    setErrors(result.errors);

    if (result.valid) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col" noValidate>
      {/* Header instructions */}
      <div className="mb-6 sm:mb-8">
        <Heading level={3} className="text-ink mb-1">
          Step 4: Contact & session details
        </Heading>
        <p className="text-ink-2 text-sm sm:text-base max-w-[54ch]">
          Tell us who is booking and what you plan to record so our studio crew can prepare the space.
        </p>
      </div>

      <div className="bg-paper border border-rule rounded-[var(--radius)] p-6 sm:p-8 max-w-2xl mx-auto w-full mb-10 shadow-sm space-y-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="booking-name"
            className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink mb-2"
          >
            Full Name or Organization <span className="text-red">*</span>
          </label>
          <input
            id="booking-name"
            type="text"
            required
            value={draft.name}
            onChange={(e) => onChangeDraft({ name: e.target.value })}
            onBlur={() => handleBlur("name")}
            placeholder="e.g. Kwame Mensah / TechPulse Media"
            className={cn(
              "w-full px-4 py-3 bg-paper-2 border rounded-[var(--radius)] text-sm text-ink placeholder:text-ink-2/40 transition-colors focus:outline-2 focus:outline-red",
              touched.name && errors.name ? "border-red bg-red/5" : "border-rule hover:border-ink"
            )}
          />
          {touched.name && errors.name && (
            <p className="mt-1.5 text-xs text-red font-mono flex items-center gap-1.5" role="alert">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Ghana Phone */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="booking-phone"
              className="font-mono text-xs font-semibold uppercase tracking-wider text-ink"
            >
              Phone / WhatsApp Number <span className="text-red">*</span>
            </label>
            <span className="font-mono text-[11px] text-ink-2">Ghana format</span>
          </div>
          <input
            id="booking-phone"
            type="tel"
            required
            value={draft.phone}
            onChange={(e) => onChangeDraft({ phone: e.target.value })}
            onBlur={handlePhoneBlur}
            placeholder="e.g. 024 123 4567 or +233 24 123 4567"
            className={cn(
              "w-full px-4 py-3 bg-paper-2 border rounded-[var(--radius)] text-sm text-ink font-mono placeholder:text-ink-2/40 transition-colors focus:outline-2 focus:outline-red",
              touched.phone && errors.phone ? "border-red bg-red/5" : "border-rule hover:border-ink"
            )}
          />
          {touched.phone && errors.phone && (
            <p className="mt-1.5 text-xs text-red font-mono flex items-center gap-1.5" role="alert">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* Email Address (Optional) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="booking-email"
              className="font-mono text-xs font-semibold uppercase tracking-wider text-ink"
            >
              Email Address <span className="text-ink-2 font-normal">(Optional)</span>
            </label>
            <span className="font-mono text-[11px] text-ink-2">For calendar invites</span>
          </div>
          <input
            id="booking-email"
            type="email"
            value={draft.email ?? ""}
            onChange={(e) => onChangeDraft({ email: e.target.value })}
            onBlur={() => handleBlur("email")}
            placeholder="e.g. kwame@example.com"
            className={cn(
              "w-full px-4 py-3 bg-paper-2 border rounded-[var(--radius)] text-sm text-ink placeholder:text-ink-2/40 transition-colors focus:outline-2 focus:outline-red",
              touched.email && errors.email ? "border-red bg-red/5" : "border-rule hover:border-ink"
            )}
          />
          {touched.email && errors.email && (
            <p className="mt-1.5 text-xs text-red font-mono flex items-center gap-1.5" role="alert">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Project Description */}
        <div>
          <label
            htmlFor="booking-project"
            className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink mb-2"
          >
            What are you recording or hosting? <span className="text-red">*</span>
          </label>
          <textarea
            id="booking-project"
            rows={3}
            required
            value={draft.projectType}
            onChange={(e) => onChangeDraft({ projectType: e.target.value })}
            onBlur={() => handleBlur("projectType")}
            placeholder="e.g. 4-Episode video podcast recording with 2 guests and 4K camera switch"
            className={cn(
              "w-full px-4 py-3 bg-paper-2 border rounded-[var(--radius)] text-sm text-ink placeholder:text-ink-2/40 transition-colors focus:outline-2 focus:outline-red resize-none",
              touched.projectType && errors.projectType
                ? "border-red bg-red/5"
                : "border-rule hover:border-ink"
            )}
          />
          {touched.projectType && errors.projectType && (
            <p className="mt-1.5 text-xs text-red font-mono flex items-center gap-1.5" role="alert">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.projectType}</span>
            </p>
          )}
        </div>

        {/* Headcount */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="booking-headcount"
              className="font-mono text-xs font-semibold uppercase tracking-wider text-ink"
            >
              Number of Attendees / Crew <span className="text-red">*</span>
            </label>
            <span className="font-mono text-[11px] text-ink-2">
              Max capacity: {space.capacity} people
            </span>
          </div>
          <input
            id="booking-headcount"
            type="number"
            min={1}
            max={space.capacity}
            value={draft.headcount || 1}
            onChange={(e) => onChangeDraft({ headcount: parseInt(e.target.value, 10) || 1 })}
            onBlur={() => handleBlur("headcount")}
            className={cn(
              "w-full px-4 py-3 bg-paper-2 border rounded-[var(--radius)] text-sm text-ink font-mono transition-colors focus:outline-2 focus:outline-red",
              touched.headcount && errors.headcount
                ? "border-red bg-red/5"
                : "border-rule hover:border-ink"
            )}
          />
          {touched.headcount && errors.headcount && (
            <p className="mt-1.5 text-xs text-red font-mono flex items-center gap-1.5" role="alert">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.headcount}</span>
            </p>
          )}
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-rule flex items-center justify-between">
        <Button type="button" onClick={onBack} variant="ghost" size="md">
          ← Back to Time
        </Button>

        <Button type="submit" variant="primary" size="md">
          Review & Confirm →
        </Button>
      </div>
    </form>
  );
}

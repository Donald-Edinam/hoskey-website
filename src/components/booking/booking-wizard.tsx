"use client";

import React, { useState, useEffect, useCallback, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  BookingDraft,
  BookingStep,
  loadSavedDraft,
  saveDraft,
  SPACE_CONFIGS,
  validateContactDetails,
} from "@/lib/booking";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display } from "@/components/ui/typography";
import { BookingProgress } from "./booking-progress";
import { StepSpace } from "./step-space";
import { StepDate } from "./step-date";
import { StepTime } from "./step-time";
import { StepDetails } from "./step-details";
import { StepConfirm } from "./step-confirm";

const INITIAL_DRAFT: BookingDraft = {
  spaceSlug: "podcast-suite",
  date: "",
  startTime: "10:00",
  durationHours: 2,
  name: "",
  phone: "",
  email: "",
  projectType: "",
  headcount: 2,
};

export function BookingWizard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Read step from URL query or fallback to "space"
  const stepParam = searchParams.get("step") as BookingStep | null;
  const initialSpaceParam = searchParams.get("space");

  const currentStep: BookingStep = stepParam || "space";

  // Booking Draft State (Predictable SSR initialization)
  const [draft, setDraft] = useState<BookingDraft>(() => ({
    ...INITIAL_DRAFT,
    ...(initialSpaceParam && SPACE_CONFIGS[initialSpaceParam]
      ? { spaceSlug: initialSpaceParam }
      : {}),
  }));

  // Restore saved draft asynchronously on client mount
  useEffect(() => {
    const saved = loadSavedDraft();
    if (saved) {
      queueMicrotask(() => {
        setDraft((prev) => ({ ...prev, ...saved }));
      });
    }
  }, []);

  // Keep draft in sync with sessionStorage
  useEffect(() => {
    saveDraft(draft);
  }, [draft]);



  // Navigate to a specific step and update the URL query
  const navigateToStep = useCallback(
    (nextStep: BookingStep) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", nextStep);
      if (draft.spaceSlug) {
        params.set("space", draft.spaceSlug);
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams, draft.spaceSlug]
  );


  const updateDraft = (fields: Partial<BookingDraft>) => {
    setDraft((prev) => ({ ...prev, ...fields }));
  };

  // Step access gate checks
  const canAccessStep = (step: BookingStep): boolean => {
    if (step === "space") return true;
    if (step === "date") return Boolean(draft.spaceSlug);
    if (step === "time") return Boolean(draft.spaceSlug && draft.date);
    if (step === "details") return Boolean(draft.spaceSlug && draft.date && draft.startTime);
    if (step === "confirm") {
      const contactVal = validateContactDetails(draft);
      return Boolean(draft.spaceSlug && draft.date && draft.startTime && contactVal.valid);
    }
    return false;
  };

  return (
    <Section variant="default" className="pt-[clamp(32px,5vw,64px)] pb-[clamp(64px,8vw,112px)]">
      <Container>
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <Eyebrow className="mb-3">Demes shr Studios · Online Booking</Eyebrow>
          <Display level={2} className="text-ink mb-3 [text-wrap:balance]">
            Book Studio Session
          </Display>
          <p className="text-ink-2 text-sm sm:text-base">
            Reserve podcast rooms, vocal isolation booths, or co-working desks with transparent rates.
          </p>
        </div>

        {/* 5-Step Progress Rail */}
        <BookingProgress
          currentStep={currentStep}
          onStepClick={(step) => navigateToStep(step)}
          canNavigateToStep={canAccessStep}
        />

        {/* Active Step Content */}
        <div className="w-full">
          {currentStep === "space" && (
            <StepSpace
              selectedSpaceSlug={draft.spaceSlug}
              onSelectSpace={(slug) => {
                const spaceConfig = SPACE_CONFIGS[slug];
                updateDraft({
                  spaceSlug: slug,
                  durationHours: spaceConfig ? Math.max(draft.durationHours, spaceConfig.minDurationHours) : 2,
                });
              }}
              onNext={() => navigateToStep("date")}
            />
          )}

          {currentStep === "date" && (
            <StepDate
              selectedSpaceSlug={draft.spaceSlug}
              selectedDate={draft.date}
              onSelectDate={(date) => updateDraft({ date })}
              onNext={() => navigateToStep("time")}
              onBack={() => navigateToStep("space")}
            />
          )}

          {currentStep === "time" && (
            <StepTime
              selectedSpaceSlug={draft.spaceSlug}
              selectedDate={draft.date}
              startTime={draft.startTime}
              durationHours={draft.durationHours}
              onSelectStartTime={(time) => updateDraft({ startTime: time })}
              onChangeDuration={(hours) => updateDraft({ durationHours: hours })}
              onNext={() => navigateToStep("details")}
              onBack={() => navigateToStep("date")}
            />
          )}

          {currentStep === "details" && (
            <StepDetails
              draft={draft}
              onChangeDraft={updateDraft}
              onNext={() => navigateToStep("confirm")}
              onBack={() => navigateToStep("time")}
            />
          )}

          {currentStep === "confirm" && (
            <StepConfirm
              draft={draft}
              onBack={() => navigateToStep("details")}
              onReturnToTime={() => navigateToStep("time")}
              onSuccess={() => {
                // Keep on confirm screen for success review
              }}
            />
          )}
        </div>
      </Container>
    </Section>
  );
}

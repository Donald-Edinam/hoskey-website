"use client";

import React, { useState, useMemo } from "react";
import { Check, AlertCircle, AlertTriangle, MessageSquare } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Img } from "@/components/ui/img";
import {
  BookingDraft,
  SPACE_CONFIGS,
  calculateBookingPrice,
  timeToMinutes,
  minutesToTime,
  submitBookingAction,
  clearSavedDraft,
} from "@/lib/booking";
import { getStudioBookingWhatsAppLink } from "@/lib/whatsapp";



export interface StepConfirmProps {
  draft: BookingDraft;
  onBack: () => void;
  onReturnToTime: () => void;
  onSuccess: () => void;
}

export function StepConfirm({
  draft,
  onBack,
  onReturnToTime,
  onSuccess,
}: StepConfirmProps) {
  const space = SPACE_CONFIGS[draft.spaceSlug] ?? SPACE_CONFIGS["podcast-suite"];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isCollision, setIsCollision] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  // Time calculations
  const endTime = useMemo(() => {
    if (!draft.startTime) return "";
    const startM = timeToMinutes(draft.startTime);
    const endM = startM + draft.durationHours * 60;
    return minutesToTime(endM);
  }, [draft.startTime, draft.durationHours]);

  const pricing = useMemo(() => {
    return calculateBookingPrice(draft.spaceSlug, draft.durationHours);
  }, [draft.spaceSlug, draft.durationHours]);

  const formattedDate = useMemo(() => {
    if (!draft.date) return "";
    const d = new Date(`${draft.date}T00:00:00Z`);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }, [draft.date]);

  // WhatsApp Link generator
  const whatsappUrl = useMemo(() => {
    return getStudioBookingWhatsAppLink({
      spaceName: space.name,
      formattedDate,
      timeRange: `${draft.startTime} - ${endTime} GMT`,
      durationHours: draft.durationHours,
      totalCostFormatted: `GH₵ ${pricing.total.toLocaleString()}`,
      rateTypeExplanation: pricing.appliedRate === "day" ? "Day Rate" : "Standard Hourly Rate",
      clientName: draft.name,
      phone: draft.phone,
      email: draft.email,
      projectType: draft.projectType,
      headcount: draft.headcount,
    });
  }, [space.name, formattedDate, draft, endTime, pricing]);

  // Handle WhatsApp Click (Primary)
  const handleWhatsAppConfirm = () => {
    clearSavedDraft();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setBookingConfirmed(true);
    onSuccess();
  };

  // Handle Email / Server Action Submit (Secondary)
  const handleEmailSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);
    setIsCollision(false);

    try {
      const res = await submitBookingAction(draft);
      if (!res.success) {
        if (res.collision) {
          setIsCollision(true);
        }
        setSubmissionError(res.error ?? "Failed to submit booking request.");
        return;
      }

      clearSavedDraft();
      setConfirmedBookingId(res.bookingId ?? "HOSKEY-BK-CONFIRMED");
      setBookingConfirmed(true);
      onSuccess();
    } catch {
      setSubmissionError("Network error occurred. You can still confirm immediately via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success view
  if (bookingConfirmed) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-12 px-6 bg-paper border border-rule rounded-[var(--radius)] shadow-md">
        <div className="w-16 h-16 bg-red/10 text-red border border-red/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-red stroke-[2.5]" aria-hidden="true" />
        </div>

        <Heading level={3} className="text-ink mb-2">
          Booking Request Ready!
        </Heading>

        <p className="text-ink-2 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
          {confirmedBookingId
            ? `Your request (${confirmedBookingId}) has been registered with our team.`
            : "Your formatted booking request is ready for Demes shr Studios."}
        </p>

        <div className="p-4 bg-paper-2 rounded-[var(--radius)] border border-rule font-mono text-xs text-ink-2 mb-8 text-left space-y-1">
          <div><strong>Space:</strong> {space.name}</div>
          <div><strong>Date:</strong> {formattedDate}</div>
          <div><strong>Time:</strong> {draft.startTime} – {endTime} GMT ({draft.durationHours} hrs)</div>
          <div><strong>Estimated Total:</strong> GH₵ {pricing.total.toLocaleString()}</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-red hover:bg-red/90 text-white rounded-[var(--radius)] font-mono text-xs uppercase tracking-wider font-semibold shadow-md transition-colors inline-flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Chat with Studio Manager on WhatsApp →</span>
          </a>

          <Button href="/studios" variant="ghost" size="md">
            Return to Studios Overview
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {/* Header instructions */}
      <div className="mb-6 sm:mb-8">
        <Heading level={3} className="text-ink mb-1">
          Step 5: Review & confirm booking
        </Heading>
        <p className="text-ink-2 text-sm sm:text-base">
          Please verify your session details before sending your request to the studio team.
        </p>
      </div>

      {/* Collision Alert if slot was taken */}
      {isCollision && (
        <div className="p-5 mb-8 bg-red/10 border-2 border-red rounded-[var(--radius)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-red text-sm mb-1 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red shrink-0" aria-hidden="true" />
              <span>Time Slot Collision Detected</span>
            </h4>
            <p className="text-xs text-ink-2 leading-relaxed">
              {submissionError ?? "This time slot was just booked by another creator. Please pick an alternative time on this date."}
            </p>
          </div>

          <button
            type="button"
            onClick={onReturnToTime}
            className="px-4 py-2 bg-red text-white text-xs font-mono font-bold uppercase rounded-[var(--radius)] hover:bg-red/90 transition-colors shrink-0 cursor-pointer"
          >
            Pick another time →
          </button>
        </div>
      )}

      {submissionError && !isCollision && (
        <div className="p-4 mb-8 bg-red/10 border border-red/30 rounded-[var(--radius)] text-xs text-red font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{submissionError}</span>
        </div>
      )}


      {/* Summary Card */}
      <div className="bg-paper border border-rule rounded-[var(--radius)] overflow-hidden max-w-3xl mx-auto w-full mb-10 shadow-sm">
        {/* Top Space Bar */}
        <div className="p-6 sm:p-8 bg-ink text-paper flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-[var(--radius)] overflow-hidden bg-ink-2 shrink-0">
              <Img src={space.image} alt={space.name} fill className="object-cover" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-paper-2 uppercase tracking-widest">
                Reserved Space
              </span>
              <h4 className="text-xl font-bold text-paper font-display">{space.name}</h4>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="font-mono text-[10px] text-paper-2 uppercase tracking-widest">
              Total Estimated Fee
            </span>
            <div className="text-2xl sm:text-3xl font-black text-paper tracking-tight">
              GH₵ {pricing.total.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Structured Details Table */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-paper">
          {/* Booking Schedule */}
          <div>
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-ink-2 mb-3 pb-1 border-b border-rule">
              Schedule & Timing
            </h5>
            <dl className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <dt className="text-ink-2">Date:</dt>
                <dd className="font-bold text-ink">{formattedDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-2">Time Slot:</dt>
                <dd className="font-bold text-ink">
                  {draft.startTime} – {endTime} GMT
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-2">Duration:</dt>
                <dd className="font-bold text-ink">{draft.durationHours} Hours</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-2">Rate Applied:</dt>
                <dd className="font-bold text-red uppercase tracking-wider">
                  {pricing.appliedRate === "day" ? "Day Rate" : "Hourly"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Contact Details */}
          <div>
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-ink-2 mb-3 pb-1 border-b border-rule">
              Client Information
            </h5>
            <dl className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <dt className="text-ink-2">Name:</dt>
                <dd className="font-bold text-ink truncate max-w-[180px]">{draft.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-2">Phone:</dt>
                <dd className="font-bold text-ink">{draft.phone}</dd>
              </div>
              {draft.email && (
                <div className="flex justify-between">
                  <dt className="text-ink-2">Email:</dt>
                  <dd className="font-bold text-ink truncate max-w-[180px]">{draft.email}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-ink-2">Headcount:</dt>
                <dd className="font-bold text-ink">{draft.headcount} people</dd>
              </div>
            </dl>
          </div>

          {/* Project Details */}
          <div className="sm:col-span-2 pt-2">
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-ink-2 mb-2">
              Session Description
            </h5>
            <p className="text-xs text-ink bg-paper-2 p-3 rounded-[var(--radius)] border border-rule leading-relaxed">
              {draft.projectType}
            </p>
          </div>
        </div>

        {/* Action Handoff Bar */}
        <div className="p-6 sm:p-8 bg-paper-2 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h5 className="font-bold text-sm text-ink mb-0.5">Send Request to Studio Team</h5>
            <p className="text-xs text-ink-2">
              WhatsApp provides immediate, instant confirmation with our studio manager.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Primary Action: WhatsApp */}
            <Button
              type="button"
              onClick={handleWhatsAppConfirm}
              variant="primary"
              size="md"
              className="w-full sm:w-auto justify-center gap-2"
            >
              <span>Confirm on WhatsApp</span>
              <MessageSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
            </Button>

            {/* Secondary Action: Email Request */}
            <Button
              type="button"
              onClick={handleEmailSubmit}
              disabled={isSubmitting}
              variant="ghost"
              size="md"
              className="w-full sm:w-auto justify-center"
            >
              {isSubmitting ? "Submitting..." : "Email Request"}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-rule flex items-center justify-between">
        <Button type="button" onClick={onBack} variant="ghost" size="md">
          ← Back to Details
        </Button>

      </div>
    </div>
  );
}

"use server";

import { BookingDraft, BookingRequestRecord } from "./types";
import {
  validateBookingSlot,
  calculateBookingPrice,
  timeToMinutes,
  minutesToTime,
} from "./availability";
import { validateContactDetails } from "./validation";
import { SPACE_CONFIGS } from "./config";

// In-memory demo store for mock bookings across requests
const ACTIVE_SERVER_BOOKINGS: BookingRequestRecord[] = [];

export interface BookingSubmissionResponse {
  success: boolean;
  bookingId?: string;
  error?: string;
  collision?: boolean;
  summary?: BookingRequestRecord;
}

/**
 * Server action to re-validate and submit a studio booking request.
 * Prevents double bookings and race conditions.
 */
export async function submitBookingAction(
  draft: BookingDraft
): Promise<BookingSubmissionResponse> {
  // 1. Validate contact details
  const contactValidation = validateContactDetails(draft);
  if (!contactValidation.valid) {
    const firstError = Object.values(contactValidation.errors)[0];
    return {
      success: false,
      error: firstError ?? "Please check your contact information.",
    };
  }

  // 2. Validate space slug exists
  if (!SPACE_CONFIGS[draft.spaceSlug]) {
    return {
      success: false,
      error: "Selected studio space is invalid.",
    };
  }

  // 3. Re-validate slot availability against server state
  const validation = validateBookingSlot(draft, ACTIVE_SERVER_BOOKINGS);
  if (!validation.valid) {
    return {
      success: false,
      collision: true,
      error: validation.reason ?? "This time slot is no longer available.",
    };
  }

  // 4. Create confirmed booking request record
  const calculation = calculateBookingPrice(draft.spaceSlug, draft.durationHours);
  const bookingId = `HOSKEY-BK-${Date.now().toString(36).toUpperCase()}`;
  const startM = timeToMinutes(draft.startTime);
  const endM = startM + draft.durationHours * 60;
  const endTime = minutesToTime(endM);

  const record: BookingRequestRecord = {
    ...draft,
    id: bookingId,
    createdAt: new Date().toISOString(),
    endTime,
    calculation,
    status: "pending_review",
  };

  ACTIVE_SERVER_BOOKINGS.push(record);


  return {
    success: true,
    bookingId,
    summary: record,
  };
}

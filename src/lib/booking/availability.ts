import {
  Slot,
  ExistingBooking,
  SpaceBookingConfig,
  BookingCalculation,
  BookingDraft,
} from "./types";
import {
  SPACE_CONFIGS,
  DEFAULT_OPENING_HOURS,
  BLACKOUT_DATES,
} from "./config";

/**
 * Parses "HH:mm" into total minutes from midnight.
 */
export function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Formats total minutes from midnight into "HH:mm".
 */
export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * Returns today's date in Africa/Accra (UTC+0) formatted as "YYYY-MM-DD".
 */
export function getAccraToday(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

/**
 * Checks if a date is on or before today.
 */
export function isPastDate(dateStr: string): boolean {
  const today = getAccraToday();
  return dateStr < today;
}

/**
 * Determines day availability for the 60-day calendar.
 */
export function isDateAvailable(
  spaceSlug: string,
  dateStr: string,
  existingBookings: ExistingBooking[] = []
): { available: boolean; reason?: string } {
  if (isPastDate(dateStr)) {
    return { available: false, reason: "Past date" };
  }

  if (BLACKOUT_DATES.includes(dateStr)) {
    return { available: false, reason: "Studio closed (Holiday / Maintenance)" };
  }

  // Determine weekday in UTC (Africa/Accra has 0 offset)
  const dateObj = new Date(`${dateStr}T00:00:00Z`);
  const dayOfWeek = dateObj.getUTCDay(); // 0 = Sunday, 1 = Monday...
  const hours = DEFAULT_OPENING_HOURS[dayOfWeek];

  if (!hours || hours.closed) {
    return { available: false, reason: "Closed on Sundays" };
  }

  // Check if fully booked
  const slots = getAvailability(spaceSlug, dateStr, existingBookings);
  const hasAvailableSlot = slots.some((s) => s.status === "available");

  if (!hasAvailableSlot) {
    return { available: false, reason: "Fully booked" };
  }

  return { available: true };
}

/**
 * Generates all discrete slots for a given space and date.
 */
export function getAvailability(
  spaceSlug: string,
  dateStr: string,
  existingBookings: ExistingBooking[] = [],
  customConfig?: SpaceBookingConfig
): Slot[] {
  const config = customConfig ?? SPACE_CONFIGS[spaceSlug] ?? SPACE_CONFIGS["podcast-suite"];
  const dateObj = new Date(`${dateStr}T00:00:00Z`);
  const dayOfWeek = dateObj.getUTCDay();
  const openingHours = DEFAULT_OPENING_HOURS[dayOfWeek];

  if (!openingHours || openingHours.closed || BLACKOUT_DATES.includes(dateStr) || isPastDate(dateStr)) {
    return [];
  }

  const openMinutes = timeToMinutes(openingHours.open);
  const closeMinutes = timeToMinutes(openingHours.close);
  const bufferMinutes = config.bufferMinutes;

  // Filter bookings for this space and date
  const spaceBookings = existingBookings.filter(
    (b) => b.spaceSlug === spaceSlug && b.date === dateStr && b.status !== "declined"
  );

  const slots: Slot[] = [];
  const slotIntervalMinutes = 30; // 30-minute interval resolution

  for (let m = openMinutes; m < closeMinutes; m += slotIntervalMinutes) {
    const slotStart = m;
    const slotEnd = m + slotIntervalMinutes;
    const startTimeStr = minutesToTime(slotStart);
    const endTimeStr = minutesToTime(slotEnd);

    // Check collision with existing bookings
    let status: Slot["status"] = "available";
    let reason: string | undefined;

    for (const booking of spaceBookings) {
      const bStart = timeToMinutes(booking.startTime);
      const bEnd = timeToMinutes(booking.endTime);
      const bBufferStart = Math.max(openMinutes, bStart - bufferMinutes);
      const bBufferEnd = Math.min(closeMinutes, bEnd + bufferMinutes);

      if (slotStart >= bStart && slotStart < bEnd) {
        status = "booked";
        reason = "Session in progress";
        break;
      } else if (
        (slotStart >= bBufferStart && slotStart < bStart) ||
        (slotStart >= bEnd && slotStart < bBufferEnd)
      ) {
        status = "buffer";
        reason = `Studio reset & turnaround (${bufferMinutes}m buffer)`;
        break;
      }
    }

    slots.push({
      id: `${dateStr}-${spaceSlug}-${startTimeStr}`,
      start: startTimeStr,
      end: endTimeStr,
      displayTime: startTimeStr,
      status,
      spaceSlug,
      reason,
    });
  }

  return slots;
}

/**
 * Calculates the total cost and detects the Day Rate crossover discount.
 */
export function calculateBookingPrice(
  spaceSlug: string,
  durationHours: number
): BookingCalculation {
  const config = SPACE_CONFIGS[spaceSlug] ?? SPACE_CONFIGS["podcast-suite"];
  const hourlyRate = config.hourlyRate;
  const dayRate = config.dayRate;
  const standardSubtotal = durationHours * hourlyRate;

  const isDayRateApplied = standardSubtotal >= dayRate;
  const total = isDayRateApplied ? dayRate : standardSubtotal;
  const savings = standardSubtotal - total;

  let rateExplanation = `${durationHours} hrs × GH₵ ${hourlyRate}/hr = GH₵ ${total.toLocaleString()}`;

  if (isDayRateApplied) {
    rateExplanation = `Day Rate applied: GH₵ ${dayRate.toLocaleString()} (${durationHours} hrs @ GH₵ ${hourlyRate}/hr would be GH₵ ${standardSubtotal.toLocaleString()} — saves GH₵ ${savings.toLocaleString()})`;
  }

  return {
    durationHours,
    hourlyRate,
    dayRate,
    appliedRate: isDayRateApplied ? "day" : "hourly",
    standardSubtotal,
    total,
    savings,
    isDayRateApplied,
    rateExplanation,
  };
}

/**
 * Validates whether a specific start time and duration can be safely booked without collisions.
 */
export function validateBookingSlot(
  draft: BookingDraft,
  existingBookings: ExistingBooking[] = []
): { valid: boolean; reason?: string; calculation?: BookingCalculation } {
  const config = SPACE_CONFIGS[draft.spaceSlug] ?? SPACE_CONFIGS["podcast-suite"];

  if (!draft.date || isPastDate(draft.date)) {
    return { valid: false, reason: "Please choose an upcoming date." };
  }

  if (BLACKOUT_DATES.includes(draft.date)) {
    return { valid: false, reason: "The studio is closed on this date." };
  }

  const dateObj = new Date(`${draft.date}T00:00:00Z`);
  const dayOfWeek = dateObj.getUTCDay();
  const openingHours = DEFAULT_OPENING_HOURS[dayOfWeek];

  if (!openingHours || openingHours.closed) {
    return { valid: false, reason: "Demes shr Studios is closed on Sundays." };
  }

  if (draft.durationHours < config.minDurationHours) {
    return {
      valid: false,
      reason: `Minimum booking duration for ${config.name} is ${config.minDurationHours} hours.`,
    };
  }

  if (draft.durationHours > config.maxDurationHours) {
    return {
      valid: false,
      reason: `Maximum booking duration is ${config.maxDurationHours} hours.`,
    };
  }

  const startMinutes = timeToMinutes(draft.startTime);
  const sessionMinutes = draft.durationHours * 60;
  const endMinutes = startMinutes + sessionMinutes;
  const closeMinutes = timeToMinutes(openingHours.close);

  if (endMinutes > closeMinutes) {
    return {
      valid: false,
      reason: `This session would end at ${minutesToTime(endMinutes)}, exceeding closing time (${openingHours.close}).`,
    };
  }

  // Check collision with existing bookings and their buffers
  const bufferMinutes = config.bufferMinutes;
  const spaceBookings = existingBookings.filter(
    (b) => b.spaceSlug === draft.spaceSlug && b.date === draft.date && b.status !== "declined"
  );

  for (const booking of spaceBookings) {
    const bStart = timeToMinutes(booking.startTime);
    const bEnd = timeToMinutes(booking.endTime);
    const requiredBufferStart = bStart - bufferMinutes;
    const requiredBufferEnd = bEnd + bufferMinutes;

    // Requested window: [startMinutes, endMinutes]
    // Forbidden window with buffer: [requiredBufferStart, requiredBufferEnd]
    const hasOverlap = startMinutes < requiredBufferEnd && endMinutes > requiredBufferStart;

    if (hasOverlap) {
      return {
        valid: false,
        reason: `Session overlaps with an existing booking or buffer window (${booking.startTime} - ${booking.endTime}).`,
      };
    }
  }

  const calculation = calculateBookingPrice(draft.spaceSlug, draft.durationHours);
  return { valid: true, calculation };
}

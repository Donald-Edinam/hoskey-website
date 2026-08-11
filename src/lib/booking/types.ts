/**
 * Studio Booking Domain Types
 * Timezone note: All calculations are handled in UTC and rendered in Africa/Accra (UTC+0).
 */

export type SlotStatus =
  | "available"
  | "booked"
  | "buffer"
  | "blackout"
  | "closed"
  | "past";

export interface Slot {
  id: string;
  start: string; // ISO string or "HH:mm" in Accra time
  end: string;
  displayTime: string; // e.g. "09:00"
  status: SlotStatus;
  spaceSlug: string;
  reason?: string;
}

export interface OpeningHours {
  open: string; // "08:00"
  close: string; // "18:00"
  closed?: boolean;
}

export interface SpaceBookingConfig {
  spaceSlug: string;
  name: string;
  hourlyRate: number; // in GHS (e.g. 250)
  dayRate: number; // in GHS (e.g. 1600)
  minDurationHours: number; // e.g. 2
  maxDurationHours: number; // e.g. 10
  bufferMinutes: number; // e.g. 30
  capacity: number;
  image: string;
  inclusions: string[];
}

export type BookingStatus = "confirmed" | "pending" | "declined" | "pending_review";

export interface ExistingBooking {
  id: string;
  spaceSlug: string;
  date: string; // "YYYY-MM-DD"
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  status: BookingStatus;
}

export interface BookingCalculation {
  durationHours: number;
  hourlyRate: number;
  dayRate: number;
  appliedRate: "hourly" | "day";
  standardSubtotal: number;
  total: number;
  savings: number;
  isDayRateApplied: boolean;
  rateExplanation: string;
}

export interface BookingDraft {
  spaceSlug: string;
  date: string; // "YYYY-MM-DD"
  startTime: string; // "HH:mm"
  durationHours: number;
  name: string;
  phone: string;
  email?: string;
  projectType: string;
  headcount: number;
  notes?: string;
}

export type BookingStep = "space" | "date" | "time" | "details" | "confirm";

export interface BookingValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export interface BookingRequestRecord extends BookingDraft {
  id: string;
  createdAt: string;
  endTime: string;
  calculation: BookingCalculation;
  status: BookingStatus;
}


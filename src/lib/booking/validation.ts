import { BookingDraft, BookingValidationResult } from "./types";
import { SPACE_CONFIGS } from "./config";

/**
 * Validates Ghanaian phone numbers in common formats:
 * - 024XXXXXXX, 055XXXXXXX, 020XXXXXXX (10 digits)
 * - +233 24 XXXXXXX, 23324XXXXXXX
 */
export function isValidGhanaPhone(phone: string): boolean {
  if (!phone) return false;
  // Strip spaces, dashes, parentheses
  const clean = phone.replace(/[\s\-\(\)]/g, "");

  // Format 1: 0[235][0-9]{8} (e.g. 0241234567, 0551234567, 0201234567, 0302123456)
  const localGhanaRegex = /^0[235]\d{8}$/;

  // Format 2: +233[235][0-9]{8} or 233[235][0-9]{8}
  const intlGhanaRegex = /^(\+?233)[235]\d{8}$/;

  return localGhanaRegex.test(clean) || intlGhanaRegex.test(clean);
}

/**
 * Formats a valid Ghana phone number cleanly into standard display format:
 * e.g. "024 123 4567" or "+233 24 123 4567"
 */
export function formatGhanaPhone(phone: string): string {
  const clean = phone.replace(/[\s\-\(\)]/g, "");
  if (/^0[235]\d{8}$/.test(clean)) {
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
  }
  if (/^\+233[235]\d{8}$/.test(clean)) {
    return `+233 ${clean.slice(4, 6)} ${clean.slice(6, 9)} ${clean.slice(9)}`;
  }
  return phone;
}

/**
 * Validates email format if provided (optional).
 */
export function isValidEmail(email?: string): boolean {
  if (!email || email.trim() === "") return true; // optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Validates all Step 4 Contact Details fields.
 */
export function validateContactDetails(draft: Partial<BookingDraft>): BookingValidationResult {
  const errors: Record<string, string> = {};

  if (!draft.name || draft.name.trim().length < 2) {
    errors.name = "Please enter your full name or company name.";
  }

  if (!draft.phone || !isValidGhanaPhone(draft.phone)) {
    errors.phone = "Please enter a valid Ghana phone number (e.g. 024 123 4567 or +233 24 123 4567).";
  }

  if (draft.email && !isValidEmail(draft.email)) {
    errors.email = "Please enter a valid email address (e.g. kwame@example.com).";
  }

  if (!draft.projectType || draft.projectType.trim().length < 4) {
    errors.projectType = "Please tell us what you're recording or hosting (e.g. 6-episode video podcast).";
  }

  const spaceConfig = draft.spaceSlug ? SPACE_CONFIGS[draft.spaceSlug] : null;
  const maxCapacity = spaceConfig?.capacity ?? 30;

  if (!draft.headcount || draft.headcount < 1) {
    errors.headcount = "Please enter at least 1 person attending.";
  } else if (draft.headcount > maxCapacity) {
    errors.headcount = `Maximum capacity for ${spaceConfig?.name ?? "this space"} is ${maxCapacity} people.`;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

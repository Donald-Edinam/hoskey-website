import { BookingDraft } from "./types";

const STORAGE_KEY = "hoskey_demes_shr_booking_draft_v1";

export function loadSavedDraft(): Partial<BookingDraft> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveDraft(draft: Partial<BookingDraft>): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Ignore storage quota errors in private browsing
  }
}

export function clearSavedDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

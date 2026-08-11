import { describe, expect, it } from "bun:test";
import {
  calculateBookingPrice,
  validateBookingSlot,
  isDateAvailable,
} from "./availability";
import { ExistingBooking, BookingDraft } from "./types";


describe("Studio Availability & Pricing Engine", () => {
  // Test 1: Day rate crossover calculations
  it("calculates standard hourly pricing below day rate threshold", () => {
    // Podcast Suite: 250 GHS / hr, Day rate = 1600 GHS
    const calc = calculateBookingPrice("podcast-suite", 4);
    expect(calc.appliedRate).toBe("hourly");
    expect(calc.total).toBe(1000);
    expect(calc.savings).toBe(0);
    expect(calc.isDayRateApplied).toBe(false);
  });

  it("automatically applies day rate when standard total exceeds day rate", () => {
    // 7 hrs * 250 = 1750 GHS -> Day rate 1600 GHS triggers (saves 150 GHS)
    const calc = calculateBookingPrice("podcast-suite", 7);
    expect(calc.appliedRate).toBe("day");
    expect(calc.total).toBe(1600);
    expect(calc.standardSubtotal).toBe(1750);
    expect(calc.savings).toBe(150);
    expect(calc.isDayRateApplied).toBe(true);
  });

  // Test 2: Minimum duration enforcement
  it("rejects booking duration below the space minimum", () => {
    // Workshop Space minimum is 3 hours
    const draft: BookingDraft = {
      spaceSlug: "workshop-space",
      date: "2026-11-18",
      startTime: "10:00",
      durationHours: 2,
      name: "Kwame Mensah",
      phone: "0241234567",
      projectType: "Script Workshop",
      headcount: 10,
    };

    const validation = validateBookingSlot(draft);
    expect(validation.valid).toBe(false);
    expect(validation.reason).toContain("Minimum booking duration");
  });

  // Test 3: Buffer collision detection (30-minute turnaround)
  it("detects overlap with existing booking buffer window", () => {
    // Existing booking: 10:00 - 12:00. Buffer window: 09:30 - 12:30
    const existingBookings: ExistingBooking[] = [
      {
        id: "b1",
        spaceSlug: "podcast-suite",
        date: "2026-11-18",
        startTime: "10:00",
        endTime: "12:00",
        status: "confirmed",
      },
    ];

    // Attempt to book starting at 12:00 (inside the 30m reset buffer until 12:30)
    const draft: BookingDraft = {
      spaceSlug: "podcast-suite",
      date: "2026-11-18",
      startTime: "12:00",
      durationHours: 2,
      name: "Ama Serwaa",
      phone: "0201234567",
      projectType: "Podcast Episode",
      headcount: 3,
    };

    const validation = validateBookingSlot(draft, existingBookings);
    expect(validation.valid).toBe(false);
    expect(validation.reason).toContain("buffer");
  });

  it("allows booking starting after buffer window expires", () => {
    // Existing booking: 10:00 - 12:00. Buffer expires at 12:30.
    const existingBookings: ExistingBooking[] = [
      {
        id: "b1",
        spaceSlug: "podcast-suite",
        date: "2026-11-18",
        startTime: "10:00",
        endTime: "12:00",
        status: "confirmed",
      },
    ];

    // Booking starting at 12:30
    const draft: BookingDraft = {
      spaceSlug: "podcast-suite",
      date: "2026-11-18",
      startTime: "12:30",
      durationHours: 2,
      name: "Ama Serwaa",
      phone: "0201234567",
      projectType: "Podcast Episode",
      headcount: 3,
    };

    const validation = validateBookingSlot(draft, existingBookings);
    expect(validation.valid).toBe(true);
    expect(validation.calculation?.total).toBe(500);
  });

  // Test 4: Operating hours & Sunday closures
  it("rejects bookings ending after 18:00 GMT closing time", () => {
    const draft: BookingDraft = {
      spaceSlug: "podcast-suite",
      date: "2026-11-18",
      startTime: "16:00",
      durationHours: 3, // Ends at 19:00, exceeding 18:00
      name: "Kwesi Appiah",
      phone: "0551234567",
      projectType: "Broadcast",
      headcount: 2,
    };

    const validation = validateBookingSlot(draft);
    expect(validation.valid).toBe(false);
    expect(validation.reason).toContain("closing time");
  });

  it("identifies Sundays as closed", () => {
    // 2026-11-22 is a Sunday
    const result = isDateAvailable("podcast-suite", "2026-11-22");
    expect(result.available).toBe(false);
    expect(result.reason).toContain("Sundays");
  });
});

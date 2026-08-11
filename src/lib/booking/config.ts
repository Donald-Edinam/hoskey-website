import { SpaceBookingConfig, OpeningHours } from "./types";

/**
 * Standard operating schedule (Mon - Sat 08:00 - 18:00 GMT, Sun Closed)
 * Day numbers: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
 */
export const DEFAULT_OPENING_HOURS: Record<number, OpeningHours> = {
  0: { open: "00:00", close: "00:00", closed: true }, // Sunday closed
  1: { open: "08:00", close: "18:00" }, // Monday
  2: { open: "08:00", close: "18:00" }, // Tuesday
  3: { open: "08:00", close: "18:00" }, // Wednesday
  4: { open: "08:00", close: "18:00" }, // Thursday
  5: { open: "08:00", close: "18:00" }, // Friday
  6: { open: "08:00", close: "18:00" }, // Saturday
};

/**
 * Space Configurations for Demes shr Studios
 */
export const SPACE_CONFIGS: Record<string, SpaceBookingConfig> = {
  "podcast-suite": {
    spaceSlug: "podcast-suite",
    name: "Podcast Suite",
    hourlyRate: 250,
    dayRate: 1600, // 8-hour day rate (crosses over at 7+ hrs, saves 150 GHS at 7 hrs)
    minDurationHours: 2,
    maxDurationHours: 10,
    bufferMinutes: 30,
    capacity: 4,
    image: "/images/projects/podcast-studio.png",
    inclusions: [
      "4x Shure SM7B dynamic broadcast microphones",
      "RØDECaster Pro II audio mixing interface",
      "Sony 4K multi-camera video recording package",
      "Acoustically conditioned room & soft key lighting",
    ],
  },
  "audio-recording": {
    spaceSlug: "audio-recording",
    name: "Audio Recording Studio",
    hourlyRate: 300,
    dayRate: 2000,
    minDurationHours: 2,
    maxDurationHours: 10,
    bufferMinutes: 30,
    capacity: 6,
    image: "/images/studio/booth.png",
    inclusions: [
      "Neumann & AKG condenser microphone locker",
      "Genelec reference studio monitors",
      "Universal Audio Apollo interface & DAW console",
      "Dedicated vocal isolation booth",
    ],
  },
  "co-working": {
    spaceSlug: "co-working",
    name: "Co-working & Creator Hub",
    hourlyRate: 80,
    dayRate: 450,
    minDurationHours: 1,
    maxDurationHours: 10,
    bufferMinutes: 15,
    capacity: 12,
    image: "/images/studio/desk.png",
    inclusions: [
      "High-speed fiber connectivity",
      "Dual-monitor color calibrated editing desks",
      "Power backup and surge protection",
      "Quiet meeting and collaboration nooks",
    ],
  },
  "workshop-space": {
    spaceSlug: "workshop-space",
    name: "Creative Workshop Space",
    hourlyRate: 400,
    dayRate: 2600,
    minDurationHours: 3,
    maxDurationHours: 10,
    bufferMinutes: 45,
    capacity: 25,
    image: "/images/studio/the-room.png",
    inclusions: [
      "Modular seating and folding work tables",
      "High-lumen laser projector & PA system",
      "Whiteboards and brainstorming stations",
      "Climate control & ambient lighting",
    ],
  },
  "musical-jams": {
    spaceSlug: "musical-jams",
    name: "Musical Jams & Live Session Stage",
    hourlyRate: 350,
    dayRate: 2200,
    minDurationHours: 2,
    maxDurationHours: 10,
    bufferMinutes: 30,
    capacity: 15,
    image: "/images/projects/live-concert.png",
    inclusions: [
      "Stage monitor wedges & multi-channel mixer",
      "Instrument DIs & drum mic kit",
      "Multi-track audio capture from stage feeds",
      "Stage wash lighting setup",
    ],
  },
  "chop-bar": {
    spaceSlug: "chop-bar",
    name: "Chop Bar & Hospitality Lounge",
    hourlyRate: 150,
    dayRate: 950,
    minDurationHours: 2,
    maxDurationHours: 10,
    bufferMinutes: 30,
    capacity: 20,
    image: "/images/studio/the-room.png",
    inclusions: [
      "Lounge seating & dining arrangement",
      "Traditional Ghanaian & continental refreshments",
      "Beverage station and water dispenser",
      "Informal client meeting space",
    ],
  },
};

/**
 * Known Blackout Dates (National holidays, scheduled maintenance)
 * Format: "YYYY-MM-DD"
 */
export const BLACKOUT_DATES: string[] = [
  "2026-12-25", // Christmas Day
  "2026-12-26", // Boxing Day
  "2027-01-01", // New Year's Day
  "2027-03-06", // Independence Day
];

export const FORWARD_BOOKING_DAYS = 60; // 60-day calendar booking window

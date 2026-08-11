export const WHATSAPP_PHONE = "233597948979";

export type WhatsAppContext =
  | "general"
  | "project"
  | "studio"
  | "booking"
  | "equipment"
  | "production";

export const DEFAULT_MESSAGES: Record<WhatsAppContext, string> = {
  general: "Hello Hoskey Production, I would like to inquire about your services.",
  project: "Hello Hoskey Production, I would like to discuss a production project.",
  studio: "Hello Hoskey Production, I am inquiring about Demes shr Studios availability and booking.",
  booking: "Hello Hoskey Production, I would like to book studio time.",
  equipment: "Hello Hoskey Production, I am inquiring about equipment and technical services.",
  production: "Hello Hoskey Production, I would like to discuss broadcast / production services.",
};

export const SERVICE_MESSAGES: Record<string, string> = {

  "tv-production":
    "Hello Hoskey Production, I'd like to discuss TV production and outside broadcast coverage for our project.",
  "brand-films":
    "Hello Hoskey Production, I'd like to discuss producing a brand film or commercial spot.",
  "documentaries":
    "Hello Hoskey Production, I'd like to discuss a documentary production project.",
  "live-streaming":
    "Hello Hoskey Production, I'd like to discuss live streaming and multi-camera coverage for an event.",
  "sound-engineering":
    "Hello Hoskey Production, I'd like to discuss sound engineering and audio post-production services.",
  "technical-stage":
    "Hello Hoskey Production, I'd like to discuss technical stage engineering and lighting for an event.",
};

export function getServiceWhatsAppMessage(slug: string, fallbackTitle?: string): string {
  if (SERVICE_MESSAGES[slug]) {
    return SERVICE_MESSAGES[slug];
  }
  if (fallbackTitle) {
    return `Hello Hoskey Production, I would like to discuss ${fallbackTitle}.`;
  }
  return DEFAULT_MESSAGES.production;
}

export function getWhatsAppLink(context: WhatsAppContext = "general", customText?: string): string {
  const message = customText ?? DEFAULT_MESSAGES[context] ?? DEFAULT_MESSAGES.general;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function getServiceWhatsAppLink(slug: string, fallbackTitle?: string): string {
  const message = getServiceWhatsAppMessage(slug, fallbackTitle);
  return getWhatsAppLink("production", message);
}

export interface BookingSummaryPayload {
  spaceName: string;
  formattedDate: string;
  timeRange: string;
  durationHours: number;
  totalCostFormatted: string;
  rateTypeExplanation: string;
  clientName: string;
  phone: string;
  email?: string;
  projectType: string;
  headcount: number;
}

export function getStudioBookingWhatsAppMessage(booking: BookingSummaryPayload): string {
  const lines = [
    `*STUDIO BOOKING REQUEST — DEMES SHR STUDIOS*`,
    ``,
    `• *Space:* ${booking.spaceName}`,
    `• *Date:* ${booking.formattedDate}`,
    `• *Time:* ${booking.timeRange} (${booking.durationHours} hrs)`,
    `• *Rate:* ${booking.totalCostFormatted} (${booking.rateTypeExplanation})`,
    `• *Client:* ${booking.clientName}`,
    `• *Phone:* ${booking.phone}`,
    ...(booking.email ? [`• *Email:* ${booking.email}`] : []),
    `• *Project:* ${booking.projectType}`,
    `• *Headcount:* ${booking.headcount} ${booking.headcount === 1 ? "person" : "people"}`,
    ``,
    `Please confirm studio availability and lock in this session.`,
  ];
  return lines.join("\n");
}

export function getStudioBookingWhatsAppLink(booking: BookingSummaryPayload): string {
  const message = getStudioBookingWhatsAppMessage(booking);
  return getWhatsAppLink("studio", message);
}



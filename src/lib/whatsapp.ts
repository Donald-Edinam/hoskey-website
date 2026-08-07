export const WHATSAPP_PHONE = "233597948979";

export type WhatsAppContext =
  | "general"
  | "project"
  | "studio"
  | "booking"
  | "equipment"
  | "production";

const DEFAULT_MESSAGES: Record<WhatsAppContext, string> = {
  general: "Hello Hoskey Production, I would like to inquire about your services.",
  project: "Hello Hoskey Production, I would like to discuss a production project.",
  studio: "Hello Hoskey Production, I am inquiring about Demes shr Studios availability and booking.",
  booking: "Hello Hoskey Production, I would like to book studio time.",
  equipment: "Hello Hoskey Production, I am inquiring about equipment and technical services.",
  production: "Hello Hoskey Production, I would like to discuss broadcast / production services.",
};

export function getWhatsAppLink(context: WhatsAppContext = "general", customText?: string): string {
  const message = customText ?? DEFAULT_MESSAGES[context] ?? DEFAULT_MESSAGES.general;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

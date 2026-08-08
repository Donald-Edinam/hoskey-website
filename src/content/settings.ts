import { SiteSettings } from "./types";
import { SITE } from "@/lib/config";

export const siteSettings: SiteSettings = {
  name: "Hoskey Production",
  motto: "Where Stories Come Alive",
  phone: SITE.phone,
  whatsapp: SITE.whatsapp,
  email: SITE.email,
  address: SITE.address,
  socials: [
    { platform: "WhatsApp", url: `https://wa.me/${SITE.whatsapp}` },
    { platform: "YouTube", url: null },
    { platform: "Instagram", url: null },
    { platform: "TikTok", url: null },
    { platform: "Telegram", url: null },
    { platform: "Snapchat", url: null },
  ],
};

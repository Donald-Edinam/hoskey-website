import React from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { Container, Eyebrow, Rule } from "@/components/ui/layout";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { SITE } from "@/lib/config";
import { cn } from "@/lib/utils";

export interface SocialLink {
  platform: "YouTube" | "Instagram" | "TikTok" | "Telegram" | "Snapchat" | "WhatsApp";
  url?: string | null;
}

export interface SiteSettings {
  name: string;
  motto: string;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  address?: string | null;
  socials?: SocialLink[];
}

export const defaultSiteSettings: SiteSettings = {
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

const NAV_COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Production Services", href: "/services" },
      { label: "TV & Brand Films", href: "/services" },
      { label: "Documentaries", href: "/services" },
      { label: "Live Streaming", href: "/services" },
      { label: "Post-Production", href: "/services" },
    ],
  },
  {
    title: "Studios",
    links: [
      { label: "Demes shr Studios", href: "/studios" },
      { label: "Podcast Suite", href: "/studios" },
      { label: "Audio Recording", href: "/studios" },
      { label: "Creative Workshops", href: "/studios" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Work & Projects", href: "/work" },
      { label: "About Hoskey", href: "/about" },
      { label: "Contact & Booking", href: "/contact" },
    ],
  },
];

export interface FooterProps {
  settings?: Partial<SiteSettings>;
  className?: string;
}

export function Footer({ settings, className }: FooterProps) {
  const data: SiteSettings = {
    ...defaultSiteSettings,
    ...settings,
  };

  const name = data.name?.trim() || defaultSiteSettings.name;
  const motto = data.motto?.trim() || defaultSiteSettings.motto;
  const currentYear = new Date().getFullYear();

  // Filter out any social link without an active URL
  const activeSocials = (data.socials ?? []).filter(
    (item): item is { platform: SocialLink["platform"]; url: string } =>
      Boolean(item.url && item.url.trim().length > 0)
  );

  return (
    <footer
      className={cn(
        "w-full bg-paper-2 text-ink border-t border-rule mt-auto",
        className
      )}
    >
      <Container className="py-[clamp(48px,6vw,96px)]">
        {/* Main 3-Zone Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Zone 1: Brand Lockup & Motto (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Logo />
            <p className="mt-4 font-black tracking-[-0.02em] leading-[1.2] text-[length:var(--step-1)] text-ink italic">
              &ldquo;{data.motto}&rdquo;
            </p>
            <p className="mt-3 text-[length:var(--step-0)] text-ink-2 max-w-[34ch] leading-relaxed">
              Broadcast and media production company in Ghana. Founded by Ziblim Abu James (Demes shr).
            </p>
            <div className="mt-6">
              <WhatsAppButton context="project" size="sm">
                Message on WhatsApp
              </WhatsAppButton>
            </div>
          </div>

          {/* Zone 2: Navigation Columns (5 cols on lg) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {NAV_COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col">
                <Eyebrow dot={false} className="text-ink font-semibold mb-3">
                  {col.title}
                </Eyebrow>
                <ul className="space-y-2 list-none p-0 m-0">
                  {col.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-[length:var(--step--1)] text-ink-2 hover:text-ink transition-colors",
                          "focus-visible:outline-2 focus-visible:outline-red"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Zone 3: Direct Contact & Verified Socials (3 cols on lg) */}
          <div className="lg:col-span-3 flex flex-col">
            <Eyebrow dot={false} className="text-ink font-semibold mb-3">
              Direct Inquiries
            </Eyebrow>

            <div className="space-y-2 text-[length:var(--step--1)] text-ink-2">
              {data.phone && (
                <div>
                  <span className="font-mono text-ink text-[10px] tracking-[0.16em] uppercase block">
                    Phone
                  </span>
                  <a
                    href={`tel:${data.phone.replace(/\s+/g, "")}`}
                    className="text-ink hover:text-red transition-colors focus-visible:outline-2 focus-visible:outline-red"
                  >
                    {data.phone}
                  </a>
                </div>
              )}

              {data.whatsapp && (
                <div className="pt-1">
                  <span className="font-mono text-ink text-[10px] tracking-[0.16em] uppercase block">
                    WhatsApp Direct
                  </span>
                  <a
                    href={`https://wa.me/${data.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-red transition-colors focus-visible:outline-2 focus-visible:outline-red"
                  >
                    +{data.whatsapp}
                  </a>
                </div>
              )}

              {/* Omit email completely if missing / null */}
              {data.email && data.email.trim().length > 0 && (
                <div className="pt-1">
                  <span className="font-mono text-ink text-[10px] tracking-[0.16em] uppercase block">
                    Email
                  </span>
                  <a
                    href={`mailto:${data.email}`}
                    className="text-ink hover:text-red transition-colors focus-visible:outline-2 focus-visible:outline-red"
                  >
                    {data.email}
                  </a>
                </div>
              )}

              {/* Omit address completely if missing / null */}
              {data.address && data.address.trim().length > 0 && (
                <div className="pt-1">
                  <span className="font-mono text-ink text-[10px] tracking-[0.16em] uppercase block">
                    Studio Address
                  </span>
                  <p className="text-ink m-0">{data.address}</p>
                </div>
              )}
            </div>

            {/* Social Links — Only rendered if URL exists */}
            {activeSocials.length > 0 && (
              <div className="mt-6 pt-4 border-t border-rule">
                <span className="font-mono text-ink text-[10px] tracking-[0.16em] uppercase block mb-2">
                  Social Channels
                </span>
                <div className="flex flex-wrap gap-3">
                  {activeSocials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[length:var(--step--1)] text-ink-2 hover:text-red transition-colors focus-visible:outline-2 focus-visible:outline-red"
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <Rule className="mt-12 mb-6" />

        {/* Bottom Bar: Dynamic Copyright & Motto */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[length:var(--step--1)] text-ink-2">
          <p className="m-0 font-mono tracking-[0.04em]">
            © {currentYear} {name} — {motto}
          </p>
          <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.16em] uppercase">
            <span>Ghana</span>
            <span>Est. 2024</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

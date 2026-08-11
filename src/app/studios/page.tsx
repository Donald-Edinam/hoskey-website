import React from "react";
import type { Metadata } from "next";
import {
  StudiosHeader,
  StudiosGallery,
  StudiosSpacesGrid,
  StudiosHouseRules,
  StudiosBookingCta,
} from "@/components/studios";
import { getStudioSpaces, getStudioGallery, getSiteSettings } from "@/lib/content";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Demes shr Studios — Creative Spaces & Recording | Hoskey Production",
  description:
    "Bookable podcast suite, vocal isolation recording studio, creator co-working hub, creative workshop space, and live session stage in Ghana. Hourly and day rates.",
  alternates: {
    canonical: "/studios",
  },
  openGraph: {
    title: "Demes shr Studios — Creative Spaces & Recording",
    description:
      "Acoustically treated podcast suite, recording studio, creator co-working, and workshop spaces in Ghana. Book by the hour or day.",
    url: `${SITE.url}/studios`,
    type: "website",
  },
};

export default async function StudiosPage() {
  const [studioSpaces, studioGallery, settings] = await Promise.all([
    getStudioSpaces(),
    getStudioGallery(),
    getSiteSettings(),
  ]);

  // Schema.org LocalBusiness JSON-LD (address cleanly omitted if not supplied)
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Demes shr Studios",
    description:
      "Acoustically conditioned podcast studio, audio recording booth, creative co-working hub, and workshop floor by Hoskey Production.",
    url: `${SITE.url}/studios`,
    telephone: settings.phone ?? SITE.phone,
    priceRange: "GH₵₵",
    openingHours: "Mo-Sa 08:00-18:00",
    parentOrganization: {
      "@type": "Organization",
      name: "Hoskey Production",
      url: SITE.url,
    },
    ...(settings.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: settings.address,
            addressCountry: "GH",
          },
        }
      : {}),
  };

  return (
    <article className="w-full flex flex-col">
      {/* Schema.org LocalBusiness Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      {/* S1: Header (Dark Inversion) + S2: Facilities Mono Tag Pills */}
      <StudiosHeader />

      {/* S3: Asymmetric Visual Gallery & Lightbox */}
      <StudiosGallery images={studioGallery} />


      {/* S4: Spaces & Rates Stacked Cards Grid */}
      <StudiosSpacesGrid spaces={studioSpaces} />

      {/* S5: House Rules / Practical Guidelines (Conditionally hidden when empty) */}
      <StudiosHouseRules />

      {/* S6: Booking Conversion CTA (WhatsApp Primary / M9 Online Booking Ready) */}
      <StudiosBookingCta settings={settings} />
    </article>
  );
}

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getServices,
  getService,
  getProjectsForService,
  getSiteSettings,
} from "@/lib/content";
import {
  ServiceDetailHeader,
  ServiceRelatedWork,
} from "@/components/services";
import { ClosingCtaSection } from "@/components/sections/closing-cta-section";
import { SITE } from "@/lib/config";
import { getServiceWhatsAppMessage } from "@/lib/whatsapp";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: "Service Not Found — Hoskey Production",
    };
  }

  const title = `${service.title} — Hoskey Production`;
  const description = service.summary;
  const canonicalUrl = `/services/${service.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: `${SITE.url}${canonicalUrl}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const [service, settings, relatedProjects] = await Promise.all([
    getService(slug),
    getSiteSettings(),
    getProjectsForService(slug, 3),
  ]);

  if (!service) {
    notFound();
  }

  const whatsappMessage = getServiceWhatsAppMessage(service.slug, service.title);

  // Schema.org Service JSON-LD structured data
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description ?? service.summary,
    provider: {
      "@type": "Organization",
      name: "Hoskey Production",
      url: SITE.url,
      telephone: SITE.phone,
    },
    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },
    ...(service.priceBand && {
      offers: {
        "@type": "Offer",
        priceDescription: service.priceBand,
      },
    }),
  };

  return (
    <article className="w-full flex flex-col">
      {/* Schema.org Service Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* S3 Detail Header + Sticky CTA Card (incorporates S4 Inclusions & S5 Process in Left Column) */}
      <ServiceDetailHeader service={service} />

      {/* S6 Related Work (reusing ProjectCard, hidden if 0 projects) */}
      <ServiceRelatedWork service={service} projects={relatedProjects} />

      {/* S7 Shared Closing CTA Section with Scoped WhatsApp Inbound Message */}
      <ClosingCtaSection
        settings={settings}
        context="production"
        whatsappMessage={whatsappMessage}
        eyebrow="Direct inquiry"
        title={`Commission ${service.title}.`}
        lede={`Contact our production desk on WhatsApp to discuss technical requirements, crew scheduling, and custom rate cards for ${service.title.toLowerCase()}.`}
      />
    </article>
  );
}

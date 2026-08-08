import React from "react";
import type { Metadata } from "next";
import {
  getServices,
  getProjects,
  getTeam,
  getTestimonials,
  getSiteSettings,
} from "@/lib/content";
import {
  HeroSection,
  ShowreelSection,
  ServicesSection,
  SelectedWorkSection,
  TeamSection,
  TestimonialsSection,
  StoryTeaserSection,
  AcrosticSection,
  ClosingCtaSection,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "Hoskey Production — Where Stories Come Alive",
  description:
    "Broadcast and media production company in Ghana. TV production, brand films, documentaries, Demes shr Studios, and technical stage engineering founded by Ziblim Abu James.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const [services, projects, team, testimonials, settings] = await Promise.all([
    getServices(),
    getProjects(),
    getTeam(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <div className="w-full flex flex-col">
      {/* S1: Hero Section */}
      <HeroSection />

      {/* S2: Showreel / Video Facade Section */}
      <ShowreelSection showreelId={settings.showreelId} />

      {/* S3: Services Hairline Grid Section */}
      <ServicesSection services={services} />

      {/* S4: Selected Work 3-Column Section */}
      <SelectedWorkSection projects={projects} />

      {/* S5: Team Strip Section (Conditional: renders only if >= 3 with photos) */}
      <TeamSection team={team} />

      {/* S6: Testimonials Section (Conditional: renders only if >= 1 testimonial) */}
      <TestimonialsSection testimonials={testimonials} />

      {/* S7: Founder Story Teaser Section */}
      <StoryTeaserSection />

      {/* S8: HOSKEY Signature Acrostic Section */}
      <AcrosticSection />

      {/* S9: Closing CTA Dark Inversion Section */}
      <ClosingCtaSection settings={settings} />
    </div>
  );
}

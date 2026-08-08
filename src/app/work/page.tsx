import React from "react";
import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Lede, Mono } from "@/components/ui/typography";
import { Rise } from "@/components/ui/rise";
import { ClosingCtaSection } from "@/components/sections/closing-cta-section";
import { WorkFilter, WorkGrid } from "@/components/work";
import { getProjects, getSiteSettings } from "@/lib/content";
import { SITE } from "@/lib/config";

interface WorkPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

const DEFAULT_CATEGORIES = ["Broadcast", "Documentary", "Commercial", "Live", "Corporate"];

export async function generateMetadata({
  searchParams,
}: WorkPageProps): Promise<Metadata> {
  const { category } = await searchParams;

  const title = category && category.toLowerCase() !== "all"
    ? `${category} Productions — Hoskey Production`
    : "Selected Work & Productions — Hoskey Production";

  const description = category && category.toLowerCase() !== "all"
    ? `Explore ${category.toLowerCase()} television, documentary, and media productions by Hoskey Production in Ghana.`
    : "Archive of broadcast television, brand films, documentaries, and live streaming productions by Hoskey Production.";

  return {
    title,
    description,
    alternates: {
      canonical: category ? `/work?category=${encodeURIComponent(category)}` : "/work",
    },
    openGraph: {
      title,
      description,
      url: category ? `${SITE.url}/work?category=${encodeURIComponent(category)}` : `${SITE.url}/work`,
    },
  };
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const { category } = await searchParams;
  const activeCategory = category && category.trim().length > 0 ? category : undefined;

  const [allProjects, settings] = await Promise.all([
    getProjects(),
    getSiteSettings(),
  ]);

  // Derive categories from all projects union with default categories
  const dynamicCategories = Array.from(
    new Set([
      ...allProjects.flatMap((p) => p.categories),
      ...DEFAULT_CATEGORIES,
    ])
  );

  // Filter projects server-side if active category is selected
  const filteredProjects = activeCategory && activeCategory.toLowerCase() !== "all"
    ? allProjects.filter((p) =>
        p.categories.some(
          (c) => c.toLowerCase() === activeCategory.toLowerCase()
        )
      )
    : allProjects;

  const projectCount = filteredProjects.length;
  const countDisplay = `${String(projectCount).padStart(2, "0")} ${projectCount === 1 ? "project" : "projects"}`;

  // ItemList JSON-LD for Schema.org
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: activeCategory ? `${activeCategory} Productions` : "Hoskey Productions Archive",
    description: "Broadcast, documentary, and commercial film productions by Hoskey Production.",
    numberOfItems: filteredProjects.length,
    itemListElement: filteredProjects.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: p.title,
      url: `${SITE.url}/work/${p.slug}`,
    })),
  };

  return (
    <div className="w-full flex flex-col">
      {/* JSON-LD ItemList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* S1: Header Block */}
      <Section variant="default" className="pt-[clamp(40px,6vw,80px)] pb-8">
        <Container>
          <Rise>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-rule">
              <div>
                <Eyebrow className="mb-3">Selected work</Eyebrow>
                <Display level={1} className="text-ink">
                  Productions.
                </Display>
                <Lede className="mt-3 text-ink-2 max-w-[54ch]">
                  Broadcast television, brand films, and documentary productions created across Ghana.
                </Lede>
              </div>

              {/* Project Count in Mono — Updates with filter */}
              <div className="shrink-0 pb-1">
                <Mono className="text-[length:var(--step-0)] font-semibold text-ink px-3 py-1.5 bg-paper-2 border border-rule rounded-[var(--radius)]">
                  {countDisplay}
                </Mono>
              </div>
            </div>

            {/* S2: Category Filter Bar */}
            <div className="pt-8">
              <WorkFilter
                categories={dynamicCategories}
                activeCategory={activeCategory}
              />
            </div>
          </Rise>
        </Container>
      </Section>

      {/* S3: Work Grid */}
      <Section variant="default" className="pt-2 pb-[clamp(48px,8vw,96px)]">
        <Container>
          <WorkGrid
            projects={filteredProjects}
            hasGlobalProjects={allProjects.length > 0}
            activeCategory={activeCategory}
          />
        </Container>
      </Section>

      {/* S4: Reused Shared Closing CTA Section */}
      <ClosingCtaSection settings={settings} />
    </div>
  );
}

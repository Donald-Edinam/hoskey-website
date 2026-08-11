import React from "react";
import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Mono } from "@/components/ui/typography";
import { Rise } from "@/components/ui/rise";
import { Credit, TeamMember } from "@/lib/content";

export interface CaseStudyCreditsProps {
  credits?: Credit[];
  team?: TeamMember[];
}

export function CaseStudyCredits({ credits, team = [] }: CaseStudyCreditsProps) {
  if (!credits || credits.length === 0) {
    return null;
  }

  // Create lookup map for team profile links
  const teamMap = new Map<string, string>();
  team.forEach((member) => {
    teamMap.set(member.name.toLowerCase().trim(), `/team#${member.slug}`);
    if (member.slug) {
      teamMap.set(member.slug.toLowerCase().trim(), `/team#${member.slug}`);
    }
  });

  return (
    <Section variant="default" id="credits" className="py-12 md:py-20 border-t border-rule">
      <Container>
        <Rise>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-12">
            <div>
              <Eyebrow className="mb-2">Production Credits</Eyebrow>
              <Display level={2}>Crew &amp; Craft Leadership</Display>
            </div>
            <Mono className="text-[11px] text-ink-2">
              {String(credits.length).padStart(2, "0")} Key Roles
            </Mono>
          </div>
        </Rise>

        {/* Two-Column Definition List */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 border-t border-rule pt-6">
          {credits.map((credit, idx) => {
            const profileLink = teamMap.get(credit.name.toLowerCase().trim());

            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-rule/50 pb-3 gap-1"
              >
                <dt className="font-mono text-[length:var(--step--1)] tracking-[0.14em] uppercase text-ink-2/70">
                  {credit.role}
                </dt>
                <dd className="font-bold text-[length:var(--step-0)] text-ink">
                  {profileLink ? (
                    <Link
                      href={profileLink}
                      className="hover:text-red transition-colors focus-visible:outline-2 focus-visible:outline-red"
                    >
                      {credit.name} <span aria-hidden="true" className="text-red font-normal">↗</span>
                    </Link>
                  ) : (
                    <span>{credit.name}</span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </Container>
    </Section>
  );
}

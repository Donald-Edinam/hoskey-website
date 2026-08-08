import React from "react";
import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Heading, Mono } from "@/components/ui/typography";
import { Frame } from "@/components/ui/frame";
import { Img } from "@/components/ui/img";
import { TeamMember } from "@/lib/content";

export interface TeamSectionProps {
  team: TeamMember[];
}

export function TeamSection({ team }: TeamSectionProps) {
  // S5: Renders only if at least three team members have photos.
  const visibleTeam = team.filter((member) => Boolean(member.photo && member.photo.trim().length > 0));

  if (visibleTeam.length < 3) {
    return null;
  }

  return (
    <Section variant="tint" id="team">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-12">
          <div>
            <Eyebrow className="mb-4">Production crew</Eyebrow>
            <Display level={2}>Department Heads & Craft Leads</Display>
          </div>

          <Link
            href="/team"
            className="font-mono text-[length:var(--step--1)] text-ink-2 hover:text-red tracking-[0.16em] uppercase py-2 inline-flex items-center gap-2 group transition-colors focus-visible:outline-2 focus-visible:outline-red"
          >
            <span>Full roster</span>
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        {/* Horizontal scroll on mobile, 4-6 across on desktop */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 sm:pb-0 scrollbar-none">
          {visibleTeam.map((member) => (
            <div key={member.slug} className="flex flex-col gap-3 min-w-[220px] sm:min-w-0">
              <Frame ratio="1/1" label={member.department}>
                {member.photo ? (
                  <Img
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </Frame>

              <div>
                <Heading level={4} className="text-[length:var(--step-0)] text-ink">
                  {member.name}
                </Heading>
                <Mono className="text-[10px] text-ink-2 mt-0.5 block">
                  {member.role}
                </Mono>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

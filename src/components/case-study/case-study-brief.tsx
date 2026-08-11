import React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Heading, Body, Mono } from "@/components/ui/typography";
import { Rise } from "@/components/ui/rise";
import { Project } from "@/lib/content";

export interface CaseStudyBriefProps {
  project: Project;
}

export function CaseStudyBrief({ project }: CaseStudyBriefProps) {
  const paragraphs = project.briefParagraphs ?? (project.brief ? [project.brief] : []);

  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <Section variant="default" id="brief" className="py-12 md:py-20 border-t border-rule">
      <Container>
        <div className="grid grid-cols-1 min-[900px]:grid-cols-12 gap-8 min-[900px]:gap-16">
          {/* Left Rail: Sticky Section Indicator (4 cols) */}
          <div className="min-[900px]:col-span-4 min-[900px]:sticky min-[900px]:top-24 min-[900px]:self-start">
            <Rise>
              <Eyebrow className="mb-2">The Brief</Eyebrow>
              <Heading level={3} className="text-[length:var(--step-1)] text-ink mb-3">
                Mandate &amp; Constraints
              </Heading>
              <Mono className="text-[11px] text-ink-2 block">
                01 · Background &amp; Scope
              </Mono>
            </Rise>
          </div>

          {/* Right Rail: Prose Content max-w-[60ch] (8 cols) */}
          <div className="min-[900px]:col-span-8 flex flex-col gap-6 max-w-[60ch]">
            <Rise>
              {paragraphs.map((paragraph, index) => (
                <Body
                  key={index}
                  size={index === 0 ? "base" : "base"}
                  className="text-[length:var(--step-0)] text-ink leading-relaxed"
                >
                  {paragraph}
                </Body>
              ))}
            </Rise>
          </div>
        </div>
      </Container>
    </Section>
  );
}

import React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Heading, Body, Mono } from "@/components/ui/typography";
import { Frame } from "@/components/ui/frame";
import { Img } from "@/components/ui/img";
import { Rise } from "@/components/ui/rise";
import { Project } from "@/lib/content";

export interface CaseStudyApproachProps {
  project: Project;
}

export function CaseStudyApproach({ project }: CaseStudyApproachProps) {
  const paragraphs = project.approachParagraphs ?? (project.approach ? [project.approach] : []);
  const figures = project.figures ?? [];

  if (paragraphs.length === 0 && figures.length === 0) {
    return null;
  }

  // Separate figures into full vs paired/half
  const fullFigures = figures.filter((f) => f.variant === "full");
  const halfFigures = figures.filter((f) => f.variant === "half" || f.variant === "paired");

  return (
    <Section variant="default" id="approach" className="py-12 md:py-20 border-t border-rule">
      <Container>
        <div className="grid grid-cols-1 min-[900px]:grid-cols-12 gap-8 min-[900px]:gap-16">
          {/* Left Rail: Sticky Section Indicator (4 cols) */}
          <div className="min-[900px]:col-span-4 min-[900px]:sticky min-[900px]:top-24 min-[900px]:self-start">
            <Rise>
              <Eyebrow className="mb-2">The Approach</Eyebrow>
              <Heading level={3} className="text-[length:var(--step-1)] text-ink mb-3">
                Decisions &amp; Craft
              </Heading>
              <Mono className="text-[11px] text-ink-2 block">
                02 · Execution &amp; Technique
              </Mono>
            </Rise>
          </div>

          {/* Right Rail: Prose Content & Figures (8 cols) */}
          <div className="min-[900px]:col-span-8 flex flex-col gap-10">
            {/* Primary Paragraphs */}
            <div className="flex flex-col gap-6 max-w-[60ch]">
              {paragraphs.map((paragraph, index) => (
                <Body
                  key={index}
                  size="base"
                  className="text-[length:var(--step-0)] text-ink leading-relaxed"
                >
                  {paragraph}
                </Body>
              ))}
            </div>

            {/* Interleaved Full-Width Figure (if present) */}
            {fullFigures.map((fig, idx) => (
              <figure key={idx} className="w-full my-4 flex flex-col gap-3">
                <Frame ratio={fig.aspect ?? "21/9"} label={fig.caption ? `Figure 0${idx + 1}` : undefined}>
                  <Img src={fig.src} alt={fig.alt} fill className="object-cover" />
                </Frame>
                {fig.caption && (
                  <figcaption>
                    <Mono className="text-[11px] text-ink-2 block">{fig.caption}</Mono>
                  </figcaption>
                )}
              </figure>
            ))}

            {/* Interleaved Paired / Half-Width Figures (if present) */}
            {halfFigures.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
                {halfFigures.map((fig, idx) => (
                  <figure key={idx} className="flex flex-col gap-2">
                    <Frame ratio={fig.aspect ?? "1/1"} label={`Figure 0${fullFigures.length + idx + 1}`}>
                      <Img src={fig.src} alt={fig.alt} fill className="object-cover" />
                    </Frame>
                    {fig.caption && (
                      <figcaption>
                        <Mono className="text-[10px] text-ink-2 block">{fig.caption}</Mono>
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

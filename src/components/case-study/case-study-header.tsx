import React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Lede } from "@/components/ui/typography";
import { Rise } from "@/components/ui/rise";
import { Project } from "@/lib/content";

export interface CaseStudyHeaderProps {
  project: Project;
}

export function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
  const year = project.date ? project.date.slice(0, 4) : undefined;
  const categoriesStr = project.categories.join(" · ");

  return (
    <Section variant="default" className="pt-[clamp(48px,8vw,96px)] pb-8">
      <Container>
        <Rise>
          {/* Category eyebrow */}
          <Eyebrow className="mb-4">{categoriesStr}</Eyebrow>

          {/* Project Title — max 18ch measure, clamp(40px,7vw,88px) */}
          <h1 className="font-black text-[clamp(40px,7vw,88px)] tracking-[-0.02em] leading-[0.98] [text-wrap:balance] max-w-[18ch] text-ink mb-6 break-words">
            {project.title}
          </h1>

          {/* Client tag if visible */}
          {project.clientVisible && project.client && (
            <div className="mb-4">
              <span className="font-mono text-[length:var(--step--1)] tracking-[0.16em] uppercase text-red font-semibold">
                Client · {project.client}
              </span>
            </div>
          )}

          {/* One-sentence summary */}
          <Lede className="mb-10 text-[length:var(--step-1)] leading-[1.4] max-w-[54ch]">
            {project.summary}
          </Lede>
        </Rise>

        {/* Meta Rail under hairline rule */}
        <div className="pt-6 border-t border-rule">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-ink-2 font-mono text-[11px] tracking-[0.16em] uppercase">
            {year && (
              <div>
                <span className="text-ink-2/60 block text-[10px] mb-1">Year</span>
                <span className="text-ink font-semibold">{year}</span>
              </div>
            )}

            {project.runtime && (
              <div>
                <span className="text-ink-2/60 block text-[10px] mb-1">Runtime</span>
                <span className="text-ink font-semibold">{project.runtime}</span>
              </div>
            )}

            {project.role && (
              <div>
                <span className="text-ink-2/60 block text-[10px] mb-1">Role</span>
                <span className="text-ink font-semibold">{project.role}</span>
              </div>
            )}

            {project.deliverables && project.deliverables.length > 0 && (
              <div>
                <span className="text-ink-2/60 block text-[10px] mb-1">Deliverables</span>
                <span className="text-ink font-semibold">
                  {project.deliverables.length} Master Packages
                </span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

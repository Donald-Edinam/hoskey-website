import React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display, Body, Mono } from "@/components/ui/typography";
import { Rise } from "@/components/ui/rise";

export interface HouseRuleItem {
  title: string;
  description: string;
}

export interface StudiosHouseRulesProps {
  rules?: HouseRuleItem[];
}

export function StudiosHouseRules({ rules }: StudiosHouseRulesProps) {
  // State: hidden until supplied (DONE: section absent rather than stubbed when empty)
  if (!rules || rules.length === 0) {
    return null;
  }

  return (
    <Section variant="default" id="house-rules" className="py-14 sm:py-20 border-b border-rule">
      <Container>
        <Rise>
          <div className="max-w-3xl mb-10">
            <Eyebrow className="mb-2">Practical Information</Eyebrow>
            <Display level={2}>What to Bring &amp; Studio Guidelines</Display>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rules.map((rule, idx) => (
              <div
                key={idx}
                className="p-6 bg-paper-2 border border-rule rounded-[var(--radius)] flex flex-col justify-between"
              >
                <div>
                  <Mono className="text-[10px] text-red uppercase tracking-[0.16em] mb-2 block">
                    Guideline 0{idx + 1}
                  </Mono>
                  <h3 className="font-bold text-ink text-[length:var(--step-0)] mb-2">
                    {rule.title}
                  </h3>
                  <Body size="sm" className="text-ink-2 leading-relaxed">
                    {rule.description}
                  </Body>
                </div>
              </div>
            ))}
          </div>
        </Rise>
      </Container>
    </Section>
  );
}

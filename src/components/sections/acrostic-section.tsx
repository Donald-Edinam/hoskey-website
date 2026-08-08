import React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/layout";
import { Display } from "@/components/ui/typography";
import { Rise } from "@/components/ui/rise";
import { cn } from "@/lib/utils";

const ACROSTIC_ITEMS = [
  { letter: "H", text: "Honesty in storytelling" },
  { letter: "O", text: "Originality in content creation" },
  { letter: "S", text: "Storytelling that inspires" },
  { letter: "K", text: "Knowledge through media" },
  { letter: "E", text: "Excellence in production" },
  { letter: "Y", text: "Your voice amplified" },
];

export function AcrosticSection() {
  return (
    <Section variant="tint" id="acrostic">
      <Container>
        <Rise>
          <Eyebrow className="mb-4">The Hoskey Signature</Eyebrow>
          <Display level={2} className="mb-10 md:mb-16 max-w-[20ch]">
            Our Guiding Standard
          </Display>
        </Rise>

        {/* Six rows, hairline-separated. Odd rows navy, even rows red. */}
        <div className="border-t border-rule divide-y divide-rule">
          {ACROSTIC_ITEMS.map((item, index) => {
            const isOddRow = index % 2 === 0; // 0, 2, 4 are 1st, 3rd, 5th rows (H, S, E)

            return (
              <div
                key={item.letter}
                className="flex items-baseline gap-4 sm:gap-8 md:gap-12 py-5 sm:py-7 md:py-9"
              >
                {/* Letter at clamp(44px,9vw,104px), weight 900, -0.05em */}
                <span
                  className={cn(
                    "font-black text-[clamp(44px,9vw,104px)] tracking-[-0.05em] leading-none select-none",
                    "w-[1.2ch] shrink-0 text-left",
                    isOddRow ? "text-navy" : "text-red"
                  )}
                >
                  {item.letter}
                </span>

                {/* Text baseline-aligned to the letter */}
                <span className="font-bold text-[clamp(18px,3.2vw,36px)] tracking-[-0.02em] leading-[1.15] text-ink">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

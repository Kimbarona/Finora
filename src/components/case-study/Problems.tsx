import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { problems } from "@/lib/case-study";
import { Note } from "./parts";

/**
 * Section 05 — the pain points, kept in the first person.
 *
 * Set as a ruled column of quotations rather than as cards. These are meant
 * to be read straight down as a single voice building up, and a grid would
 * break them into five unrelated tiles.
 */
export function Problems() {
  return (
    <Section id="problems" tone="paper" bordered className="section-y">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          <div>
            <SectionHeading
              index={problems.index}
              eyebrow={problems.eyebrow}
              title={problems.heading}
              intro={problems.intro}
            />

            <Reveal delay={100}>
              <Note className="mt-8">{problems.note}</Note>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <ul className="border-t border-rule-strong">
              {problems.quotes.map((quote) => (
                <li
                  key={quote}
                  className="grid grid-cols-[1.75rem_minmax(0,1fr)] items-start gap-x-4 border-b border-rule py-6 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-x-5"
                >
                  <Icon
                    name="quote"
                    className="mt-1 h-5 w-5 shrink-0 text-copper-bright sm:h-6 sm:w-6"
                  />
                  <blockquote>
                    <p className="font-serif text-[1.1875rem] leading-snug text-ink italic sm:text-[1.375rem]">
                      {quote}
                    </p>
                  </blockquote>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-[0.8125rem] leading-relaxed text-muted">
              Representative statements written for the target audience. Finora
              is a conceptual project, so these are not quotations from real
              customers or from user research.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

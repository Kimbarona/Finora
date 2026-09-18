import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { overview } from "@/lib/case-study";
import { Note } from "./parts";

/**
 * Section 01 — the facts a recruiter scans for in the first ten seconds:
 * what the project is, what role was played on it, and what it is not.
 */
export function Overview() {
  return (
    <Section id="overview" tone="card" bordered className="section-y">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16 xl:gap-20">
          <div>
            <SectionHeading
              index={overview.index}
              eyebrow={overview.eyebrow}
              title={overview.heading}
              maxWidth="max-w-[38rem]"
            />

            <Reveal delay={80}>
              <p className="mt-8 max-w-[42rem] border-l-2 border-copper-bright pl-5 font-serif text-[1.25rem] leading-snug font-normal text-ink italic sm:pl-7 sm:text-[1.5rem]">
                {overview.description}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <Note className="mt-8 max-w-[42rem]">{overview.goal}</Note>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="rounded-panel border border-rule-strong bg-paper p-5 sm:p-6 lg:sticky lg:top-28">
              <dl>
                {overview.meta.map((item, i) => (
                  <div
                    key={item.label}
                    className={`pb-4 ${i === 0 ? "" : "pt-4 border-t border-rule"}`}
                  >
                    <dt className="label-mono text-copper">{item.label}</dt>
                    <dd className="mt-2 text-[0.9375rem] leading-snug font-medium text-ink">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-rule pt-4">
                <p className="label-mono text-copper">{overview.focusLabel}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {overview.focus.map((item) => (
                    <li
                      key={item}
                      className="rounded-xs border border-rule-strong bg-card px-2.5 py-1.5 text-[0.8125rem] leading-none text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

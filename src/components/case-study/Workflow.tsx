import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { workflow } from "@/lib/case-study";
import { Note } from "./parts";

/** Section 13 — the order of operations behind the writing. */
export function Workflow() {
  return (
    <Section id="process" tone="card" bordered className="section-y">
      <div className="shell">
        <SectionHeading
          index={workflow.index}
          eyebrow={workflow.eyebrow}
          title={workflow.heading}
          intro={workflow.intro}
          maxWidth="max-w-[42rem]"
        />

        <Reveal delay={80} className="mt-12 sm:mt-14">
          <ol className="grid border-t border-rule-strong lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24">
            {workflow.steps.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-4 border-b border-rule py-4 sm:gap-5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-rule-strong bg-paper">
                  <span className="figure-mono text-[0.8125rem] font-medium text-forest">
                    {i + 1}
                  </span>
                </span>
                <span className="text-[1.0625rem] leading-snug text-ink">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={120}>
          <Note className="mt-9 max-w-3xl">{workflow.note}</Note>
        </Reveal>
      </div>
    </Section>
  );
}

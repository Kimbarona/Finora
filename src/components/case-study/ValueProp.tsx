import { CheckIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { valueProp } from "@/lib/case-study";
import { Note, Specimen } from "./parts";

/** Section 08 — the promise the rest of the page is built to support. */
export function ValueProp() {
  return (
    <Section id="value" tone="paper" bordered className="section-y">
      <div className="shell">
        <SectionHeading
          index={valueProp.index}
          eyebrow={valueProp.eyebrow}
          title={valueProp.heading}
          maxWidth="max-w-[42rem]"
        />

        <Reveal delay={80} className="mt-10 sm:mt-12">
          <Specimen label="Primary message" className="max-w-4xl">
            <p className="font-serif text-[1.625rem] leading-[1.18] font-semibold tracking-[-0.02em] text-ink sm:text-[2.25rem]">
              {valueProp.statement}
            </p>
          </Specimen>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <p className="label-mono text-copper">{valueProp.supportLabel}</p>
          <ul className="mt-4 grid max-w-4xl gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {valueProp.support.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 border-b border-rule pb-3 text-[1rem] text-ink-soft"
              >
                <CheckIcon className="mt-[6px] h-3.5 w-3.5 shrink-0 text-pos" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={160}>
          <Note className="mt-9 max-w-3xl">{valueProp.note}</Note>
        </Reveal>
      </div>
    </Section>
  );
}

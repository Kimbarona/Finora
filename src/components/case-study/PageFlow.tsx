import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { pageFlow } from "@/lib/case-study";

/**
 * Section 12 — the landing page read as a sequence.
 *
 * A numbered grid rather than a diagram: the mono indices carry the order, so
 * the layout is free to reflow from one column to four without the argument
 * becoming ambiguous.
 */
export function PageFlow() {
  return (
    <Section id="page-flow" tone="tint" bordered className="section-y">
      <div className="shell">
        <SectionHeading
          index={pageFlow.index}
          eyebrow={pageFlow.eyebrow}
          title={pageFlow.heading}
          intro={pageFlow.intro}
          maxWidth="max-w-[42rem]"
        />

        <Reveal delay={80} className="mt-12 sm:mt-14">
          <ol className="grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {pageFlow.steps.map((step, i) => (
              <li
                key={step.name}
                className="flex flex-col bg-card p-6 transition-colors duration-200 hover:bg-paper"
              >
                <span className="label-mono text-copper">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-card mt-4 text-ink">{step.name}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}

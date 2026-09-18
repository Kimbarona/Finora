import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { howItWorks } from "@/lib/content";

/**
 * Four steps.
 *
 * On desktop the steps sit along a single horizontal rule, which is the
 * clearest way to say "in this order" without drawing arrows. On a phone the
 * same rule turns vertical and runs down the left of the list, so the
 * sequence survives the reflow instead of becoming four unrelated cards.
 */
export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="card" bordered className="section-y">
      <div className="shell">
        <SectionHeading
          index={howItWorks.index}
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.heading}
          intro={howItWorks.intro}
          maxWidth="max-w-[40rem]"
        />

        <ol className="relative mt-12 grid gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-8">
          {/* The connecting rule, drawn once behind the steps.

              It runs vertically down the single-column phone layout and
              horizontally across the four-up desktop row. In between, at the
              two-by-two tablet layout, it is dropped: one line cannot align
              with two columns of markers, and a line that misses half of them
              is worse than none. */}
          <span
            aria-hidden="true"
            className="absolute top-5 left-[1.375rem] h-[calc(100%-2.5rem)] w-px bg-rule sm:hidden lg:top-[1.375rem] lg:left-0 lg:block lg:h-px lg:w-full"
          />

          {howItWorks.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.step}
              delay={i * 80}
              className="relative pl-14 lg:pt-14 lg:pl-0"
            >
              <span className="absolute top-0 left-0 grid h-11 w-11 place-items-center rounded-full border border-rule-strong bg-card text-forest lg:top-0">
                <Icon name={step.icon} className="h-5 w-5" />
              </span>

              <p className="flex items-center gap-2.5">
                <span className="label-mono text-copper">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
              </p>

              <h3 className="t-sub mt-1.5 text-[1.375rem] text-ink">
                {step.step}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-snug font-medium text-ink-soft">
                {step.title}
              </p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

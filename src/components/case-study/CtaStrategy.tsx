import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ctaStrategy } from "@/lib/case-study";
import { Caveat, Specimen } from "./parts";

/**
 * Section 09 — the single ask, and the wordings that were not chosen.
 *
 * The variations sit under an explicit "untested" heading and close with a
 * caveat. A portfolio page that lists five alternatives without saying so
 * invites the reader to assume one of them won a test.
 */
export function CtaStrategy() {
  return (
    <Section id="cta-strategy" tone="tint" bordered className="section-y">
      <div className="shell">
        <SectionHeading
          index={ctaStrategy.index}
          eyebrow={ctaStrategy.eyebrow}
          title={ctaStrategy.heading}
          maxWidth="max-w-[42rem]"
        />

        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={80}>
            <Specimen label={ctaStrategy.primaryLabel}>
              <p className="inline-flex h-12 items-center rounded-btn border border-forest bg-forest px-6 text-[1rem] font-medium text-white shadow-[0_1px_1px_rgba(7,32,26,0.16)]">
                {ctaStrategy.primary}
              </p>

              <p className="mt-6 border-t border-rule pt-6 text-[1.0625rem] leading-[1.75] text-body">
                {ctaStrategy.rationale}
              </p>
            </Specimen>
          </Reveal>

          <Reveal delay={140}>
            <p className="label-mono text-copper">
              {ctaStrategy.variationsLabel}
            </p>
            <h3 className="t-sub mt-3 text-ink">
              {ctaStrategy.variationsHeading}
            </h3>

            <ul className="mt-6 border-t border-rule-strong">
              {ctaStrategy.variations.map((variation, i) => (
                <li
                  key={variation}
                  className="flex items-baseline gap-4 border-b border-rule py-3.5 sm:gap-6"
                >
                  <span className="label-mono shrink-0 text-muted">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-[1.0625rem] leading-snug text-ink">
                    {variation}
                  </span>
                </li>
              ))}
            </ul>

            <Caveat label="Not tested" surface="card" className="mt-7">
              {ctaStrategy.disclaimer}
            </Caveat>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { featureBenefit } from "@/lib/case-study";
import { Note } from "./parts";

/**
 * Section 07 — the translation table.
 *
 * Each row keeps its own mono labels instead of relying on a header row at
 * the top of the section. A reader who lands mid-scroll, or who is on a
 * phone where the columns have stacked, should never have to scroll back up
 * to work out which line is the feature and which is the benefit.
 */
export function FeatureBenefit() {
  return (
    <Section id="feature-benefit" tone="card" bordered className="section-y">
      <div className="shell">
        <SectionHeading
          index={featureBenefit.index}
          eyebrow={featureBenefit.eyebrow}
          title={featureBenefit.heading}
          intro={featureBenefit.intro}
          maxWidth="max-w-[42rem]"
        />

        <Reveal delay={80} className="mt-12 sm:mt-14">
          <ul className="border-t border-rule-strong">
            {featureBenefit.rows.map((row) => (
              <li
                key={row.name}
                className="grid gap-5 border-b border-rule py-7 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-10 xl:gap-16"
              >
                <h3 className="t-card flex items-center gap-3 text-ink">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xs border border-rule-strong bg-paper text-forest">
                    <Icon name={row.icon} className="h-[1.125rem] w-[1.125rem]" />
                  </span>
                  {row.name}
                </h3>

                <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] sm:gap-8">
                  <div>
                    <p className="label-mono text-muted">
                      {featureBenefit.featureLabel}
                    </p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">
                      {row.feature}
                    </p>
                  </div>

                  <div className="border-l-2 border-copper-bright pl-5 sm:border-l sm:border-rule sm:pl-8">
                    <p className="label-mono text-copper">
                      {featureBenefit.benefitLabel}
                    </p>
                    <p className="mt-2 text-[1.0625rem] leading-[1.6] font-medium text-ink">
                      {row.benefit}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <Note className="mt-9 max-w-3xl">{featureBenefit.note}</Note>
        </Reveal>
      </div>
    </Section>
  );
}

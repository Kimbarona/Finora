import { CompositionBar } from "@/components/charts/Breakdown";
import { Icon } from "@/components/icons";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { solution } from "@/lib/content";
import { categories, categoryTotal, money } from "@/lib/demo";

/**
 * The turn: from the problem to the product.
 *
 * The five benefits are set as a numbered, ruled list rather than as icon
 * cards. At this point on the page the reader is being asked to follow an
 * argument, and a list they can read straight down does that better than a
 * grid they have to scan.
 */
export function Solution() {
  return (
    <Section tone="card" bordered className="section-y">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16 xl:gap-24">
          <div>
            <SectionHeading
              index={solution.index}
              eyebrow={solution.eyebrow}
              title={solution.heading}
              intro={solution.intro}
            />

            <Reveal delay={80}>
              <ol className="mt-10 border-t border-rule">
                {solution.points.map((point, i) => (
                  <li
                    key={point.title}
                    className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 border-b border-rule py-5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-6"
                  >
                    <span className="label-mono pt-1 text-copper">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="t-sub text-ink">{point.title}</h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-body">
                        {point.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={120} className="mt-7">
              <TextLink href="#showcase">See it in the product</TextLink>
            </Reveal>
          </div>

          {/* Sidebar: the demo workspace stated as a plain ledger, plus one
              small live chart so the section is not all prose. */}
          <Reveal delay={140}>
            <div className="lg:sticky lg:top-28">
              <div className="rounded-panel border border-rule-strong bg-paper p-5 sm:p-6">
                <p className="label-mono text-copper">
                  {solution.snapshot.label}
                </p>

                <dl className="mt-4 border-t border-rule">
                  {solution.snapshot.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-4 border-b border-rule py-3"
                    >
                      <dt className="text-[0.875rem] text-body">
                        {row.label}
                      </dt>
                      <dd className="figure-mono text-[1rem] font-semibold text-ink">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="label-mono text-muted">Spending mix</p>
                    <p className="figure-mono text-[0.8125rem] font-medium text-ink">
                      {money(categoryTotal)}
                    </p>
                  </div>
                  <CompositionBar
                    categories={categories}
                    total={categoryTotal}
                    height={12}
                    showLegend={false}
                    className="mt-2.5"
                  />
                  <p className="mt-3 text-[0.75rem] leading-relaxed text-muted">
                    {solution.snapshot.caption}
                  </p>
                </div>
              </div>

              <p className="mt-4 flex items-start gap-2 text-[0.75rem] leading-relaxed text-muted">
                <Icon name="lock" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Read-only by design. Finora reports on your finances rather
                than moving money.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

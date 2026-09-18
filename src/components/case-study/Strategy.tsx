import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { strategy } from "@/lib/case-study";

/**
 * Section 02 — the five principles, set as a hairline grid.
 *
 * The summary statement takes the sixth cell rather than sitting under the
 * grid as a stray paragraph: five principles in a three-column grid would
 * otherwise leave a hole, and the summary is the conclusion those five
 * principles add up to, so the grid is the right place for it.
 */
export function Strategy() {
  return (
    <Section id="strategy" tone="tint" bordered className="section-y">
      <div className="shell">
        <SectionHeading
          index={strategy.index}
          eyebrow={strategy.eyebrow}
          title={strategy.heading}
          intro={strategy.intro}
          maxWidth="max-w-[42rem]"
        />

        <Reveal delay={80} className="mt-12 sm:mt-14">
          <ul className="grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {strategy.principles.map((principle, i) => (
              <li
                key={principle.title}
                className="bg-card p-6 transition-colors duration-200 hover:bg-paper sm:p-7"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xs border border-rule-strong bg-paper text-forest">
                    <Icon name={principle.icon} className="h-5 w-5" />
                  </span>
                  <span className="label-mono text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>

                <h3 className="t-sub mt-5 text-ink">{principle.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                  {principle.body}
                </p>
              </li>
            ))}

            <li className="flex flex-col justify-center bg-forest-950 p-6 sm:p-7">
              <p className="label-mono text-copper-light">In one line</p>
              <p className="mt-3 font-serif text-[1.25rem] leading-snug text-white">
                {strategy.summary}
              </p>
            </li>
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

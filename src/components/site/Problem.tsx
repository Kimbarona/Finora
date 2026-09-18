import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { problem } from "@/lib/content";

/**
 * The problem, laid out as a ruled grid.
 *
 * Deliberately not six floating cards with shadows — that is the default
 * every SaaS page reaches for. A single bordered block divided by hairlines
 * reads as a page from a ledger, which is both on-brand and quieter, and it
 * puts the emphasis on the writing rather than on the containers.
 */
export function Problem() {
  return (
    <Section id="solutions" tone="paper" bordered className="section-y">
      <div className="shell">
        <SectionHeading
          index={problem.index}
          eyebrow={problem.eyebrow}
          title={problem.heading}
          intro={problem.intro}
          maxWidth="max-w-[42rem]"
        />

        <Reveal delay={80} className="mt-12 sm:mt-14">
          <ul className="grid overflow-hidden rounded-card border border-rule bg-card sm:grid-cols-2 lg:grid-cols-3">
            {problem.items.map((item, i) => (
              <li
                key={item.title}
                className={[
                  "group relative p-6 transition-colors duration-200 hover:bg-paper sm:p-7",
                  /* Hairlines drawn with borders rather than dividers, so the
                     outer edges never double up at any breakpoint. */
                  "border-rule",
                  "border-b last:border-b-0",
                  "sm:[&:nth-last-child(-n+2)]:border-b-0 sm:odd:border-r",
                  "lg:[&:nth-last-child(-n+3)]:border-b-0 lg:odd:border-r lg:even:border-r lg:[&:nth-child(3n)]:border-r-0",
                ].join(" ")}
              >
                <span className="flex items-center gap-3">
                  <Icon
                    name={item.icon}
                    className="h-5 w-5 shrink-0 text-copper-bright"
                  />
                  <span className="label-mono text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>

                <h3 className="t-card mt-4 text-ink">{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-10 max-w-3xl border-l-2 border-copper-bright pl-5 font-serif text-[1.25rem] leading-snug font-normal text-ink italic sm:mt-12 sm:pl-7 sm:text-[1.625rem]">
            {problem.kicker}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

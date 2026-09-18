import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { benefits } from "@/lib/content";

/**
 * Outcomes rather than features.
 *
 * Each card carries a copper rule along its top edge — the one flourish this
 * section gets. It marks these four as a set and as a different kind of claim
 * from the feature blocks above, without another icon treatment or another
 * background colour.
 */
export function Benefits() {
  return (
    <Section tone="tint" bordered className="section-y">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading
            index={benefits.index}
            eyebrow={benefits.eyebrow}
            title={benefits.heading}
            intro={benefits.intro}
          />

          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {benefits.items.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 70}
                className="relative overflow-hidden rounded-card border border-rule bg-card p-6 transition-shadow duration-200 hover:shadow-[0_1px_2px_rgba(22,33,29,0.05),0_10px_24px_-18px_rgba(22,33,29,0.22)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] bg-copper-bright"
                />

                <span className="flex items-center gap-3">
                  <Icon name={item.icon} className="h-5 w-5 text-forest" />
                  <h3 className="t-card text-[1.1875rem] text-ink">
                    {item.title}
                  </h3>
                </span>

                <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

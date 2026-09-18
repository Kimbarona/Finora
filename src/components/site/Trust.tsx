import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { trust } from "@/lib/content";

/**
 * Security, placed second on purpose.
 *
 * In fintech, "can I trust this with my numbers" is the question a visitor
 * asks immediately after "what is it", so it is answered before the problem
 * and solution rather than buried near the footer. The dark band gives it the
 * weight the subject deserves.
 *
 * Every claim here is written as design intent. There are no certification
 * badges, no compliance logos and no named institutions, because this is a
 * concept product and inventing those signals would be dishonest.
 */
export function Trust() {
  return (
    <Section id="security" tone="dark" className="section-y relative isolate">
      <div
        aria-hidden="true"
        className="ledger-rules-dark pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_10%,transparent_70%)]"
      />

      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              index={trust.index}
              eyebrow={trust.eyebrow}
              title={trust.heading}
              intro={trust.intro}
              tone="dark"
            />

            <Reveal delay={100}>
              <div className="mt-8 rounded-card border border-copper-light/25 bg-white/[0.04] p-5">
                <p className="label-mono text-copper-light">
                  {trust.note.label}
                </p>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-[#9fb0a9]">
                  {trust.note.body}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={80}>
            {/* A ruled grid rather than floating cards: on a dark ground,
                hairlines read as structure where shadows read as noise. */}
            <ul className="grid border-t border-white/12 sm:grid-cols-2">
              {trust.pillars.map((pillar) => (
                <li
                  key={pillar.title}
                  className="group border-b border-white/12 py-7 sm:px-7 sm:odd:pl-0 sm:even:border-l sm:even:border-l-white/12"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xs border border-copper-light/30 bg-copper-light/10 text-copper-light">
                    <Icon name={pillar.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="t-card mt-4 text-white">{pillar.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#9fb0a9]">
                    {pillar.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

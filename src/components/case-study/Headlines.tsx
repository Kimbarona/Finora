import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { headlines } from "@/lib/case-study";
import { Caveat } from "./parts";

/**
 * Section 10 — headline concepts.
 *
 * The chosen line is given a different ground from the four alternatives so
 * the hierarchy is visible at a glance, and every alternative carries its
 * messaging angle rather than being presented as an interchangeable option.
 */
export function Headlines() {
  return (
    <Section id="headlines" tone="card" bordered className="section-y">
      <div className="shell">
        <SectionHeading
          index={headlines.index}
          eyebrow={headlines.eyebrow}
          title={headlines.heading}
          intro={headlines.intro}
          maxWidth="max-w-[42rem]"
        />

        <Reveal delay={80} className="mt-12 sm:mt-14">
          <article className="rounded-panel border border-forest/25 bg-forest-950 p-6 sm:p-8">
            <p className="label-mono text-copper-light">
              {headlines.primaryLabel}
            </p>
            <h3 className="mt-4 font-serif text-[1.625rem] leading-[1.14] font-semibold tracking-[-0.02em] text-white sm:text-[2.125rem]">
              {headlines.primary.text}
            </h3>
            <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-white/15 pt-5">
              <span className="label-mono text-[#9fb0a9]">
                {headlines.angleLabel}
              </span>
              <span className="text-[1rem] font-medium text-copper-light">
                {headlines.primary.angle}
              </span>
            </p>
            <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-[#c9d6d0]">
              {headlines.primary.note}
            </p>
          </article>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <p className="label-mono text-copper">{headlines.variationsLabel}</p>

          <ul className="mt-5 grid gap-px overflow-hidden rounded-card border border-rule bg-rule lg:grid-cols-2">
            {headlines.variations.map((variation, i) => (
              <li key={variation.text} className="bg-paper p-6 sm:p-7">
                <span className="label-mono text-muted">
                  {String.fromCharCode(66 + i)}
                </span>

                <h3 className="mt-3 font-serif text-[1.3125rem] leading-snug font-semibold tracking-[-0.016em] text-ink sm:text-[1.5rem]">
                  {variation.text}
                </h3>

                <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-rule pt-4">
                  <span className="label-mono text-muted">
                    {headlines.angleLabel}
                  </span>
                  <span className="text-[0.9375rem] font-medium text-copper">
                    {variation.angle}
                  </span>
                </p>

                <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">
                  {variation.note}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={160}>
          <Caveat label="Concepts only" className="mt-9 max-w-3xl">
            {headlines.disclaimer}
          </Caveat>
        </Reveal>
      </div>
    </Section>
  );
}

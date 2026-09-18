import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { heroCopy } from "@/lib/case-study";
import { Specimen } from "./parts";

/**
 * Section 03 — the hero copy itself, on the forest band.
 *
 * The two call-to-action samples are rendered as spans, not anchors. They are
 * specimens of wording being discussed, and giving them the affordance of a
 * button on a page that is *about* buttons would be a small lie to anyone
 * navigating by keyboard.
 */
export function HeroCopy() {
  return (
    <Section id="hero-copy" tone="dark" className="section-y relative isolate">
      <div
        aria-hidden="true"
        className="ledger-rules-dark pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_70%_at_50%_45%,#000_15%,transparent_75%)]"
      />

      <div className="shell">
        <SectionHeading
          index={heroCopy.index}
          eyebrow={heroCopy.eyebrow}
          title={heroCopy.heading}
          intro={heroCopy.intro}
          tone="dark"
          maxWidth="max-w-[42rem]"
        />

        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal delay={80}>
            <Specimen label={heroCopy.specimen.label} tone="dark">
              <p className="font-serif text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.02em] text-white sm:text-[2.25rem]">
                {heroCopy.specimen.headline}
              </p>

              <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.7] text-[#c9d6d0]">
                {heroCopy.specimen.support}
              </p>

              <ul className="mt-8 flex flex-wrap gap-6 border-t border-white/15 pt-6">
                {heroCopy.specimen.ctas.map((cta, i) => (
                  <li key={cta.label}>
                    <p className="label-mono text-[#9fb0a9]">{cta.role}</p>
                    <p
                      className={[
                        "mt-2.5 inline-flex h-11 items-center rounded-btn border px-5",
                        "text-[0.9375rem] font-medium",
                        i === 0
                          ? "border-white bg-white text-forest"
                          : "border-white/30 text-white",
                      ].join(" ")}
                    >
                      {cta.label}
                    </p>
                  </li>
                ))}
              </ul>
            </Specimen>
          </Reveal>

          <Reveal delay={140} className="lg:pt-2">
            <h3 className="t-sub text-white">{heroCopy.rationaleHeading}</h3>
            {heroCopy.rationale.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-[1.0625rem] leading-[1.75] text-[#c9d6d0]"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

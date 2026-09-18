import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { summary } from "@/lib/case-study";
import { BackLink } from "./Chrome";

/**
 * Section 14 — the closing statement, on the forest band.
 *
 * The portfolio disclaimer sits here in full rather than in the footer's
 * small print. It is the last thing a recruiter reads before leaving the
 * page, which is exactly where a statement about what is and is not real
 * belongs.
 */
export function Summary() {
  return (
    <Section id="summary" tone="dark" className="section-y relative isolate">
      <div
        aria-hidden="true"
        className="ledger-rules-dark pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_75%_at_50%_50%,#000_15%,transparent_72%)]"
      />

      <div className="shell">
        <SectionHeading
          index={summary.index}
          eyebrow={summary.eyebrow}
          title={summary.heading}
          tone="dark"
          maxWidth="max-w-[42rem]"
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal delay={80}>
            {summary.paragraphs.map((paragraph, i) => (
              <p
                key={paragraph}
                className={`font-serif text-[1.25rem] leading-[1.45] text-white sm:text-[1.5rem] ${
                  i === 0 ? "" : "mt-6"
                }`}
              >
                {paragraph}
              </p>
            ))}

            <Reveal delay={160} className="mt-10">
              <BackLink tone="dark" />
            </Reveal>
          </Reveal>

          <Reveal delay={140}>
            <aside className="rounded-card border border-white/15 border-l-2 border-l-copper-light bg-white/[0.04] p-5 sm:p-6">
              <p className="label-mono text-copper-light">
                {summary.disclaimerLabel}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#c9d6d0]">
                {summary.disclaimer}
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

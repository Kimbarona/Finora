import { Reveal } from "@/components/ui/Reveal";
import { caseStudy } from "@/lib/case-study";
import { site } from "@/lib/content";

/**
 * The title block.
 *
 * Built from the landing page's own hero parts — ruled backdrop, mono
 * eyebrow, display serif with a forest accent — so a visitor arriving from
 * the product page recognises where they are before they read a word.
 */
export function Masthead() {
  return (
    <section className="relative isolate overflow-hidden pt-12 pb-14 sm:pt-16 lg:pt-20 lg:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]"
      >
        <div className="ledger-rules absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent_82%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-rule" />
      </div>

      <div className="shell">
        <div className="max-w-[46rem]">
          <Reveal>
            <p className="flex items-center gap-3 sm:gap-4">
              <span className="label-mono text-copper">{site.name}</span>
              <span aria-hidden="true" className="h-px w-8 bg-rule-strong sm:w-12" />
              <span className="label-mono text-muted">{caseStudy.eyebrow}</span>
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="t-display mt-6 text-ink">
              {caseStudy.title} <span className="text-forest">Case Study</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="t-lead mt-6 max-w-2xl text-body">
              {caseStudy.subtitle}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-2xl border-t border-rule pt-6 text-[0.9375rem] leading-relaxed text-muted">
              {caseStudy.intro}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

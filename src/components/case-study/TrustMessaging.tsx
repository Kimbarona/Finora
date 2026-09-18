import { CloseIcon, Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { trustMessaging } from "@/lib/case-study";

/**
 * Section 11 — the claims the copy makes, and the ones it refuses to.
 *
 * The avoided phrases are marked with a cross glyph rather than a
 * strikethrough. A line through text is decoration, and on a list whose whole
 * point is what is *absent*, meaning carried only by decoration is the one
 * thing that cannot be allowed to go missing.
 */
export function TrustMessaging() {
  return (
    <Section id="trust" tone="paper" bordered className="section-y">
      <div className="shell">
        <SectionHeading
          index={trustMessaging.index}
          eyebrow={trustMessaging.eyebrow}
          title={trustMessaging.heading}
          intro={trustMessaging.intro}
          maxWidth="max-w-[42rem]"
        />

        <div className="mt-12 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
          <Reveal delay={80}>
            <p className="label-mono text-copper">
              {trustMessaging.themesLabel}
            </p>

            <ul className="mt-5 border-t border-rule-strong">
              {trustMessaging.themes.map((theme) => (
                <li
                  key={theme.title}
                  className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 border-b border-rule py-5 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-x-5"
                >
                  <Icon
                    name={theme.icon}
                    className="mt-0.5 h-5 w-5 shrink-0 text-forest"
                  />
                  <div>
                    <h3 className="t-card text-ink">{theme.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-body">
                      {theme.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <div className="rounded-panel border border-rule-strong bg-card p-5 sm:p-6 lg:sticky lg:top-28">
              <h3 className="label-mono text-neg">
                {trustMessaging.avoidedLabel}
              </h3>

              <ul className="mt-4 space-y-2.5">
                {trustMessaging.avoided.map((claim) => (
                  <li
                    key={claim}
                    className="flex items-start gap-2.5 rounded-xs bg-neg-wash px-3 py-2.5"
                  >
                    <CloseIcon className="mt-[3px] h-4 w-4 shrink-0 text-neg" />
                    <span className="text-[0.9375rem] leading-snug text-ink">
                      &ldquo;{claim}&rdquo;
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-rule pt-5 text-[0.875rem] leading-relaxed text-body">
                {trustMessaging.avoidedNote}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

import { CheckIcon, Icon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { pricing } from "@/lib/content";

/**
 * Three plans, with Growth carried on the dark band colour.
 *
 * Inverting the recommended plan rather than giving it a coloured border and
 * a badge is what makes the hierarchy unmissable at a glance, and it reuses a
 * ground the page has already established instead of introducing a new one.
 * The badge is still there for anyone who needs the label spelled out.
 */
export function Pricing() {
  return (
    <Section id="pricing" tone="paper" bordered className="section-y">
      <div className="shell">
        <SectionHeading
          index={pricing.index}
          eyebrow={pricing.eyebrow}
          title={pricing.heading}
          intro={pricing.intro}
          maxWidth="max-w-[40rem]"
        />

        <ul className="mt-12 grid items-start gap-5 sm:mt-14 lg:grid-cols-3 lg:gap-6">
          {pricing.plans.map((plan, i) => {
            const featured = plan.featured;
            return (
              <Reveal
                as="li"
                key={plan.name}
                delay={i * 80}
                className={`flex ${featured ? "lg:-mt-4" : ""}`}
              >
                <div
                  className={[
                    "flex flex-1 flex-col rounded-panel border p-6 sm:p-7",
                    featured
                      ? "on-dark border-forest-950 bg-forest-950 text-[#c9d6d0] shadow-[0_2px_4px_rgba(22,33,29,0.12),0_24px_48px_-28px_rgba(22,33,29,0.4)]"
                      : "border-rule bg-card",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3
                        className={`font-serif text-[1.375rem] leading-none font-semibold ${
                          featured ? "text-white" : "text-ink"
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`mt-2 text-[0.8125rem] leading-snug ${
                          featured ? "text-[#9fb0a9]" : "text-muted"
                        }`}
                      >
                        {plan.audience}
                      </p>
                    </div>

                    {"badge" in plan && plan.badge ? (
                      <p className="label-mono shrink-0 rounded-[3px] border border-copper-light/40 bg-copper-light/10 px-2 py-1 text-copper-light">
                        {plan.badge}
                      </p>
                    ) : null}
                  </div>

                  <p className="mt-6 flex items-baseline gap-1.5">
                    <span
                      className={`figure-mono text-[2.5rem] leading-none font-semibold ${
                        featured ? "text-white" : "text-ink"
                      }`}
                    >
                      ${plan.price}
                    </span>
                    <span
                      className={`text-[0.8125rem] ${
                        featured ? "text-[#9fb0a9]" : "text-muted"
                      }`}
                    >
                      {plan.price === "0" ? "" : "/mo"}
                    </span>
                  </p>
                  <p
                    className={`mt-1.5 text-[0.75rem] ${
                      featured ? "text-[#9fb0a9]" : "text-muted"
                    }`}
                  >
                    {plan.cadence}
                  </p>

                  <p
                    className={`mt-5 border-t pt-5 text-[0.9375rem] leading-relaxed ${
                      featured
                        ? "border-white/12 text-[#c9d6d0]"
                        : "border-rule text-body"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <ul className="mt-5 flex-1 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-2.5 text-[0.9375rem] ${
                          featured ? "text-[#c9d6d0]" : "text-ink-soft"
                        }`}
                      >
                        <CheckIcon
                          className={`mt-[5px] h-3.5 w-3.5 shrink-0 ${
                            featured ? "text-copper-light" : "text-pos"
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    href="#cta"
                    size="lg"
                    fullWidth
                    variant={featured ? "onDark" : "secondary"}
                    className="mt-7"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col gap-5 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-body">
              {pricing.assurances.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckIcon className="h-3.5 w-3.5 shrink-0 text-pos" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="flex max-w-md items-start gap-2 text-[0.75rem] leading-relaxed text-muted">
              <Icon name="alert" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {pricing.note}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

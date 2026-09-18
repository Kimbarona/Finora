import { CheckIcon, Icon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { finalCta, site } from "@/lib/content";

export function FinalCta() {
  return (
    <Section id="cta" tone="dark" className="section-y relative isolate">
      <div
        aria-hidden="true"
        className="ledger-rules-dark pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_75%_at_50%_50%,#000_15%,transparent_72%)]"
      />

      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="label-mono text-copper-light">{finalCta.eyebrow}</p>
          </Reveal>

          <Reveal delay={60}>
            <h2 className="t-section mt-5 text-white">{finalCta.heading}</h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="t-lead mx-auto mt-5 max-w-xl text-[#c9d6d0]">
              {finalCta.body}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button href="#top" variant="onDark" size="lg" className="group">
                {site.primaryCta}
                <Icon
                  name="arrowRight"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Button>
              <Button href="#how-it-works" variant="onDarkGhost" size="lg">
                {site.secondaryCta}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.8125rem] text-[#9fb0a9]">
              {finalCta.assurances.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckIcon className="h-3.5 w-3.5 shrink-0 text-copper-light" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

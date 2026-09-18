import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { testimonials } from "@/lib/content";

/**
 * Three quotes that are labelled as what they are.
 *
 * A conceptual product has no customers, so these are presented as the
 * personas the product was designed around, marked with a visible badge and
 * an explanatory sentence, and written in the first person only because that
 * is the clearest way to state what each persona needs. There are no
 * invented company logos, ratings or outcome statistics anywhere in this
 * section.
 */
export function Testimonials() {
  return (
    <Section tone="card" bordered className="section-y">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index={testimonials.index}
            eyebrow={testimonials.eyebrow}
            title={testimonials.heading}
            intro={testimonials.intro}
            maxWidth="max-w-[38rem]"
          />

          <Reveal delay={80} className="shrink-0">
            <p className="label-mono inline-flex items-center gap-2 rounded-[3px] border border-copper/30 bg-copper-wash px-2.5 py-1.5 text-copper">
              <Icon name="insight" className="h-3.5 w-3.5" />
              {testimonials.badge}
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-3 lg:gap-6">
          {testimonials.items.map((item, i) => (
            <Reveal as="li" key={item.name} delay={i * 80} className="flex">
              {/* figure/figcaption is the correct pairing for an attributed
                  quote — the caption must not sit loose in the list item. */}
              <figure className="m-0 flex flex-1 flex-col rounded-panel border border-rule bg-paper p-6 sm:p-7">
              <Icon
                name="quote"
                className="h-6 w-6 shrink-0 text-copper-bright/60"
              />

              <blockquote className="mt-4 flex-1">
                <p className="font-serif text-[1.125rem] leading-[1.5] text-ink sm:text-[1.1875rem]">
                  {item.quote}
                </p>
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-rule pt-5">
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest text-[0.75rem] font-semibold text-white"
                >
                  {item.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.9375rem] font-medium text-ink">
                    {item.name}
                  </span>
                  <span className="block text-[0.8125rem] leading-snug text-muted">
                    {item.role} &middot; {item.company}
                  </span>
                </span>
              </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

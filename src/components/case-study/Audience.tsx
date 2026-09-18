import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { audience } from "@/lib/case-study";
import { Note } from "./parts";

/** Section 04 — the four groups the page has to speak to at once. */
export function Audience() {
  return (
    <Section id="audience" tone="card" bordered className="section-y">
      <div className="shell">
        <SectionHeading
          index={audience.index}
          eyebrow={audience.eyebrow}
          title={audience.heading}
          intro={audience.intro}
          maxWidth="max-w-[42rem]"
        />

        <Reveal delay={80} className="mt-12 sm:mt-14">
          <ul className="grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {audience.groups.map((group, i) => (
              <li
                key={group.title}
                className="flex flex-col bg-paper p-6 transition-colors duration-200 hover:bg-paper-2 sm:p-7"
              >
                <span className="flex items-center justify-between gap-3">
                  <Icon
                    name={group.icon}
                    className="h-6 w-6 shrink-0 text-copper-bright"
                  />
                  <span className="label-mono text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>

                <h3 className="t-card mt-5 text-ink">{group.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                  {group.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <Note className="mt-9 max-w-3xl">{audience.note}</Note>
        </Reveal>
      </div>
    </Section>
  );
}

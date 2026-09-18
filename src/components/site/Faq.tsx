"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { faq } from "@/lib/content";

/**
 * FAQ accordion.
 *
 * Several panels can be open at once. An accordion that closes your last
 * answer to show you the next one is a worse experience for a page like this,
 * where a visitor is often comparing two answers — the single-open pattern
 * exists to manage layout, not to help the reader.
 *
 * Markup notes: each trigger is a real `<button>` inside the heading that
 * labels it, wired with `aria-expanded` and `aria-controls`; the panel is a
 * region labelled by its trigger and marked `inert` while closed, so a
 * keyboard user cannot land inside a collapsed answer.
 */
export function Faq() {
  const [open, setOpen] = useState<number[]>([0]);

  const toggle = (index: number) =>
    setOpen((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index],
    );

  return (
    <Section id="resources" tone="tint" bordered className="section-y">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              index={faq.index}
              eyebrow={faq.eyebrow}
              title={faq.heading}
              intro={faq.intro}
            />

            <Reveal delay={80} className="mt-6 flex flex-col gap-3">
              <TextLink href="#how-it-works">See how it works</TextLink>
              <TextLink href="#security">Read about security</TextLink>
            </Reveal>
          </div>

          <Reveal delay={60}>
            <ul className="border-t border-rule-strong">
              {faq.items.map((item, index) => {
                const isOpen = open.includes(index);
                return (
                  <li key={item.q} className="border-b border-rule">
                    <h3>
                      <button
                        type="button"
                        id={`faq-trigger-${index}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        onClick={() => toggle(index)}
                        className="group flex w-full items-start gap-4 py-5 text-left sm:gap-6"
                      >
                        {/* Decorative index: excluded from the accessible
                            name so the button reads as the question alone,
                            not "zero one What is Finora". */}
                        <span
                          aria-hidden="true"
                          className="label-mono mt-1 shrink-0 text-copper"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="flex-1 font-sans text-[1.0625rem] leading-snug font-medium tracking-[-0.008em] text-ink transition-colors duration-150 group-hover:text-forest">
                          {item.q}
                        </span>

                        {/* A plus that becomes a minus: the clearest possible
                            "this opens" affordance, and it needs no rotation
                            trickery to read correctly. */}
                        <span
                          aria-hidden="true"
                          className="relative mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-[3px] border border-rule-strong bg-card text-forest transition-colors duration-200 group-hover:border-forest"
                        >
                          <span className="absolute h-[1.5px] w-2.5 rounded-full bg-current" />
                          <span
                            className={`absolute h-2.5 w-[1.5px] rounded-full bg-current transition-transform duration-300 ${
                              isOpen ? "scale-y-0" : "scale-y-100"
                            }`}
                          />
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      inert={!isOpen}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[46rem] pr-10 pb-5 pl-[2.25rem] text-[0.9375rem] leading-[1.75] text-body sm:pl-[2.75rem]">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 flex items-start gap-2 text-[0.8125rem] leading-relaxed text-muted">
              <Icon name="insight" className="mt-0.5 h-4 w-4 shrink-0" />
              Answers describe how the Finora concept is designed to work.
              Finora is a portfolio project, not a live service.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

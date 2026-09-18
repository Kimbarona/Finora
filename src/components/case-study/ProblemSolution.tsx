import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { problemSolution } from "@/lib/case-study";

/**
 * Section 06 — problem and answer, side by side.
 *
 * The two washes are the system's existing financial-sign colours, which is
 * the one place a case study can borrow them honestly: a problem is a debit
 * and its answer is a credit. On a phone the pair stacks and the arrow
 * rotates, so the reading order never becomes ambiguous.
 */
export function ProblemSolution() {
  return (
    <Section id="problem-solution" tone="tint" bordered className="section-y">
      <div className="shell">
        <SectionHeading
          index={problemSolution.index}
          eyebrow={problemSolution.eyebrow}
          title={problemSolution.heading}
          intro={problemSolution.intro}
          maxWidth="max-w-[42rem]"
        />

        <Reveal delay={80} className="mt-12 flex flex-col gap-5 sm:mt-14">
          {problemSolution.pairs.map((pair, i) => (
            <div
              key={pair.problem}
              className="relative grid gap-px overflow-hidden rounded-card border border-rule bg-rule md:grid-cols-2"
            >
              <div className="bg-neg-wash p-6 sm:p-7">
                <p className="label-mono flex items-center gap-2.5 text-neg">
                  <span>{problemSolution.problemLabel}</span>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </p>
                <p className="mt-3.5 text-[1.0625rem] leading-[1.6] text-ink">
                  {pair.problem}
                </p>
              </div>

              <div className="bg-pos-wash p-6 sm:p-7">
                <p className="label-mono flex items-center gap-2.5 text-pos">
                  <span>{problemSolution.solutionLabel}</span>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </p>
                <p className="mt-3.5 text-[1.0625rem] leading-[1.6] font-medium text-ink">
                  {pair.solution}
                </p>
              </div>

              {/* The join between the two halves. Decorative: the labels
                  already say which side is which. */}
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-rule bg-card text-forest md:grid"
              >
                <Icon name="arrowRight" className="h-4 w-4" />
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

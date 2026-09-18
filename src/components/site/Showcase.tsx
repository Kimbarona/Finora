import { ShowcaseDashboard } from "@/components/dashboard/ShowcaseDashboard";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { showcase } from "@/lib/content";

export function Showcase() {
  return (
    <Section id="showcase" tone="tint" bordered className="section-y">
      <div className="shell">
        <SectionHeading
          index={showcase.index}
          eyebrow={showcase.eyebrow}
          title={showcase.heading}
          intro={showcase.intro}
          maxWidth="max-w-[44rem]"
        />

        <Reveal delay={80} className="mt-10 sm:mt-12">
          <ShowcaseDashboard />
        </Reveal>
      </div>
    </Section>
  );
}

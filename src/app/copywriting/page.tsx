import type { Metadata } from "next";
import { Audience } from "@/components/case-study/Audience";
import {
  CaseStudyFooter,
  CaseStudyHeader,
} from "@/components/case-study/Chrome";
import { CtaStrategy } from "@/components/case-study/CtaStrategy";
import { FeatureBenefit } from "@/components/case-study/FeatureBenefit";
import { Headlines } from "@/components/case-study/Headlines";
import { HeroCopy } from "@/components/case-study/HeroCopy";
import { Masthead } from "@/components/case-study/Masthead";
import { Overview } from "@/components/case-study/Overview";
import { PageFlow } from "@/components/case-study/PageFlow";
import { ProblemSolution } from "@/components/case-study/ProblemSolution";
import { Problems } from "@/components/case-study/Problems";
import { Strategy } from "@/components/case-study/Strategy";
import { Summary } from "@/components/case-study/Summary";
import { TrustMessaging } from "@/components/case-study/TrustMessaging";
import { ValueProp } from "@/components/case-study/ValueProp";
import { Workflow } from "@/components/case-study/Workflow";

const description =
  "A copywriting and UX messaging case study for Finora, a conceptual financial management SaaS: the audience, the problem framing, how features were rewritten as benefits, CTA strategy and headline concepts. A portfolio project.";

export const metadata: Metadata = {
  /* Absolute: the root template appends "| Finora", which would repeat the
     brand name that already opens this title. */
  title: { absolute: "Finora — Landing Page Copywriting Case Study" },
  description,
  keywords: [
    "landing page copywriting case study",
    "SaaS copywriting portfolio",
    "UX writing case study",
    "conversion copywriting",
    "fintech messaging strategy",
    "feature to benefit copy",
  ],
  alternates: { canonical: "/copywriting" },
  openGraph: {
    type: "article",
    url: "/copywriting",
    siteName: "Finora",
    locale: "en_US",
    title: "Finora — Landing Page Copywriting Case Study",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Finora — Landing Page Copywriting Case Study",
    description,
  },
  robots: { index: true, follow: true },
};

/**
 * The copywriting case study.
 *
 * A separate route from the landing page, and deliberately not linked from
 * the product navigation: the landing page is the artefact being discussed,
 * and a "case study" item in its header would break the illusion the page
 * depends on. The route back runs the other way instead — from the header,
 * the closing section and the footer here.
 *
 * Section order follows how the writing was actually produced: who it is for
 * and what they already believe, then the messaging, then the wording, then
 * what has and has not been proven about it.
 */
export default function CopywritingCaseStudy() {
  return (
    <>
      <CaseStudyHeader />

      <main id="main">
        <Masthead />
        <Overview />
        <Strategy />
        <HeroCopy />
        <Audience />
        <Problems />
        <ProblemSolution />
        <FeatureBenefit />
        <ValueProp />
        <CtaStrategy />
        <Headlines />
        <TrustMessaging />
        <PageFlow />
        <Workflow />
        <Summary />
      </main>

      <CaseStudyFooter />
    </>
  );
}

/**
 * Copy for the `/copywriting` case study page, in page order.
 *
 * This file documents the writing on the Finora landing page rather than
 * being landing-page copy itself, so it is kept separate from `content.ts`.
 *
 * Finora is a conceptual portfolio project: nothing here reports a real
 * customer, a real test result or a measured outcome, and the sections that
 * show alternative wording are labelled as untested concepts on purpose.
 */

import type { IconName } from "@/components/icons";

export const caseStudy = {
  eyebrow: "Case study",
  title: "Landing Page Copywriting",
  subtitle:
    "Conversion-focused messaging for a modern financial management platform",
  intro:
    "A walkthrough of the messaging decisions behind the Finora landing page: who it is written for, the problems it opens with, how each feature was rewritten as a benefit, and where the copy deliberately stops short of a claim it cannot support.",
  backLabel: "View Finora Landing Page",
} as const;

/* -------------------------------------------------------------------------- */
/* 1. Project overview                                                         */
/* -------------------------------------------------------------------------- */

export const overview = {
  index: "01",
  eyebrow: "Overview",
  heading: "Project overview",
  meta: [
    { label: "Project", value: "Finora — Financial Management SaaS" },
    { label: "Role", value: "UX/UI Design, Copywriting, Frontend Development" },
    { label: "Project type", value: "Conceptual SaaS Portfolio Project" },
  ],
  focusLabel: "Focus",
  focus: [
    "Landing Page Design",
    "Conversion-Focused Copywriting",
    "UX Messaging",
    "Responsive Frontend",
  ],
  description:
    "Finora is a modern financial management platform designed to help small businesses, founders, freelancers, and finance teams better understand their cash flow, expenses, and overall financial performance.",
  goal: "The goal of the landing page copy was to make financial information feel clearer and more approachable while communicating the value of better financial visibility and control.",
} as const;

/* -------------------------------------------------------------------------- */
/* 2. Copywriting strategy                                                     */
/* -------------------------------------------------------------------------- */

export const strategy = {
  index: "02",
  eyebrow: "Strategy",
  heading: "Five principles the copy is written against",
  intro:
    "Every line on the landing page was checked against the same five principles. They are what keep a long page sounding like one writer rather than five.",
  principles: [
    {
      icon: "understand" as IconName,
      title: "Clarity",
      body: "Financial software can feel complicated, so the messaging should be simple and easy to understand.",
    },
    {
      icon: "steady" as IconName,
      title: "Confidence",
      body: "The copy should help users feel more confident about understanding and managing their business finances.",
    },
    {
      icon: "eye" as IconName,
      title: "Visibility",
      body: "Emphasize knowing where money is coming from, where it is going, and what needs attention.",
    },
    {
      icon: "sliders" as IconName,
      title: "Control",
      body: "Position Finora as a tool that helps users make informed decisions rather than simply displaying financial data.",
    },
    {
      icon: "scales" as IconName,
      title: "Simplicity",
      body: "Avoid overly technical financial terminology and communicate benefits in plain language.",
    },
  ],
  summary:
    "The messaging focuses on turning complex financial information into clear, actionable insights.",
} as const;

/* -------------------------------------------------------------------------- */
/* 3. Hero copy                                                                */
/* -------------------------------------------------------------------------- */

export const heroCopy = {
  index: "03",
  eyebrow: "Hero copy",
  heading: "The first twenty words",
  intro:
    "The hero carries more weight than any other block on the page. It is the only copy a visitor is guaranteed to read.",
  specimen: {
    label: "As written",
    headline: "Know Your Numbers. Grow With Confidence.",
    support:
      "Get a clearer view of your cash flow, expenses, and financial performance—all in one simple platform.",
    ctas: [
      { label: "Start Your Free Trial", role: "Primary CTA" },
      { label: "Explore Finora", role: "Secondary CTA" },
    ],
  },
  rationaleHeading: "Why this messaging?",
  rationale: [
    "The headline connects financial visibility with business confidence. Instead of focusing only on features, it communicates the outcome the target user wants: understanding their numbers and making decisions with greater confidence.",
    "The supporting copy immediately explains what Finora helps users understand without requiring technical financial knowledge.",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 4. Target audience                                                          */
/* -------------------------------------------------------------------------- */

export const audience = {
  index: "04",
  eyebrow: "Audience",
  heading: "Who the page is written for",
  intro:
    "Four groups with different levels of financial fluency, and one shared question: where does the business actually stand right now?",
  groups: [
    {
      icon: "building" as IconName,
      title: "Small Business Owners",
      body: "Need a simple way to understand cash flow and business expenses.",
    },
    {
      icon: "compass" as IconName,
      title: "Founders",
      body: "Need visibility into financial performance when making business decisions.",
    },
    {
      icon: "receipt" as IconName,
      title: "Freelancers",
      body: "Need an easier way to monitor income, expenses, and overall financial health.",
    },
    {
      icon: "users" as IconName,
      title: "Finance / Operations Teams",
      body: "Need centralized information and useful insights without manually reviewing multiple sources.",
    },
  ],
  note: "The messaging was intentionally broad enough to communicate Finora’s value across these audiences while keeping the core benefit consistent: clearer financial visibility.",
} as const;

/* -------------------------------------------------------------------------- */
/* 5. Customer problems                                                        */
/* -------------------------------------------------------------------------- */

export const problems = {
  index: "05",
  eyebrow: "Problems",
  heading: "What the reader is already thinking",
  intro:
    "The page opens in the visitor’s own words before it introduces a product. These are the sentences the copy is written to answer.",
  quotes: [
    "I don’t have a clear picture of my cash flow.",
    "I spend too much time reviewing financial information manually.",
    "I know my numbers are important, but I don’t always know what they mean.",
    "I want to spot financial issues before they become bigger problems.",
    "I need better visibility when making business decisions.",
  ],
  note: "The copy starts with familiar financial pain points before introducing Finora as the solution.",
} as const;

/* -------------------------------------------------------------------------- */
/* 6. Problem to solution                                                      */
/* -------------------------------------------------------------------------- */

export const problemSolution = {
  index: "06",
  eyebrow: "Problem → solution",
  heading: "Turning each objection into an answer",
  intro:
    "Three pairs that shape the middle of the page. Each solution line answers its problem line directly, in the same register and at roughly the same length.",
  problemLabel: "Problem",
  solutionLabel: "Solution",
  pairs: [
    {
      problem: "Financial data can be difficult to understand.",
      solution: "Finora turns financial data into clear, actionable insights.",
    },
    {
      problem:
        "Business owners spend time checking information across different places.",
      solution:
        "See important financial information in one centralized dashboard.",
    },
    {
      problem: "It can be difficult to know when something needs attention.",
      solution: "Stay informed with financial insights, alerts, and reports.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 7. Feature to benefit                                                       */
/* -------------------------------------------------------------------------- */

export const featureBenefit = {
  index: "07",
  eyebrow: "Feature → benefit",
  heading: "Every feature rewritten as an outcome",
  intro:
    "The left column is what the product does. The right column is what the reader gets — and it is the right column that goes on the page.",
  featureLabel: "Feature",
  benefitLabel: "Benefit",
  rows: [
    {
      icon: "cashflow" as IconName,
      name: "Cash Flow Tracking",
      feature: "Monitor incoming and outgoing money.",
      benefit:
        "Know how much money is moving through your business and where it is going.",
    },
    {
      icon: "receipt" as IconName,
      name: "Expense Tracking",
      feature: "Track and categorize expenses.",
      benefit:
        "Understand where your money is going and identify areas that need attention.",
    },
    {
      icon: "insight" as IconName,
      name: "Financial Insights",
      feature: "View financial trends and insights.",
      benefit: "Turn your financial data into information you can actually use.",
    },
    {
      icon: "report" as IconName,
      name: "Reports",
      feature: "Generate financial reports.",
      benefit:
        "Get a clearer picture of your business performance whenever you need it.",
    },
    {
      icon: "bell" as IconName,
      name: "Alerts",
      feature: "Financial notifications and alerts.",
      benefit:
        "Stay aware of important changes before they become bigger problems.",
    },
  ],
  note: "The goal was to describe features through the value they provide to the user rather than simply listing technical capabilities.",
} as const;

/* -------------------------------------------------------------------------- */
/* 8. Value proposition                                                        */
/* -------------------------------------------------------------------------- */

export const valueProp = {
  index: "08",
  eyebrow: "Value proposition",
  heading: "The one sentence everything else supports",
  statement: "See the bigger financial picture without the complexity.",
  supportLabel: "Supporting points",
  support: [
    "Understand cash flow",
    "Monitor expenses",
    "Track financial performance",
    "Identify important changes",
    "Make more informed decisions",
  ],
  note: "The value proposition focuses on visibility and confidence rather than promising specific financial outcomes.",
} as const;

/* -------------------------------------------------------------------------- */
/* 9. CTA strategy                                                             */
/* -------------------------------------------------------------------------- */

export const ctaStrategy = {
  index: "09",
  eyebrow: "CTA strategy",
  heading: "One ask, kept low-friction",
  primaryLabel: "Primary CTA",
  primary: "Start Your Free Trial",
  rationale:
    "The primary CTA is intentionally direct and low-friction. A free trial gives users an opportunity to explore the product before making a commitment.",
  variationsLabel: "Untested concepts",
  variationsHeading: "Alternative CTA concepts",
  variations: [
    "See Your Numbers",
    "Take Control of Your Finances",
    "Explore Finora",
    "Get Started Free",
    "Understand Your Finances",
  ],
  disclaimer:
    "These are hypothetical CTA variations written for future testing. None of them has been tested, and no variation is claimed to perform better than another.",
} as const;

/* -------------------------------------------------------------------------- */
/* 10. Headline variations                                                     */
/* -------------------------------------------------------------------------- */

export const headlines = {
  index: "10",
  eyebrow: "Headline concepts",
  heading: "Four other ways the hero could open",
  intro:
    "The same promise, angled differently. Written as a set so the primary headline could be chosen against real alternatives rather than in isolation.",
  primaryLabel: "Primary",
  primary: {
    text: "Know Your Numbers. Grow With Confidence.",
    angle: "Outcome and confidence",
    note: "Ties financial visibility directly to how the reader expects to feel about running the business.",
  },
  variationsLabel: "Concepts",
  angleLabel: "Angle",
  variations: [
    {
      text: "Your Business Finances, Made Clear.",
      angle: "Simplicity and accessibility",
      note: "Leads with the plainest possible promise, aimed at the reader who finds finance intimidating rather than time-consuming.",
    },
    {
      text: "See Where Your Business Stands.",
      angle: "Visibility and financial awareness",
      note: "Frames the product as a vantage point, which suits the owner who suspects they are missing something.",
    },
    {
      text: "Clarity for Every Business Decision.",
      angle: "Decision-making and confidence",
      note: "Puts the emphasis on what the numbers are for, rather than on the numbers themselves.",
    },
    {
      text: "Understand Your Numbers. Move Forward With Confidence.",
      angle: "A longer read of the primary line",
      note: "Trades the rhythm of the shorter headline for a more explicit statement of the benefit.",
    },
  ],
  disclaimer:
    "These are hypothetical A/B testing concepts. Finora is a conceptual project, so no variation has been run, measured or compared, and no conversion results are claimed.",
} as const;

/* -------------------------------------------------------------------------- */
/* 11. Trust and security messaging                                            */
/* -------------------------------------------------------------------------- */

export const trustMessaging = {
  index: "11",
  eyebrow: "Trust",
  heading: "Writing about security without overclaiming",
  intro:
    "Because Finora deals with financial information, the messaging needs to create confidence without making unsupported security or trust claims.",
  themesLabel: "What the copy leans on",
  themes: [
    {
      icon: "eye" as IconName,
      title: "Financial visibility",
      body: "Confidence starts with the reader being able to see their own position clearly, so visibility is framed as the first reassurance rather than an afterthought.",
    },
    {
      icon: "lock" as IconName,
      title: "Secure handling of information",
      body: "Security is described as design intent — how the product is built to handle data — rather than as a certification the concept does not hold.",
    },
    {
      icon: "report" as IconName,
      title: "Clear reporting",
      body: "Reports are written as something the reader could hand to an accountant without translating, which is a trust signal in itself.",
    },
    {
      icon: "scales" as IconName,
      title: "Transparency",
      body: "The page states plainly, more than once, that Finora is a concept and that every figure shown is demonstration content.",
    },
    {
      icon: "key" as IconName,
      title: "User control",
      body: "Access, permissions and data export are described in terms of what the reader decides, not what the product permits.",
    },
  ],
  avoidedLabel: "Claims deliberately avoided",
  avoided: ["Bank-level security", "100% secure", "Trusted by thousands"],
  avoidedNote:
    "None of these phrases appears anywhere in the Finora build. A conceptual product holds no certifications and has no customers, so the copy describes the intended security model instead of borrowing the vocabulary of a live service.",
} as const;

/* -------------------------------------------------------------------------- */
/* 12. UX and copy relationship                                                */
/* -------------------------------------------------------------------------- */

export const pageFlow = {
  index: "12",
  eyebrow: "UX × copy",
  heading: "How the writing and the layout carry each other",
  intro:
    "The section order is an argument. Each block exists to answer the question the block before it leaves the reader holding.",
  steps: [
    {
      name: "Hero",
      body: "Communicates the primary value proposition immediately.",
    },
    {
      name: "Problem",
      body: "Helps visitors recognize their current financial challenges.",
    },
    {
      name: "Solution",
      body: "Introduces Finora as the answer to those challenges.",
    },
    { name: "Features", body: "Explains capabilities through user benefits." },
    {
      name: "Dashboard / Product Showcase",
      body: "Provides visual context for how the product works.",
    },
    { name: "Pricing", body: "Helps users understand the available options." },
    {
      name: "FAQ",
      body: "Addresses common concerns and reduces uncertainty.",
    },
    {
      name: "Final CTA",
      body: "Reinforces the main value proposition and provides a clear next step.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 13. Workflow                                                                */
/* -------------------------------------------------------------------------- */

export const workflow = {
  index: "13",
  eyebrow: "Process",
  heading: "How the copy was produced",
  intro:
    "A repeatable order of operations. The writing does not start until the audience and the problem are settled, because a hero line written first is usually a guess.",
  steps: [
    "Understand the target audience",
    "Identify common problems and pain points",
    "Define the core value proposition",
    "Translate features into user benefits",
    "Write and refine the hero messaging",
    "Structure supporting copy throughout the page",
    "Create CTA variations",
    "Review copy together with the UX and visual design",
    "Use AI-assisted tools for ideation and iteration",
    "Manually review and refine the final copy",
  ],
  note: "AI tools were used to accelerate ideation and iteration, but the final messaging was reviewed and refined to keep the language clear, relevant, and aligned with the target audience.",
} as const;

/* -------------------------------------------------------------------------- */
/* 14. Summary                                                                 */
/* -------------------------------------------------------------------------- */

export const summary = {
  index: "14",
  eyebrow: "In summary",
  heading: "One idea, held for the length of the page",
  paragraphs: [
    "The Finora landing page copy is designed around one central idea: financial information should help users feel more informed, not more overwhelmed.",
    "The messaging therefore focuses on clarity, visibility, confidence, and practical business value while keeping the language simple and approachable.",
  ],
  disclaimerLabel: "Portfolio disclaimer",
  disclaimer:
    "Finora is a conceptual portfolio project created to demonstrate landing page design, UX, copywriting, and frontend development capabilities. Product data, testimonials, and performance results shown in the project are for demonstration purposes.",
} as const;

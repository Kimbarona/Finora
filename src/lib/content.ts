/**
 * Every word of marketing copy on the page lives here, in page order, so the
 * writing can be edited and reviewed without touching layout.
 *
 * Finora is a fictional product built as a portfolio piece. Every company
 * name, quote, figure and transaction in this file is demonstration content.
 * Nothing here describes a real service, a real customer or a real
 * certification, and the copy is written to stay honest about that.
 */

import type { IconName } from "@/components/icons";

export const site = {
  name: "Finora",
  tagline: "Simple financial clarity for your business",
  description:
    "Finora brings your cash flow, expenses and financial performance into one clear dashboard, so you always know where your business stands.",
  url: "https://finora-landing.vercel.app",
  primaryCta: "Start Free",
  secondaryCta: "See How It Works",
  loginLabel: "Log in",
} as const;

/** Shown in the banner, the trust section and the footer. */
export const disclaimer =
  "Finora is a conceptual product created as a design portfolio project. All balances, transactions, testimonials and pricing shown are demonstration content.";

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
  { label: "Company", href: "#company" },
] as const;

/* -------------------------------------------------------------------------- */
/* 2. Hero                                                                     */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Financial clarity for small business",
  headline: { lead: "Know your numbers.", accent: "Grow with confidence." },
  subhead:
    "Finora pulls your cash flow, expenses and revenue into one clear dashboard. See what came in, what went out and what it means for next month, without rebuilding a spreadsheet to find out.",
  proofPoints: [
    "Free to start",
    "No card required",
    "Set up in an afternoon",
  ],
  /* Annotation rendered beside the hero panel. */
  panelNote: "Demo workspace. Figures are illustrative.",
} as const;

/* -------------------------------------------------------------------------- */
/* 3. Trust / security                                                         */
/* -------------------------------------------------------------------------- */

export const trust = {
  index: "01",
  eyebrow: "Security",
  heading: "Built with security in mind",
  intro:
    "Financial information deserves careful handling. Finora is designed around a simple principle: your numbers are yours, and the product should be built that way from the start.",
  pillars: [
    {
      icon: "lock" as IconName,
      title: "Encrypted in transit and at rest",
      body: "Data is designed to be encrypted on the way to Finora and while it is stored, using standard modern ciphers rather than anything homegrown.",
    },
    {
      icon: "key" as IconName,
      title: "Read-only by design",
      body: "Finora is built to report on your finances, not move your money. The product needs no payment permissions to do its job.",
    },
    {
      icon: "users" as IconName,
      title: "Access you control",
      body: "Invite your bookkeeper or a co-founder, give them only the views they need, and remove access the moment the engagement ends.",
    },
    {
      icon: "eye" as IconName,
      title: "No selling your data",
      body: "Your financial activity is not a product. It is used to show you your own business and nothing else.",
    },
  ],
  /* Deliberately framed as intent, not as attained certification. */
  note: {
    label: "An honest note",
    body: "Finora is a conceptual product, so it holds no certifications and connects to no real financial institution. The security model described here is the design intent of the concept, presented as part of a portfolio piece rather than as a claim about a live service.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 4. Problem                                                                  */
/* -------------------------------------------------------------------------- */

export const problem = {
  index: "02",
  eyebrow: "The problem",
  heading: "Most owners find out too late",
  intro:
    "The information is usually all there. It is just spread across accounts, apps and tabs, in a shape that takes a weekend to read.",
  items: [
    {
      icon: "scatter" as IconName,
      title: "The numbers live in five places",
      body: "Two bank accounts, a card statement, an invoicing tool and the notes app. Nothing adds up until someone adds it up.",
    },
    {
      icon: "spreadsheet" as IconName,
      title: "The spreadsheet is a second job",
      body: "A monthly ritual of exports, pasting and formula repair, finished just in time to be out of date.",
    },
    {
      icon: "fog" as IconName,
      title: "Cash flow is a feeling",
      body: "You know roughly what is coming in. Roughly is a hard basis for a hire, a lease or a large order.",
    },
    {
      icon: "maze" as IconName,
      title: "Expenses drift quietly",
      body: "Subscriptions renew, a supplier raises prices, one category creeps up by a third. Nobody is watching in real time.",
    },
    {
      icon: "trendDown" as IconName,
      title: "Trends only show up in hindsight",
      body: "Three slow months look like three separate bad weeks until you can see them side by side.",
    },
    {
      icon: "calendar" as IconName,
      title: "Every review starts from scratch",
      body: "Quarter end, a lender request, a conversation with your accountant. Same scramble, every time.",
    },
  ],
  /* Pull-quote that closes the section. */
  kicker:
    "None of this means the business is doing badly. It means nobody can tell.",
} as const;

/* -------------------------------------------------------------------------- */
/* 5. Solution                                                                 */
/* -------------------------------------------------------------------------- */

export const solution = {
  index: "03",
  eyebrow: "The Finora approach",
  heading: "One clear view of the whole business",
  intro:
    "Finora organises what you already have and presents it plainly. No new accounting system to learn, no formulas to maintain, no jargon in the way.",
  points: [
    {
      title: "See your financial picture",
      body: "Balances, revenue, expenses and net cash flow together on one screen, updated as activity comes in.",
    },
    {
      title: "Understand cash flow",
      body: "Money in against money out, month by month, so the shape of your year is obvious at a glance.",
    },
    {
      title: "Track where spending goes",
      body: "Every expense sorted into categories you recognise, with the movers surfaced rather than buried.",
    },
    {
      title: "Spot trends early",
      body: "Rolling comparisons put this month next to the last twelve, so a drift becomes visible while you can still act.",
    },
    {
      title: "Decide with better information",
      body: "Go into a hire, a price change or a lender conversation knowing the numbers instead of estimating them.",
    },
  ],
  /* Small stat strip beside the copy. Illustrative demo workspace figures. */
  snapshot: {
    label: "Demo workspace",
    caption: "Sample figures from the Finora demo account",
    rows: [
      { label: "Accounts in view", value: "4" },
      { label: "Spending categories", value: "9" },
      { label: "Months of history", value: "24" },
      { label: "Reports ready to export", value: "6" },
    ],
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 6. Features                                                                 */
/* -------------------------------------------------------------------------- */

export type FeatureKey =
  | "cashflow"
  | "expenses"
  | "insights"
  | "reports"
  | "alerts"
  | "dashboard";

export const features = {
  index: "04",
  eyebrow: "Product",
  heading: "Everything you need to read your own business",
  intro:
    "Six capabilities that between them answer the questions owners actually ask: where do we stand, where is it going, and what changed.",
  items: [
    {
      key: "cashflow" as FeatureKey,
      icon: "cashflow" as IconName,
      eyebrow: "Cash flow tracking",
      title: "See money in and money out in one place",
      body: "Finora lines up income against expenses across every account you track, then shows the net result month by month. You can see the months that funded the year, the months that cost you, and roughly where the next one is heading.",
      bullets: [
        "Inflow and outflow side by side",
        "Net position for any month",
        "Twelve-month rolling view",
      ],
    },
    {
      key: "expenses" as FeatureKey,
      icon: "receipt" as IconName,
      eyebrow: "Expense management",
      title: "Understand where the money actually goes",
      body: "Transactions are grouped into plain-language categories, so spending reads as a story instead of a list. When a category moves, Finora shows you the size of the move and what sits inside it.",
      bullets: [
        "Automatic categorisation you can correct",
        "Category totals against last month",
        "Drill into any line item",
      ],
    },
    {
      key: "insights" as FeatureKey,
      icon: "insight" as IconName,
      eyebrow: "Financial insights",
      title: "Turn financial data into plain English",
      body: "Finora reads the patterns in your own numbers and describes them in a sentence: what grew, what slipped, what is unusual for this time of year. No interpretation required.",
      bullets: [
        "Written summaries of real changes",
        "Seasonal comparisons",
        "Flags on the figures worth a look",
      ],
    },
    {
      key: "reports" as FeatureKey,
      icon: "report" as IconName,
      eyebrow: "Reports",
      title: "Clean reports without building a spreadsheet",
      body: "Profit and loss, cash flow summary, expenses by category and a month-end overview, generated from your live data and ready to share with an accountant, a partner or a lender.",
      bullets: [
        "Standard statements, formatted",
        "Any date range",
        "Export to PDF or CSV",
      ],
    },
    {
      key: "alerts" as FeatureKey,
      icon: "bell" as IconName,
      eyebrow: "Smart alerts",
      title: "Hear about the change while it still matters",
      body: "Set the thresholds that matter to your business and Finora watches them. A balance dipping below your floor, a category jumping, a duplicate charge, a large payment clearing.",
      bullets: [
        "Low balance and large payment alerts",
        "Unusual spending patterns",
        "Weekly digest, or only when it matters",
      ],
    },
    {
      key: "dashboard" as FeatureKey,
      icon: "dashboard" as IconName,
      eyebrow: "Financial dashboard",
      title: "Your position, at a glance",
      body: "One screen with the numbers you check most: total balance, revenue, expenses, net cash flow and the trend behind each. Built to be read in ten seconds with a coffee in your hand.",
      bullets: [
        "The metrics you choose, pinned",
        "Trend against the previous period",
        "Works on the phone in your pocket",
      ],
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 7. Showcase                                                                 */
/* -------------------------------------------------------------------------- */

export const showcase = {
  index: "05",
  eyebrow: "Inside Finora",
  heading: "A closer look at the workspace",
  intro:
    "Switch between the views an owner uses through the month. Every figure below is demonstration data from the Finora sample workspace.",
  tabs: [
    { id: "overview", label: "Overview", hint: "The morning check-in" },
    { id: "cashflow", label: "Cash flow", hint: "In, out and net" },
    { id: "spending", label: "Spending", hint: "Where it went" },
    { id: "activity", label: "Activity", hint: "Recent transactions" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 8. How it works                                                             */
/* -------------------------------------------------------------------------- */

export const howItWorks = {
  index: "06",
  eyebrow: "How it works",
  heading: "Four steps, one afternoon",
  intro:
    "Finora is meant to be set up once and then simply checked. There is no implementation project.",
  steps: [
    {
      icon: "connect" as IconName,
      step: "Connect",
      title: "Bring your financial information together",
      body: "Add your accounts and cards, or import statements. Everything lands in one workspace.",
    },
    {
      icon: "organize" as IconName,
      step: "Organise",
      title: "Finora sorts the activity",
      body: "Transactions are categorised and matched automatically. Correct anything it gets wrong and it remembers.",
    },
    {
      icon: "understand" as IconName,
      step: "Understand",
      title: "See the trends clearly",
      body: "Cash flow, spending and revenue appear as charts and plain summaries you can read in a minute.",
    },
    {
      icon: "act" as IconName,
      step: "Act",
      title: "Make the call with better information",
      body: "Set alerts, export the report, plan the hire. Decide from the numbers rather than around them.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 9. Benefits                                                                 */
/* -------------------------------------------------------------------------- */

export const benefits = {
  index: "07",
  eyebrow: "Outcomes",
  heading: "What changes once you can see clearly",
  intro:
    "Not features. The difference an owner notices a month or two in.",
  items: [
    {
      icon: "clock" as IconName,
      title: "Save time",
      body: "The monthly spreadsheet ritual stops. The numbers are already assembled when you open them.",
    },
    {
      icon: "eye" as IconName,
      title: "Improve visibility",
      body: "You know what is happening with your money this week, not six weeks after the quarter closed.",
    },
    {
      icon: "compass" as IconName,
      title: "Make better decisions",
      body: "Hiring, pricing and purchasing conversations start from the actual position of the business.",
    },
    {
      icon: "steady" as IconName,
      title: "Stay in control",
      body: "One place to check instead of four. Fewer surprises, and earlier warning on the ones that come anyway.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 10. Testimonials (fictional personas)                                       */
/* -------------------------------------------------------------------------- */

export const testimonials = {
  index: "08",
  eyebrow: "Illustrative feedback",
  heading: "Written for three owners we designed this for",
  intro:
    "Finora is a concept project, so these are not customers. They are the personas the product was designed around, written as the kind of thing each of them would say.",
  badge: "Demo personas",
  items: [
    {
      quote:
        "I used to find out how the month went about three weeks after it ended. Now I know on the Monday, and I can do something about it.",
      name: "Maren Okafor",
      role: "Founder",
      company: "Tallow & Pine, a four-person studio",
    },
    {
      quote:
        "Two accounts, a card and an invoicing tool. Seeing them add up on one screen was the first time the business felt legible to me.",
      name: "Daniel Reyes",
      role: "Owner",
      company: "Reyes Fabrication, a small workshop",
    },
    {
      quote:
        "The category view is what I actually use. It shows me the line that moved, not a wall of transactions I have to read myself.",
      name: "Priya Anand",
      role: "Operations manager",
      company: "Northgate Supply, 20 staff",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 11. Pricing                                                                 */
/* -------------------------------------------------------------------------- */

export const pricing = {
  index: "09",
  eyebrow: "Pricing",
  heading: "Straightforward plans",
  intro:
    "Illustrative pricing for a concept product. Nothing here is for sale, and the tiers exist to show how the plans would be structured.",
  note: "Demonstration pricing. Finora is a portfolio concept and is not a commercial service.",
  plans: [
    {
      name: "Starter",
      price: "0",
      cadence: "free while you are small",
      audience: "Freelancers and very small businesses",
      description:
        "Enough to answer the basic question: what came in, what went out, what is left.",
      features: [
        "1 user",
        "2 accounts",
        "Cash flow and expense views",
        "Automatic categorisation",
        "12 months of history",
        "PDF export",
      ],
      cta: "Start Free",
      featured: false,
    },
    {
      name: "Growth",
      price: "29",
      cadence: "per month, billed monthly",
      audience: "Growing businesses",
      description:
        "The full picture, plus the alerts and reporting you need once decisions carry weight.",
      features: [
        "Up to 5 users",
        "Unlimited accounts",
        "Full insights and trend analysis",
        "Smart alerts and thresholds",
        "Standard report pack",
        "CSV and PDF export",
        "Bookkeeper access",
      ],
      cta: "Start Free",
      featured: true,
      badge: "Most popular",
    },
    {
      name: "Business",
      price: "79",
      cadence: "per month, billed monthly",
      audience: "Teams that need deeper financial visibility",
      description:
        "For businesses running several entities or reporting to people outside the room.",
      features: [
        "Unlimited users and roles",
        "Multiple entities",
        "Custom categories and tags",
        "Custom report builder",
        "Budget vs actual tracking",
        "Scheduled report delivery",
        "Priority support",
      ],
      cta: "Start Free",
      featured: false,
    },
  ],
  assurances: [
    "No card required to start",
    "Cancel anytime",
    "Your data exports with you",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 12. FAQ                                                                     */
/* -------------------------------------------------------------------------- */

export const faq = {
  index: "10",
  eyebrow: "Questions",
  heading: "Before you start",
  intro:
    "The things owners ask first. If something here is unclear, the answer is probably worth rewriting.",
  items: [
    {
      q: "What is Finora?",
      a: "Finora is a financial dashboard for small businesses. It brings your accounts, revenue and expenses into one place, organises the activity, and shows you cash flow, spending and trends in a form you can read without an accounting background. It is a conceptual product built for a design portfolio.",
    },
    {
      q: "Who is Finora for?",
      a: "Owners and operators who need to understand the numbers rather than produce them: freelancers, founders, small business owners, and the operations or finance manager who keeps a growing company on the rails. If a bookkeeper already handles your ledgers, Finora is the layer that makes their work legible to you.",
    },
    {
      q: "How does Finora handle financial information?",
      a: "The design intent is straightforward: encrypt data in transit and at rest, read rather than write, hold no payment permissions, and keep access under your control. Finora is a concept project rather than a live service, so it holds no certifications and is not connected to any financial institution.",
    },
    {
      q: "Can I connect multiple accounts?",
      a: "Yes. The concept supports several bank accounts, credit cards and an invoicing tool in one workspace, with a combined view across all of them and the option to look at any single account on its own. Starter covers two accounts; Growth and Business are unlimited.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. Plans are monthly with no lock-in, and cancelling leaves your data exportable rather than hostage. As with everything here, this describes how the concept is designed to work.",
    },
    {
      q: "Is there a free trial?",
      a: "Starter is free to use, and the paid plans are designed to be tried without a card. You would move up a tier when you need alerts, deeper reporting or more people in the workspace.",
    },
    {
      q: "Do I need accounting experience?",
      a: "No. That is close to the point of the product. Figures are labelled in plain language, changes are described in a sentence, and the reports use the standard formats an accountant expects so you can hand them over without translating anything.",
    },
    {
      q: "Can I export reports?",
      a: "Yes. Profit and loss, cash flow summary, expenses by category and a month-end overview export to PDF or CSV on any date range, and Business plans can schedule them to arrive on a set day.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 13. Final CTA                                                               */
/* -------------------------------------------------------------------------- */

export const finalCta = {
  eyebrow: "Get started",
  heading: "Get a clearer picture of your business finances",
  body: "It takes an afternoon to set up and about a minute a day to stay on top of. No spreadsheets to maintain, no accounting course to take, no card to enter.",
  assurances: [
    "Free to start",
    "No card required",
    "Cancel anytime",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 14. Footer                                                                  */
/* -------------------------------------------------------------------------- */

export const footer = {
  blurb:
    "A clear view of cash flow, expenses and financial performance, for the people running the business.",
  columns: [
    {
      heading: "Product",
      links: [
        { label: "Cash flow tracking", href: "#product" },
        { label: "Expense management", href: "#product" },
        { label: "Financial insights", href: "#product" },
        { label: "Reports", href: "#product" },
        { label: "Smart alerts", href: "#product" },
        { label: "Dashboard", href: "#showcase" },
      ],
    },
    {
      heading: "Solutions",
      links: [
        { label: "Freelancers", href: "#solutions" },
        { label: "Startups", href: "#solutions" },
        { label: "Small business", href: "#solutions" },
        { label: "Operations teams", href: "#solutions" },
        { label: "Working with a bookkeeper", href: "#solutions" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Getting started", href: "#how-it-works" },
        { label: "Cash flow basics", href: "#resources" },
        { label: "Report library", href: "#resources" },
        { label: "Help centre", href: "#resources" },
        { label: "Product updates", href: "#resources" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "#company" },
        { label: "Careers", href: "#company" },
        { label: "Press", href: "#company" },
        { label: "Contact", href: "#company" },
      ],
    },
  ],
  legal: [
    { label: "Security", href: "#security" },
    { label: "Privacy", href: "#company" },
    { label: "Terms", href: "#company" },
    { label: "Contact", href: "#company" },
  ],
} as const;

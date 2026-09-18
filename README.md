# Finora — Simple Financial Clarity for Your Business

A conceptual fintech SaaS landing page, built as a portfolio project.

Finora is a fictional financial dashboard for small businesses: it brings cash
flow, expenses and revenue into one clear view. This repository is the complete
marketing site for that concept — a single statically-rendered page with a
working product mockup, real interactive charts, and an accompanying design
system.

**Finora is not a real product.** Every balance, transaction, testimonial,
persona and price in this repository is demonstration content, and the page says
so in the top banner, the security section, the hero caption, the testimonials,
the pricing footnote, the FAQ and the footer.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # production build
npm start          # serve the production build
```

Node 20+ is required. The page is fully static, so `npm run build` produces
something you can deploy to Vercel, Netlify, Cloudflare Pages or any static
host without configuration.

> The social card (`src/app/opengraph-image.tsx`) fetches three Google fonts at
> build time so it can use the brand typefaces. If the build machine has no
> network the fetch is caught and the card falls back to the renderer's built-in
> sans — the build still succeeds.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19, static export) |
| Styling | Tailwind CSS v4, CSS-first `@theme` tokens |
| Language | TypeScript, strict |
| Charts | Hand-built SVG — no charting library |
| Dependencies | `next`, `react`, `react-dom`. Nothing else at runtime. |

---

## Design system

The full token set lives in [`src/app/globals.css`](src/app/globals.css).

**Direction: "quiet ledger."** Warm paper instead of clinical white, deep
forest green as the single action colour, copper reserved for editorial marks,
and money-green / clay-red used only where a figure genuinely carries a sign.

**Type is a three-voice system**, which is what makes the page read as
financial rather than as generic SaaS:

- **Source Serif 4** — headlines. Editorial, institutional, calm.
- **IBM Plex Sans** — interface and body copy.
- **IBM Plex Mono** — every number, label and ledger annotation.

**Geometry is architectural**: 3 / 6 / 10px radii and 1px rules instead of
shadows. Elevation is spent almost entirely on one element — the product panel
— so it reads as the hero of the page.

### Colour

Every text colour is documented in `globals.css` with its measured contrast
ratio against the ground it is used on. All body and caption colours clear
WCAG AA (4.5:1) on paper, on both paper tints, and on white.

The **chart palette is computed, not chosen**. The slots were run through the
categorical checks — lightness band, chroma floor, protanopia/deuteranopia
separation, a normal-vision floor, and contrast against the chart surface —
and adjusted until every check passed:

| Pair | Protan ΔE | Normal ΔE |
|---|---|---|
| money in / money out | 13.1 | 21.8 |
| positive / negative | 8.2 | 24.6 |

The spending composition ramp is a single-hue ordinal scale with monotone
lightness, adjacent ΔL ≥ 0.06, and a light end that still clears 2:1 on white.

### Deliberate chart decisions

- **No pie or donut chart.** Nine spending categories would need nine hues,
  forcing a rainbow, and arc-length comparison is the hardest judgement you can
  ask a reader to make. Composition is shown as one stacked bar on the ordinal
  ramp; magnitude is shown as sorted horizontal bars in a single hue with
  direct labels.
- **Never colour-by-value on nominal bars** — that spends the identity channel
  re-encoding what bar length already shows.
- **Area wash only for a single series.** With two series the fills stack and
  collapse into a muddy block, so comparison charts get lines only.
- **Polarity by position first.** Net cash flow diverges around a zero
  baseline, with the sign written into the tooltip and the data table, so a
  colour-blind reader never depends on the red/green pair.
- **One axis, always.** No dual-axis charts anywhere.

---

## Structure

```
src/
  app/
    globals.css            design tokens, primitives, motion
    layout.tsx             fonts, metadata, JSON-LD, no-JS fallbacks
    page.tsx               section order, with the reasoning
    icon.svg  robots.ts  sitemap.ts  opengraph-image.tsx
  lib/
    content.ts             every word of copy, in page order
    demo.ts                the demo workspace + currency formatters
  components/
    icons.tsx              one 24px / 1.6px-stroke icon family + wordmark
    ui/                    Button, Section, Reveal, RevealObserver
    charts/
      chart-kit.tsx        measurement, scales, tooltip, legend, axes, bars
      TrendChart.tsx       line / area over time
      ColumnChart.tsx      grouped columns (money in vs money out)
      NetColumns.tsx       diverging columns around zero
      Breakdown.tsx        composition bar + ranked bars
      Sparkline.tsx        inline trend for metric tiles
    dashboard/
      parts.tsx            app frame, panels, metric tiles, ledger table
      HeroDashboard.tsx    the hero product panel
      ShowcaseDashboard.tsx four tabbed views over one dataset
    site/                  the fourteen page sections
```

Copy is separated from layout so the writing can be edited and reviewed on its
own. The demo dataset is separated from both.

### The demo data is internally consistent

[`src/lib/demo.ts`](src/lib/demo.ts) is written as one coherent set of books,
not as loose decorative numbers:

- the four account balances sum to the headline total balance (`$284,538`);
- the nine spending categories sum exactly to the month's expenses
  (`$64,120`);
- every percentage change on the page is **derived** from those figures rather
  than typed in — `+7.2%` revenue, `+4.8%` expenses, `+13.0%` net, `+5.7%`
  balance, `30.7%` operating margin;
- the written insights agree with the arithmetic (software at 9.6% of
  expenses, roughly three months of cover in the operating account).

That consistency is the point. A product mockup stops being convincing the
moment a visitor notices the totals do not add up.

---

## Accessibility

- Semantic landmarks, one `<h1>`, and an `<h2>`/`<h3>` hierarchy with no
  skipped levels.
- Skip link; visible 2px focus ring on every interactive element, recoloured
  on the dark bands where forest green would disappear.
- **FAQ**: real `<button>` inside the labelling heading, `aria-expanded`,
  `aria-controls`, panels as labelled regions and `inert` while closed. Several
  panels may be open at once — closing your last answer to show the next one is
  worse for a page people compare answers on.
- **Showcase tabs**: WAI-ARIA tabs pattern with roving `tabindex`, arrow/Home/End
  keys, manual activation, and only the selected panel mounted.
- **Charts**: `role="img"` with a written summary, the same data always
  available as a real `<table>`, pointer hover *and* arrow-key navigation, with
  the read-out mirrored into an `aria-live` region.
- **Product mockups**: the pretend chrome (rail, top bar, avatar, fake search)
  is hidden from assistive technology; the data inside stays fully readable, so
  a screen reader gets the numbers without wading through a fake sidebar.
- **Mobile nav**: scroll lock, scrim, Escape to close, focus moved into the
  sheet and returned to the toggle on close.
- `prefers-reduced-motion: reduce` disables reveals, smooth scrolling and the
  one looping animation.
- Without JavaScript, reveals are forced visible and each chart's data table is
  promoted from screen-reader-only to on-screen, so no figure is gated behind a
  script.

## Responsive

Verified with no horizontal overflow and a clean console at 1440, 1280, 1024,
768, 390 and 375px. Layouts adapt rather than shrink:

- the ledger table drops columns in order of expendability (account, then
  category, which restacks under the description) instead of scrolling
  sideways;
- charts are measured in real pixels and re-render at the container's width, so
  a 2px line stays 2px and axis labels thin out as space tightens;
- the how-it-works connector runs vertically on a phone, is dropped at the
  two-by-two tablet layout where one line cannot align with two columns of
  markers, and runs horizontally on desktop;
- the hero's statement card is desktop-only, and every figure in it also
  appears in the product panel below.

## SEO

Title, meta description, canonical, Open Graph and Twitter card metadata,
`robots.txt`, `sitemap.xml`, a generated social image, and
`SoftwareApplication` JSON-LD. The structured data deliberately omits
`aggregateRating` and `review` — inventing social-proof markup for a fictional
product would be dishonest to both readers and search engines — and carries a
`disambiguatingDescription` stating plainly that this is a concept.

---

## Portfolio note

Finora is a self-directed concept project. It exists to show product thinking,
visual design, interface design, data visualisation, copywriting and frontend
engineering on one brief, and it is labelled as a concept throughout rather
than dressed up as a real company.

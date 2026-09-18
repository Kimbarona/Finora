import { HeroDashboard } from "@/components/dashboard/HeroDashboard";
import { CheckIcon, Icon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { hero, site } from "@/lib/content";
import {
  money,
  monthly,
  netByMonth,
  operatingMargin,
  totalBalance,
} from "@/lib/demo";

const current = monthly[monthly.length - 1];
const currentNet = netByMonth[netByMonth.length - 1].net;

/**
 * A printed statement excerpt, not a piece of application UI.
 *
 * The hero already carries a full product panel, so a second block of app
 * chrome would just repeat it. This is a different register on purpose —
 * dotted leaders, a ruled total, mono figures — the kind of document the
 * product replaces. It sets the "quiet ledger" tone before the reader has
 * scrolled at all.
 */
function StatementCard() {
  const rows = [
    { label: "Money in", value: money(current.revenue) },
    { label: "Money out", value: `-${money(current.expenses)}` },
    { label: "Operating margin", value: `${operatingMargin.toFixed(1)}%` },
  ];

  return (
    <div className="relative rounded-panel border border-rule-strong bg-card p-6 shadow-[0_1px_2px_rgba(22,33,29,0.04),0_18px_36px_-24px_rgba(22,33,29,0.18)]">
      <div className="flex items-start justify-between gap-4 border-b border-ink/10 pb-4">
        <div>
          <p className="label-mono text-copper">Statement summary</p>
          <p className="mt-1.5 font-serif text-[1.125rem] leading-tight font-semibold text-ink">
            September 2026
          </p>
        </div>
        <Icon name="report" className="h-5 w-5 shrink-0 text-rule-strong" />
      </div>

      <dl className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline gap-2">
            <dt className="text-[0.875rem] text-body">{row.label}</dt>
            {/* Dotted leader, the way a printed statement sets a figure. */}
            <span
              aria-hidden="true"
              className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-rule-strong"
            />
            <dd className="figure-mono text-[0.9375rem] font-medium text-ink">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 border-t-2 border-ink/80 pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[0.875rem] font-medium text-ink">
            Net cash flow
          </p>
          <p className="figure-mono text-[1.25rem] leading-none font-semibold text-pos">
            +{money(currentNet)}
          </p>
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <p className="text-[0.875rem] text-body">Total balance</p>
          <p className="figure-mono text-[0.9375rem] font-medium text-ink">
            {money(totalBalance)}
          </p>
        </div>
      </div>

      <p className="mt-5 text-[0.6875rem] leading-relaxed text-muted">
        Illustrative figures from the Finora demo workspace.
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-12 pb-16 sm:pt-16 lg:pt-20 lg:pb-24">
      {/* The page's only backdrop: accounting rules, masked to a whisper and
          faded out long before they reach any text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]"
      >
        <div className="ledger-rules absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent_82%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-rule" />
      </div>

      <div className="shell">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 xl:col-span-7">
            <Reveal>
              <p className="flex items-center gap-3">
                <span className="label-mono text-copper">00</span>
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-rule-strong"
                />
                <span className="label-mono text-muted">{hero.eyebrow}</span>
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="t-display mt-6 text-ink">
                {hero.headline.lead}{" "}
                <br />
                <span className="text-forest">{hero.headline.accent}</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="t-lead mt-6 max-w-xl text-body">{hero.subhead}</p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#cta" size="lg" className="group">
                  {site.primaryCta}
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Button>
                <Button href="#how-it-works" variant="secondary" size="lg">
                  {site.secondaryCta}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-rule pt-6 text-[0.8125rem] text-body">
                {hero.proofPoints.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <CheckIcon className="h-3.5 w-3.5 shrink-0 text-pos" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Desktop-only editorial flourish. Every figure in it also appears
              in the product panel below, so nothing is lost on a phone. */}
          <Reveal delay={200} className="hidden lg:col-span-5 lg:block">
            <StatementCard />
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-14 sm:mt-16 lg:mt-20">
          <HeroDashboard />
        </Reveal>
      </div>
    </section>
  );
}

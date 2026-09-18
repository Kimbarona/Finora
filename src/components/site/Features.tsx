import { RankedBars } from "@/components/charts/Breakdown";
import { ColumnChart } from "@/components/charts/ColumnChart";
import {
  AlertList,
  InsightList,
  MetricTile,
  Panel,
  Tag,
} from "@/components/dashboard/parts";
import { CheckIcon, Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { features } from "@/lib/content";
import {
  alerts,
  categories,
  categoryTotal,
  insights,
  metrics,
  money,
  monthly,
  reports,
} from "@/lib/demo";

const halfYear = monthly.slice(-6);
const topSix = [...categories].sort((a, b) => b.amount - a.amount).slice(0, 6);

/* -------------------------------------------------------------------------- */
/* Feature copy block                                                         */
/* -------------------------------------------------------------------------- */

function FeatureCopy({
  item,
}: {
  item: (typeof features.items)[number];
}) {
  return (
    <div>
      <span className="grid h-11 w-11 place-items-center rounded-xs border border-rule-strong bg-card text-forest">
        <Icon name={item.icon} className="h-5 w-5" />
      </span>

      <p className="label-mono mt-5 text-copper">{item.eyebrow}</p>
      <h3 className="t-sub mt-2.5 text-ink">{item.title}</h3>
      <p className="mt-3.5 text-[1.0625rem] leading-[1.7] text-body">
        {item.body}
      </p>

      <ul className="mt-5 space-y-2">
        {item.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2.5 text-[0.9375rem] text-ink-soft"
          >
            <CheckIcon className="mt-[5px] h-3.5 w-3.5 shrink-0 text-pos" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Six features, given two levels of weight.
 *
 * The two that carry the product's core promise get a full row each with a
 * working chart. The other four share a grid of smaller cards, each still
 * showing a real piece of interface rather than an icon in a circle. Six
 * identical alternating rows would be twice as long and half as interesting.
 */
export function Features() {
  const [cashflow, expenses, ...rest] = features.items;

  return (
    <Section id="product" tone="paper" bordered className="section-y">
      <div className="shell">
        <SectionHeading
          index={features.index}
          eyebrow={features.eyebrow}
          title={features.heading}
          intro={features.intro}
          maxWidth="max-w-[44rem]"
        />

        {/* Row one: cash flow tracking */}
        <div className="mt-14 grid items-center gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <FeatureCopy item={cashflow} />
          </Reveal>
          <Reveal delay={80}>
            <Panel
              title="Money in against money out"
              subtitle="Last six months"
              action={<Tag tone="pos">Positive</Tag>}
              className="shadow-[0_1px_2px_rgba(22,33,29,0.04),0_16px_32px_-22px_rgba(22,33,29,0.2)]"
            >
              <ColumnChart
                title="Money in against money out, last six months"
                summary="Revenue exceeded expenses in each of the last six months."
                groups={halfYear.map((m) => ({
                  label: m.month,
                  full: m.full,
                  values: [m.revenue, m.expenses],
                }))}
                series={[
                  {
                    key: "in",
                    label: "Money in",
                    color: "var(--color-chart-in)",
                  },
                  {
                    key: "out",
                    label: "Money out",
                    color: "var(--color-chart-out)",
                  },
                ]}
                height={230}
              />
            </Panel>
          </Reveal>
        </div>

        {/* Row two: expense management, mirrored */}
        <div className="mt-16 grid items-center gap-10 lg:mt-24 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={80} className="lg:order-2">
            <FeatureCopy item={expenses} />
          </Reveal>
          <Reveal className="lg:order-1">
            <Panel
              title="Spending by category"
              subtitle="Top six of nine, September 2026"
              action={<Tag tone="copper">1 flagged</Tag>}
              className="shadow-[0_1px_2px_rgba(22,33,29,0.04),0_16px_32px_-22px_rgba(22,33,29,0.2)]"
            >
              {/* Share is measured against the month's whole expense total,
                  not against the six rows shown — otherwise the figures here
                  would disagree with every other mention of them. */}
              <RankedBars
                categories={topSix}
                total={categoryTotal}
                flagged="Software & subscriptions"
              />
            </Panel>
          </Reveal>
        </div>

        {/* The remaining four, in a grid */}
        <div className="mt-16 grid gap-5 lg:mt-24 lg:grid-cols-2 lg:gap-6">
          {rest.map((item, i) => (
            <Reveal
              key={item.key}
              delay={i * 60}
              className="flex flex-col rounded-panel border border-rule bg-card p-6 transition-colors duration-200 hover:border-rule-strong sm:p-7"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xs border border-rule-strong bg-paper text-forest">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>

              <p className="label-mono mt-4 text-copper">{item.eyebrow}</p>
              <h3 className="t-card mt-2 text-[1.1875rem] text-ink">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                {item.body}
              </p>

              {/* Each card shows the actual interface the feature produces. */}
              <div className="mt-6 flex-1 rounded-card border border-rule bg-paper p-4">
                <FeatureVisual featureKey={item.key} />
              </div>

              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-1.5 text-[0.8125rem] text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-copper-bright"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Per-feature mini interface                                                 */
/* -------------------------------------------------------------------------- */

function FeatureVisual({ featureKey }: { featureKey: string }) {
  if (featureKey === "insights") {
    return <InsightList insights={insights} />;
  }

  if (featureKey === "alerts") {
    return <AlertList alerts={alerts} />;
  }

  if (featureKey === "reports") {
    return (
      <ul className="divide-y divide-rule">
        {reports.slice(0, 4).map((report) => (
          <li
            key={report.name}
            className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
          >
            <span
              aria-hidden="true"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-xs border border-rule bg-card text-forest"
            >
              <Icon name="report" className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.8125rem] font-medium text-ink">
                {report.name}
              </span>
              <span className="block truncate text-[0.6875rem] text-muted">
                {report.range}
              </span>
            </span>
            <span className="shrink-0">
              <Tag>{report.format}</Tag>
            </span>
          </li>
        ))}
      </ul>
    );
  }

  /* dashboard */
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {metrics.slice(0, 4).map((metric) => (
        <MetricTile key={metric.key} metric={metric} />
      ))}
      <p className="col-span-2 text-[0.6875rem] text-muted">
        Demo workspace totals {money(categoryTotal)} in expenses this month.
      </p>
    </div>
  );
}

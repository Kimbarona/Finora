import { CompositionBar } from "@/components/charts/Breakdown";
import { TrendChart } from "@/components/charts/TrendChart";
import { Icon } from "@/components/icons";
import {
  AppFrame,
  MetricTile,
  Panel,
  Tag,
  TransactionTable,
} from "./parts";
import {
  categories,
  categoryTotal,
  metrics,
  money,
  monthly,
  netByMonth,
  percentShare,
  transactions,
  workspace,
} from "@/lib/demo";

/* The hero shows the last six months; the showcase section shows all twelve.
   Six keeps the panel readable at hero size without a scrollbar or a squeeze. */
const recent = monthly.slice(-6);
const currentNet = netByMonth[netByMonth.length - 1].net;
const topCategories = [...categories]
  .sort((a, b) => b.amount - a.amount)
  .slice(0, 4);

/**
 * The hero product panel.
 *
 * Answers, in one screen, every question the headline raises: what do I have,
 * what came in, what went out, what is the net, where did it go, and what
 * happened recently. That completeness is the point — a decorative sliver of
 * UI would undercut a headline about knowing your numbers.
 */
export function HeroDashboard() {
  return (
    <AppFrame
      caption={`Finora demo workspace for ${workspace.company}, a fictional company. Every balance, transaction and figure shown is demonstration data.`}
      toolbar={
        <>
          <span
            aria-hidden="true"
            className="flex items-center gap-1 rounded-xs border border-rule bg-paper p-0.5"
          >
            {["This month", "Quarter", "Year"].map((option, i) => (
              <span
                key={option}
                className={`rounded-[3px] px-2.5 py-1 text-[0.75rem] font-medium ${
                  i === 0 ? "bg-card text-ink shadow-[0_1px_2px_rgba(22,33,29,0.08)]" : "text-muted"
                }`}
              >
                {option}
              </span>
            ))}
          </span>

          <span className="label-mono ml-auto hidden items-center gap-1.5 text-muted sm:flex">
            <span className="fn-breathe h-1.5 w-1.5 rounded-full bg-pos" />
            {workspace.updatedAt}
          </span>

          <span
            aria-hidden="true"
            className="hidden h-7 items-center gap-1.5 rounded-xs border border-rule bg-card px-2.5 text-[0.75rem] font-medium text-body md:flex"
          >
            <Icon name="download" className="h-3.5 w-3.5 text-muted" />
            Export
          </span>
        </>
      }
    >
      <div className="space-y-3 sm:space-y-4">
        {/* Headline metrics */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          {metrics.map((metric) => (
            <MetricTile
              key={metric.key}
              metric={metric}
              emphasis={metric.key === "net"}
            />
          ))}
        </div>

        {/* Trend + spending */}
        <div className="grid items-start gap-3 sm:gap-4 lg:grid-cols-[1.55fr_1fr]">
          <Panel
            title="Revenue and expenses"
            subtitle="Last six months"
            action={<Tag tone="pos">Net {money(currentNet)}</Tag>}
          >
            <TrendChart
              title="Revenue and expenses, last six months"
              summary={`Revenue rose from ${money(recent[0].revenue)} in ${recent[0].full} to ${money(recent[recent.length - 1].revenue)} in ${recent[recent.length - 1].full}, with expenses following at a lower level.`}
              labels={recent.map((m) => m.month)}
              fullLabels={recent.map((m) => m.full)}
              height={200}
              series={[
                {
                  key: "revenue",
                  label: "Revenue",
                  color: "var(--color-chart-in)",
                  values: recent.map((m) => m.revenue),
                },
                {
                  key: "expenses",
                  label: "Expenses",
                  color: "var(--color-chart-out)",
                  values: recent.map((m) => m.expenses),
                },
              ]}
            />
          </Panel>

          <Panel
            title="Where it went"
            subtitle={`${workspace.period} spending`}
            action={<Tag>{money(categoryTotal)}</Tag>}
          >
            <CompositionBar
              categories={categories}
              total={categoryTotal}
              showLegend={false}
              height={12}
            />

            <ul className="mt-4 space-y-2.5">
              {topCategories.map((category, i) => (
                <li key={category.name} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-[1px]"
                    style={{
                      backgroundColor: `var(--color-ramp-${i + 1})`,
                    }}
                  />
                  <span className="min-w-0 flex-1 truncate text-[0.8125rem] text-ink">
                    {category.short}
                  </span>
                  <span className="figure-mono shrink-0 text-[0.75rem] text-muted">
                    {percentShare(category.amount, categoryTotal)}
                  </span>
                  <span className="figure-mono w-[4.5rem] shrink-0 text-right text-[0.8125rem] font-medium text-ink">
                    {money(category.amount)}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 border-t border-rule pt-3 text-[0.75rem] leading-relaxed text-body">
              <span className="font-medium text-copper">Software</span> is up
              18.4% on August — three new subscriptions.
            </p>
          </Panel>
        </div>

        {/* Ledger */}
        <Panel
          title="Recent activity"
          subtitle="Across all four accounts"
          action={
            <span
              aria-hidden="true"
              className="label-mono text-muted"
            >
              View all
            </span>
          }
          bodyClassName="pt-1"
        >
          <TransactionTable transactions={transactions} rows={4} />
        </Panel>
      </div>
    </AppFrame>
  );
}

"use client";

import { useId, useRef, useState } from "react";
import { CompositionBar, RankedBars } from "@/components/charts/Breakdown";
import { ColumnChart } from "@/components/charts/ColumnChart";
import { NetColumns } from "@/components/charts/NetColumns";
import { TrendChart } from "@/components/charts/TrendChart";
import { Icon } from "@/components/icons";
import {
  AccountList,
  AlertList,
  AppFrame,
  InsightList,
  MetricTile,
  Panel,
  Tag,
  TransactionTable,
} from "./parts";
import { showcase } from "@/lib/content";
import {
  accounts,
  alerts,
  categories,
  categoryTotal,
  insights,
  metrics,
  money,
  monthly,
  netByMonth,
  operatingMargin,
  reports,
  totalBalance,
  transactions,
  workspace,
} from "@/lib/demo";

type TabId = (typeof showcase.tabs)[number]["id"];

const railForTab: Record<TabId, number> = {
  overview: 0,
  cashflow: 1,
  spending: 2,
  activity: 0,
};

/**
 * The large product showcase.
 *
 * Four genuine views rather than one static image: switching a tab re-renders
 * real components against the same demo dataset, which is both more honest
 * about what the product does and far better to maintain than four
 * screenshots.
 *
 * The tab strip follows the WAI-ARIA tabs pattern with manual activation —
 * arrow keys move between tabs, Enter or Space selects. Manual activation is
 * the right choice here because each panel is a heavy re-render; auto-select
 * would make arrowing through feel like a stutter.
 */
export function ShowcaseDashboard() {
  const [tab, setTab] = useState<TabId>("overview");
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const tabs = showcase.tabs;
  const activeIndex = tabs.findIndex((t) => t.id === tab);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    const target = keys[event.key];
    if (target === undefined) return;

    event.preventDefault();
    const next = (target + tabs.length) % tabs.length;
    const id = tabs[next].id;
    setTab(id);
    tabRefs.current[id]?.focus();
  };

  return (
    <div>
      {/* Tab strip — outside the frame, so it reads as page furniture rather
          than as part of the mocked application. */}
      <div
        role="tablist"
        aria-label="Finora workspace views"
        onKeyDown={onKeyDown}
        className="mb-5 flex snap-x gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] sm:mb-6 sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((item) => {
          const selected = item.id === tab;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[item.id] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(item.id)}
              className={`shrink-0 snap-start rounded-xs border px-3.5 py-2.5 text-left transition-colors duration-200 sm:px-4 ${
                selected
                  ? "border-forest bg-forest text-white"
                  : "border-rule-strong bg-card text-ink hover:border-forest hover:text-forest"
              }`}
            >
              <span className="block text-[0.9375rem] leading-tight font-medium">
                {item.label}
              </span>
              <span
                className={`mt-0.5 block text-[0.75rem] leading-tight ${
                  selected ? "text-white/70" : "text-muted"
                }`}
              >
                {item.hint}
              </span>
            </button>
          );
        })}
      </div>

      {tabs.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== tab}
          tabIndex={0}
        >
          {/* Only the selected panel is mounted: four panels of live charts
              would otherwise all run resize observers at once. */}
          {item.id === tab ? (
            <AppFrame
              activeRail={railForTab[tab]}
              caption={`Demonstration data for ${workspace.company}, a fictional company. Finora is a conceptual product and is not connected to any financial institution.`}
              toolbar={<Toolbar tab={tab} />}
            >
              {tab === "overview" ? <OverviewView /> : null}
              {tab === "cashflow" ? <CashflowView /> : null}
              {tab === "spending" ? <SpendingView /> : null}
              {tab === "activity" ? <ActivityView /> : null}
            </AppFrame>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Toolbar                                                                     */
/* -------------------------------------------------------------------------- */

const toolbarCrumb: Record<TabId, string> = {
  overview: "Overview",
  cashflow: "Cash flow",
  spending: "Expenses",
  activity: "Transactions",
};

function Toolbar({ tab }: { tab: TabId }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="flex items-center gap-1.5 text-[0.8125rem] text-body"
      >
        <span className="text-muted">{workspace.company}</span>
        <Icon name="chevronRight" className="h-3.5 w-3.5 text-rule-strong" />
        <span className="font-medium text-ink">{toolbarCrumb[tab]}</span>
      </span>

      <span className="label-mono ml-auto hidden items-center gap-1.5 text-muted sm:flex">
        <span className="fn-breathe h-1.5 w-1.5 rounded-full bg-pos" />
        {workspace.updatedAt}
      </span>

      <span
        aria-hidden="true"
        className="hidden h-7 items-center gap-1.5 rounded-xs border border-rule bg-card px-2.5 text-[0.75rem] font-medium text-body md:flex"
      >
        <Icon name="filter" className="h-3.5 w-3.5 text-muted" />
        Filters
      </span>
      <span
        aria-hidden="true"
        className="hidden h-7 items-center gap-1.5 rounded-xs border border-rule bg-card px-2.5 text-[0.75rem] font-medium text-body sm:flex"
      >
        <Icon name="download" className="h-3.5 w-3.5 text-muted" />
        Export
      </span>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. Overview                                                                 */
/* -------------------------------------------------------------------------- */

function OverviewView() {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricTile
            key={metric.key}
            metric={metric}
            emphasis={metric.key === "net"}
          />
        ))}
      </div>

      <div className="grid items-start gap-3 sm:gap-4 lg:grid-cols-[1.55fr_1fr]">
        <Panel
          title="Revenue trend"
          subtitle="Twelve months to September 2026"
          action={<Tag tone="pos">Best month</Tag>}
        >
          <TrendChart
            title="Revenue, twelve months to September 2026"
            summary={`Revenue moved from ${money(monthly[0].revenue)} in ${monthly[0].full} to ${money(monthly[monthly.length - 1].revenue)} in ${monthly[monthly.length - 1].full}.`}
            labels={monthly.map((m) => m.month)}
            fullLabels={monthly.map((m) => m.full)}
            height={300}
            series={[
              {
                key: "revenue",
                label: "Revenue",
                color: "var(--color-chart-in)",
                values: monthly.map((m) => m.revenue),
              },
            ]}
          />
        </Panel>

        <div className="grid gap-3 sm:gap-4">
          <Panel title="What changed" subtitle="Alerts on your thresholds">
            <AlertList alerts={alerts} />
          </Panel>
          <Panel title="In plain English" subtitle="Insights from your figures">
            <InsightList insights={insights} />
          </Panel>
        </div>
      </div>

      <div className="grid items-start gap-3 sm:gap-4 lg:grid-cols-2">
        <Panel
          title="Accounts"
          subtitle="Balances as of this morning"
          action={<Tag>{money(totalBalance)}</Tag>}
        >
          <AccountList accounts={accounts} />
        </Panel>

        <Panel
          title="Spending this month"
          subtitle={`${money(categoryTotal)} across 9 categories`}
        >
          <CompositionBar categories={categories} total={categoryTotal} />
        </Panel>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Cash flow                                                                */
/* -------------------------------------------------------------------------- */

function CashflowView() {
  const positiveMonths = netByMonth.filter((m) => m.net > 0).length;

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
        {metrics
          .filter((m) => m.key !== "balance")
          .map((metric) => (
            <MetricTile key={metric.key} metric={metric} />
          ))}
        <div className="rounded-card border border-rule bg-card p-3">
          <p className="label-mono truncate text-muted">Operating margin</p>
          <p className="figure-mono mt-2 text-[1.375rem] leading-none font-semibold text-ink sm:text-[1.5rem]">
            {operatingMargin.toFixed(1)}%
          </p>
          <p className="mt-2.5 text-[0.6875rem] text-muted">
            Net as a share of revenue
          </p>
        </div>
      </div>

      <Panel
        title="Money in against money out"
        subtitle="Twelve months, side by side"
        action={<Tag tone="pos">{positiveMonths} of 12 positive</Tag>}
      >
        <ColumnChart
          title="Money in against money out, twelve months"
          summary={`Revenue and expenses for each of the twelve months to ${monthly[monthly.length - 1].full}. Revenue exceeded expenses in ${positiveMonths} of the twelve.`}
          groups={monthly.map((m) => ({
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
          height={260}
        />
      </Panel>

      <div className="grid items-start gap-3 sm:gap-4 lg:grid-cols-[1.55fr_1fr]">
        <Panel
          title="Net cash flow"
          subtitle="Revenue less expenses, by month"
          action={<Tag tone="pos">{money(netByMonth[11].net)} in Sep</Tag>}
        >
          <NetColumns
            title="Net cash flow by month"
            summary={`Net cash flow stayed positive in all twelve months, rising from ${money(netByMonth[0].net)} to ${money(netByMonth[11].net)}.`}
            points={netByMonth.map((m) => ({
              label: m.month,
              full: m.full,
              net: m.net,
            }))}
            height={210}
          />
        </Panel>

        <Panel title="Accounts" subtitle="Where the balance sits">
          <AccountList accounts={accounts} />
          <p className="mt-3 border-t border-rule pt-3 text-[0.75rem] leading-relaxed text-body">
            The card balance is a liability, so it is subtracted from the
            total rather than added.
          </p>
        </Panel>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Spending                                                                 */
/* -------------------------------------------------------------------------- */

function SpendingView() {
  const biggest = [...categories].sort((a, b) => b.delta - a.delta)[0];

  return (
    <div className="space-y-3 sm:space-y-4">
      <Panel
        title={`Spending composition, ${workspace.period}`}
        subtitle={`${money(categoryTotal)} total`}
        action={<Tag tone="copper">{biggest.short} up {biggest.delta}%</Tag>}
      >
        <CompositionBar
          categories={categories}
          total={categoryTotal}
          height={18}
        />
      </Panel>

      <div className="grid items-start gap-3 sm:gap-4 lg:grid-cols-[1.55fr_1fr]">
        <Panel
          title="Every category, largest first"
          subtitle="Change is against August 2026"
        >
          <RankedBars
            categories={categories}
            total={categoryTotal}
            flagged="Software & subscriptions"
          />
        </Panel>

        <div className="grid gap-3 sm:gap-4">
          <Panel title="Worth a look" subtitle="Flagged by your thresholds">
            <AlertList alerts={alerts} />
          </Panel>
          <Panel title="Expenses over time" subtitle="Last twelve months">
            <TrendChart
              title="Expenses, twelve months to September 2026"
              summary={`Expenses moved from ${money(monthly[0].expenses)} in ${monthly[0].full} to ${money(monthly[monthly.length - 1].expenses)} in ${monthly[monthly.length - 1].full}.`}
              labels={monthly.map((m) => m.month)}
              fullLabels={monthly.map((m) => m.full)}
              height={170}
              series={[
                {
                  key: "expenses",
                  label: "Expenses",
                  color: "var(--color-chart-out)",
                  values: monthly.map((m) => m.expenses),
                },
              ]}
            />
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Activity                                                                 */
/* -------------------------------------------------------------------------- */

function ActivityView() {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid items-start gap-3 sm:gap-4 lg:grid-cols-[1.55fr_1fr]">
        <Panel
          title="Recent transactions"
          subtitle="All accounts, newest first"
          action={<Tag>{transactions.length} shown</Tag>}
          bodyClassName="pt-1"
        >
          <TransactionTable transactions={transactions} />
        </Panel>

        <div className="grid gap-3 sm:gap-4">
          <Panel
            title="Accounts"
            subtitle="Balances as of this morning"
            action={<Tag>{money(totalBalance)}</Tag>}
          >
            <AccountList accounts={accounts} />
          </Panel>

          <Panel
            title="Reports"
            subtitle="Ready to export"
            action={
              <span aria-hidden="true" className="label-mono text-muted">
                New
              </span>
            }
          >
            <ul className="divide-y divide-rule">
              {reports.map((report) => (
                <li
                  key={report.name}
                  className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-xs border border-rule bg-paper text-forest"
                  >
                    <Icon name="report" className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.8125rem] font-medium text-ink">
                      {report.name}
                    </span>
                    <span className="block truncate text-[0.6875rem] text-muted">
                      {report.range}
                    </span>
                  </span>
                  <Tag>{report.format}</Tag>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

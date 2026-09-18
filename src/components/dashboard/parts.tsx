import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { Sparkline } from "@/components/charts/Sparkline";
import {
  moneyCents,
  moneySigned,
  percentSigned,
  workspace,
  type Account,
  type Alert,
  type Metric,
  type Transaction,
} from "@/lib/demo";

/* ==========================================================================
   Product mockup building blocks
   --------------------------------------------------------------------------
   These are real DOM components rather than a flat screenshot, so the mockups
   stay crisp at any pixel density, reflow on a phone instead of shrinking,
   and can carry genuine hover and focus states.

   Accessibility split: the application *chrome* (rail, top bar, avatar,
   fake search field) is decoration and is hidden from assistive technology,
   while the *data* inside — metrics, charts, tables — stays fully readable,
   with the charts exposing their own data tables. A screen reader gets the
   numbers without wading through a pretend sidebar.
   ========================================================================== */

/* -------------------------------------------------------------------------- */
/* Shell                                                                       */
/* -------------------------------------------------------------------------- */

const railItems: { icon: IconName; label: string }[] = [
  { icon: "dashboard", label: "Overview" },
  { icon: "cashflow", label: "Cash flow" },
  { icon: "receipt", label: "Expenses" },
  { icon: "report", label: "Reports" },
  { icon: "bell", label: "Alerts" },
  { icon: "sliders", label: "Settings" },
];

/**
 * The application frame: a rail, a top bar and a content well.
 *
 * `figure` + `figcaption` is the honest markup for a product mockup — it is
 * an illustration of software, and the caption is where the demo-data
 * disclosure belongs rather than in small print elsewhere on the page.
 */
export function AppFrame({
  children,
  caption,
  activeRail = 0,
  toolbar,
  className = "",
}: {
  children: ReactNode;
  caption: string;
  activeRail?: number;
  toolbar?: ReactNode;
  className?: string;
}) {
  return (
    <figure className={`m-0 ${className}`}>
      <div className="panel-raised overflow-hidden rounded-panel border border-rule-strong bg-card">
        {/* Top bar */}
        <div
          aria-hidden="true"
          className="flex h-12 items-center gap-3 border-b border-rule bg-paper px-3 sm:px-4"
        >
          <span className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-[5px] bg-forest">
              <span className="h-2.5 w-[3px] rounded-[1px] bg-white" />
            </span>
            <span className="font-serif text-[0.9375rem] font-semibold tracking-[-0.015em] text-ink">
              Finora
            </span>
          </span>

          <span className="hidden h-4 w-px bg-rule-strong sm:block" />

          <span className="hidden items-center gap-1.5 text-[0.8125rem] text-body sm:flex">
            {workspace.company}
            <Icon name="chevronDown" className="h-3.5 w-3.5 text-muted" />
          </span>

          <span className="ml-auto flex items-center gap-2">
            <span className="hidden h-7 items-center gap-2 rounded-xs border border-rule bg-card px-2.5 text-[0.75rem] text-muted md:flex">
              <Icon name="search" className="h-3.5 w-3.5" />
              Search transactions
            </span>
            <span className="hidden h-7 items-center gap-1.5 rounded-xs border border-rule bg-card px-2.5 text-[0.75rem] text-body sm:flex">
              <Icon name="calendar" className="h-3.5 w-3.5 text-muted" />
              {workspace.periodShort}
            </span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-forest text-[0.6875rem] font-semibold text-white">
              {workspace.user.initials}
            </span>
          </span>
        </div>

        <div className="flex">
          {/* Rail — desktop only; on a phone the product would use a tab bar. */}
          <div
            aria-hidden="true"
            className="hidden w-14 shrink-0 flex-col items-center gap-1 border-r border-rule bg-paper py-3 lg:flex"
          >
            {railItems.map((item, i) => (
              <span
                key={item.label}
                className={`grid h-9 w-9 place-items-center rounded-xs ${
                  i === activeRail
                    ? "bg-forest text-white"
                    : "text-muted"
                }`}
                title={item.label}
              >
                <Icon name={item.icon} className="h-[18px] w-[18px]" />
              </span>
            ))}
          </div>

          <div className="min-w-0 flex-1 bg-paper-2/40">
            {toolbar ? (
              <div className="flex flex-wrap items-center gap-2 border-b border-rule bg-card px-3 py-2.5 sm:px-4">
                {toolbar}
              </div>
            ) : null}
            <div className="p-3 sm:p-4 lg:p-5">{children}</div>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 flex items-start gap-2 text-[0.75rem] leading-relaxed text-muted">
        <Icon name="eye" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        {caption}
      </figcaption>
    </figure>
  );
}

/** A titled card inside the app frame. */
export function Panel({
  title,
  subtitle,
  action,
  children,
  className = "",
  bodyClassName = "",
  as: Heading = "h3",
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  as?: "h3" | "h4" | "p";
}) {
  return (
    <section
      className={`flex min-w-0 flex-col rounded-card border border-rule bg-card ${className}`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-rule px-3.5 py-3">
        <div className="min-w-0">
          <Heading className="font-sans text-[0.875rem] leading-tight font-semibold tracking-[-0.005em] text-ink">
            {title}
          </Heading>
          {subtitle ? (
            <p className="mt-0.5 text-[0.75rem] leading-snug text-muted">
              {subtitle}
            </p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className={`flex-1 px-3.5 py-3.5 ${bodyClassName}`}>{children}</div>
    </section>
  );
}

/** Small mono pill used for periods, formats and counts inside panels. */
export function Tag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "pos" | "neg" | "copper";
}) {
  const tones = {
    neutral: "border-rule bg-paper text-muted",
    pos: "border-pos/25 bg-pos-wash text-pos",
    neg: "border-neg/25 bg-neg-wash text-neg",
    copper: "border-copper/25 bg-copper-wash text-copper",
  } as const;

  return (
    <span
      className={`label-mono inline-flex items-center rounded-[3px] border px-1.5 py-0.5 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Metrics                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * A signed change, coloured by whether it is *good news for this metric*
 * rather than by its arithmetic sign. Expenses rising 4.8% is not a win, so
 * the tile takes a polarity rather than guessing from the number.
 */
export function DeltaChip({
  delta,
  polarity,
  className = "",
}: {
  delta: number;
  polarity: Metric["polarity"];
  className?: string;
}) {
  const good =
    polarity === "neutral"
      ? null
      : polarity === "up-good"
        ? delta >= 0
        : delta <= 0;

  const tone =
    good === null ? "text-muted" : good ? "text-pos" : "text-neg";

  return (
    <span
      className={`inline-flex items-center gap-1 text-[0.75rem] font-medium ${tone} ${className}`}
    >
      <Icon
        name={delta >= 0 ? "trendUp" : "trendDown"}
        className="h-3 w-3"
      />
      <span className="figure-mono">{percentSigned(delta)}</span>
    </span>
  );
}

export function MetricTile({
  metric,
  emphasis = false,
}: {
  metric: Metric;
  emphasis?: boolean;
}) {
  const sparkColor =
    metric.key === "expenses"
      ? "var(--color-chart-out)"
      : "var(--color-chart-in)";

  return (
    <div
      className={`group min-w-0 rounded-card border bg-card p-3 transition-colors duration-200 ${
        emphasis
          ? "border-forest/25 bg-pos-wash/40"
          : "border-rule hover:border-rule-strong"
      }`}
    >
      <p className="label-mono truncate text-muted">{metric.label}</p>

      <p className="figure-mono mt-2 text-[1.375rem] leading-none font-semibold text-ink sm:text-[1.5rem]">
        {metric.value}
      </p>

      {/* The change and the sparkline share a row; the note gets its own,
          because at two-up mobile width a shared row truncated it to
          "Septe…" — which looks broken rather than compact. */}
      <div className="mt-2.5 flex items-center justify-between gap-2">
        <DeltaChip delta={metric.delta} polarity={metric.polarity} />
        <Sparkline
          values={metric.series}
          color={sparkColor}
          className="shrink-0"
        />
      </div>

      <p className="mt-1.5 text-[0.6875rem] leading-tight text-muted">
        {metric.note}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Accounts                                                                    */
/* -------------------------------------------------------------------------- */

const accountIcon: Record<Account["kind"], IconName> = {
  checking: "bank",
  savings: "shield",
  merchant: "cashflow",
  credit: "receipt",
};

export function AccountList({ accounts }: { accounts: readonly Account[] }) {
  return (
    <ul className="divide-y divide-rule">
      {accounts.map((account) => (
        <li
          key={account.mask}
          className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-xs border border-rule bg-paper text-forest"
          >
            <Icon name={accountIcon[account.kind]} className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[0.8125rem] font-medium text-ink">
              {account.name}
            </span>
            <span className="block truncate text-[0.6875rem] text-muted">
              {account.institution} &bull;&bull;{account.mask}
            </span>
          </span>
          <span
            className={`figure-mono shrink-0 text-[0.8125rem] font-medium ${
              account.balance < 0 ? "text-neg" : "text-ink"
            }`}
          >
            {account.balance < 0
              ? `-${moneyCents(Math.abs(account.balance))}`
              : moneyCents(account.balance)}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Transactions                                                                */
/* -------------------------------------------------------------------------- */

/**
 * The ledger.
 *
 * A real `<table>`, because that is what it is. Columns drop out in order of
 * expendability as the viewport narrows — account first, then category —
 * rather than the whole table scrolling sideways, which is what makes most
 * responsive tables unusable on a phone.
 */
export function TransactionTable({
  transactions,
  rows,
  showAccount = true,
}: {
  transactions: readonly Transaction[];
  rows?: number;
  showAccount?: boolean;
}) {
  const visible = rows ? transactions.slice(0, rows) : transactions;

  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">
        Recent transactions in the Finora demo workspace, newest first. All
        figures are demonstration data.
      </caption>
      <thead>
        <tr className="border-b border-rule">
          <th
            scope="col"
            className="label-mono py-2 pr-3 font-medium text-muted"
          >
            Date
          </th>
          <th
            scope="col"
            className="label-mono py-2 pr-3 font-medium text-muted"
          >
            Description
          </th>
          <th
            scope="col"
            className="label-mono hidden py-2 pr-3 font-medium text-muted sm:table-cell"
          >
            Category
          </th>
          {showAccount ? (
            <th
              scope="col"
              className="label-mono hidden py-2 pr-3 font-medium text-muted lg:table-cell"
            >
              Account
            </th>
          ) : null}
          <th
            scope="col"
            className="label-mono py-2 text-right font-medium text-muted"
          >
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {visible.map((transaction, i) => (
          <tr
            key={`${transaction.date}-${transaction.merchant}-${i}`}
            className="border-b border-rule/70 transition-colors duration-150 last:border-0 hover:bg-paper"
          >
            <td className="figure-mono py-2.5 pr-3 align-middle text-[0.75rem] whitespace-nowrap text-muted">
              {transaction.date}
            </td>
            <td className="py-2.5 pr-3 align-middle">
              <span className="block max-w-[11rem] truncate text-[0.8125rem] text-ink sm:max-w-none">
                {transaction.merchant}
              </span>
              {/* The category still reaches a phone reader, just stacked. */}
              <span className="block truncate text-[0.6875rem] text-muted sm:hidden">
                {transaction.category}
              </span>
            </td>
            <td className="hidden py-2.5 pr-3 align-middle text-[0.75rem] text-body sm:table-cell">
              {transaction.category}
            </td>
            {showAccount ? (
              <td className="figure-mono hidden py-2.5 pr-3 align-middle text-[0.75rem] whitespace-nowrap text-muted lg:table-cell">
                {transaction.account}
              </td>
            ) : null}
            <td className="py-2.5 align-middle text-right whitespace-nowrap">
              <span
                className={`figure-mono text-[0.8125rem] font-medium ${
                  transaction.amount > 0 ? "text-pos" : "text-ink"
                }`}
              >
                {moneySigned(transaction.amount)}
              </span>
              {transaction.status === "pending" ? (
                <span className="label-mono mt-0.5 block text-[0.625rem] text-copper">
                  Pending
                </span>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* -------------------------------------------------------------------------- */
/* Alerts and insights                                                         */
/* -------------------------------------------------------------------------- */

const alertTone: Record<
  Alert["tone"],
  { icon: IconName; ring: string; text: string }
> = {
  watch: {
    icon: "alert",
    ring: "border-copper/30 bg-copper-wash text-copper",
    text: "text-copper",
  },
  info: {
    icon: "search",
    ring: "border-rule-strong bg-paper text-body",
    text: "text-body",
  },
  good: {
    icon: "check",
    ring: "border-pos/30 bg-pos-wash text-pos",
    text: "text-pos",
  },
};

export function AlertList({ alerts }: { alerts: readonly Alert[] }) {
  return (
    <ul className="space-y-3">
      {alerts.map((alert) => {
        const tone = alertTone[alert.tone];
        return (
          <li key={alert.title} className="flex gap-2.5">
            <span
              aria-hidden="true"
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${tone.ring}`}
            >
              <Icon name={tone.icon} className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0">
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-[0.8125rem] font-medium text-ink">
                  {alert.title}
                </span>
                <span className="label-mono text-muted">{alert.when}</span>
              </span>
              <span className="mt-0.5 block text-[0.75rem] leading-relaxed text-body">
                {alert.body}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function InsightList({ insights }: { insights: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {insights.map((insight) => (
        <li key={insight} className="flex gap-2.5">
          <span
            aria-hidden="true"
            className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-copper-bright"
          />
          <span className="text-[0.8125rem] leading-relaxed text-body">
            {insight}
          </span>
        </li>
      ))}
    </ul>
  );
}

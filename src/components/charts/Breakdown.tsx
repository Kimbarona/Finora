"use client";

import { useState } from "react";
import { money, percentShare, percentSigned } from "@/lib/demo";
import type { Category } from "@/lib/demo";

/* ==========================================================================
   Spending breakdown
   --------------------------------------------------------------------------
   Two components, and no pie chart anywhere.

   A pie or donut is the reflex choice here, and it is the wrong one: nine
   slices need nine hues, which forces a rainbow, and comparing arc lengths is
   the hardest judgement you can ask a reader to make. Modern financial
   products have largely dropped them for exactly this reason.

   Instead:
     - CompositionBar answers "what share of the month is what" with one
       stacked bar on a single-hue ordinal ramp, so the colour itself carries
       the ranking.
     - RankedBars answers "how much, and what moved" with sorted horizontal
       bars in one colour plus direct labels, which is the most accurately
       read form there is for magnitude.
   ========================================================================== */

const ramp = [
  "var(--color-ramp-1)",
  "var(--color-ramp-2)",
  "var(--color-ramp-3)",
  "var(--color-ramp-4)",
  "var(--color-ramp-5)",
  "var(--color-ramp-6)",
];

/**
 * Descending by amount, except that a catch-all bucket is pinned to the
 * bottom. "Other" is not a category competing on size — it is where the
 * leftovers went — so a finance product always lists it last, whatever it
 * happens to total.
 */
function ranked(categories: readonly Category[]) {
  return [...categories].sort((a, b) => {
    if (a.short === "Other") return 1;
    if (b.short === "Other") return -1;
    return b.amount - a.amount;
  });
}

type Segment = { name: string; amount: number; color: string };

/** Top five categories plus a pooled remainder, matching the six ramp steps. */
function toSegments(categories: readonly Category[]): Segment[] {
  const sorted = ranked(categories);
  const head = sorted.slice(0, 5);
  const tail = sorted.slice(5);
  const pooled = tail.reduce((sum, c) => sum + c.amount, 0);

  const segments = head.map((c, i) => ({
    name: c.short,
    amount: c.amount,
    color: ramp[i],
  }));

  if (pooled > 0) {
    segments.push({
      name: `Other (${tail.length})`,
      amount: pooled,
      color: ramp[5],
    });
  }

  return segments;
}

export function CompositionBar({
  categories,
  total,
  height = 14,
  showLegend = true,
  className = "",
}: {
  categories: readonly Category[];
  total: number;
  height?: number;
  showLegend?: boolean;
  className?: string;
}) {
  const segments = toSegments(categories);
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className={className}>
      {/* 2px surface gaps do the separating — no strokes around segments. */}
      <div
        className="flex w-full overflow-hidden rounded-[3px]"
        style={{ height, gap: 2 }}
        role="img"
        aria-label={`Spending composition for the month: ${segments
          .map((s) => `${s.name} ${percentShare(s.amount, total)}`)
          .join(", ")}.`}
      >
        {segments.map((segment, i) => (
          <div
            key={segment.name}
            className="h-full min-w-[3px] transition-opacity duration-150"
            style={{
              flexGrow: segment.amount,
              flexBasis: 0,
              backgroundColor: segment.color,
              opacity: active === null || active === i ? 1 : 0.4,
            }}
            onPointerEnter={() => setActive(i)}
            onPointerLeave={() => setActive(null)}
          />
        ))}
      </div>

      {showLegend ? (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {segments.map((segment, i) => (
            <li
              key={segment.name}
              className="flex items-center gap-1.5 text-[0.75rem] text-body transition-opacity duration-150"
              style={{ opacity: active === null || active === i ? 1 : 0.5 }}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-[1px]"
                style={{ backgroundColor: segment.color }}
              />
              {segment.name}
              <span className="figure-mono text-muted">
                {percentShare(segment.amount, total)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * Sorted horizontal bars, every bar in the same hue.
 *
 * Colouring these by value would spend the identity channel re-encoding what
 * bar length already shows, so they share slot one and the copper dot is
 * reserved for the single category the alerts panel is flagging.
 */
export function RankedBars({
  categories,
  total,
  flagged,
  className = "",
}: {
  categories: readonly Category[];
  total: number;
  /** Category name to mark as the notable mover this month. */
  flagged?: string;
  className?: string;
}) {
  const sorted = ranked(categories);
  const max = Math.max(...sorted.map((c) => c.amount));

  return (
    <div className={className}>
      <table className="w-full border-collapse">
        <caption className="sr-only">
          Spending by category for the current month, with change against the
          previous month.
        </caption>
        <thead>
          <tr className="border-b border-rule">
            <th
              scope="col"
              className="label-mono pb-2 text-left font-medium text-muted"
            >
              Category
            </th>
            <th
              scope="col"
              className="label-mono pb-2 text-right font-medium text-muted"
            >
              Amount
            </th>
            <th
              scope="col"
              className="label-mono hidden pb-2 text-right font-medium text-muted sm:table-cell"
            >
              Share
            </th>
            <th
              scope="col"
              className="label-mono pb-2 text-right font-medium text-muted"
            >
              Change
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((category) => {
            const isFlagged = category.name === flagged;
            return (
              <tr
                key={category.name}
                className="group border-b border-rule/70 last:border-0"
              >
                <td className="py-2.5 pr-3 align-middle">
                  <div className="flex items-center gap-2">
                    {isFlagged ? (
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-copper-bright"
                        title="Flagged this month"
                      />
                    ) : null}
                    <span className="truncate text-[0.8125rem] text-ink">
                      {category.name}
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="mt-1.5 h-[5px] w-full overflow-hidden rounded-[2px] bg-paper-3"
                  >
                    <div
                      className="h-full rounded-[2px] bg-chart-in transition-[width] duration-500 ease-out"
                      style={{ width: `${(category.amount / max) * 100}%` }}
                    />
                  </div>
                </td>
                <td className="figure-mono py-2.5 text-right align-middle text-[0.8125rem] font-medium text-ink">
                  {money(category.amount)}
                </td>
                <td className="figure-mono hidden py-2.5 text-right align-middle text-[0.8125rem] text-muted sm:table-cell">
                  {percentShare(category.amount, total)}
                </td>
                <td className="py-2.5 pl-3 text-right align-middle">
                  <span
                    className={`figure-mono text-[0.8125rem] ${
                      category.delta > 0
                        ? "text-neg"
                        : category.delta < 0
                          ? "text-pos"
                          : "text-muted"
                    }`}
                  >
                    {category.delta === 0
                      ? "—"
                      : percentSigned(category.delta)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="mt-3 text-[0.75rem] text-muted">
        For expenses, a rise is shown in clay and a fall in green — the sign of
        the change, not its size.
      </p>
    </div>
  );
}

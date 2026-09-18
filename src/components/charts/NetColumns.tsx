"use client";

import {
  AxisLabel,
  BarPath,
  ChartFrame,
  Tooltip,
  TooltipHeading,
  TooltipRow,
  niceMax,
  scale,
  useActiveIndex,
  useMeasuredWidth,
} from "./chart-kit";
import { money, moneyCompact } from "@/lib/demo";

/**
 * Net cash flow: a diverging chart around a zero baseline.
 *
 * Polarity is carried by position first (above or below the line) and by
 * colour second, with the sign written into the tooltip and the table. That
 * ordering matters — a red/green pair alone is exactly the encoding a
 * colour-blind reader cannot use.
 */
export function NetColumns({
  points,
  height = 200,
  title,
  summary,
  className = "",
}: {
  points: { label: string; full: string; net: number }[];
  height?: number;
  title: string;
  summary: string;
  className?: string;
}) {
  const [box, width] = useMeasuredWidth();
  const { active, setActive, onKeyDown } = useActiveIndex(points.length);

  const pad = { top: 14, right: 12, bottom: 26, left: 44 };
  const plotW = Math.max(0, width - pad.left - pad.right);
  const plotH = Math.max(0, height - pad.top - pad.bottom);

  const values = points.map((p) => p.net);
  const maxAbs = niceMax(Math.max(...values.map(Math.abs)));
  const hasNegative = values.some((v) => v < 0);
  const lower = hasNegative ? -maxAbs : 0;

  const y = scale([lower, maxAbs], [pad.top + plotH, pad.top]);
  const zero = y(0);
  const ticks = hasNegative
    ? [maxAbs, maxAbs / 2, 0, -maxAbs / 2, -maxAbs]
    : [maxAbs, maxAbs / 2, 0];

  const band = plotW / points.length;
  const barW = Math.min(24, Math.max(4, band * 0.52));
  const labelStep = width < 420 ? 3 : width < 620 ? 2 : 1;

  const readout =
    active === null
      ? null
      : `${points[active].full}: net ${points[active].net < 0 ? "minus " : ""}${money(Math.abs(points[active].net))}`;

  return (
    <div className={className}>
      <ChartFrame
        title={title}
        summary={summary}
        onKeyDown={onKeyDown}
        readout={readout}
        tableCaption={`${title}. ${summary}`}
        table={
          <>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Net cash flow</th>
              </tr>
            </thead>
            <tbody>
              {points.map((p) => (
                <tr key={p.full}>
                  <th scope="row">{p.full}</th>
                  <td>
                    {p.net < 0 ? "-" : ""}
                    {money(Math.abs(p.net))}
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        }
      >
        {/* The box reserves the chart's height so nothing shifts while the
            measurement is taken, and contributes no width of its own. */}
        <div ref={box} className="relative" style={{ height }}>
          {width > 0 ? (
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={`${title}. ${summary}`}
            className="block touch-pan-y"
            onPointerLeave={() => setActive(null)}
          >
            {ticks.map((tick) => (
              <g key={tick}>
                <line
                  x1={pad.left}
                  x2={width - pad.right}
                  y1={y(tick)}
                  y2={y(tick)}
                  stroke={
                    tick === 0
                      ? "var(--color-rule-strong)"
                      : "var(--color-chart-grid)"
                  }
                  strokeWidth={1}
                  shapeRendering="crispEdges"
                  aria-hidden="true"
                />
                <AxisLabel x={pad.left - 10} y={y(tick) + 3} anchor="end">
                  {tick === 0
                    ? "0"
                    : `${tick < 0 ? "-" : ""}${moneyCompact(Math.abs(tick))}`}
                </AxisLabel>
              </g>
            ))}

            {points.map((point, i) => {
              const positive = point.net >= 0;
              const top = positive ? y(point.net) : zero;
              const barHeight = Math.abs(y(point.net) - zero);
              return (
                <g key={point.full}>
                  <rect
                    x={pad.left + band * i}
                    y={pad.top}
                    width={band}
                    height={plotH}
                    fill={active === i ? "var(--color-paper-2)" : "transparent"}
                    onPointerEnter={() => setActive(i)}
                  />
                  <BarPath
                    x={pad.left + band * i + (band - barW) / 2}
                    y={top}
                    width={barW}
                    height={barHeight}
                    fill={
                      positive
                        ? "var(--color-chart-in)"
                        : "var(--color-chart-neg)"
                    }
                    radius={3}
                    direction={positive ? "up" : "down"}
                  />
                </g>
              );
            })}

            {points.map((point, i) =>
              i % labelStep === 0 || i === points.length - 1 ? (
                <AxisLabel
                  key={`${point.label}-${i}`}
                  x={pad.left + band * i + band / 2}
                  y={height - 8}
                >
                  {point.label}
                </AxisLabel>
              ) : null,
            )}
          </svg>
          ) : null}

          {active !== null && width > 0 ? (
            <Tooltip
              x={pad.left + band * active + band / 2}
              y={Math.min(y(points[active].net), zero)}
              containerWidth={width}
            >
              <TooltipHeading>{points[active].full}</TooltipHeading>
              <TooltipRow
                color={
                  points[active].net >= 0
                    ? "var(--color-chart-in)"
                    : "var(--color-chart-neg)"
                }
                label={points[active].net >= 0 ? "Net surplus" : "Net deficit"}
                value={`${points[active].net < 0 ? "-" : "+"}${money(
                  Math.abs(points[active].net),
                )}`}
              />
            </Tooltip>
          ) : null}
        </div>
      </ChartFrame>
    </div>
  );
}

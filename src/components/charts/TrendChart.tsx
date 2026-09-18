"use client";

import { useMemo } from "react";
import {
  AxisLabel,
  ChartFrame,
  Gridlines,
  Legend,
  Tooltip,
  TooltipHeading,
  TooltipRow,
  areaPath,
  linePath,
  niceMax,
  scale,
  ticksTo,
  useActiveIndex,
  useMeasuredWidth,
} from "./chart-kit";
import { money, moneyCompact } from "@/lib/demo";

export type TrendSeries = {
  key: string;
  label: string;
  color: string;
  values: number[];
};

/**
 * Line / area chart over time.
 *
 * Carries a crosshair and a tooltip by default — an SVG chart in a browser is
 * interactive whether or not you plan for it, so the hover layer is part of
 * the component rather than an enhancement bolted on later.
 */
export function TrendChart({
  labels,
  fullLabels,
  series,
  height = 240,
  showLegend,
  title,
  summary,
  className = "",
}: {
  labels: string[];
  fullLabels?: string[];
  series: TrendSeries[];
  height?: number;
  showLegend?: boolean;
  title: string;
  summary: string;
  className?: string;
}) {
  const [box, width] = useMeasuredWidth();
  const { active, setActive, onKeyDown } = useActiveIndex(labels.length);

  /* A single series never gets a legend box: the panel title already names
     what is plotted, so a lone swatch would just restate it. */
  const withLegend = showLegend ?? series.length > 1;

  const pad = { top: 14, right: 12, bottom: 26, left: 44 };
  const plotW = Math.max(0, width - pad.left - pad.right);
  const plotH = Math.max(0, height - pad.top - pad.bottom);

  const geometry = useMemo(() => {
    const max = niceMax(Math.max(...series.flatMap((s) => s.values)));
    const y = scale([0, max], [pad.top + plotH, pad.top]);
    const x = (i: number) =>
      pad.left +
      (labels.length === 1 ? plotW / 2 : (plotW / (labels.length - 1)) * i);
    return { max, y, x, ticks: ticksTo(max, 4) };
  }, [series, labels.length, plotW, plotH, pad.left, pad.top]);

  const { max, y, x, ticks } = geometry;
  const baseline = pad.top + plotH;

  /* Every other month on narrow screens, so labels never collide. */
  const labelStep = width < 420 ? 3 : width < 620 ? 2 : 1;

  const onPointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio =
      (event.clientX - rect.left - pad.left) / (plotW || 1);
    const index = Math.round(ratio * (labels.length - 1));
    setActive(Math.min(labels.length - 1, Math.max(0, index)));
  };

  const readout =
    active === null
      ? null
      : `${fullLabels?.[active] ?? labels[active]}: ${series
          .map((s) => `${s.label} ${money(s.values[active])}`)
          .join(", ")}`;

  return (
    <div className={className}>
      {withLegend ? (
        <Legend
          items={series.map((s) => ({ label: s.label, color: s.color }))}
          className="mb-3"
        />
      ) : null}

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
                {series.map((s) => (
                  <th key={s.key} scope="col">
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {labels.map((label, i) => (
                <tr key={`${label}-${i}`}>
                  <th scope="row">{fullLabels?.[i] ?? label}</th>
                  {series.map((s) => (
                    <td key={s.key}>{money(s.values[i])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </>
        }
        className="rounded-xs"
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
            onPointerMove={onPointerMove}
            onPointerLeave={() => setActive(null)}
          >
            <Gridlines values={ticks} x0={pad.left} x1={width - pad.right} y={y} />

            {ticks.map((tick) => (
              <AxisLabel key={tick} x={pad.left - 10} y={y(tick) + 3} anchor="end">
                {tick === 0 ? "0" : moneyCompact(tick)}
              </AxisLabel>
            ))}

            {/* End labels are anchored inward so neither clips off the
                edge of the plot. */}
            {labels.map((label, i) =>
              i % labelStep === 0 || i === labels.length - 1 ? (
                <AxisLabel
                  key={`${label}-${i}`}
                  x={x(i)}
                  y={height - 8}
                  anchor={
                    i === 0
                      ? "start"
                      : i === labels.length - 1
                        ? "end"
                        : "middle"
                  }
                >
                  {label}
                </AxisLabel>
              ) : null,
            )}

            {/* A wash only when there is a single series. With two, the
                fills stack below the lower line and collapse into a muddy
                grey block — so a comparison chart gets lines only, which is
                also the easier read. */}
            {series.length === 1
              ? series.map((s) => {
                  const points = s.values.map((v, i) => ({
                    x: x(i),
                    y: y(v),
                  }));
                  return (
                    <path
                      key={`${s.key}-area`}
                      d={areaPath(points, baseline)}
                      fill={s.color}
                      opacity={0.1}
                    />
                  );
                })
              : null}

            {active !== null ? (
              <line
                x1={x(active)}
                x2={x(active)}
                y1={pad.top}
                y2={baseline}
                stroke="var(--color-rule-strong)"
                strokeWidth={1}
                aria-hidden="true"
              />
            ) : null}

            {series.map((s) => {
              const points = s.values.map((v, i) => ({ x: x(i), y: y(v) }));
              return (
                <path
                  key={`${s.key}-line`}
                  d={linePath(points)}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })}

            {/* End marker on the latest point: the figure the reader cares
                about most, labelled without cluttering every other point. */}
            {series.map((s) => (
              <circle
                key={`${s.key}-end`}
                cx={x(s.values.length - 1)}
                cy={y(s.values[s.values.length - 1])}
                r={4}
                fill={s.color}
                stroke="var(--color-card)"
                strokeWidth={2}
              />
            ))}

            {active !== null
              ? series.map((s) => (
                  <circle
                    key={`${s.key}-active`}
                    cx={x(active)}
                    cy={y(s.values[active])}
                    r={4.5}
                    fill={s.color}
                    stroke="var(--color-card)"
                    strokeWidth={2}
                  />
                ))
              : null}
          </svg>
          ) : null}

          {active !== null && width > 0 ? (
            <Tooltip
              x={x(active)}
              y={Math.min(...series.map((s) => y(s.values[active])))}
              containerWidth={width}
            >
              <TooltipHeading>
                {fullLabels?.[active] ?? labels[active]}
              </TooltipHeading>
              {series.map((s) => (
                <TooltipRow
                  key={s.key}
                  color={series.length > 1 ? s.color : undefined}
                  label={s.label}
                  value={money(s.values[active])}
                />
              ))}
            </Tooltip>
          ) : null}
        </div>
      </ChartFrame>

      <p className="mt-2 text-[0.75rem] text-muted">
        Max {moneyCompact(max)}. Hover or use the arrow keys for monthly
        figures.
      </p>
    </div>
  );
}

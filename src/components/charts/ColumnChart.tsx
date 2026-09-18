"use client";

import {
  AxisLabel,
  BarPath,
  ChartFrame,
  Gridlines,
  Legend,
  Tooltip,
  TooltipHeading,
  TooltipRow,
  niceMax,
  scale,
  ticksTo,
  useActiveIndex,
  useMeasuredWidth,
} from "./chart-kit";
import { money, moneyCompact } from "@/lib/demo";

export type ColumnGroup = {
  label: string;
  full: string;
  values: number[];
};

/**
 * Grouped columns — money in beside money out, one pair per month.
 *
 * The pair colours were validated for protan/deutan separation, and the two
 * columns of a pair are separated by a gap in the surface colour rather than
 * a stroke, which is what keeps the chart from looking outlined.
 */
export function ColumnChart({
  groups,
  series,
  height = 260,
  title,
  summary,
  className = "",
}: {
  groups: ColumnGroup[];
  series: { key: string; label: string; color: string }[];
  height?: number;
  title: string;
  summary: string;
  className?: string;
}) {
  const [box, width] = useMeasuredWidth();
  const { active, setActive, onKeyDown } = useActiveIndex(groups.length);

  const pad = { top: 14, right: 12, bottom: 26, left: 44 };
  const plotW = Math.max(0, width - pad.left - pad.right);
  const plotH = Math.max(0, height - pad.top - pad.bottom);
  const baseline = pad.top + plotH;

  const max = niceMax(Math.max(...groups.flatMap((g) => g.values)));
  const y = scale([0, max], [baseline, pad.top]);
  const ticks = ticksTo(max, 4);

  const band = plotW / groups.length;
  const gap = 2; /* the surface gap between the two columns of a pair */
  /* Columns are capped at 24px and never fill their band: the leftover is air. */
  const barW = Math.min(
    24,
    Math.max(3, (band * 0.62 - gap) / series.length),
  );
  const groupW = barW * series.length + gap * (series.length - 1);
  const groupX = (i: number) => pad.left + band * i + (band - groupW) / 2;

  const labelStep = width < 420 ? 3 : width < 620 ? 2 : 1;

  const readout =
    active === null
      ? null
      : `${groups[active].full}: ${series
          .map((s, si) => `${s.label} ${money(groups[active].values[si])}`)
          .join(", ")}`;

  return (
    <div className={className}>
      <Legend
        items={series.map((s) => ({ label: s.label, color: s.color }))}
        className="mb-3"
      />

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
              {groups.map((g) => (
                <tr key={g.full}>
                  <th scope="row">{g.full}</th>
                  {g.values.map((v, i) => (
                    <td key={series[i].key}>{money(v)}</td>
                  ))}
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
            <Gridlines
              values={ticks}
              x0={pad.left}
              x1={width - pad.right}
              y={y}
            />

            {ticks.map((tick) => (
              <AxisLabel
                key={tick}
                x={pad.left - 10}
                y={y(tick) + 3}
                anchor="end"
              >
                {tick === 0 ? "0" : moneyCompact(tick)}
              </AxisLabel>
            ))}

            {groups.map((group, i) => (
              <g key={group.full}>
                {/* A full-band hit area: the target is larger than the mark,
                    so thin columns are still easy to hover. */}
                <rect
                  x={pad.left + band * i}
                  y={pad.top}
                  width={band}
                  height={plotH}
                  fill={active === i ? "var(--color-paper-2)" : "transparent"}
                  onPointerEnter={() => setActive(i)}
                />
                {group.values.map((value, si) => (
                  <BarPath
                    key={series[si].key}
                    x={groupX(i) + si * (barW + gap)}
                    y={y(value)}
                    width={barW}
                    height={baseline - y(value)}
                    fill={series[si].color}
                    radius={3}
                  />
                ))}
              </g>
            ))}

            {/* The baseline is the one axis line the chart needs. */}
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={baseline}
              y2={baseline}
              stroke="var(--color-rule-strong)"
              strokeWidth={1}
              shapeRendering="crispEdges"
            />

            {groups.map((group, i) =>
              i % labelStep === 0 || i === groups.length - 1 ? (
                <AxisLabel
                  key={`${group.label}-${i}`}
                  x={pad.left + band * i + band / 2}
                  y={height - 8}
                >
                  {group.label}
                </AxisLabel>
              ) : null,
            )}
          </svg>
          ) : null}

          {active !== null && width > 0 ? (
            <Tooltip
              x={pad.left + band * active + band / 2}
              y={Math.min(...groups[active].values.map(y))}
              containerWidth={width}
            >
              <TooltipHeading>{groups[active].full}</TooltipHeading>
              {series.map((s, si) => (
                <TooltipRow
                  key={s.key}
                  color={s.color}
                  label={s.label}
                  value={money(groups[active].values[si])}
                />
              ))}
              <TooltipRow
                label="Net"
                value={money(
                  groups[active].values[0] - (groups[active].values[1] ?? 0),
                )}
              />
            </Tooltip>
          ) : null}
        </div>
      </ChartFrame>
    </div>
  );
}

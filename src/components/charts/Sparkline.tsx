/**
 * A six-point sparkline for the metric tiles.
 *
 * Fixed pixel dimensions rather than a stretched viewBox, so the 1.75px
 * stroke stays exactly that at every breakpoint. No axes, no labels, no
 * interaction: it exists to give a headline figure a direction, and the tile
 * states the change in words beside it.
 *
 * A server component — there is nothing to hydrate.
 */
export function Sparkline({
  values,
  color = "var(--color-chart-in)",
  width = 76,
  height = 26,
  className = "",
}: {
  values: number[];
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  if (values.length < 2) return null;

  const pad = 3;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  const points = values.map((value, i) => ({
    x: pad + ((width - pad * 2) / (values.length - 1)) * i,
    y: height - pad - ((value - min) / span) * (height - pad * 2),
  }));

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");

  const last = points[points.length - 1];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
      className={`overflow-visible ${className}`}
    >
      <path
        d={`${line} L${last.x.toFixed(1)},${height} L${points[0].x.toFixed(1)},${height} Z`}
        fill={color}
        opacity={0.1}
      />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={last.x}
        cy={last.y}
        r={2.5}
        fill={color}
        stroke="var(--color-card)"
        strokeWidth={1.5}
      />
    </svg>
  );
}

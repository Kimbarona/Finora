"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ==========================================================================
   Shared chart plumbing
   --------------------------------------------------------------------------
   Every chart on this page is real SVG driven by the demo dataset, sized in
   actual pixels rather than stretched with `preserveAspectRatio`. Stretching
   a viewBox is what makes most hand-rolled charts look cheap: strokes go
   elliptical and text distorts. Measuring the container instead keeps a 2px
   line exactly 2px at every breakpoint.

   The accessibility contract is the same for all of them:
     - the SVG is `role="img"` with a written summary,
     - the same data is always available as a real table for screen readers,
     - hover works with a pointer, and arrow keys do the same job for
       keyboard users, with the read-out mirrored into a live region.
   ========================================================================== */

/**
 * Measures the rendered width of a container, re-measuring on resize.
 *
 * Starts at 0 deliberately. An earlier version seeded a fallback width so
 * the chart could render on the server, and that created a feedback loop: a
 * 720px SVG widened the grid column that was supposed to be measuring it, so
 * the chart measured its own overflow and the page scrolled sideways on a
 * phone. Nothing inside the box may contribute to the box's width, so the
 * SVG is only rendered once a real measurement exists — `useLayoutEffect`
 * takes that measurement before paint, so there is no visible flash.
 */
export function useMeasuredWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => {
      const next = node.getBoundingClientRect().width;
      if (next > 0) setWidth(next);
    };

    measure();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
}

/** Linear scale, the only one these charts need. */
export function scale(
  domain: readonly [number, number],
  range: readonly [number, number],
) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const span = d1 - d0 || 1;
  return (value: number) => r0 + ((value - d0) / span) * (r1 - r0);
}

/** A rounded "nice" upper bound so gridlines land on readable numbers. */
export function niceMax(value: number, ticks = 4) {
  if (value <= 0) return ticks;
  const rough = value / ticks;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 2.5, 5, 10]
    .map((m) => m * magnitude)
    .find((s) => s >= rough);
  return (step ?? magnitude * 10) * ticks;
}

export function ticksTo(max: number, count = 4) {
  return Array.from({ length: count + 1 }, (_, i) => (max / count) * i);
}

/* -------------------------------------------------------------------------- */
/* Keyboard + pointer index tracking                                           */
/* -------------------------------------------------------------------------- */

/**
 * One source of truth for "which data point is the reader looking at".
 *
 * A pointer sets it by position; arrow keys step it. Both paths end up in the
 * same state, so the tooltip, the highlight and the live region can never
 * disagree with each other.
 */
export function useActiveIndex(count: number) {
  const [active, setActive] = useState<number | null>(null);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (count === 0) return;
      const { key } = event;

      if (key === "ArrowRight" || key === "ArrowLeft") {
        event.preventDefault();
        setActive((current) => {
          if (current === null) return key === "ArrowRight" ? 0 : count - 1;
          const next = current + (key === "ArrowRight" ? 1 : -1);
          return Math.min(count - 1, Math.max(0, next));
        });
        return;
      }

      if (key === "Home") {
        event.preventDefault();
        setActive(0);
        return;
      }

      if (key === "End") {
        event.preventDefault();
        setActive(count - 1);
        return;
      }

      if (key === "Escape") {
        setActive(null);
      }
    },
    [count],
  );

  return { active, setActive, onKeyDown } as const;
}

/** Announces the active point to screen readers without moving focus. */
export function LiveReadout({ text }: { text: string | null }) {
  return (
    <span aria-live="polite" aria-atomic="true" className="sr-only">
      {text ?? ""}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Chart shell                                                                 */
/* -------------------------------------------------------------------------- */

export function ChartFrame({
  title,
  summary,
  children,
  tableCaption,
  table,
  className = "",
  onKeyDown,
  readout,
}: {
  title: string;
  summary: string;
  children: ReactNode;
  tableCaption: string;
  table: ReactNode;
  className?: string;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  readout?: string | null;
}) {
  return (
    <div
      className={`relative ${className}`}
      tabIndex={0}
      role="group"
      aria-label={`${title}. ${summary} Use the arrow keys to read each value.`}
      onKeyDown={onKeyDown}
    >
      {children}
      <LiveReadout text={readout ?? null} />

      {/* The same data as a real table, for screen readers — and, via the
          noscript rule in the layout, for anyone without JavaScript, since
          the SVG needs a measurement to render.

          The wrapper carries `sr-only` rather than the table: a table treats
          `width: 1px` as a minimum and expands to fit its content, so
          hiding one directly leaves a 1100px box overflowing the page. */}
      <div className="sr-only" data-chart-table>
        <table>
          <caption>{tableCaption}</caption>
          {table}
        </table>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Tooltip                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Tooltips are positioned by data coordinate rather than by cursor, so the
 * same component serves pointer and keyboard readers identically.
 */
export function Tooltip({
  x,
  y,
  containerWidth,
  children,
}: {
  x: number;
  y: number;
  containerWidth: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [below, setBelow] = useState(false);

  /* Keep the card inside the chart box rather than letting it clip, and flip
     it under the point when the point sits too close to the top — otherwise
     a tooltip on a tall column covers the legend above the plot. */
  useEffect(() => {
    const node = ref.current;
    if (!node || containerWidth === 0) return;

    const half = node.offsetWidth / 2;
    const min = 4;
    const max = containerWidth - 4;
    let shift = 0;
    if (x - half < min) shift = min - (x - half);
    if (x + half > max) shift = max - (x + half);
    setOffset(shift);

    setBelow(y - node.offsetHeight - 10 < 0);
  }, [x, y, containerWidth, children]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 w-max max-w-[15rem] -translate-x-1/2 rounded-xs border border-rule-strong bg-card px-3 py-2 shadow-[0_6px_20px_-6px_rgba(22,33,29,0.28)] ${
        below ? "" : "-translate-y-full"
      }`}
      style={{ left: x + offset, top: below ? y + 14 : y - 10 }}
    >
      {children}
    </div>
  );
}

export function TooltipHeading({ children }: { children: ReactNode }) {
  return (
    <p className="label-mono mb-1.5 text-muted">{children}</p>
  );
}

export function TooltipRow({
  color,
  label,
  value,
}: {
  color?: string;
  label: string;
  value: string;
}) {
  return (
    <p className="flex items-center gap-2 text-[0.8125rem] leading-6 text-ink">
      {color ? (
        <span
          aria-hidden="true"
          className="h-2 w-2 shrink-0 rounded-[1px]"
          style={{ backgroundColor: color }}
        />
      ) : null}
      <span className="text-body">{label}</span>
      <span className="figure-mono ml-auto font-medium text-ink">{value}</span>
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Legend                                                                      */
/* -------------------------------------------------------------------------- */

/** Present whenever a chart carries two or more series. */
export function Legend({
  items,
  className = "",
}: {
  items: { label: string; color: string }[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-1.5 ${className}`}>
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-center gap-2 text-[0.8125rem] text-body"
        >
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0 rounded-[1px]"
            style={{ backgroundColor: item.color }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Grid                                                                       */
/* -------------------------------------------------------------------------- */

export function Gridlines({
  values,
  x0,
  x1,
  y,
  stroke = "var(--color-chart-grid)",
}: {
  values: number[];
  x0: number;
  x1: number;
  y: (value: number) => number;
  stroke?: string;
}) {
  return (
    <g aria-hidden="true">
      {values.map((value) => (
        <line
          key={value}
          x1={x0}
          x2={x1}
          y1={y(value)}
          y2={y(value)}
          stroke={stroke}
          strokeWidth={1}
          shapeRendering="crispEdges"
        />
      ))}
    </g>
  );
}

/** Axis text. Kept in an ink token, never in a series colour. */
export function AxisLabel({
  x,
  y,
  anchor = "middle",
  children,
  dim = false,
}: {
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
  children: ReactNode;
  dim?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={`fill-current ${dim ? "text-muted/70" : "text-muted"}`}
      style={{
        font: "500 10px/1 var(--font-mono)",
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </text>
  );
}

/**
 * A rounded data-end bar: square where it meets the baseline, 4px radius at
 * the value end. Written as a path because `rx` on a `<rect>` rounds all four
 * corners, which reads as a floating pill rather than a measured column.
 */
export function BarPath({
  x,
  y,
  width,
  height,
  fill,
  radius = 4,
  direction = "up",
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  radius?: number;
  direction?: "up" | "down" | "right";
}) {
  if (height <= 0 || width <= 0) return null;
  const r = Math.max(0, Math.min(radius, width / 2, height));

  let d: string;
  if (direction === "up") {
    d = `M${x},${y + height} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${y + height} Z`;
  } else if (direction === "down") {
    const bottom = y + height;
    d = `M${x},${y} L${x},${bottom - r} Q${x},${bottom} ${x + r},${bottom} L${x + width - r},${bottom} Q${x + width},${bottom} ${x + width},${bottom - r} L${x + width},${y} Z`;
  } else {
    const right = x + width;
    d = `M${x},${y} L${right - r},${y} Q${right},${y} ${right},${y + r} L${right},${y + height - r} Q${right},${y + height} ${right - r},${y + height} L${x},${y + height} Z`;
  }

  return <path d={d} fill={fill} />;
}

/** Builds an SVG path through a set of points. */
export function linePath(points: { x: number; y: number }[]) {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(" ");
}

export function areaPath(
  points: { x: number; y: number }[],
  baseline: number,
) {
  if (points.length === 0) return "";
  const first = points[0];
  const last = points[points.length - 1];
  return `${linePath(points)} L${last.x.toFixed(2)},${baseline} L${first.x.toFixed(2)},${baseline} Z`;
}

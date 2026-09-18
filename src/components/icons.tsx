import type { SVGProps } from "react";

/**
 * One icon family for the whole page.
 *
 * All glyphs share a 24px box, a 1.6px stroke and round joins. The thin
 * stroke is deliberate: at the weights used here it reads as drafting-line
 * rather than app-chrome, which keeps the page on the premium side of
 * "financial software".
 *
 * Icons are decorative wherever they sit beside a text label, so the shared
 * wrapper marks them `aria-hidden` and callers do not have to remember to.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Glyph({ children, className = "", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Wordmark                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Finora wordmark: a serif "Finora" set beside a mark built from three rising
 * bars enclosed by a bracket — a ledger column that also reads as growth.
 */
export function Wordmark({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const ink = tone === "dark" ? "#ffffff" : "var(--color-ink)";
  const mark = tone === "dark" ? "#e0a96a" : "var(--color-forest)";
  const rise = tone === "dark" ? "#ffffff" : "var(--color-copper-bright)";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 28 28"
        width="28"
        height="28"
        aria-hidden="true"
        focusable="false"
        className="shrink-0"
      >
        <rect x="0.5" y="0.5" width="27" height="27" rx="6.5" fill={mark} />
        <rect x="7" y="15.5" width="3" height="5.5" rx="1" fill={rise} />
        <rect
          x="12.5"
          y="11.5"
          width="3"
          height="9.5"
          rx="1"
          fill="#ffffff"
          opacity="0.92"
        />
        <rect x="18" y="7" width="3" height="14" rx="1" fill="#ffffff" />
      </svg>
      <span
        className="font-serif text-[1.375rem] leading-none font-semibold tracking-[-0.02em]"
        style={{ color: ink }}
      >
        Finora
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Icon set                                                                    */
/* -------------------------------------------------------------------------- */

const glyphs = {
  /* Product / feature glyphs */
  cashflow: (
    <>
      <path d="M3 8h13" />
      <path d="m13 5 3 3-3 3" />
      <path d="M21 16H8" />
      <path d="m11 13-3 3 3 3" />
    </>
  ),
  receipt: (
    <>
      <path d="M5 3h14v17.5l-3.5-2-3.5 2-3.5-2L5 20.5z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
    </>
  ),
  insight: (
    <>
      <path d="M12 3a6 6 0 0 0-3.5 10.9V17h7v-3.1A6 6 0 0 0 12 3Z" />
      <path d="M10 20h4" />
    </>
  ),
  report: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 16.5v-3" />
      <path d="M12 16.5v-5.5" />
      <path d="M14.5 16.5v-2" />
    </>
  ),
  bell: (
    <>
      <path d="M6.5 10a5.5 5.5 0 0 1 11 0c0 3.2.8 5 1.5 6h-14c.7-1 1.5-2.8 1.5-6Z" />
      <path d="M10 19.5a2.2 2.2 0 0 0 4 0" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M11 9v11" />
    </>
  ),

  /* Trust glyphs */
  shield: (
    <>
      <path d="M12 3 5 5.5v6c0 4.3 2.9 7.6 7 9.5 4.1-1.9 7-5.2 7-9.5v-6Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10" width="15" height="10.5" rx="2" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
      <path d="M12 14v2.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="13" r="4" />
      <path d="m11 11 8-8" />
      <path d="m16 4 2.5 2.5" />
      <path d="m19.5 6.5 1.5-1.5" />
    </>
  ),

  /* Process glyphs */
  connect: (
    <>
      <path d="M9.5 14.5 6.8 17.2a3.3 3.3 0 0 1-4.7-4.7l2.7-2.7" />
      <path d="m14.5 9.5 2.7-2.7a3.3 3.3 0 0 1 4.7 4.7l-2.7 2.7" />
      <path d="m9.5 14.5 5-5" />
    </>
  ),
  organize: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h10" />
      <path d="M4 18h6" />
      <circle cx="18.5" cy="16.5" r="3" />
    </>
  ),
  understand: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="m7 15 4-4.5 3.5 2.5L20 6" />
    </>
  ),
  act: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m9 12 2.2 2.2L15.5 9.5" />
    </>
  ),

  /* Benefit / outcome glyphs */
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.8 9.2-1.6 4-4 1.6 1.6-4Z" />
    </>
  ),
  scales: (
    <>
      <path d="M12 4v16" />
      <path d="M7 20h10" />
      <path d="M4 8h16" />
      <path d="M4 8l-2 4.5a3.2 3.2 0 0 0 4 0Z" />
      <path d="M20 8l2 4.5a3.2 3.2 0 0 1-4 0Z" />
    </>
  ),
  steady: (
    <>
      <path d="M3.5 12h4l2.5-5 3.5 10 2.5-5h4.5" />
    </>
  ),

  /* Problem glyphs */
  scatter: (
    <>
      <rect x="3" y="3.5" width="7" height="6" rx="1.5" />
      <rect x="14" y="6" width="7" height="6" rx="1.5" />
      <rect x="4.5" y="14" width="7" height="6" rx="1.5" />
      <path d="M16 16.5h5" strokeDasharray="1 2.6" />
    </>
  ),
  spreadsheet: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="1.5" />
      <path d="M3.5 9.5h17" />
      <path d="M9.5 9.5V20" />
      <path d="M15 9.5V20" />
      <path d="M3.5 15h17" />
    </>
  ),
  fog: (
    <>
      <path d="M4 8h9" />
      <path d="M15 8h5" strokeDasharray="1 2.6" />
      <path d="M4 12.5h5" strokeDasharray="1 2.6" />
      <path d="M11 12.5h9" />
      <path d="M4 17h12" strokeDasharray="1 2.6" />
    </>
  ),
  maze: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <path d="M8 3.5v9h4.5" />
      <path d="M20.5 8H16v12.5" />
      <path d="M3.5 16.5H12" />
    </>
  ),

  /* Utility */
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  arrowRight: (
    <>
      <path d="M4 12h15" />
      <path d="m13.5 6.5 5.5 5.5-5.5 5.5" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </>
  ),
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  chevronRight: <path d="m9.5 6 6 6-6 6" />,
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  trendUp: (
    <>
      <path d="m4 16.5 5.5-5.5 3.5 3L20 7" />
      <path d="M14.5 7H20v5.5" />
    </>
  ),
  trendDown: (
    <>
      <path d="m4 7.5 5.5 5.5 3.5-3L20 17" />
      <path d="M14.5 17H20v-5.5" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4.5 20h15" />
    </>
  ),
  filter: (
    <>
      <path d="M3.5 6h17" />
      <path d="M6.5 12h11" />
      <path d="M10 18h4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17" />
      <path d="M8 5V2.8" />
      <path d="M16 5V2.8" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4.5 2.8 20h18.4Z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </>
  ),
  users: (
    <>
      <circle cx="9.5" cy="8" r="3.5" />
      <path d="M3.5 20a6 6 0 0 1 12 0" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 5.6" />
      <path d="M17.5 14.6a6 6 0 0 1 3 5.4" />
    </>
  ),
  building: (
    <>
      <path d="M4 20V4.5h9V20" />
      <path d="M13 9.5h7V20" />
      <path d="M2.5 20h19" />
      <path d="M7 8h3" />
      <path d="M7 12.5h3" />
      <path d="M16 13h1.5" />
    </>
  ),
  bank: (
    <>
      <path d="M12 3.5 21 8H3Z" />
      <path d="M5.5 8v9" />
      <path d="M10 8v9" />
      <path d="M14 8v9" />
      <path d="M18.5 8v9" />
      <path d="M3 20.5h18" />
    </>
  ),
  sliders: (
    <>
      <path d="M5 4v6" />
      <path d="M5 14v6" />
      <circle cx="5" cy="12" r="2" />
      <path d="M12 4v10" />
      <path d="M12 18v2" />
      <circle cx="12" cy="16" r="2" />
      <path d="M19 4v2" />
      <path d="M19 10v10" />
      <circle cx="19" cy="8" r="2" />
    </>
  ),
  quote: (
    <>
      <path d="M9.5 6.5C6.5 8 5 10.3 5 13.2c0 2.6 1.4 4.3 3.4 4.3 1.8 0 3.1-1.3 3.1-3 0-1.8-1.2-3-2.9-3-.3 0-.6 0-.8.1.3-1.6 1.4-2.9 3.1-3.8Z" />
      <path d="M18.5 6.5C15.5 8 14 10.3 14 13.2c0 2.6 1.4 4.3 3.4 4.3 1.8 0 3.1-1.3 3.1-3 0-1.8-1.2-3-2.9-3-.3 0-.6 0-.8.1.3-1.6 1.4-2.9 3.1-3.8Z" />
    </>
  ),
} as const;

export type IconName = keyof typeof glyphs;

export function Icon({
  name,
  ...props
}: { name: IconName } & Omit<IconProps, "name">) {
  return <Glyph {...props}>{glyphs[name]}</Glyph>;
}

/* Named exports for the handful used directly in chrome and controls.
   `name` is excluded: SVGProps carries its own `name` attribute, which would
   otherwise let a spread quietly override the chosen glyph. */
type GlyphProps = Omit<IconProps, "name">;

export const MenuIcon = (p: GlyphProps) => <Icon name="menu" {...p} />;
export const CloseIcon = (p: GlyphProps) => <Icon name="close" {...p} />;
export const ChevronDownIcon = (p: GlyphProps) => (
  <Icon name="chevronDown" {...p} />
);
export const ArrowRightIcon = (p: GlyphProps) => (
  <Icon name="arrowRight" {...p} />
);
export const CheckIcon = (p: GlyphProps) => <Icon name="check" {...p} />;

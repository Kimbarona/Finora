import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet" | "onDark" | "onDarkGhost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-medium " +
  "whitespace-nowrap transition-[background-color,border-color,box-shadow,color] " +
  "duration-200 ease-out select-none";

/**
 * Forest green is the only action colour in the system. Copper is reserved
 * for editorial marks, which keeps the meaning of "this is clickable"
 * unambiguous on a page full of coloured financial figures.
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-white border border-forest " +
    "shadow-[0_1px_1px_rgba(7,32,26,0.16)] " +
    "hover:bg-forest-600 hover:border-forest-600 " +
    "hover:shadow-[0_2px_8px_rgba(7,32,26,0.2)]",
  secondary:
    "bg-card text-ink border border-rule-strong " +
    "hover:border-forest hover:text-forest hover:bg-paper",
  quiet:
    "bg-transparent text-ink border border-transparent " +
    "hover:border-rule-strong hover:bg-card",
  onDark:
    "bg-white text-forest border border-white hover:bg-copper-wash " +
    "hover:border-copper-wash",
  onDarkGhost:
    "bg-transparent text-white border border-white/30 " +
    "hover:border-white/60 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-[0.9375rem]",
  lg: "h-12 px-6 text-[1rem]",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * There is no signup backend in a portfolio build, so every CTA is an anchor
 * to a section of this page. Rendering a real `<a>` rather than a `<button>`
 * keeps the semantics honest for assistive technology.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <a
      className={[
        base,
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </a>
  );
}

/**
 * A text link with an arrow, used where a full button would be too loud —
 * inside cards and at the end of feature blocks.
 */
export function TextLink({
  children,
  className = "",
  tone = "light",
  ...props
}: {
  children: ReactNode;
  tone?: "light" | "dark";
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={[
        "group/link inline-flex items-center gap-1.5 text-[0.9375rem] font-medium",
        "underline decoration-1 underline-offset-[5px] transition-colors duration-150",
        tone === "dark"
          ? "text-copper-light decoration-copper-light/40 hover:decoration-copper-light"
          : "text-forest decoration-forest/30 hover:text-forest-600 hover:decoration-forest",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover/link:translate-x-0.5"
      >
        &rarr;
      </span>
    </a>
  );
}

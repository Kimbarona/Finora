import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Tone = "paper" | "tint" | "card" | "dark";

const tones: Record<Tone, string> = {
  paper: "bg-paper",
  tint: "bg-paper-2",
  card: "bg-card",
  dark: "bg-forest-950 text-[#c9d6d0] on-dark",
};

/**
 * Section shells carry the vertical rhythm and the four grounds the system
 * allows: paper, a deeper paper tint, white, and the forest band. Alternating
 * them is what gives the page its structure — there are no decorative
 * dividers anywhere in this design.
 */
export function Section({
  id,
  tone = "paper",
  bordered = false,
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  bordered?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={[
        tones[tone],
        bordered ? "border-t border-rule" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}

/**
 * The ledger index: a mono section number, a hairline, and the section label.
 *
 * This is the page's signature header device. It borrows the numbering of a
 * financial statement, which does two useful things: it tells a visitor where
 * they are in a long page, and it sets a serious, documentary tone that a
 * centred pill badge never would.
 */
export function LedgerIndex({
  index,
  eyebrow,
  tone = "light",
  className = "",
}: {
  index: string;
  eyebrow: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      <span
        className={`label-mono ${dark ? "text-copper-light" : "text-copper"}`}
      >
        {index}
      </span>
      <span
        aria-hidden="true"
        className={`h-px w-8 sm:w-12 ${dark ? "bg-white/25" : "bg-rule-strong"}`}
      />
      <span className={`label-mono ${dark ? "text-[#9fb0a9]" : "text-muted"}`}>
        {eyebrow}
      </span>
    </div>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  maxWidth = "max-w-2xl",
  className = "",
}: {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h2" | "h3";
  maxWidth?: string;
  className?: string;
}) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <Reveal
      className={[centered ? "mx-auto text-center" : "", maxWidth, className]
        .filter(Boolean)
        .join(" ")}
    >
      {index && eyebrow ? (
        <LedgerIndex
          index={index}
          eyebrow={eyebrow}
          tone={tone}
          className={`mb-5 ${centered ? "justify-center" : ""}`}
        />
      ) : eyebrow ? (
        <p
          className={`label-mono mb-5 ${dark ? "text-copper-light" : "text-copper"}`}
        >
          {eyebrow}
        </p>
      ) : null}

      <Heading className={`t-section ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </Heading>

      {intro ? (
        <p
          className={`mt-4 text-[1.0625rem] leading-[1.7] ${
            dark ? "text-[#c9d6d0]" : "text-body"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";

/**
 * Three small devices this page reuses.
 *
 * The distinction between them is editorial, not decorative: `Specimen` holds
 * words that appear on the live landing page, `Note` holds the writer's
 * commentary on them, and `Caveat` holds a statement about what has *not*
 * been proven. Keeping those three voices visually separate is what stops a
 * portfolio page from reading as if every idea on it had been validated.
 */

/** A framed sample of copy that appears verbatim on the landing page. */
export function Specimen({
  label,
  tone = "light",
  className = "",
  children,
}: {
  label: string;
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <figure
      className={[
        "relative rounded-panel border p-6 sm:p-8",
        dark
          ? "border-white/15 bg-white/[0.04]"
          : "border-rule-strong bg-card",
        className,
      ].join(" ")}
    >
      <figcaption
        className={`label-mono mb-5 flex items-center gap-3 ${
          dark ? "text-copper-light" : "text-copper"
        }`}
      >
        {label}
        <span
          aria-hidden="true"
          className={`h-px flex-1 ${dark ? "bg-white/20" : "bg-rule"}`}
        />
      </figcaption>
      {children}
    </figure>
  );
}

/** The writer's commentary: quieter than the copy it annotates. */
export function Note({
  tone = "light",
  className = "",
  children,
}: {
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <p
      className={[
        "flex items-start gap-2.5 text-[0.9375rem] leading-relaxed",
        dark ? "text-[#9fb0a9]" : "text-muted",
        className,
      ].join(" ")}
    >
      <Icon
        name="insight"
        className={`mt-1 h-4 w-4 shrink-0 ${
          dark ? "text-copper-light" : "text-copper-bright"
        }`}
      />
      <span>{children}</span>
    </p>
  );
}

/**
 * A statement about the limits of the work — untested variations, absent
 * results, claims the copy stays away from. Given a copper rule and a mono
 * label so it reads as a deliberate disclosure rather than as fine print.
 */
export function Caveat({
  label,
  surface = "tint",
  className = "",
  children,
}: {
  label: string;
  /** Pick the ground that is *not* the section's own, so the box lifts. */
  surface?: "tint" | "card";
  className?: string;
  children: ReactNode;
}) {
  return (
    <aside
      className={[
        "rounded-card border border-rule border-l-2 border-l-copper-bright p-5 sm:p-6",
        surface === "card" ? "bg-card" : "bg-paper-2",
        className,
      ].join(" ")}
    >
      <p className="label-mono text-copper">{label}</p>
      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
        {children}
      </p>
    </aside>
  );
}

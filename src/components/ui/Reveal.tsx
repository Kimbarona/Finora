import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Marks an element for the scroll-reveal treatment.
 *
 * Deliberately a *server* component: it only stamps `data-reveal` onto the
 * markup. One client observer (see RevealObserver) watches every marked
 * element on the page, so the whole effect costs a single small script
 * instead of turning each section into a client component.
 */
export function Reveal({
  as: Tag = "div" as ElementType,
  delay = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      data-reveal
      className={className}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

import { Icon } from "@/components/icons";

/**
 * A standing disclosure at the very top of the page.
 *
 * A fintech landing page makes claims that a visitor is entitled to read
 * literally, so the fact that this is a concept is stated once, up front,
 * before any of them. It is repeated in the security section, the hero
 * caption, the testimonials and the footer rather than hidden in small print
 * at the bottom.
 */
export function DemoNotice() {
  return (
    <div className="on-dark bg-forest-950 text-[#c9d6d0]">
      <div className="shell">
        <p className="flex items-center justify-center gap-2.5 py-2.5 text-center text-[0.75rem] leading-snug sm:text-[0.8125rem]">
          <Icon
            name="insight"
            className="hidden h-4 w-4 shrink-0 text-copper-light sm:block"
          />
          <span>
            <span className="label-mono mr-2 text-copper-light">
              Portfolio concept
            </span>
            Finora is a fictional product. All figures, transactions and
            testimonials are demonstration content.
          </span>
        </p>
      </div>
    </div>
  );
}

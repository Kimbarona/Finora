import Link from "next/link";
import { Icon, Wordmark } from "@/components/icons";
import { caseStudy } from "@/lib/case-study";
import { disclaimer, site } from "@/lib/content";

/**
 * Case-study chrome.
 *
 * Deliberately *not* the landing page header. A recruiter arriving here is
 * reading about the product rather than evaluating it, so the marketing nav
 * and its CTA would be noise — and adding a portfolio link to the product nav
 * would break the illusion of the landing page itself. What stays is the
 * wordmark, a mono tag naming what this document is, and one clear route back
 * to the page being discussed.
 */

export function BackLink({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <Link
      href="/"
      className={[
        "group inline-flex h-10 items-center gap-2 rounded-btn border px-4",
        "text-[0.9375rem] font-medium whitespace-nowrap",
        "transition-[background-color,border-color,color] duration-200 ease-out",
        dark
          ? "border-white/30 text-white hover:border-white/60 hover:bg-white/10"
          : "border-rule-strong bg-card text-ink hover:border-forest hover:bg-paper hover:text-forest",
        className,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
      >
        &larr;
      </span>
      {caseStudy.backLabel}
    </Link>
  );
}

export function CaseStudyHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/92 backdrop-blur-[10px]">
      <div className="shell">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.75rem]">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="rounded-xs"
              aria-label={`${site.name}, go to the landing page`}
            >
              <Wordmark />
            </Link>

            <span
              aria-hidden="true"
              className="hidden h-6 w-px bg-rule-strong sm:block"
            />

            <span className="label-mono hidden text-muted sm:block">
              {caseStudy.eyebrow}
            </span>
          </div>

          <BackLink className="max-sm:hidden" />

          {/* On narrow screens the full label will not fit beside the
              wordmark, so the same destination is offered as an icon link
              with a proper accessible name. */}
          <Link
            href="/"
            aria-label={caseStudy.backLabel}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-xs text-ink transition-colors duration-150 hover:bg-paper-2 sm:hidden"
          >
            <Icon name="arrowRight" className="h-5 w-5 rotate-180" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function CaseStudyFooter() {
  return (
    <footer className="border-t border-rule bg-paper-2">
      <div className="shell">
        <div className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between lg:py-14">
          <div className="max-w-md">
            <Wordmark />
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">
              {caseStudy.title} — {caseStudy.subtitle.toLowerCase()}.
            </p>
          </div>

          <BackLink className="self-start" />
        </div>

        <div className="border-t border-rule py-7">
          <p className="max-w-3xl text-[0.75rem] leading-relaxed text-muted">
            {disclaimer}
          </p>

          <p className="mt-5 text-[0.8125rem] text-muted">
            &copy; {new Date().getFullYear()} {site.name}. A conceptual product,
            built as a portfolio project.
          </p>
        </div>
      </div>
    </footer>
  );
}

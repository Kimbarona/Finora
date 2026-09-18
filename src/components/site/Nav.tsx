"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, Icon, MenuIcon, Wordmark } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { navLinks, site } from "@/lib/content";

/**
 * Sticky header.
 *
 * Two deliberate differences from a generic SaaS header: the hairline is
 * always present rather than fading in, because on a paper ground a floating
 * header with no edge reads as unfinished; and nav links are underlined on
 * hover in copper instead of gaining a pill, which keeps the chrome flat and
 * the copper accent consistent with the rest of the page.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* While the mobile sheet is open: lock scroll, close on Escape, close when
     the viewport grows past the breakpoint, and hand focus back to the
     button that opened it. */
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  /* Move focus into the sheet when it opens, so a keyboard user is not left
     tabbing through the page behind it. */
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
  }, [open]);

  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-rule bg-paper/92 backdrop-blur-[10px]"
    >
      <div className="shell">
        <div className="flex h-16 items-center justify-between gap-6 lg:h-[4.75rem]">
          <a
            href="#top"
            className="rounded-xs"
            aria-label="Finora, back to top of page"
          >
            <Wordmark />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="relative inline-flex h-9 items-center rounded-xs px-3 text-[0.9375rem] text-ink-soft transition-colors duration-150 after:absolute after:inset-x-3 after:bottom-1.5 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-copper-bright after:transition-transform after:duration-200 hover:text-ink hover:after:scale-x-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#top"
              className="inline-flex h-9 items-center rounded-xs px-2 text-[0.9375rem] text-ink-soft transition-colors duration-150 hover:text-forest"
            >
              {site.loginLabel}
            </a>
            <Button href="#cta">
              {site.primaryCta}
              <Icon name="arrowRight" className="h-4 w-4" />
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-xs text-ink transition-colors duration-150 hover:bg-paper-2 lg:hidden"
          >
            {open ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Scrim. Without it the page showed through beneath the open sheet,
          which reads as a glitch rather than as an overlay. Hidden from
          assistive technology — Escape and the toggle are the real controls,
          this is just a convenient tap target. */}
      <div
        aria-hidden="true"
        hidden={!open}
        onClick={() => setOpen(false)}
        className="fixed inset-0 top-16 -z-10 bg-ink/25 lg:hidden"
      />

      {/* Mobile sheet. Anchored under the header rather than to the viewport,
          so it stays attached whether or not the notice bar has scrolled away. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-rule bg-paper shadow-[0_18px_32px_-18px_rgba(22,33,29,0.25)] lg:hidden"
      >
        <div className="shell flex flex-col py-5">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.label} className="border-b border-rule">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex h-14 items-center justify-between gap-3 text-[1.0625rem] font-medium text-ink"
                  >
                    {link.label}
                    <Icon
                      name="chevronRight"
                      className="h-4 w-4 text-rule-strong"
                    />
                  </a>
                </li>
              ))}
              <li className="border-b border-rule">
                <a
                  href="#top"
                  onClick={() => setOpen(false)}
                  className="flex h-14 items-center text-[1.0625rem] font-medium text-ink"
                >
                  {site.loginLabel}
                </a>
              </li>
            </ul>
          </nav>

          <div className="mt-6 flex flex-col gap-2.5">
            <Button
              href="#cta"
              size="lg"
              fullWidth
              onClick={() => setOpen(false)}
            >
              {site.primaryCta}
            </Button>
            <Button
              href="#how-it-works"
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => setOpen(false)}
            >
              {site.secondaryCta}
            </Button>
          </div>

          <p className="mt-5 text-[0.8125rem] text-muted">
            Free to start. No card required.
          </p>
        </div>
      </div>
    </header>
  );
}

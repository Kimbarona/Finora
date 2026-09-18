import { Icon, Wordmark } from "@/components/icons";
import { disclaimer, footer, site } from "@/lib/content";

export function Footer() {
  return (
    <footer id="company" className="border-t border-rule bg-paper-2">
      <div className="shell">
        <div className="grid gap-10 py-14 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16 lg:py-16">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-[0.875rem] leading-relaxed text-body">
              {footer.blurb}
            </p>

            <p className="label-mono mt-6 flex items-center gap-2 text-muted">
              <Icon name="lock" className="h-3.5 w-3.5" />
              Built with security in mind
            </p>
          </div>

          <nav aria-label="Footer">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {footer.columns.map((column) => (
                <div key={column.heading}>
                  <h2 className="label-mono text-muted">
                    {column.heading}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="inline-block rounded-xs text-[0.875rem] text-ink-soft transition-colors duration-150 hover:text-forest hover:underline hover:decoration-1 hover:underline-offset-[5px]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="border-t border-rule py-7">
          <p className="max-w-3xl text-[0.75rem] leading-relaxed text-muted">
            {disclaimer}
          </p>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.8125rem] text-muted">
              &copy; {new Date().getFullYear()} {site.name}. A conceptual
              product, built as a portfolio project.
            </p>

            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footer.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="rounded-xs text-[0.8125rem] text-ink-soft transition-colors duration-150 hover:text-forest"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { site } from "@/lib/content";
import "./globals.css";

/**
 * Three voices, each with the minimum weights the design actually uses.
 * Serif for headlines, sans for interface and prose, mono for every figure
 * and label — which is what gives the page its financial register.
 */
const serif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  variable: "--font-source-serif",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Finora — Simple Financial Clarity for Your Business",
    template: "%s | Finora",
  },
  description:
    "Finora brings cash flow, expenses and revenue into one clear dashboard, so small business owners always know where they stand. Free to start, no card required. A conceptual portfolio project.",
  keywords: [
    "small business financial dashboard",
    "cash flow tracking software",
    "expense management for small business",
    "financial reporting for founders",
    "business finance insights",
    "cash flow visibility",
  ],
  authors: [{ name: "Finora" }],
  creator: "Finora",
  applicationName: "Finora",
  category: "finance",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "Finora",
    locale: "en_US",
    title: "Finora — Know your numbers. Grow with confidence.",
    description:
      "One clear view of cash flow, expenses and financial performance for small businesses. A conceptual fintech product built as a portfolio project.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finora — Simple Financial Clarity for Your Business",
    description:
      "Cash flow, expenses and revenue in one clear dashboard. Free to start, no card required. A conceptual portfolio project.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07201a",
  colorScheme: "light",
};

/**
 * Structured data for the concept.
 *
 * Deliberately omits `aggregateRating` and `review`: inventing social-proof
 * markup for a fictional product would be dishonest to both readers and
 * search engines, and it is the kind of thing rich-result guidelines exist to
 * prevent. The `disambiguatingDescription` states plainly what this is.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Finora",
  applicationCategory: "FinanceApplication",
  applicationSubCategory: "Financial dashboard",
  operatingSystem: "Web",
  description: site.description,
  disambiguatingDescription:
    "Finora is a conceptual product created as a design portfolio project. It is not a commercial service and is not connected to any financial institution.",
  url: site.url,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description:
      "Starter plan, free to use. Illustrative pricing for a concept product.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="antialiased">
        {/* Without JavaScript: reveal every section (the classes would
            otherwise leave the page invisible), and promote each chart's
            data table from screen-reader-only to visible, since the SVG
            needs a client measurement before it can draw. The figures stay
            available either way. */}
        <noscript>
          <style>{`
            [data-reveal]{opacity:1!important;transform:none!important}
            [data-chart-table]{position:static!important;width:auto!important;
              height:auto!important;margin:0!important;overflow:auto!important;
              clip-path:none!important;white-space:normal!important}
            [data-chart-table] table{width:100%;font-size:.8125rem;
              border-collapse:collapse}
            [data-chart-table] caption{text-align:left;padding-bottom:.5rem;
              color:#5c6a64;font-size:.75rem}
            [data-chart-table] th,[data-chart-table] td{border-bottom:1px solid
              #e4dfd5;padding:.375rem .5rem;text-align:right}
            [data-chart-table] th:first-child,
            [data-chart-table] td:first-child{text-align:left}
          `}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only rounded-btn focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-forest focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>

        {children}

        <RevealObserver />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

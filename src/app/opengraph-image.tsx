import { ImageResponse } from "next/og";
import { money, monthly } from "@/lib/demo";

export const alt =
  "Finora — know your numbers, grow with confidence. A clear view of cash flow, expenses and financial performance for small businesses.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Fetches a Google font as raw bytes for the image renderer.
 *
 * The renderer behind `ImageResponse` cannot resolve generic keywords like
 * `serif`, and once any font is supplied it stops falling back to its own
 * built-in sans — so the card has to bring all three of the page's voices or
 * none of them.
 */
async function loadFont(family: string, text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`,
    { headers: { "User-Agent": "Mozilla/5.0" } },
  ).then((r) => r.text());

  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
  if (!url) throw new Error(`No font file for ${family}`);
  return fetch(url[1]).then((r) => r.arrayBuffer());
}

/* The whole printable ASCII range, rather than the exact strings drawn.
   Subsetting to the literal copy leaves gaps — a character the subset missed
   silently falls back to whichever other loaded face happens to have it,
   which shows up as a word or two in the wrong typeface. At build time the
   extra kilobytes cost nothing. */
const ASCII = Array.from({ length: 95 }, (_, i) =>
  String.fromCharCode(32 + i),
).join("");

/* Read from the demo dataset, like every other figure on the site, so the
   social card cannot drift out of step with the page it previews. */
const current = monthly[monthly.length - 1];
const netCashFlow = `+${money(current.revenue - current.expenses)}`;
const netLabel = `NET CASH FLOW / ${current.month.toUpperCase()}`;

type LoadedFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 600;
  style: "normal";
};

/**
 * Social preview card, generated at build time so there is no binary asset to
 * keep in sync with the copy.
 *
 * Built on the paper ground rather than the dark band: in a feed of social
 * cards, almost all of which are dark with a gradient, warm paper with a
 * ruled ledger strip is what actually stops the scroll.
 */
export default async function OpengraphImage() {
  /* All three or none: a partial set would render some text in the wrong
     voice, which looks worse than the uniform built-in fallback. The card
     must also build with no network, so a failure degrades rather than
     throws. */
  let fonts: LoadedFont[] = [];
  try {
    const [serif, sans, mono] = await Promise.all([
      loadFont("Source+Serif+4:wght@600", ASCII),
      loadFont("IBM+Plex+Sans:wght@400", ASCII),
      loadFont("IBM+Plex+Mono:wght@500", ASCII),
    ]);
    fonts = [
      { name: "Source Serif 4", data: serif, weight: 600, style: "normal" },
      { name: "IBM Plex Sans", data: sans, weight: 400, style: "normal" },
      { name: "IBM Plex Mono", data: mono, weight: 500, style: "normal" },
    ];
  } catch {
    fonts = [];
  }

  const branded = fonts.length > 0;
  const serifStack = branded ? "Source Serif 4" : "sans-serif";
  const sansStack = branded ? "IBM Plex Sans" : "sans-serif";
  const monoStack = branded ? "IBM Plex Mono" : "monospace";

  const bars = [
    { height: 54, color: "#b4671f" },
    { height: 92, color: "#1d7357" },
    { height: 132, color: "#0e3b2d" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#faf8f4",
          padding: "68px 72px",
          fontFamily: sansStack,
        }}
      >
        {/* Header: mark, wordmark, and the concept label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 54,
              height: 54,
              borderRadius: 13,
              backgroundColor: "#0e3b2d",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: 4,
              paddingBottom: 14,
            }}
          >
            <div
              style={{
                width: 6,
                height: 11,
                borderRadius: 2,
                backgroundColor: "#b4671f",
              }}
            />
            <div
              style={{
                width: 6,
                height: 19,
                borderRadius: 2,
                backgroundColor: "#ffffff",
                opacity: 0.9,
              }}
            />
            <div
              style={{
                width: 6,
                height: 27,
                borderRadius: 2,
                backgroundColor: "#ffffff",
              }}
            />
          </div>

          <div
            style={{
              marginLeft: 18,
              fontSize: 36,
              color: "#16211d",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              fontFamily: serifStack,
            }}
          >
            Finora
          </div>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              fontFamily: monoStack,
              fontSize: 17,
              letterSpacing: "0.14em",
              color: "#96551a",
              border: "1px solid #d2cbbd",
              borderRadius: 4,
              padding: "8px 14px",
            }}
          >
            PORTFOLIO CONCEPT
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.04,
              color: "#16211d",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              fontFamily: serifStack,
            }}
          >
            Know your numbers.
          </div>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.04,
              color: "#0e3b2d",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              fontFamily: serifStack,
            }}
          >
            Grow with confidence.
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 28,
              lineHeight: 1.4,
              color: "#55635c",
              maxWidth: 820,
              fontFamily: sansStack,
            }}
          >
            Cash flow, expenses and revenue in one clear dashboard for small
            businesses.
          </div>
        </div>

        {/* Footer: a small ledger figure beside the demo figures */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
            borderTop: "1px solid #e4dfd5",
            paddingTop: 26,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: monoStack,
            }}
          >
            <div
              style={{
                fontSize: 15,
                letterSpacing: "0.14em",
                color: "#5c6a64",
              }}
            >
              {netLabel}
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 40,
                fontWeight: 500,
                color: "#16785a",
              }}
            >
              {netCashFlow}
            </div>
          </div>

          <div
            style={{
              marginLeft: 56,
              display: "flex",
              alignItems: "flex-end",
              gap: 10,
              height: 132,
            }}
          >
            {bars.map((bar) => (
              <div
                key={bar.height}
                style={{
                  width: 26,
                  height: bar.height,
                  borderRadius: "4px 4px 0 0",
                  backgroundColor: bar.color,
                }}
              />
            ))}
          </div>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              fontSize: 19,
              color: "#5c6a64",
              fontFamily: sansStack,
            }}
          >
            Demonstration figures only
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}

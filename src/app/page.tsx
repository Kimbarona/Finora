import { Benefits } from "@/components/site/Benefits";
import { DemoNotice } from "@/components/site/DemoNotice";
import { Faq } from "@/components/site/Faq";
import { Features } from "@/components/site/Features";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Nav } from "@/components/site/Nav";
import { Pricing } from "@/components/site/Pricing";
import { Problem } from "@/components/site/Problem";
import { Showcase } from "@/components/site/Showcase";
import { Solution } from "@/components/site/Solution";
import { Testimonials } from "@/components/site/Testimonials";
import { Trust } from "@/components/site/Trust";

/**
 * Section order answers a visitor's questions in the order a fintech visitor
 * asks them:
 *
 *   what is it (hero) → can I trust it with my money (security) → is this my
 *   problem (problem) → how is it solved (solution) → what does it do
 *   (features) → show me the real thing (showcase) → how hard is setup (how
 *   it works) → what changes for me (benefits) → who is it for (testimonials)
 *   → what does it cost (pricing) → what am I still unsure about (FAQ) →
 *   start (CTA).
 *
 * Security sits second rather than near the footer, which is the one ordering
 * decision on this page that is specific to finance: a visitor will not read
 * a feature list from a product they do not trust with their bank data.
 */
export default function Home() {
  return (
    <>
      <DemoNotice />
      <Nav />

      <main id="main">
        <Hero />
        <Trust />
        <Problem />
        <Solution />
        <Features />
        <Showcase />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}

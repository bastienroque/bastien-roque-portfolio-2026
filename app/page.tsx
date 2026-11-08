import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { LogicSection } from "@/components/sections/LogicSection";
import { StackSection } from "@/components/sections/StackSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { TransportBar } from "@/components/audio/TransportBar";
import { ModeGate } from "@/components/providers/ModeProvider";
import { PROFILE } from "@/lib/data/profile";
import { SITE_URL } from "@/lib/site";

// Structured data so search engines know who this site is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: PROFILE.role,
  url: SITE_URL,
  address: { "@type": "PostalAddress", addressLocality: PROFILE.location.split(",")[0] },
  sameAs: PROFILE.links.map((l) => l.href),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <HeroSection />
      <main id="main">
        <AboutSection />
        <ModeGate show="jam">
          <LogicSection />
        </ModeGate>
        <StackSection />
        <WorkSection />
        <ContactSection />
      </main>
      <ModeGate show="jam">
        <TransportBar />
      </ModeGate>
    </>
  );
}

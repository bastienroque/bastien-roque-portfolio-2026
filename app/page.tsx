import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StackSection } from "@/components/sections/StackSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { PROFILE } from "@/lib/data/profile";
import { SITE_URL } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: PROFILE.role,
  knowsAbout: [
    "Full-stack development",
    "Front-end",
    "Back-end",
    "Design",
    "Motion design",
  ],
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: PROFILE.location.split(",")[0],
  },
  sameAs: PROFILE.links.map((l) => l.href),
};

/** Projects first: a short intro, the work, then who I am and how I build. */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection />
      <main id="main">
        <WorkSection />
        <AboutSection />
        <StackSection />
        <ContactSection />
      </main>
    </>
  );
}

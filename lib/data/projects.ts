import { Project } from "../types";

// Frames are always 16:10, so the desktop recording serves every screen size.
const media = (dir: string, file: string) => ({
  src: `/projects/${dir}/${file}.desktop.mp4`,
});

export const PROJECTS: Project[] = [
  {
    slug: "cavaleiros-da-francesinha",
    title: "Cavaleiros da Francesinha",
    tagline: "A trilingual home for the francesinha community.",
    year: "2026",
    kind: "Client platform",
    role: "Solo developer & designer",
    color: "#E8A317",
    facts: [
      { label: "Client", value: "Cavaleiros da Francesinha" },
      { label: "Languages", value: "EN / PT / FR" },
      { label: "Industry", value: "Gourmet community" },
    ],
    context:
      "Cavaleiros da Francesinha is a gourmet community built around the francesinha. They needed a trilingual (EN/PT/FR) platform where members can discover restaurants, browse them on a map and read reviews, plus a back office to keep everything up to date. I designed and built it solo, from the public site to the admin dashboard used to manage restaurants and reviews.",
    challenges:
      "Three things made this more than a restaurant directory. The platform had to work natively in English, Portuguese and French, so I set up i18n with next-intl from day one instead of retrofitting it later. Content had to stay fresh without touching code, so I built a dedicated back office for restaurants and reviews. And a francesinha review needed to capture far more than a star rating: I built a structured review system with ingredient and tag matching, so reviews are comparable between restaurants, and reviewers can add a missing ingredient or tag without leaving the form.",
    stack: [
      {
        group: "Frontend & UI",
        items: [
          { label: "Framework", value: "Next.js / React" },
          { label: "Styling", value: "Tailwind CSS v4 & Base UI" },
          { label: "Maps", value: "Leaflet & MarkerCluster" },
          { label: "i18n", value: "next-intl" },
          { label: "Language", value: "TypeScript" },
        ],
      },
      {
        group: "Backend & data",
        items: [
          { label: "Database", value: "PostgreSQL (Supabase)" },
          { label: "ORM", value: "Drizzle" },
          { label: "Auth", value: "Supabase Auth" },
          { label: "Validation", value: "Zod & React Hook Form" },
          { label: "Email", value: "Resend" },
          { label: "Anti-spam", value: "Cloudflare Turnstile" },
        ],
      },
      {
        group: "Quality",
        items: [
          { label: "E2E testing", value: "Playwright" },
          { label: "Accessibility", value: "axe-core" },
          { label: "Code quality", value: "SonarQube" },
        ],
      },
    ],
    cover: {
      title: "Homepage",
      tag: "Homepage",
      ...media("cdf", "home"),
      alt: "Homepage of Cavaleiros da Francesinha, the entry point to a trilingual gourmet community dedicated to the francesinha.",
    },
    media: [
      {
        title: "Restaurant directory",
        tag: "Feature",
        ...media("cdf", "restaurants"),
        alt: "Visitors browsing the restaurants listed by the community.",
      },
      {
        title: "Interactive map",
        tag: "Feature",
        ...media("cdf", "map"),
        alt: "Restaurants plotted and clustered on an interactive map.",
      },
      {
        title: "Secure admin login",
        tag: "Admin",
        ...media("cdf", "admin-login-flow"),
        alt: "Administrators signing in to the back office.",
      },
      {
        title: "Admin dashboard",
        tag: "Admin",
        ...media("cdf", "admin-dashboard"),
        alt: "Admin dashboard giving an overview of the platform.",
      },
      {
        title: "Restaurant management",
        tag: "Admin",
        ...media("cdf", "admin-restaurants"),
        alt: "Administrators managing the restaurant listings.",
      },
      {
        title: "Review moderation",
        tag: "Admin",
        ...media("cdf", "admin-reviews"),
        alt: "Administrators moderating reviews.",
      },
    ],
    liveUrl: "https://www.cavaleirosdafrancesinha.com",
    repoUrl: "https://github.com/bastienroque/cdf",
  },
  {
    slug: "qui-le-demande",
    title: "Qui Le Demande ?",
    tagline: "A marketing agency site built to turn visitors into leads.",
    year: "2026",
    kind: "Client website",
    role: "Solo developer & designer",
    color: "#E8648C",
    facts: [
      { label: "Client", value: "Qui Le Demande ?" },
      { label: "Market", value: "France" },
      { label: "Industry", value: "Marketing" },
    ],
    context:
      "Qui Le Demande ? is a French marketing agency specialised in ads and web management. They needed a site that does more than look good: it has to convert visitors into leads. I built and shipped it solo, from the UI to the backend logic, including an interactive budget simulator so visitors can estimate a project themselves, a custom contact form with server-side validation, and GDPR-compliant cookie consent.",
    challenges:
      "The budget simulator and animated UI needed to feel premium without hurting load times, a real tension since Framer Motion and rich interactions can bloat a bundle fast. I kept the components modular and shared across the marketing pages, and moved form validation (Zod) and email sending (SendGrid) into Next.js Server Actions so none of that weight shipped to the client.",
    stack: [
      {
        group: "Frontend & UI",
        items: [
          { label: "Framework", value: "Next.js / React" },
          { label: "Styling", value: "Tailwind CSS v4" },
          { label: "Animation", value: "Framer Motion" },
          { label: "Language", value: "TypeScript" },
        ],
      },
      {
        group: "Backend & logic",
        items: [
          { label: "Architecture", value: "Next.js Server Actions" },
          { label: "Email", value: "SendGrid API" },
          { label: "Validation", value: "Zod" },
        ],
      },
      {
        group: "Infrastructure",
        items: [
          { label: "Analytics", value: "GTM & GA4" },
          { label: "Deployment", value: "Vercel & GitHub" },
          { label: "Domain", value: "Dynadot" },
        ],
      },
    ],
    cover: {
      title: "Homepage",
      tag: "Homepage",
      ...media("qui-le-demande", "hero"),
      alt: "Homepage of Qui Le Demande ?, a marketing agency for a French-speaking audience.",
    },
    media: [
      {
        title: "Interactive budget simulator",
        tag: "Feature",
        ...media("qui-le-demande", "simulator"),
        alt: "Visitors simulating their budget and seeing the estimate update live.",
      },
      {
        title: "Fully custom form",
        tag: "Feature",
        ...media("qui-le-demande", "contact"),
        alt: "Custom contact form with real-time validation and feedback.",
      },
      {
        title: "Compliance ready",
        tag: "Feature",
        ...media("qui-le-demande", "cookie-banner"),
        alt: "Cookie banner giving clear choices over cookie preferences.",
      },
      {
        title: "Services modal",
        tag: "Feature",
        ...media("qui-le-demande", "services"),
        alt: "Details about each service opening in an interactive modal.",
      },
    ],
    liveUrl: "https://www.quiledemande.fr/",
    repoUrl: "https://github.com/bastienroque/qui-le-demande",
  },
  {
    slug: "attestation-express",
    title: "Attestation Express",
    tagline: "Signed attestations without the paperwork.",
    year: "2026",
    kind: "Internal tool",
    role: "Solo developer & designer",
    color: "#16A394",
    facts: [
      { label: "Type", value: "Tooling" },
      { label: "Market", value: "France" },
      { label: "Industry", value: "Workshops" },
    ],
    context:
      "Attestation Express removes the paperwork from collecting signed attestations. An admin generates a unique link and sends it to the client, who signs the attestation directly from their own device, on desktop or mobile. I designed and built both the admin side and the client signing flow solo.",
    stack: [
      {
        group: "Frontend & UI",
        items: [
          { label: "Framework", value: "Next.js / React" },
          { label: "Styling", value: "Tailwind CSS v4" },
          { label: "Signature", value: "react-signature-canvas" },
          { label: "Language", value: "TypeScript" },
        ],
      },
      {
        group: "Backend & logic",
        items: [{ label: "PDF generation", value: "pdf-lib" }],
      },
    ],
    cover: {
      title: "Link generator",
      tag: "Admin",
      ...media("attestation-express", "admin-link-generator"),
      alt: "An admin creating a unique signing link to send to a client.",
    },
    media: [
      {
        title: "Client signing flow",
        tag: "Client",
        ...media("attestation-express", "client-signing-flow"),
        alt: "A client opening their link and signing the attestation.",
      },
    ],
    liveUrl: "https://attestation-express-six.vercel.app/",
    repoUrl: "https://github.com/bastienroque/attestation-express",
  },
  {
    slug: "random-fm",
    title: "Random FM",
    tagline: "One button, a random radio station from anywhere on Earth.",
    year: "2026",
    kind: "Personal project",
    role: "Solo developer & designer",
    color: "#5B63F0",
    facts: [
      { label: "Type", value: "Personal" },
      { label: "Industry", value: "Music" },
    ],
    context:
      "Random FM started because I wanted an easy way to discover music from around the world instead of scrolling the same playlists. I built it end to end: designed the UI, wired it to the Radio Browser API for station data, and used Postgres (Neon) with Prisma so users can save favourite stations, with Clerk handling auth so favourites persist per user.",
    challenges:
      "The Radio Browser API isn't always reliable: some stations are slow or fail entirely, and there's no guaranteed uptime. Early on that meant blank screens and long silent waits. I replaced those with toast notifications and graceful fallbacks, which kept the app feeling responsive even when the data source wasn't.",
    stack: [
      {
        group: "Frontend & UI",
        items: [
          { label: "Framework", value: "Next.js / React" },
          { label: "Styling", value: "Tailwind CSS v4" },
          { label: "Components", value: "shadcn/ui & Sonner" },
          { label: "Icons", value: "Lucide React" },
        ],
      },
      {
        group: "Backend & data",
        items: [
          { label: "Language", value: "TypeScript" },
          { label: "Database", value: "PostgreSQL (Neon)" },
          { label: "ORM", value: "Prisma" },
          { label: "API", value: "Radio Browser API" },
        ],
      },
      {
        group: "Infrastructure",
        items: [
          { label: "Auth", value: "Clerk" },
          { label: "Analytics", value: "GTM & GA4" },
          { label: "Deployment", value: "Vercel & GitHub" },
        ],
      },
    ],
    cover: {
      title: "Randomise",
      tag: "Feature",
      ...media("random-fm", "randomise-flow"),
      alt: "A single action jumping to a random radio station from around the world.",
    },
    media: [
      {
        title: "Filters",
        tag: "Feature",
        ...media("random-fm", "filters-exploration"),
        alt: "Filtering radio stations by genre and country.",
      },
      {
        title: "Favourite stations",
        tag: "Feature",
        ...media("random-fm", "login-flow"),
        alt: "Logging in and saving preferred stations for quick access.",
      },
      {
        title: "Light / dark theme",
        tag: "Feature",
        ...media("random-fm", "theme-toggle"),
        alt: "Switching between light and dark themes.",
      },
    ],
    liveUrl: "https://random-fm-app.vercel.app/",
    repoUrl: "https://github.com/bastienroque/random-fm",
  },
];

export const getProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

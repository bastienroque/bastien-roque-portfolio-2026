import { ProjectData } from "@/types";

export const projects_content: ProjectData[] = [
  // project 1
  {
    id: "cavaleiros-da-francesinha-details",
    slug: "cavaleiros-da-francesinha",
    label: "Cavaleiros da Francesinha",
    devType: "Full-stack",
    sections: [
      {
        type: "details",
        id: "cavaleiros-da-francesinha-details",
        badgeTitle: "Project Details",
        badgeVariant: "green",
        items: [
          { label: "Role", value: "Solo Developer & Designer" },
          { label: "Year", value: "2026" },
          { label: "Client", value: "Cavaleiros da Francesinha" },
          { label: "Country", value: "EN/PT/FR" },
          { label: "Industry", value: "Gourmet Community" },
        ],
      },
      {
        type: "media",
        id: "intro",
        items: [
          {
            kind: "video",
            badgeTitle: "Homepage",
            badgeVariant: "green",
            desktopSrc: "/projects/cdf/home.desktop.mp4",
            mobileSrc: "/projects/cdf/home.mobile.mp4",
            alt: "Homepage of Cavaleiros da Francesinha, the entry point to a trilingual gourmet community dedicated to the francesinha.",
          },
        ],
      },
      {
        type: "description",
        id: "context",
        badgeTitle: "Context",
        badgeVariant: "green",
        content:
          "Cavaleiros da Francesinha is a gourmet community built around the francesinha. They needed a trilingual (EN/PT/FR) platform where members can discover restaurants, browse them on a map and read reviews, plus a back office to keep everything up to date. I designed and built it solo, from the public site to the admin dashboard used to manage restaurants and reviews.",
      },
      {
        type: "cards",
        id: "tech-stack",
        cards: [
          {
            badgeTitle: "Frontend & UI",
            badgeVariant: "green",
            items: [
              { label: "Framework", value: "Next.js / React" },
              { label: "Styling", value: "Tailwind CSS v4 & Base UI" },
              { label: "Maps", value: "Leaflet & MarkerCluster" },
              { label: "i18n", value: "next-intl" },
              { label: "Language", value: "TypeScript" },
            ],
          },
          {
            badgeTitle: "Backend & Data",
            badgeVariant: "green",
            items: [
              { label: "Database", value: "PostgreSQL (Supabase)" },
              { label: "ORM", value: "Drizzle" },
              { label: "Authentication", value: "Supabase Auth" },
              { label: "Validation", value: "Zod & React Hook Form" },
              { label: "Email Service", value: "Resend" },
              { label: "Anti-spam", value: "Cloudflare Turnstile" },
            ],
          },
          {
            badgeTitle: "Quality",
            badgeVariant: "green",
            items: [
              { label: "E2E Testing", value: "Playwright" },
              { label: "Accessibility", value: "axe-core" },
            ],
          },
        ],
      },
      {
        type: "description",
        id: "challenges",
        badgeTitle: "Challenges",
        badgeVariant: "green",
        content:
          "Three things made this project more than a restaurant directory. First, the platform had to work natively in English, Portuguese and French, so I set up i18n with next-intl from day one. That keeps every page, form and review label translatable instead of having to retrofit it later. Second, content needed to stay fresh without touching code, so I built a dedicated back office to manage restaurants and reviews, separate from the public site. Third, a francesinha review had to capture much more than a star rating. I built a detailed review system with ingredient and tag matching, so reviews are structured and comparable between restaurants. Reviewers can also create a missing ingredient or tag on the spot instead of leaving the form.",
      },
      {
        type: "media",
        id: "feature1",
        items: [
          {
            kind: "video",
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Restaurant Directory"],
            desktopSrc: "/projects/cdf/restaurants.desktop.mp4",
            mobileSrc: "/projects/cdf/restaurants.mobile.mp4",
            alt: "Restaurants page of Cavaleiros da Francesinha, showing how visitors can browse the restaurants listed by the community.",
          },
        ],
      },
      {
        type: "media",
        id: "feature2",
        items: [
          {
            kind: "video",
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Interactive Map"],
            desktopSrc: "/projects/cdf/map.desktop.mp4",
            mobileSrc: "/projects/cdf/map.mobile.mp4",
            alt: "Map feature of Cavaleiros da Francesinha, showing restaurants plotted on an interactive map.",
          },
        ],
      },
      {
        type: "media",
        id: "feature3",
        items: [
          {
            kind: "video",
            badgeTitle: "Admin",
            badgeVariant: "green",
            overlayBadges: ["Secure Admin Login"],
            desktopSrc: "/projects/cdf/admin-login-flow.desktop.mp4",
            mobileSrc: "/projects/cdf/admin-login-flow.mobile.mp4",
            alt: "Admin login flow of Cavaleiros da Francesinha, showing how administrators sign in to access the back office.",
          },
        ],
      },
      {
        type: "media",
        id: "feature4",
        items: [
          {
            kind: "video",
            badgeTitle: "Admin",
            badgeVariant: "green",
            overlayBadges: ["Admin Dashboard"],
            desktopSrc: "/projects/cdf/admin-dashboard.desktop.mp4",
            mobileSrc: "/projects/cdf/admin-dashboard.mobile.mp4",
            alt: "Admin dashboard of Cavaleiros da Francesinha, giving administrators an overview of the platform.",
          },
        ],
      },
      {
        type: "media",
        id: "feature5",
        items: [
          {
            kind: "video",
            badgeTitle: "Admin",
            badgeVariant: "green",
            overlayBadges: ["Restaurant Management"],
            desktopSrc: "/projects/cdf/admin-restaurants.desktop.mp4",
            mobileSrc: "/projects/cdf/admin-restaurants.mobile.mp4",
            alt: "Admin restaurants page of Cavaleiros da Francesinha, showing how administrators manage the restaurant listings.",
          },
        ],
      },
      {
        type: "media",
        id: "feature6",
        items: [
          {
            kind: "video",
            badgeTitle: "Admin",
            badgeVariant: "green",
            overlayBadges: ["Review Moderation"],
            desktopSrc: "/projects/cdf/admin-reviews.desktop.mp4",
            mobileSrc: "/projects/cdf/admin-reviews.mobile.mp4",
            alt: "Admin reviews page of Cavaleiros da Francesinha, showing how administrators moderate reviews.",
          },
        ],
      },
      {
        type: "link",
        id: "live-link",
        badgeTitle: "Live Link",
        url: "https://www.cavaleirosdafrancesinha.com",
        githubTitle: "GitHub repo",
        githubUrl: "https://github.com/bastienroque/cdf",
      },
    ],
  },
  // project 2
  {
    id: "qui-le-demande-details",
    slug: "qui-le-demande",
    label: "Qui Le Demande ?",
    devType: "Full-stack",
    sections: [
      {
        type: "details",
        id: "qui-le-demande-details",
        badgeTitle: "Project Details",
        badgeVariant: "green",
        items: [
          { label: "Role", value: "Solo Developer & Designer" },
          { label: "Year", value: "2026" },
          { label: "Client", value: "Qui Le Demande ?" },
          { label: "Country", value: "FR" },
          { label: "Industry", value: "Marketing" },
        ],
      },
      {
        type: "media",
        id: "intro",
        items: [
          {
            kind: "video",
            badgeTitle: "Homepage",
            badgeVariant: "green",
            desktopSrc: "/projects/qui-le-demande/hero.desktop.mp4",
            mobileSrc: "/projects/qui-le-demande/hero.mobile.mp4",
            alt: "Homepage of Qui Le Demande ? showing the main functionality of the app, which is to provide a marketing hub for a French-speaking audience.",
          },
        ],
      },
      {
        type: "description",
        id: "context",
        badgeTitle: "Context",
        badgeVariant: "green",
        content:
          "Qui Le Demande? is a client project, a French Marketing agency, specialized in Ads and Web Management. They needed a site that could do more than look good: convert visitors into leads. I built and shipped it solo, from the UI to the backend logic, including an interactive budget simulator so visitors could get a rough project estimate themselves, a custom contact form with server-side validation, and GDPR-compliant cookie consent.",
      },
      {
        type: "cards",
        id: "tech-stack",
        cards: [
          {
            badgeTitle: "Frontend & UI",
            badgeVariant: "green",
            items: [
              { label: "Framework", value: "Next.js / React" },
              { label: "Styling", value: "Tailwind CSS v4" },
              { label: "Animations", value: "Framer Motion" },
              { label: "Language", value: "TypeScript" },
            ],
          },
          {
            badgeTitle: "Backend & Logic",
            badgeVariant: "green",
            items: [
              { label: "Architecture", value: "Next.js Server Actions" },
              { label: "Email Service", value: "SendGrid API" },
              { label: "Validation", value: "Zod" },
            ],
          },
          {
            badgeTitle: "Infrastructure",
            badgeVariant: "green",
            items: [
              { label: "Analytics", value: "GTM & GA4" },
              { label: "Deployment", value: "Vercel & GitHub" },
              { label: "Hosting", value: "Dynadot" },
            ],
          },
        ],
      },
      {
        type: "media",
        id: "feature1",
        items: [
          {
            kind: "video",
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Interactive Budget Simulator"],
            desktopSrc: "/projects/qui-le-demande/simulator.desktop.mp4",
            mobileSrc: "/projects/qui-le-demande/simulator.mobile.mp4",
            alt: "Simulator feature of Qui Le Demande ?, showing how users can interactively simulate their budget and see potential outcomes based on their inputs.",
          },
        ],
      },
      {
        type: "media",
        id: "feature2",
        items: [
          {
            kind: "video",
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Fully custom form"],
            desktopSrc: "/projects/qui-le-demande/contact.desktop.mp4",
            mobileSrc: "/projects/qui-le-demande/contact.mobile.mp4",
            alt: "Contact form feature of Qui Le Demande ?, showing how users can fill out a fully custom form to get in touch with the company, with real-time validation and feedback.",
          },
        ],
      },
      {
        type: "description",
        id: "challenges",
        badgeTitle: "Challenges",
        badgeVariant: "green",
        content:
          "The interactive budget simulator and animated UI needed to feel premium without hurting load times — a real tension since Framer Motion and rich interactions can bloat bundle size fast. I kept the component structure modular and DRY across the marketing pages, and moved logic like form validation (Zod) and email sending (SendGrid) into Next.js Server Actions so none of that weight shipped to the client.",
      },
      {
        type: "media",
        id: "feature3",
        items: [
          {
            kind: "video",
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Compliance Ready"],
            desktopSrc: "/projects/qui-le-demande/cookie-banner.desktop.mp4",
            mobileSrc: "/projects/qui-le-demande/cookie-banner.mobile.mp4",
            alt: "Cookie banner feature of Qui Le Demande ?, showing how the site complies with privacy regulations by providing users with clear options for managing their cookie preferences.",
          },
        ],
      },
      {
        type: "media",
        id: "feature4",
        items: [
          {
            kind: "video",
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Services Modal"],
            desktopSrc: "/projects/qui-le-demande/services.desktop.mp4",
            mobileSrc: "/projects/qui-le-demande/services.mobile.mp4",
            alt: "Services feature of Qui Le Demande ?, showing how users can access detailed information about the services offered by the company through an interactive modal window.",
          },
        ],
      },
      {
        type: "link",
        id: "live-link",
        badgeTitle: "Live Link",
        url: "https://www.quiledemande.fr/",
        githubTitle: "GitHub repo",
        githubUrl: "https://github.com/bastienroque/qui-le-demande",
      },
    ],
  },
  // project 3
  {
    id: "attestation-express-details",
    slug: "attestation-express",
    label: "Attestation Express",
    devType: "Full-stack",
    sections: [
      {
        type: "details",
        id: "attestation-express-details",
        badgeTitle: "Project Details",
        badgeVariant: "green",
        items: [
          { label: "Role", value: "Solo Developer & Designer" },
          { label: "Year", value: "2026" },
          { label: "Project", value: "Tooling" },
          { label: "Country", value: "FR" },
          { label: "Industry", value: "Workshops" },
        ],
      },
      {
        type: "description",
        id: "context",
        badgeTitle: "Context",
        badgeVariant: "green",
        content:
          "Attestation Express is a tool that removes the paperwork from collecting signed attestations. An admin generates a unique link, sends it to the client, and the client signs the attestation directly from their own device, on desktop or mobile. I designed and built both the admin side and the client signing flow solo.",
      },
      {
        type: "cards",
        id: "tech-stack",
        cards: [
          {
            badgeTitle: "Frontend & UI",
            badgeVariant: "green",
            items: [
              { label: "Framework", value: "Next.js / React" },
              { label: "Styling", value: "Tailwind CSS v4" },
              { label: "Signature", value: "react-signature-canvas" },
              { label: "Language", value: "TypeScript" },
            ],
          },
          {
            badgeTitle: "Backend & Logic",
            badgeVariant: "green",
            items: [{ label: "PDF Generation", value: "pdf-lib" }],
          },
        ],
      },
      {
        type: "media",
        id: "feature1",
        items: [
          {
            kind: "video",
            badgeTitle: "Admin",
            badgeVariant: "green",
            overlayBadges: ["Link Generator"],
            desktopSrc:
              "/projects/attestation-express/admin-link-generator.desktop.mp4",
            mobileSrc:
              "/projects/attestation-express/admin-link-generator.mobile.mp4",
            alt: "Admin link generator of Attestation Express, showing how an admin creates a unique link to send to a client.",
          },
        ],
      },
      {
        type: "media",
        id: "feature2",
        items: [
          {
            kind: "video",
            badgeTitle: "Client",
            badgeVariant: "green",
            overlayBadges: ["Client Signing Flow"],
            desktopSrc:
              "/projects/attestation-express/client-signing-flow.desktop.mp4",
            mobileSrc:
              "/projects/attestation-express/client-signing-flow.mobile.mp4",
            alt: "Client signing flow of Attestation Express, showing how a client opens their link and signs the attestation.",
          },
        ],
      },
      {
        type: "link",
        id: "live-link",
        badgeTitle: "Live Link",
        url: "https://attestation-express-six.vercel.app/",
        githubTitle: "GitHub repo",
        githubUrl: "https://github.com/bastienroque/attestation-express",
      },
    ],
  },
  // project 4
  {
    id: "random-fm-details",
    slug: "random-fm",
    label: "Random FM",
    devType: "Full-stack",
    sections: [
      {
        type: "details",
        id: "random-fm-details",
        badgeTitle: "Project Details",
        badgeVariant: "green",
        items: [
          { label: "Role", value: "Solo Developer & Designer" },
          { label: "Year", value: "2026" },
          { label: "Project", value: "Personal" },
          { label: "Industry", value: "Music" },
        ],
      },
      {
        type: "media",
        id: "intro",
        items: [
          {
            kind: "video",
            badgeTitle: "Filters",
            badgeVariant: "green",
            desktopSrc: "/projects/random-fm/filters-exploration.desktop.mp4",
            mobileSrc: "/projects/random-fm/filters-exploration.mobile.mp4",
            alt: "Filters of RandomFM showing the main functionality of the app, which is to filter radio stations by genre and country.",
          },
        ],
      },
      {
        type: "description",
        id: "context",
        badgeTitle: "Context",
        badgeVariant: "green",
        content:
          "Random FM started as a personal project, I wanted an easy way to discover music from around the world instead of scrolling through the same playlists. I built it end-to-end: designed the UI, wired it to the Radio Browser API for station data, and used Postgres (via Neon) with Prisma to let users save favorite stations across sessions, with Clerk handling auth so favorites persist per user.",
      },
      {
        type: "cards",
        id: "tech-stack",
        cards: [
          {
            badgeTitle: "Frontend & UI",
            badgeVariant: "green",
            items: [
              { label: "Framework", value: "Next.js / React" },
              { label: "Styling", value: "Tailwind CSS v4" },
              { label: "Components", value: "Shadcn & Sonner" },
              { label: "Icons", value: "Lucide React" },
            ],
          },
          {
            badgeTitle: "Backend & Data",
            badgeVariant: "green",
            items: [
              { label: "Language", value: "TypeScript" },
              { label: "Database", value: "PostgreSQL (Neon)" },
              { label: "ORM", value: "Prisma" },
              { label: "API", value: "Radio Browser API" },
            ],
          },
          {
            badgeTitle: "Infrastructure",
            badgeVariant: "green",
            items: [
              { label: "Authentication", value: "Clerk" },
              { label: "Analytics", value: "GTM & GA4" },
              { label: "Deployment", value: "Vercel & GitHub" },
            ],
          },
        ],
      },
      {
        type: "media",
        id: "feature1",
        items: [
          {
            kind: "video",
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Randomise"],
            desktopSrc: "/projects/random-fm/randomise-flow.desktop.mp4",
            mobileSrc: "/projects/random-fm/randomise-flow.mobile.mp4",
            alt: "Randomise flow of RandomFM, showing how a single action jumps to a random radio station from around the world.",
          },
        ],
      },
      {
        type: "media",
        id: "feature2",
        items: [
          {
            kind: "video",
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Favorite stations"],
            desktopSrc: "/projects/random-fm/login-flow.desktop.mp4",
            mobileSrc: "/projects/random-fm/login-flow.mobile.mp4",
            alt: "Login and favorite stations feature of RandomFM, showing how users can log in and save their preferred radio stations for quick access.",
          },
        ],
      },
      {
        type: "description",
        id: "challenges",
        badgeTitle: "Challenges",
        badgeVariant: "green",
        content:
          "The Radio Browser API isn't always reliable, some stations return slow or fail entirely, and there's no guaranteed uptime. Early on this meant users would hit blank screens or long silent waits. I fixed it by adding several toast notifications instead of blank states, which kept the app feeling responsive even when the underlying data source wasn't.",
      },
      {
        type: "media",
        id: "feature3",
        items: [
          {
            kind: "video",
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Light/Dark theme"],
            desktopSrc: "/projects/random-fm/theme-toggle.desktop.mp4",
            mobileSrc: "/projects/random-fm/theme-toggle.mobile.mp4",
            alt: "Light/Dark theme toggle feature of RandomFM, showing the app's ability to switch between light and dark modes seamlessly.",
          },
        ],
      },
      {
        type: "link",
        id: "live-link",
        badgeTitle: "Live Link",
        url: "https://random-fm-app.vercel.app/",
        githubTitle: "GitHub repo",
        githubUrl: "https://github.com/bastienroque/random-fm",
      },
    ],
  },
];

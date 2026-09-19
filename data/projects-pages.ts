import { ProjectData } from "@/types";

export const projects_content: ProjectData[] = [
  // project 1
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
            desktopSrc: "/projects/qui-le-demande/homepage.mp4",
            posterDesktopSrc: "/projects/qui-le-demande/homepage-poster.jpg",
            mobileSrc: "/projects/qui-le-demande/mobile-homepage.mp4",
            posterMobileSrc:
              "/projects/qui-le-demande/mobile-homepage-poster.jpg",
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
            desktopSrc: "/projects/qui-le-demande/simulator.mp4",
            posterDesktopSrc: "/projects/qui-le-demande/simulator-poster.jpg",
            mobileSrc: "/projects/qui-le-demande/mobile-simulator.mp4",
            posterMobileSrc:
              "/projects/qui-le-demande/mobile-simulator-poster.jpg",
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
            desktopSrc: "/projects/qui-le-demande/contact-form.mp4",
            posterDesktopSrc:
              "/projects/qui-le-demande/contact-form-poster.jpg",
            mobileSrc: "/projects/qui-le-demande/mobile-contact-form.mp4",
            posterMobileSrc:
              "/projects/qui-le-demande/mobile-contact-form-poster.jpg",
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
            desktopSrc: "/projects/qui-le-demande/cookie-banner.mp4",
            posterDesktopSrc:
              "/projects/qui-le-demande/cookie-banner-poster.jpg",
            mobileSrc: "/projects/qui-le-demande/mobile-cookie-banner.mp4",
            posterMobileSrc:
              "/projects/qui-le-demande/mobile-cookie-banner-poster.jpg",
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
            desktopSrc: "/projects/qui-le-demande/services-modal.mp4",
            posterDesktopSrc:
              "/projects/qui-le-demande/services-modal-poster.jpg",
            mobileSrc: "/projects/qui-le-demande/mobile-services-modal.mp4",
            posterMobileSrc:
              "/projects/qui-le-demande/mobile-services-modal-poster.jpg",
            alt: "Services modal feature of Qui Le Demande ?, showing how users can access detailed information about the services offered by the company through an interactive modal window.",
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
  // project 2
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
            badgeTitle: "Homepage",
            badgeVariant: "green",
            desktopSrc: "/projects/random-fm/homepage.mp4",
            posterDesktopSrc: "/projects/random-fm/homepage-poster.jpg",
            mobileSrc: "/projects/random-fm/mobile-homepage.mp4",
            posterMobileSrc: "/projects/random-fm/mobile-homepage-poster.jpg",
            alt: "Homepage of RandomFM showing the main functionality of the app, which is to filter radio stations by genre and country.",
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
            kind: "image",
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Toast notifications"],
            desktopSrc: "/projects/random-fm/toasts.png",
            mobileSrc: "/projects/random-fm/mobile-toasts.png",
            alt: "Toast notifications feature of RandomFM...",
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
            desktopSrc: "/projects/random-fm/favorite-stations.mp4",
            posterDesktopSrc:
              "/projects/random-fm/favorite-stations-poster.jpg",
            mobileSrc: "/projects/random-fm/mobile-favorite-stations.mp4",
            posterMobileSrc:
              "/projects/random-fm/mobile-favorite-stations-poster.jpg",
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
            desktopSrc: "/projects/random-fm/dark-light-theme.mp4",
            posterDesktopSrc: "/projects/random-fm/dark-light-theme-poster.jpg",
            mobileSrc: "/projects/random-fm/mobile-dark-light-theme.mp4",
            posterMobileSrc:
              "/projects/random-fm/mobile-dark-light-theme-poster.jpg",
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

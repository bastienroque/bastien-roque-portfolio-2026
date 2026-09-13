import { ProjectData } from "@/types";

export const projects_content: ProjectData[] = [
  // project 1
  {
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
            badgeTitle: "Homepage",
            badgeVariant: "green",
            src: "/projects/qui-le-demande/homepage.mp4",
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
          "The goal was to engineer a high-performance digital presence and conversion hub for the Qui Le Demande ? brand, tailored specifically for a French-speaking market. Beyond projecting a premium agency aesthetic, the platform required a resilient architecture capable of driving active customer acquisition through dynamic pricing structures, interactive lead-generation workflows, and strict compliance-first cookie consent management.",
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
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Interactive Budget Simulator"],
            src: "/projects/qui-le-demande/simulator.mp4",
            alt: "Simulator feature of Qui Le Demande ?, showing how users can interactively simulate their budget and see potential outcomes based on their inputs.",
          },
        ],
      },
      {
        type: "media",
        id: "feature2",
        items: [
          {
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Fully custom form"],
            src: "/projects/qui-le-demande/contact-form.mp4",
            alt: "Project 3 image",
          },
        ],
      },
      {
        type: "description",
        id: "challenges",
        badgeTitle: "Challenges",
        badgeVariant: "green",
        content:
          "Balancing a high-fidelity, animation-rich user interface with strict performance benchmarks presented a primary architectural hurdle. Maintaining a consistent design system and modular copy structure across a multi-faceted marketing layout required rigorous component composition to keep the codebase DRY (Don't Repeat Yourself), while simultaneously managing secure, server-side form validations and transactional email routing via SendGrid without inflating client-side bundle sizes.",
      },
      {
        type: "media",
        id: "feature3",
        items: [
          {
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Compliance Ready"],
            src: "/projects/qui-le-demande/cookie-banner.mp4",
            alt: "Cookie banner feature of Qui Le Demande ?, showing how the site complies with privacy regulations by providing users with clear options for managing their cookie preferences.",
          },
        ],
      },
      {
        type: "media",
        id: "feature4",
        items: [
          {
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Services Modal"],
            src: "/projects/qui-le-demande/services-modal.mp4",
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
            badgeTitle: "Homepage",
            badgeVariant: "green",
            src: "/projects/random-fm/homepage.mp4",
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
          "The goal was to build a sleek, utility-driven web application that interfaces with external music data APIs (such as Last.fm or a radio stream API) to let users instantly discover random tracks, explore deep listening histories, or surface specific play milestones. It bridges personal music passion with clean API data consumption.",
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
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Toast notifications"],
            src: "/projects/random-fm/toasts.png",
            alt: "Toast notifications feature of RandomFM, showing how users receive real-time feedback on their actions within the app, such as favoriting a station or encountering an error.",
          },
        ],
      },
      {
        type: "media",
        id: "feature2",
        items: [
          {
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Favorite stations"],
            src: "/projects/random-fm/saved-stations.mp4",
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
          "Handling asynchronous latency and managing state when querying external APIs that can occasionally return delayed payloads or rate-limit requests. Implemented robust loading skeletons, error states, and optimized component re-rendering to keep the UI snappy and feedback loops immediate for the user.",
      },
      {
        type: "media",
        id: "feature3",
        items: [
          {
            badgeTitle: "Feature",
            badgeVariant: "green",
            overlayBadges: ["Light/Dark theme"],
            src: "/projects/random-fm/dark-light-theme.mp4",
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

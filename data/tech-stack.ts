import { TechCategory } from "@/types";

export const tech_stack: TechCategory[] = [
  {
    id: "languages",
    label: "Languages",
    scope: "The foundations I build everything on.",
    items: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "TypeScript" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    scope: "Interfaces, styling and components.",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "shadcn/ui" },
      { name: "Lucide Icons" },
    ],
  },
  {
    id: "backend",
    label: "Backend & data",
    scope: "APIs, databases, auth and transactional services.",
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "MongoDB" },
      { name: "Supabase" },
      { name: "Clerk" },
      { name: "Resend" },
      { name: "Zod" },
    ],
  },
  {
    id: "infrastructure",
    label: "Infra & workflow",
    scope: "Version control, containers and deployment.",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "Vercel" },
      { name: "Google Cloud Platform" },
    ],
  },
  {
    id: "tooling",
    label: "Design & tooling",
    scope: "Design, API testing, analytics and AI assistance.",
    items: [
      { name: "Figma" },
      { name: "Framer" },
      { name: "Postman" },
      { name: "Google Tag Manager" },
      { name: "Google Analytics" },
      { name: "Claude" },
    ],
  },
];

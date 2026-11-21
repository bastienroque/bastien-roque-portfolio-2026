import { StackGroup } from "../types";

/** The tech stack, shown like the output of `tree ~/stack`. */
export const STACK: StackGroup[] = [
  {
    dir: "languages",
    label: "Languages",
    tools: ["HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    dir: "frontend",
    label: "Frontend",
    tools: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    dir: "backend",
    label: "Backend & data",
    tools: [
      "Node.js",
      "Express",
      "MongoDB",
      "Supabase",
      "Clerk",
      "Resend",
      "Zod",
    ],
  },
  {
    dir: "design",
    label: "Design & motion",
    tools: ["Figma", "Adobe Illustrator", "Adobe After Effects"],
  },
  {
    dir: "infra",
    label: "Infra & workflow",
    tools: ["Git", "GitHub", "Docker", "Vercel", "Google Cloud"],
  },
  {
    dir: "quality",
    label: "Testing & analytics",
    tools: ["Postman", "SonarQube", "Tag Manager", "Analytics"],
  },
  { dir: "ai", label: "AI", tools: ["Claude", "ChatGPT", "Gemini", "Mistral"] },
];

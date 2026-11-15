import { StagePosition } from "../types";

/**
 * The tech stack as a funk band, laid out like a stage plan seen from above.
 * Back row to front: the rhythm section at the back, the frontline up front.
 */
export const STAGE: StagePosition[] = [
  {
    id: "bass",
    instrument: "Bass",
    category: "Backend & data",
    part: "The low end you feel more than hear.",
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
    id: "drums",
    instrument: "Drums",
    category: "Languages",
    part: "The backbone everything locks to.",
    tools: ["HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    id: "keys",
    instrument: "Keys",
    category: "AI",
    part: "Chords, fills and second opinions.",
    tools: ["Claude", "ChatGPT", "Gemini", "Mistral"],
  },
  {
    id: "guitar",
    instrument: "Rhythm guitar",
    category: "Infra & workflow",
    part: "Tight, steady, keeps everything moving.",
    tools: ["Git", "GitHub", "Docker", "Vercel", "Google Cloud"],
  },
  {
    id: "percussion",
    instrument: "Percussion",
    category: "Testing & analytics",
    part: "The small details that make the groove.",
    tools: ["Postman", "SonarQube", "Tag Manager", "Analytics"],
  },
  {
    id: "horns",
    instrument: "Horn section",
    category: "Design & motion",
    part: "The stabs and colour people remember.",
    tools: ["Figma", "Framer", "Framer Motion", "Adobe After Effects"],
  },
  {
    id: "vocals",
    instrument: "Lead vocals",
    category: "Frontend",
    part: "Out front: what everyone sees and hears.",
    tools: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Lucide Icons"],
  },
];

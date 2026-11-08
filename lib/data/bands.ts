import { Band, MeterConfig } from "../types";

export const METERS: Record<string, MeterConfig> = {
  "3/4": { Pulse: 3, Units: 24, kick: [0], snare: [2], grid: [0] },
  "4/4": { Pulse: 4, Units: 24, kick: [0, 2], snare: [1, 3], grid: [0, 2] },
  "5/4": { Pulse: 5, Units: 24, kick: [0, 3], snare: [2, 4], grid: [0, 3] },
  "6/4": { Pulse: 6, Units: 24, kick: [0], snare: [3], grid: [0, 3] },
  "6/8": { Pulse: 6, Units: 12, kick: [0], snare: [3], grid: [0, 3] },
  "7/8": { Pulse: 7, Units: 12, kick: [0, 4], snare: [2], grid: [0, 2, 4] },
  "9/8": { Pulse: 9, Units: 12, kick: [0, 6], snare: [3], grid: [0, 3, 6] },
  "12/8": {
    Pulse: 12,
    Units: 12,
    kick: [0, 6],
    snare: [3, 9],
    grid: [0, 3, 6, 9],
  },
};

/**
 * The tech stack, as six bands. Each tool is a player: `role` picks the
 * part it plays (dr drums, ba bass, cp comping, pd pad, ld lead, hn horns,
 * pc percussion) and `style` picks the pattern in lib/audio/sequencer.ts.
 */
export const BANDS: Band[] = [
  {
    style: "Jazz",
    label: "Languages",
    feel: "swung in triplets",
    color: "#1DD37B",
    scope: "The foundations I build everything on.",
    members: [
      { name: "HTML", role: "dr", style: "jazz", instrument: "Brushes" },
      {
        name: "CSS",
        role: "ba",
        style: "jazz",
        instrument: "Upright bass",
        waveform: ["triangle", 600, 0.012, 1.3],
      },
      {
        name: "JavaScript",
        role: "cp",
        style: "jazz",
        instrument: "Piano",
        waveform: ["triangle", 2600, 0.004, 0.9],
      },
      {
        name: "TypeScript",
        role: "ld",
        style: "jazz",
        instrument: "Saxophone",
        waveform: ["sawtooth", 1700, 0.04, 0.5],
      },
    ],
  },
  {
    style: "Funk",
    label: "Frontend",
    feel: "tight sixteenths",
    color: "#E8A317",
    scope: "Interfaces, styling and components.",
    members: [
      { name: "React", role: "dr", style: "funk", instrument: "Drums" },
      {
        name: "Next.js",
        role: "ba",
        style: "funk",
        instrument: "Slap bass",
        waveform: ["sawtooth", 1100, 0.005, 1],
      },
      {
        name: "Tailwind CSS",
        role: "cp",
        style: "funkG",
        instrument: "Rhythm guitar",
        waveform: ["square", 2200, 0.003, 0.4],
      },
      {
        name: "shadcn/ui",
        role: "cp",
        style: "funkK",
        instrument: "Clavinet",
        waveform: ["sawtooth", 3000, 0.003, 0.45],
      },
      {
        name: "Lucide Icons",
        role: "hn",
        style: "funk",
        instrument: "Horns",
        waveform: ["sawtooth", 1500, 0.02, 0.55],
      },
    ],
  },
  {
    style: "Electronic",
    label: "Backend & data",
    feel: "four on the floor",
    color: "#5B63F0",
    scope: "APIs, databases, auth and transactional services.",
    members: [
      { name: "Node.js", role: "dr", style: "elec", instrument: "Drum machine" },
      {
        name: "Express",
        role: "ba",
        style: "elec",
        instrument: "Sub bass",
        waveform: ["sawtooth", 500, 0.005, 1.1],
      },
      {
        name: "MongoDB",
        role: "cp",
        style: "elecArp",
        instrument: "Arpeggiator",
        waveform: ["square", 1800, 0.003, 0.35],
      },
      {
        name: "Supabase",
        role: "pd",
        style: "elec",
        instrument: "Pad",
        waveform: ["sawtooth", 900, 0.4, 0.3],
      },
      {
        name: "Clerk",
        role: "ld",
        style: "elec",
        instrument: "Lead synth",
        waveform: ["square", 2400, 0.01, 0.35],
      },
      { name: "Resend", role: "pc", style: "elecH", instrument: "Hi-hats" },
      { name: "Zod", role: "pc", style: "elecC", instrument: "Clap" },
    ],
  },
  {
    style: "Disco",
    label: "Infra & workflow",
    feel: "octaves on the off-beat",
    color: "#E8648C",
    scope: "Version control, containers and deployment.",
    members: [
      { name: "Git", role: "dr", style: "disco", instrument: "Drums" },
      {
        name: "GitHub",
        role: "ba",
        style: "disco",
        instrument: "Octave bass",
        waveform: ["sawtooth", 900, 0.005, 1],
      },
      {
        name: "Docker",
        role: "cp",
        style: "discoG",
        instrument: "Chicken-scratch guitar",
        waveform: ["square", 2500, 0.003, 0.35],
      },
      {
        name: "Vercel",
        role: "ld",
        style: "disco",
        instrument: "Vocal",
        waveform: ["triangle", 2000, 0.05, 0.5],
      },
      {
        name: "Google Cloud",
        role: "pd",
        style: "disco",
        instrument: "Strings",
        waveform: ["sawtooth", 1400, 0.25, 0.25],
      },
    ],
  },
  {
    style: "Latin",
    label: "Design & tooling",
    feel: "clave on top",
    color: "#E4572E",
    scope: "Design, API testing, code quality and analytics.",
    members: [
      { name: "Figma", role: "dr", style: "latin", instrument: "Timbales" },
      { name: "Framer", role: "pc", style: "latinC", instrument: "Congas" },
      { name: "Postman", role: "pc", style: "latinB", instrument: "Clave" },
      {
        name: "SonarQube",
        role: "ba",
        style: "latin",
        instrument: "Bass",
        waveform: ["triangle", 700, 0.008, 1.2],
      },
      {
        name: "Tag Manager",
        role: "cp",
        style: "latin",
        instrument: "Montuno piano",
        waveform: ["triangle", 2800, 0.004, 0.8],
      },
      {
        name: "Analytics",
        role: "hn",
        style: "latin",
        instrument: "Trumpets",
        waveform: ["sawtooth", 1800, 0.02, 0.5],
      },
    ],
  },
  {
    style: "Lo-fi",
    label: "AI",
    feel: "laid back, behind the beat",
    color: "#22B8CF",
    scope: "The assistants I pair with to think, draft and review.",
    members: [
      { name: "ChatGPT", role: "dr", style: "lofi", instrument: "Boom-bap drums" },
      {
        name: "Gemini",
        role: "ba",
        style: "lofi",
        instrument: "Double bass",
        waveform: ["triangle", 650, 0.01, 1.2],
      },
      {
        name: "Claude",
        role: "cp",
        style: "lofi",
        instrument: "Rhodes",
        waveform: ["sine", 2200, 0.004, 1],
      },
      {
        name: "Mistral",
        role: "ld",
        style: "lofi",
        instrument: "Flute",
        waveform: ["sine", 3000, 0.04, 0.6],
      },
    ],
  },
];

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
/** "six", for copy like "Tech stack as six bands". */
export const bandCount = WORDS[BANDS.length] ?? String(BANDS.length);
export const bandCountTitle = bandCount[0].toUpperCase() + bandCount.slice(1);

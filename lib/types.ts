// ---------- Audio ----------

export type MemberRole = "dr" | "ba" | "cp" | "pd" | "ld" | "hn" | "pc";

/** [oscillator type, lowpass cutoff Hz, attack s, gain] */
export type Waveform = [OscillatorType, number, number, number];

export interface Member {
  name: string;
  role: MemberRole;
  style: string;
  instrument: string;
  waveform?: Waveform;
}

export interface Band {
  style: string;
  label: string;
  feel: string;
  color: string;
  scope: string;
  members: Member[];
}

export interface MeterConfig {
  Pulse: number;
  Units: number;
  kick: number[];
  snare: number[];
  grid: number[];
}

export interface AudioEvent {
  time: number;
  velocity: number;
  type: string;
  duration: number;
  note?: number | number[];
}

// ---------- Content ----------

export interface Profile {
  name: string;
  initials: string;
  role: string;
  location: string;
  status: string;
  email: string;
  links: { label: string; href: string }[];
}

export interface ProjectMedia {
  title: string;
  tag: "Feature" | "Admin" | "Client" | "Homepage";
  /** Screen recording; a poster frame sits next to it with a .jpg extension. */
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  kind: string;
  role: string;
  facts: { label: string; value: string }[];
  context: string;
  challenges?: string;
  stack: { group: string; items: { label: string; value: string }[] }[];
  cover: ProjectMedia;
  media: ProjectMedia[];
  liveUrl: string;
  repoUrl: string;
  color: string;
}

export interface Feature {
  title: string;
  description: string;
  /** Where on the site this effect lives. */
  target: {
    href: string;
    label: string;
    /** Play a silent visual demo on the hero logo after scrolling there. */
    demo?: "left-right" | "ripple";
  };
}

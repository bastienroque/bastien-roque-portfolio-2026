// ---------- Content ----------

export interface Profile {
  name: string;
  initials: string;
  /** Job title, used in metadata and structured data. */
  role: string;
  /** The one-line positioning shown in the hero. */
  tagline: string;
  /** Skills shown as keywords around the site. */
  keywords: string[];
  location: string;
  status: string;
  email: string;
  links: { label: string; href: string }[];
}

export type Discipline = "Design" | "Motion" | "Development";

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
  /** What Bastien did on it, shown as tags on the card and page. */
  disciplines: Discipline[];
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

/** One position on the funk band stage plan: a stack category and its tools. */
export interface StagePosition {
  id: "drums" | "bass" | "keys" | "guitar" | "percussion" | "horns" | "vocals";
  instrument: string;
  category: string;
  /** Why this category plays this part. */
  part: string;
  tools: string[];
}

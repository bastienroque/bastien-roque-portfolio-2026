// ---------- Content ----------

export interface Profile {
  name: string;
  initials: string;
  /** Job title: the hero title, metadata and structured data. */
  role: string;
  location: string;
  /** IANA time zone for the local clock, e.g. "Europe/Lisbon". */
  timeZone: string;
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
}

/** One folder in the stack tree: a category and its tools. */
export interface StackGroup {
  /** Folder name, e.g. "frontend". */
  dir: string;
  label: string;
  tools: string[];
}

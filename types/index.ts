import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "white" | "green";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface ParamsProps {
  params: Promise<{ slug: string }>;
}

export interface KeyValueItem {
  label: string;
  value: string;
}

export interface FeatureCardItem {
  badgeTitle: string;
  badgeVariant?: "green" | "white";
  items: KeyValueItem[];
}

export interface BaseSectionData {
  id: string;
  badgeTitle?: string;
  badgeVariant?: "green" | "white";
}

export interface CardsSection extends BaseSectionData {
  type: "cards";
  cards: FeatureCardItem[];
}

export interface FeatureCardsGridProps {
  section: CardsSection;
}

export interface MediaItemData {
  src: string;
  posterSrc: string;
  alt: string;
  badgeTitle?: string;
  badgeVariant?: "green" | "white";
  overlayBadges?: string[];
}

export interface MediaSection extends BaseSectionData {
  type: "media";
  items: MediaItemData[];
}

export interface LinkSection extends BaseSectionData {
  type: "link";
  url: string;
  githubTitle: string;
  githubUrl: string;
}

export interface DescriptionSection extends BaseSectionData {
  type: "description";
  content: string;
}

export interface DetailsSection extends BaseSectionData {
  type: "details";
  items: KeyValueItem[];
}

export type SectionData =
  | CardsSection
  | MediaSection
  | LinkSection
  | DescriptionSection
  | DetailsSection;

export interface FeatureSectionProps {
  section: SectionData;
}

export interface ProjectData {
  id: string;
  slug: string;
  label: string;
  devType: string;
  sections: SectionData[];
}

export interface ProjectShowcase {
  id: number;
  href: string;
  label: string;
  devType: string;
  src: string;
  posterSrc: string;
  alt: string;
}

export interface HeroContent {
  name: string;
  role: string;
  country: string;
  techStack: string[];
}

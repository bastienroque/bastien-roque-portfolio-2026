import React from "react";
import { PROJECTS } from "@/lib/data/projects";
import { ProjectCard } from "../modules/ProjectCard";
import { Eyebrow, Heading, Section } from "../ui/Section";

export const WorkSection: React.FC = () => (
  <Section id="work">
    <Eyebrow>Selected work · Pick one for a solo</Eyebrow>
    <Heading>Projects</Heading>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5 mt-10">
      {PROJECTS.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} />
      ))}
    </div>
  </Section>
);

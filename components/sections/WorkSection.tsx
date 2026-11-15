import React from "react";
import { PROJECTS } from "@/lib/data/projects";
import { ProjectCard } from "../modules/ProjectCard";
import { Eyebrow, Heading, Lead, Section } from "../ui/Section";

export const WorkSection: React.FC = () => (
  <Section id="work">
    <Eyebrow>Selected work</Eyebrow>
    <Heading>Projects</Heading>
    <Lead>
      Client platforms, sites and tools I designed and built end to end, from the look and motion to the code.
    </Lead>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
      {PROJECTS.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  </Section>
);

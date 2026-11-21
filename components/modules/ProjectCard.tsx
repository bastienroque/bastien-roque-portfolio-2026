import React from "react";
import Link from "next/link";
import { Project } from "@/lib/types";
import { Video } from "../ui/Video";

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Link
    href={`/projects/${project.slug}`}
    className="group bg-surface text-fg border border-line rounded-md overflow-hidden flex flex-col transition-colors duration-200 hover:border-accent-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-deep"
  >
    <div className="relative aspect-16/10 border-b border-line bg-bg overflow-hidden">
      <Video {...project.cover} className="transition-transform duration-500 group-hover:scale-[1.03]" />
    </div>
    <div className="p-5 flex flex-col flex-1">
      <div className="text-xs text-dim">
        {project.kind.toLowerCase()} <span className="text-line">·</span> {project.year}
      </div>
      <h3 className="text-2xl font-semibold tracking-[-0.03em] mt-2 leading-tight">{project.title}</h3>
      <p className="text-sm leading-relaxed text-muted mt-2 mb-5 flex-1">{project.tagline}</p>
      <span className="text-sm text-accent-deep">
        <span className="group-hover:underline underline-offset-4">read case study</span> →
      </span>
    </div>
  </Link>
);

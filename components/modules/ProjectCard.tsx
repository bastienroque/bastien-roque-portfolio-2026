import React from "react";
import Link from "next/link";
import { Project } from "@/lib/types";
import { Video } from "../ui/Video";

export const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => (
  <Link
    href={`/projects/${project.slug}`}
    className="group bg-surface text-fg border border-line rounded-card shadow-card overflow-hidden flex flex-col transition duration-300 hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-fg"
  >
    <div
      className="relative aspect-16/10 m-2 rounded-[calc(var(--radius)-8px)] overflow-hidden"
      style={{ backgroundColor: project.color }}
    >
      <Video
        {...project.cover}
        className="transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
    <div className="p-[14px_22px_22px] flex flex-col flex-1">
      <div className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
        Track {String(index + 1).padStart(2, "0")} · {project.kind} ·{" "}
        {project.year}
      </div>
      <h3 className="text-[28px] font-semibold tracking-tight mt-1.5 leading-none">
        {project.title}
      </h3>
      <p className="text-[15px] text-muted mt-1.5 mb-4 flex-1">
        {project.tagline}
      </p>
      <span className="font-medium text-sm underline underline-offset-4">
        Case study →
      </span>
    </div>
  </Link>
);

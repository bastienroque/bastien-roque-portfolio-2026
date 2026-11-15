import React from "react";
import { Discipline } from "@/lib/types";

/** What Bastien did on a project: Design, Motion, Development. */
export const DisciplineTags: React.FC<{ items: Discipline[]; className?: string }> = ({
  items,
  className = "",
}) => (
  <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Disciplines">
    {items.map((d) => (
      <li
        key={d}
        className="font-mono text-[11px] uppercase tracking-[0.08em] rounded-full px-2.5 py-1 border border-line text-muted"
      >
        {d}
      </li>
    ))}
  </ul>
);

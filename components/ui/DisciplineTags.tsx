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
        className="text-xs lowercase rounded-md px-2 py-1 border border-line text-muted"
      >
        {d}
      </li>
    ))}
  </ul>
);

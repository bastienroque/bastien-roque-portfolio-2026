"use client";

import React from "react";
import { useMode } from "../providers/ModeProvider";

export const ModeSwitch: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const { mode, setMode } = useMode();
  const current = mode ?? "quick";

  return (
    <div
      role="group"
      aria-label="View mode"
      className={`flex gap-0.5 p-1 rounded-full border border-line bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] backdrop-blur-md ${className}`}
    >
      {(["quick", "jam"] as const).map((m) => (
        <button
          key={m}
          type="button"
          aria-pressed={current === m}
          onClick={() => setMode(m)}
          className={`min-h-9 px-3.5 rounded-full text-sm font-medium transition-colors ${
            current === m ? "bg-fg text-bg" : "text-muted hover:text-fg"
          }`}
        >
          {m === "quick" ? "Overview" : "Jam"}
        </button>
      ))}
    </div>
  );
};

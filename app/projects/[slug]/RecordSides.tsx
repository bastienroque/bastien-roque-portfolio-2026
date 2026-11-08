"use client";

import React, { useState } from "react";

/**
 * Flip the record: Side A is the story, Side B is the build. Both sides stay
 * in the HTML (the inactive one is `hidden`), so nothing is lost to search
 * engines or to readers without JavaScript.
 */
export const RecordSides: React.FC<{ story: React.ReactNode; build: React.ReactNode }> = ({
  story,
  build,
}) => {
  const [side, setSide] = useState<"A" | "B">("A");
  const tabs = [
    { id: "A" as const, label: "Side A · Story" },
    { id: "B" as const, label: "Side B · Build" },
  ];

  return (
    <section className="mt-16">
      <div role="tablist" aria-label="Project sides" className="inline-flex gap-1 p-1 border border-line rounded-2xl bg-surface">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`side-${t.id}-tab`}
            aria-controls={`side-${t.id}`}
            aria-selected={side === t.id}
            onClick={() => setSide(t.id)}
            className={`min-h-11 px-4 rounded-xl text-sm font-medium transition-colors ${
              side === t.id ? "bg-fg text-bg" : "text-muted hover:text-fg"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="side-A" aria-labelledby="side-A-tab" hidden={side !== "A"} className="mt-8">
        {story}
      </div>
      <div role="tabpanel" id="side-B" aria-labelledby="side-B-tab" hidden={side !== "B"} className="mt-8">
        {build}
      </div>
    </section>
  );
};

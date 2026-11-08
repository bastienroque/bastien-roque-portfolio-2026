"use client";

import React from "react";
import { DRUM_COLORS, DRUM_NAMES, KEY_LABELS } from "@/lib/audio/instruments";
import { useJam } from "../providers/JamProvider";

export const DrumPads: React.FC = () => {
  const { fireHit, logs } = useJam();

  return (
    <div className="flex flex-col gap-4">
      <div id="drum-pads" className="spot flex gap-2 max-w-125" role="group" aria-label="Drum pads">
        {DRUM_NAMES.map((name, i) => (
          <button
            key={name}
            // pointerdown, not click: drums should sound on contact, not on release
            onPointerDown={(e) => {
              if (e.pointerType !== "mouse" || e.button === 0) fireHit(i, 0.85);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fireHit(i, 0.85);
              }
            }}
            aria-label={`${name} (key ${KEY_LABELS[i]})`}
            className="flex-1 max-w-20 aspect-square select-none touch-manipulation border border-paper-line rounded-full bg-paper-glass backdrop-blur-sm text-paper flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-paper"
          >
            <i className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: DRUM_COLORS[i] }} />
            <span className="font-medium text-xs">{name}</span>
            <small className="hidden md:block text-[10px] font-mono text-paper-muted">
              {KEY_LABELS[i]}
            </small>
          </button>
        ))}
      </div>

      <div className="font-mono text-xs leading-[1.6] min-h-15 text-paper-muted" aria-live="polite">
        {logs.map((l, idx) => (
          <div key={l.id} className={idx === logs.length - 1 ? "opacity-100" : "opacity-40"}>
            <span className="text-accent">&gt; </span>
            {l.text}
          </div>
        ))}
        {logs.length === 0 && (
          <div className="opacity-70">
            <span className="text-accent">&gt; </span>
            <span className="hidden md:inline">tap a pad, or play with A S D F G (shift for ghost notes)</span>
            <span className="md:hidden">tap a pad, or tap the logo</span>
          </div>
        )}
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { useJam } from "../providers/JamProvider";

export const TransportBar: React.FC = () => {
  const { isPlaying, togglePlay, soundOn, toggleSound, position, meter, bpm } = useJam();

  const status = position
    ? `Bar ${String(position.bar).padStart(2, "0")} · Beat ${position.beat} · ${meter}`
    : `${bpm} BPM · ${meter}`;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-[calc(env(safe-area-inset-bottom,0px)+12px)] z-40 flex items-center gap-1.5 p-1 rounded-full shadow-card bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] backdrop-blur-md border border-line max-w-[calc(100vw-20px)]">
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Stop the band" : "Play the band (turns sound on)"}
        className="w-11 h-11 rounded-full bg-fg text-bg text-[15px] flex items-center justify-center"
      >
        {isPlaying ? "■" : "▶"}
      </button>
      <span className="font-mono text-xs px-2 whitespace-nowrap flex items-center gap-2 tabular-nums">
        <i
          className={`w-2 h-2 rounded-full transition-all ${
            isPlaying ? (position?.beat === 1 ? "bg-accent scale-150" : "bg-accent-deep") : "bg-line"
          }`}
        />
        {status}
      </span>
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={soundOn}
        aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
        className={`h-11 shrink-0 whitespace-nowrap rounded-full border text-sm flex items-center justify-center gap-1.5 transition-colors ${
          soundOn
            ? "w-11 bg-accent text-on-accent border-accent"
            : "px-3.5 bg-transparent text-fg border-line"
        }`}
      >
        ♪{!soundOn && <span className="font-medium">Sound off</span>}
      </button>
    </div>
  );
};

"use client";

import React from "react";
import { DRUMS } from "@/lib/audio/instruments";

interface DrumPadsProps {
  onHit: (index: number) => void;
  /** Index of the pad that was just hit (lit briefly), or null. */
  lit: number | null;
}

export const DrumPads: React.FC<DrumPadsProps> = ({ onHit, lit }) => (
  <div className="flex justify-center gap-2 sm:gap-3" role="group" aria-label="Drum pads">
    {DRUMS.map((d, i) => (
      <button
        key={d.name}
        type="button"
        // pointerdown, not click: drums should sound on contact, not on release
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || e.button === 0) onHit(i);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onHit(i);
          }
        }}
        aria-label={`${d.name} (key ${d.key})`}
        className={`w-[min(18vw,88px)] aspect-square select-none touch-manipulation rounded-full border flex flex-col items-center justify-center gap-1 text-paper backdrop-blur-sm transition duration-100 focus-visible:outline-2 focus-visible:outline-paper ${
          lit === i ? "scale-95 border-paper bg-[rgba(242,239,233,0.16)]" : "border-paper-line bg-paper-glass"
        }`}
      >
        <i className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
        <span className="font-medium text-xs sm:text-sm">{d.name}</span>
        <small className="hidden md:block text-[10px] font-mono text-paper-muted">{d.key}</small>
      </button>
    ))}
  </div>
);

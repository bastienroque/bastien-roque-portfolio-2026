"use client";

import React from "react";
import { addRing } from "@/lib/audio/visuals";
import { Feature } from "@/lib/types";

/**
 * A Logic card's link to the place on the site where its effect lives.
 * For the hero logo effects, it also plays a short silent demo once there.
 */
export const EffectLink: React.FC<Feature["target"]> = ({ href, label, demo }) => (
  <a
    href={href}
    onClick={() => {
      if (!demo) return;
      // Wait for the smooth scroll to reach the hero before showing it.
      const at = (ms: number, fn: () => void) => setTimeout(fn, ms);
      const w = window.innerWidth;
      const y = window.innerHeight * 0.35;
      if (demo === "left-right") {
        at(700, () => addRing(0, 0.9, w * 0.3, y));
        at(1150, () => addRing(1, 0.9, w * 0.7, y));
      } else {
        at(700, () => addRing(3, 1, w / 2, y));
        at(950, () => addRing(1, 0.5, w / 2, y));
      }
    }}
    className="self-start mt-2 inline-flex items-center gap-1.5 min-h-11 font-medium text-sm text-accent-fg underline-offset-4 hover:underline"
  >
    {label} <span aria-hidden="true">→</span>
  </a>
);

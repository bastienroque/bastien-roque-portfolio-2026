"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { audioEngine } from "@/lib/audio/context";
import { DRUMS, hitDrum } from "@/lib/audio/instruments";
import { addRing } from "@/lib/audio/visuals";
import { HeroCanvas } from "./HeroCanvas";
import { DrumPads } from "./DrumPads";

const KEYS: Record<string, number> = Object.fromEntries(DRUMS.map((d, i) => [d.key.toLowerCase(), i]));

/**
 * The /play page: the particle logo and five pads. Hitting a pad (or the
 * logo, or a key) is the opt-in: the first hit starts the audio.
 */
export const DrumKit: React.FC = () => {
  const [lit, setLit] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const litTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hit = useCallback((index: number, velocity = 0.85, x?: number, y?: number) => {
    if (audioEngine.init()) {
      setStarted(true);
      const ac = audioEngine.context!;
      // Engine still starting: play once it's running rather than dropping the note.
      if (ac.state !== "running") ac.resume().then(() => hitDrum(index, velocity), () => {});
      else hitDrum(index, velocity);
    }
    addRing(index, velocity, x, y);
    setLit(index);
    if (litTimer.current) clearTimeout(litTimer.current);
    litTimer.current = setTimeout(() => setLit(null), 110);
  }, []);

  // A S D F G on the keyboard; Shift for a soft ghost note.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const idx = KEYS[e.key.toLowerCase()];
      if (idx != null) hit(idx, e.shiftKey ? 0.3 : 0.85);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hit]);

  // Let iOS go back to normal audio behaviour when leaving the page.
  useEffect(() => () => audioEngine.release(), []);

  return (
    <main id="main" className="stage relative h-svh min-h-140 overflow-hidden">
      <HeroCanvas onHit={(drum, x, y) => hit(drum, 0.85, x, y)} />

      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] flex flex-col items-center gap-5 text-center pointer-events-none [&>*]:pointer-events-auto">
        <div>
          <h1 className="text-[clamp(28px,5vw,44px)] font-semibold tracking-tight">Play the kit.</h1>
          <p className="mt-2 text-paper-muted text-[15px]" aria-live="polite">
            {started ? (
              "Sound on. Headphones help."
            ) : (
              <>
                Tap a pad or the logo<span className="hidden md:inline">, or use A S D F G (Shift for ghost notes)</span>.
                Sound starts on your first hit.
              </>
            )}
          </p>
        </div>
        <DrumPads onHit={(i) => hit(i)} lit={lit} />
      </div>
    </main>
  );
};

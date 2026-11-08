"use client";

import React from "react";
import { METERS } from "@/lib/data/bands";
import { Button } from "../ui/Button";
import { useJam } from "../providers/JamProvider";

const label = "font-mono text-xs uppercase tracking-[0.08em] text-muted mb-2.5";

/** Tempo, time signature and feel. */
export const MixerControls: React.FC = () => {
  const { isPlaying, togglePlay, bpm, setBpm, meter, setMeter, humanized, setHumanized } = useJam();

  return (
    <div className="flex flex-col gap-6 mt-9">
      <div className="flex gap-4 items-center flex-wrap">
        <Button variant={isPlaying ? "active" : "solid"} onClick={togglePlay}>
          {isPlaying ? "■ Stop" : "▶ Play"}
        </Button>
        <label className="flex gap-3 items-center flex-1 min-w-55 max-w-120 font-medium text-sm text-muted">
          Tempo
          <input
            type="range"
            min={70}
            max={160}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="flex-1 accent-fg h-9"
          />
          <span className="text-fg font-mono text-xs w-7 tabular-nums">{bpm}</span>
        </label>
      </div>

      <div id="time-signature" className="spot">
        <div className={label}>Time signature</div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-1.5 max-w-180" role="group" aria-label="Time signature">
          {Object.keys(METERS).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMeter(m)}
              aria-pressed={m === meter}
              className={`min-h-11.5 font-medium text-[15px] border rounded-xl transition-colors ${
                m === meter ? "bg-fg text-bg border-fg" : "bg-surface text-fg border-line hover:border-fg"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div id="feel" className="spot self-start">
        <div className={label}>Feel</div>
        <div className="flex gap-1.5 max-w-90" role="group" aria-label="Feel">
          {[
            { on: false, text: "Quantized" },
            { on: true, text: "Humanized" },
          ].map((o) => (
            <Button
              key={o.text}
              variant={humanized === o.on ? "solid" : "ghost"}
              aria-pressed={humanized === o.on}
              onClick={() => setHumanized(o.on)}
              className="flex-1 rounded-[14px]"
            >
              {o.text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { Band } from "@/lib/types";
import { Button } from "../ui/Button";
import { MemberChip } from "./MemberChip";

interface BandCardProps {
  band: Band;
  bandIndex: number;
  /** Quick view shows the line-up; jam mode makes it playable. */
  interactive: boolean;
  isActive?: boolean;
  mutedMembers?: boolean[];
  volume?: number;
  onToggleBand?: () => void;
  onToggleMember?: (index: number) => void;
  onChangeVolume?: (volume: number) => void;
}

export const BandCard: React.FC<BandCardProps> = ({
  band,
  bandIndex,
  interactive,
  isActive = false,
  mutedMembers = [],
  volume = 0.8,
  onToggleBand,
  onToggleMember,
  onChangeVolume,
}) => (
  <article
    className="rounded-card border p-6 flex flex-col gap-4 transition-shadow"
    style={{
      backgroundColor: `color-mix(in srgb, ${band.color} ${interactive && isActive ? 16 : 8}%, var(--surface))`,
      borderColor: `color-mix(in srgb, ${band.color} ${interactive && isActive ? 70 : 30}%, var(--line))`,
    }}
  >
    <div className="flex justify-between items-start gap-3">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">{band.label}</h3>
        <span className="block text-[11px] font-mono uppercase tracking-widest text-muted mt-1.5">
          {band.style} · {band.feel}
        </span>
      </div>
      {interactive && (
        <Button
          variant={isActive ? "active" : "ghost"}
          aria-pressed={isActive}
          onClick={onToggleBand}
          className="text-xs min-h-10 px-4 shrink-0"
        >
          {isActive ? "In the mix" : "Bring in"}
        </Button>
      )}
    </div>

    <p className="text-[15px] text-muted">{band.scope}</p>

    <ul className="flex flex-wrap gap-2" aria-label={`${band.label} line-up`}>
      {band.members.map((m, i) => (
        <li key={m.name}>
          <MemberChip
            id={`${bandIndex}-${i}`}
            member={m}
            color={band.color}
            interactive={interactive}
            active={!mutedMembers[i]}
            onToggle={() => onToggleMember?.(i)}
          />
        </li>
      ))}
    </ul>

    {interactive && (
      <label className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted mt-auto pt-2">
        Vol
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => onChangeVolume?.(Number(e.target.value))}
          className="flex-1 h-8"
          style={{ accentColor: band.color }}
          aria-label={`${band.label} volume`}
        />
      </label>
    )}
  </article>
);

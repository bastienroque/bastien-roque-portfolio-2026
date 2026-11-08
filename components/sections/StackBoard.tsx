"use client";

import React from "react";
import { BANDS } from "@/lib/data/bands";
import { BandCard } from "../modules/BandCard";
import { useMode } from "../providers/ModeProvider";
import { useJam } from "../providers/JamProvider";

export const StackBoard: React.FC = () => {
  const { mode } = useMode();
  const jam = useJam();
  const interactive = mode === "jam";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 mt-10">
      {BANDS.map((band, b) => (
        <BandCard
          key={band.style}
          band={band}
          bandIndex={b}
          interactive={interactive}
          isActive={jam.activeBands[b]}
          mutedMembers={jam.mutedMembers[b]}
          volume={jam.volumes[b]}
          onToggleBand={() => jam.toggleBand(b)}
          onToggleMember={(m) => jam.toggleMember(b, m)}
          onChangeVolume={(v) => jam.setVolume(b, v)}
        />
      ))}
    </div>
  );
};

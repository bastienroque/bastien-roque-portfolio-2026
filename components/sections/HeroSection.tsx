import React from "react";
import { PROFILE } from "@/lib/data/profile";
import { HeroCanvas } from "../audio/HeroCanvas";
import { DrumPads } from "../audio/DrumPads";
import { ModeGate } from "../providers/ModeProvider";

export const HeroSection: React.FC = () => (
  <header id="top" className="stage relative h-svh min-h-160 overflow-hidden">
    <HeroCanvas />

    <div className="absolute inset-x-0 bottom-14 px-5 md:left-[clamp(20px,5vw,64px)] md:right-auto md:max-w-160 flex flex-col gap-4 pointer-events-none z-10 [&>*]:pointer-events-auto">
      <div className="self-start font-mono text-xs uppercase tracking-[0.08em] border border-paper-line rounded-full px-3.5 py-1 bg-paper-glass backdrop-blur-md">
        Developer · Drummer · {PROFILE.status}
      </div>
      <h1 className="text-[clamp(44px,11.5vw,104px)] font-bold tracking-tight leading-none drop-shadow-md">
        Code with
        <br />a pocket.
      </h1>
      <p className="max-w-[46ch] text-[clamp(16px,2.2vw,19px)] text-paper-muted">
        I&apos;m {PROFILE.name}, a {PROFILE.role.toLowerCase()} in {PROFILE.location.split(",")[0]}. I
        build web products end to end, with a drummer&apos;s ear for timing.
      </p>

      <ModeGate show="quick">
        <div className="flex flex-wrap gap-3 mt-2">
          <a
            href="#work"
            className="inline-flex items-center min-h-12 px-6 rounded-full bg-paper text-ink font-medium text-[15px] hover:-translate-y-0.5 transition"
          >
            See the work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center min-h-12 px-6 rounded-full border border-paper-line font-medium text-[15px] hover:border-paper transition"
          >
            Get in touch
          </a>
        </div>
      </ModeGate>

      <ModeGate show="jam">
        <DrumPads />
      </ModeGate>
    </div>
  </header>
);

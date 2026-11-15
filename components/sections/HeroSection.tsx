import React from "react";
import { HERO_INTRO, PROFILE } from "@/lib/data/profile";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Short, text-led intro: who, what, and straight on to the work. */
export const HeroSection: React.FC = () => (
  <header id="top" className="stage relative overflow-hidden px-5 pt-36 pb-20 md:pt-44 md:pb-28">
    <div className="max-w-290 mx-auto">
      <p className="rise font-mono text-xs uppercase tracking-[0.08em] text-paper-muted" style={delay(0)}>
        {PROFILE.name} · {PROFILE.location} ·{" "}
        <span className="text-accent">{PROFILE.status}</span>
      </p>

      <h1
        className="rise mt-5 max-w-[14ch] text-[clamp(44px,9vw,104px)] font-bold tracking-tight leading-[0.95] text-balance"
        style={delay(80)}
      >
        {PROFILE.tagline}
      </h1>

      <p className="rise mt-6 max-w-[52ch] text-[clamp(17px,2.2vw,20px)] text-paper-muted text-pretty" style={delay(160)}>
        {HERO_INTRO}
      </p>

      <ul className="rise flex flex-wrap gap-2 mt-7" style={delay(240)} aria-label="Skills">
        {PROFILE.keywords.map((k) => (
          <li
            key={k}
            className="font-mono text-xs uppercase tracking-[0.08em] border border-paper-line rounded-full px-3.5 py-1.5 bg-paper-glass"
          >
            {k}
          </li>
        ))}
      </ul>

      <div className="rise flex flex-wrap gap-3 mt-9" style={delay(320)}>
        <a
          href="#work"
          className="inline-flex items-center min-h-12 px-6 rounded-full bg-accent text-on-accent font-medium text-[15px] transition hover:-translate-y-0.5"
        >
          See the projects ↓
        </a>
        <a
          href="#contact"
          className="inline-flex items-center min-h-12 px-6 rounded-full border border-paper-line font-medium text-[15px] transition hover:border-paper"
        >
          Get in touch
        </a>
      </div>
    </div>
  </header>
);

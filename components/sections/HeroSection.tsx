import React from "react";
import { ALSO, PROFILE } from "@/lib/data/profile";
import { LocalTime } from "../ui/LocalTime";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Name and title at the same scale, then the other things I am. */
export const HeroSection: React.FC = () => (
  <header
    id="top"
    className="bg-bg border-b border-line px-5 pt-32 pb-20 md:pt-40 md:pb-28"
  >
    <div className="max-w-290 mx-auto">
      <p className="rise text-sm text-dim" style={delay(0)}>
        <span className="text-accent-deep">~/</span>
        {PROFILE.location.split(",")[0].toLowerCase()}{" "}
        <span className="text-line">·</span>{" "}
        <LocalTime timeZone={PROFILE.timeZone} className="text-muted" />
      </p>

      <h1
        className="rise mt-6 text-[clamp(34px,7vw,80px)] font-semibold tracking-[-0.04em] leading-[1.02]"
        style={delay(80)}
      >
        <span className="block text-fg">{PROFILE.name}</span>
        <span className="block text-accent-deep cursor">{PROFILE.role}</span>
      </h1>

      <div
        className="rise mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1"
        style={delay(160)}
      >
        <span className="text-sm text-dim">previously:</span>
        <ul
          className="flex flex-wrap items-baseline text-[clamp(15px,2vw,18px)] text-muted"
          aria-label="Also"
        >
          {ALSO.map((k, i) => (
            <li key={k} className="whitespace-nowrap">
              {k}
              {i < ALSO.length - 1 && (
                <span aria-hidden="true" className="text-accent-deep px-2.5">
                  /
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="rise flex flex-wrap gap-3 mt-10" style={delay(240)}>
        <a
          href="#work"
          className="inline-flex items-center min-h-11 px-5 rounded-md bg-accent text-on-accent text-sm font-medium transition-colors hover:bg-accent-deep hover:text-white"
        >
          See the projects ↓
        </a>
        <a
          href="#contact"
          className="inline-flex items-center min-h-11 px-5 rounded-md border border-line bg-bg text-sm font-medium transition-colors hover:border-accent-deep hover:text-accent-deep"
        >
          Get in touch
        </a>
      </div>
    </div>
  </header>
);

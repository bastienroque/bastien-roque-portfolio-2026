"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data/profile";
import { bandCount } from "@/lib/data/bands";
import { Mode, useMode } from "../providers/ModeProvider";

/**
 * First visit only: "Quick look or jam session?". Picking jam plays a silent
 * visual count-in (sound stays opt-in). Escape picks quick view.
 */
export const ArrivalChooser: React.FC = () => {
  const { mode, ready, setMode } = useMode();
  const [count, setCount] = useState<number | null>(null);
  const firstButton = useRef<HTMLButtonElement>(null);
  const open = ready && mode === null;

  useEffect(() => {
    if (!open) return;
    firstButton.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMode("quick");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setMode]);

  if (!open) return null;

  const choose = (next: Mode) => {
    if (next === "quick" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode(next);
      return;
    }
    let n = 1;
    setCount(n);
    const id = setInterval(() => {
      n += 1;
      if (n > 4) {
        clearInterval(id);
        setCount(null);
        setMode("jam");
      } else {
        setCount(n);
      }
    }, 380);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="arrival-title"
      className="stage fixed inset-0 z-60 flex flex-col items-center justify-center gap-8 text-center p-6 overflow-y-auto"
    >
      {count === null ? (
        <div
          aria-hidden="true"
          className="logo-mask w-[clamp(180px,42vw,340px)] aspect-135/74 bg-linear-to-br from-accent to-accent-soft"
        />
      ) : (
        <div
          aria-hidden="true"
          className="h-[clamp(120px,32vw,260px)] flex items-center text-[clamp(120px,32vw,260px)] font-semibold leading-none tracking-tight bg-linear-to-br from-accent to-accent-soft bg-clip-text text-transparent tabular-nums"
        >
          {count}
        </div>
      )}

      {count === null ? (
        <>
          <div>
            <h1 id="arrival-title" className="text-[clamp(26px,5vw,40px)] font-semibold tracking-tight">
              Quick look or jam session?
            </h1>
            <p className="mt-2 text-paper-muted">
              {PROFILE.name} · {PROFILE.role} &amp; drummer
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 w-full max-w-160">
            <button
              ref={firstButton}
              type="button"
              onClick={() => choose("quick")}
              className="text-left rounded-card p-5 bg-paper text-ink transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
            >
              <b className="block text-xl font-semibold">Quick look</b>
              <span className="block mt-1 text-[15px] opacity-70">
                The portfolio, straight up. About a minute to read.
              </span>
            </button>
            <button
              type="button"
              onClick={() => choose("jam")}
              className="text-left rounded-card p-5 border border-paper-line bg-paper-glass transition hover:border-paper hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
            >
              <b className="block text-xl font-semibold">Jam session</b>
              <span className="block mt-1 text-[15px] text-paper-muted">
                Play the site: drum pads, {bandCount} bands, time signatures. Sound is up to you.
              </span>
            </button>
          </div>

          <p className="font-mono text-xs text-paper-muted">You can switch any time from the top bar.</p>
        </>
      ) : (
        <p id="arrival-title" className="font-mono text-xs uppercase tracking-widest text-paper-muted">
          Counting in…
        </p>
      )}
    </div>
  );
};

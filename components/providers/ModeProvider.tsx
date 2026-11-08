"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Mode = "quick" | "jam";

interface ModeContextValue {
  /** null until the visitor has picked one */
  mode: Mode | null;
  /** false during SSR and the first client render, before storage is read */
  ready: boolean;
  setMode: (mode: Mode) => void;
  resetMode: () => void;
}

const STORAGE_KEY = "br-mode";
const ModeContext = createContext<ModeContextValue | null>(null);

const isMode = (v: unknown): v is Mode => v === "quick" || v === "jam";

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // A ?mode= link wins over what this visitor picked last time.
    const fromUrl = new URLSearchParams(window.location.search).get("mode");
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {}
    const initial = isMode(fromUrl) ? fromUrl : isMode(stored) ? stored : null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading browser-only storage after hydration
    setModeState(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode ?? "quick";
  }, [mode]);

  const setMode = useCallback((next: Mode) => {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const resetMode = useCallback(() => {
    setModeState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <ModeContext.Provider value={{ mode, ready, setMode, resetMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used inside <ModeProvider>");
  return ctx;
}

/** Renders children only in the given mode. Until a mode is picked, the site behaves as quick view. */
export function ModeGate({ show, children }: { show: Mode; children: React.ReactNode }) {
  const { mode } = useMode();
  const current = mode ?? "quick";
  return current === show ? <>{children}</> : null;
}

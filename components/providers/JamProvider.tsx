"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { audioEngine } from "@/lib/audio/context";
import { DRUM_NAMES, DRUM_SYNTHS } from "@/lib/audio/instruments";
import { MixState, Position, Scheduler } from "@/lib/audio/scheduler";
import { addRing } from "@/lib/audio/visuals";
import { BANDS } from "@/lib/data/bands";
import { useMode } from "./ModeProvider";

const KEYS: Record<string, number> = { a: 0, s: 1, d: 2, f: 3, g: 4 };

interface LogLine {
  id: number;
  text: string;
}

interface JamContextValue extends MixState {
  isPlaying: boolean;
  soundOn: boolean;
  position: Position | null;
  logs: LogLine[];
  togglePlay: () => void;
  toggleSound: () => void;
  fireHit: (index: number, velocity?: number, x?: number, y?: number) => void;
  setBpm: (bpm: number) => void;
  setMeter: (meter: string) => void;
  setHumanized: (on: boolean) => void;
  toggleBand: (band: number) => void;
  toggleMember: (band: number, member: number) => void;
  setVolume: (band: number, volume: number) => void;
}

const JamContext = createContext<JamContextValue | null>(null);

export function JamProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useMode();

  const [mix, setMix] = useState<MixState>(() => ({
    bpm: 110,
    meter: "4/4",
    humanized: false,
    activeBands: BANDS.map((_, i) => i === 0),
    mutedMembers: BANDS.map((b) => b.members.map(() => false)),
    volumes: BANDS.map(() => 0.8),
  }));
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [logs, setLogs] = useState<LogLine[]>([]);

  // The scheduler reads the latest mix through a ref, so changes land on the next bar.
  const mixRef = useRef(mix);
  useEffect(() => {
    mixRef.current = mix;
  }, [mix]);
  const schedulerRef = useRef<Scheduler | null>(null);
  const getScheduler = () => (schedulerRef.current ??= new Scheduler(() => mixRef.current));

  const log = useCallback((text: string) => {
    setLogs((prev) => [...prev.slice(-2), { id: Date.now() + Math.random(), text }]);
  }, []);

  const stop = useCallback(() => {
    schedulerRef.current?.stop();
    setIsPlaying(false);
    setPosition(null);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stop();
      log("band.stop()");
      return;
    }
    // Pressing play is the opt-in: it turns the sound on.
    if (!audioEngine.init()) return;
    setSoundOn(true);
    getScheduler().start();
    setIsPlaying(true);
    log("band.play() // count it in");
  }, [isPlaying, stop, log]);

  const toggleSound = useCallback(() => {
    if (soundOn) {
      stop();
      audioEngine.release();
      setSoundOn(false);
      log("sound.off()");
    } else if (audioEngine.init()) {
      setSoundOn(true);
      log("sound.on() // headphones help");
    }
  }, [soundOn, stop, log]);

  const fireHit = useCallback(
    (index: number, velocity = 0.85, x?: number, y?: number) => {
      const ac = audioEngine.context;
      if (soundOn && ac) DRUM_SYNTHS[index](ac.currentTime, velocity);
      addRing(index, velocity, x, y);
      const dyn = velocity < 0.3 ? "ghost note" : velocity > 0.85 ? "accent" : "normal";
      log(
        soundOn
          ? `hit(${DRUM_NAMES[index].toLowerCase()}, ${velocity.toFixed(2)}) // ${dyn}`
          : `hit(${DRUM_NAMES[index].toLowerCase()}) // muted, tap ♪ to hear it`,
      );
    },
    [soundOn, log],
  );

  // Leaving jam mode stops the band.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing audio with the mode
    if (mode !== "jam") stop();
  }, [mode, stop]);

  // Clean up the timer if the provider ever unmounts.
  useEffect(() => () => schedulerRef.current?.stop(), []);

  // Keyboard drums, jam mode only. Shift for ghost notes.
  useEffect(() => {
    if (mode !== "jam") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      if (/INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement).tagName)) return;
      const idx = KEYS[e.key.toLowerCase()];
      if (idx != null) fireHit(idx, e.shiftKey ? 0.25 : 0.85);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, fireHit]);

  // Follow the playhead for the transport display, updating only when the beat changes.
  useEffect(() => {
    if (!isPlaying) return;
    let raf = 0;
    let last = "";
    const loop = () => {
      const pos = schedulerRef.current?.position() ?? null;
      const key = pos ? `${pos.bar}:${pos.beat}` : "";
      if (key !== last) {
        last = key;
        setPosition(pos);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying]);

  const update = (patch: Partial<MixState>) => setMix((m) => ({ ...m, ...patch }));

  const value: JamContextValue = {
    ...mix,
    isPlaying,
    soundOn,
    position,
    logs,
    togglePlay,
    toggleSound,
    fireHit,
    setBpm: (bpm) => update({ bpm }),
    setMeter: (meter) => {
      update({ meter });
      log(`meter.set("${meter}") // every band rearranges`);
    },
    setHumanized: (humanized) => update({ humanized }),
    toggleBand: (b) =>
      setMix((m) => ({ ...m, activeBands: m.activeBands.map((on, i) => (i === b ? !on : on)) })),
    toggleMember: (b, mi) =>
      setMix((m) => ({
        ...m,
        mutedMembers: m.mutedMembers.map((row, i) =>
          i === b ? row.map((muted, j) => (j === mi ? !muted : muted)) : row,
        ),
      })),
    setVolume: (b, v) =>
      setMix((m) => ({ ...m, volumes: m.volumes.map((x, i) => (i === b ? v : x)) })),
  };

  return <JamContext.Provider value={value}>{children}</JamContext.Provider>;
}

export function useJam() {
  const ctx = useContext(JamContext);
  if (!ctx) throw new Error("useJam must be used inside <JamProvider>");
  return ctx;
}

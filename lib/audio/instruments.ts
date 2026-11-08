import { audioEngine } from "./context";
import { AudioEvent, Member } from "../types";

/*
 * Every sound is synthesised on the fly from oscillators and the shared
 * noise/metal buffers. Each note builds a tiny graph:
 *   source(s) → filter → amp envelope → panner → dry bus (+ reverb send)
 */

const midiToFreq = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

/** Velocity feels more natural on a curve: soft notes get softer. */
const vel = (v: number) => Math.pow(Math.max(0, Math.min(1.2, v)), 1.4);

/** Where a voice enters the mix: a panner feeding the dry bus and the reverb send. */
function output(ac: AudioContext, pan: number, send: number): AudioNode | null {
  const dry = audioEngine.destination;
  const wet = audioEngine.reverb;
  if (!dry || !wet) return null;
  const p = ac.createStereoPanner();
  p.pan.value = pan;
  p.connect(dry);
  if (send > 0) {
    const s = ac.createGain();
    s.gain.value = send;
    p.connect(s).connect(wet);
  }
  return p;
}

/** Percussive envelope: fast attack, exponential decay. */
function hitEnv(
  ac: AudioContext,
  t: number,
  peak: number,
  attack: number,
  decay: number,
): GainNode {
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  return g;
}

function bufferHit(
  t: number,
  buffer: AudioBuffer | null,
  filters: [BiquadFilterType, number, number][],
  peak: number,
  decay: number,
  pan: number,
  send: number,
  rate = 1,
) {
  const ac = audioEngine.context;
  if (!ac || !buffer) return;
  const out = output(ac, pan, send);
  if (!out) return;
  const src = ac.createBufferSource();
  src.buffer = buffer;
  src.loop = true;
  src.playbackRate.value = rate;
  // Random start point so repeated hits don't sound like a loop.
  const offset = Math.random() * 0.5;
  let node: AudioNode = src;
  for (const [type, f, q] of filters) {
    const bq = ac.createBiquadFilter();
    bq.type = type;
    bq.frequency.value = f;
    bq.Q.value = q;
    node = node.connect(bq);
  }
  node.connect(hitEnv(ac, t, peak, 0.001, decay)).connect(out);
  src.start(t, offset);
  src.stop(t + decay + 0.05);
}

function pitchedHit(
  t: number,
  type: OscillatorType,
  f0: number,
  f1: number,
  drop: number,
  peak: number,
  decay: number,
  pan: number,
  send: number,
) {
  const ac = audioEngine.context;
  if (!ac) return;
  const out = output(ac, pan, send);
  if (!out) return;
  const o = ac.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(f1, t + drop);
  o.connect(hitEnv(ac, t, peak, 0.002, decay)).connect(out);
  o.start(t);
  o.stop(t + decay + 0.05);
}

// ---------- Drums ----------

const noise = () => audioEngine.noise;
const metal = () => audioEngine.metal;

const kick = (t: number, v: number, pan = 0) => {
  const a = vel(v);
  pitchedHit(t, "sine", 165, 46, 0.11, a * 1.1, 0.42, pan, 0.04);
  bufferHit(t, noise(), [["highpass", 2500, 0.7]], a * 0.18, 0.012, pan, 0);
};

const snare = (t: number, v: number, pan = 0) => {
  const a = vel(v);
  pitchedHit(t, "triangle", 230, 175, 0.05, a * 0.55, 0.11, pan, 0.15);
  bufferHit(
    t,
    noise(),
    [
      ["highpass", 900, 0.7],
      ["peaking", 3200, 1],
    ],
    a * 0.6,
    0.17,
    pan,
    0.22,
  );
};

const closedHat = (t: number, v: number, pan = 0.2) =>
  bufferHit(
    t,
    metal(),
    [
      ["bandpass", 10000, 1.2],
      ["highpass", 7000, 0.7],
    ],
    vel(v) * 0.32,
    0.045,
    pan,
    0.08,
  );

const openHat = (t: number, v: number, pan = 0.2) =>
  bufferHit(
    t,
    metal(),
    [
      ["bandpass", 10000, 1.2],
      ["highpass", 7000, 0.7],
    ],
    vel(v) * 0.26,
    0.32,
    pan,
    0.12,
  );

const ride = (t: number, v: number, pan = 0.3) => {
  bufferHit(
    t,
    metal(),
    [
      ["bandpass", 7500, 1.5],
      ["highpass", 4500, 0.7],
    ],
    vel(v) * 0.2,
    0.7,
    pan,
    0.25,
    0.85,
  );
  pitchedHit(t, "sine", 2950, 2900, 0.5, vel(v) * 0.05, 0.6, pan, 0.2);
};

const tom = (t: number, v: number, pan = -0.25) => {
  pitchedHit(t, "sine", 210, 125, 0.18, vel(v) * 0.85, 0.42, pan, 0.18);
  bufferHit(t, noise(), [["lowpass", 1800, 0.7]], vel(v) * 0.1, 0.05, pan, 0.1);
};

const crash = (t: number, v: number, pan = -0.3) => {
  bufferHit(
    t,
    metal(),
    [["highpass", 4500, 0.7]],
    vel(v) * 0.22,
    1.6,
    pan,
    0.35,
    0.9,
  );
  bufferHit(
    t,
    noise(),
    [["highpass", 6000, 0.7]],
    vel(v) * 0.14,
    1.2,
    pan,
    0.35,
  );
};

const clap = (t: number, v: number, pan = 0) => {
  // Several hands, a few milliseconds apart, then a short room tail.
  const a = vel(v);
  [0, 0.011, 0.023].forEach((d) =>
    bufferHit(
      t + d,
      noise(),
      [["bandpass", 1300, 1.8]],
      a * 0.5,
      0.025,
      pan,
      0.2,
    ),
  );
  bufferHit(
    t + 0.03,
    noise(),
    [["bandpass", 1200, 1.2]],
    a * 0.35,
    0.16,
    pan,
    0.35,
  );
};

const strum = (t: number, v: number, pan = 0.35) =>
  bufferHit(
    t,
    noise(),
    [["bandpass", 2600, 2.5]],
    vel(v) * 0.4,
    0.03,
    pan,
    0.08,
  );

const shaker = (t: number, v: number, pan = -0.35) =>
  bufferHit(
    t,
    noise(),
    [
      ["highpass", 5500, 0.7],
      ["peaking", 9000, 1.5],
    ],
    vel(v) * 0.22,
    0.055,
    pan,
    0.1,
  );

const conga =
  (hi: boolean) =>
  (t: number, v: number, pan = hi ? 0.4 : -0.4) => {
    const f = hi ? 330 : 220;
    pitchedHit(
      t,
      "sine",
      f * 1.25,
      f,
      0.03,
      vel(v) * 0.75,
      hi ? 0.2 : 0.28,
      pan,
      0.18,
    );
    bufferHit(
      t,
      noise(),
      [["bandpass", hi ? 3000 : 2000, 1.5]],
      vel(v) * 0.12,
      0.02,
      pan,
      0.1,
    );
  };

const clave = (t: number, v: number, pan = 0.5) =>
  pitchedHit(t, "sine", 2500, 2450, 0.05, vel(v) * 0.45, 0.06, pan, 0.25);

/** The five hand-playable drums: pads, keys and the hero canvas. */
export const DRUM_SYNTHS = [
  (t: number, v: number) => kick(t, v),
  (t: number, v: number) => snare(t, v),
  (t: number, v: number) => closedHat(t, v),
  (t: number, v: number) => tom(t, v),
  (t: number, v: number) => crash(t, v),
];

export const DRUM_NAMES = ["Kick", "Snare", "Hat", "Tom", "Crash"];
export const KEY_LABELS = ["A", "S", "D", "F", "G"];
export const DRUM_COLORS = [
  "#1DD37B",
  "#B6F7D4",
  "#F2EFE9",
  "#2DD4B6",
  "#E8E36B",
];

/** Unpitched hits the sequencer emits, keyed by event type. */
const HITS: Record<string, (t: number, v: number, pan?: number) => void> = {
  k: kick,
  s: snare,
  h: closedHat,
  o: openHat,
  r: ride,
  p: clap,
  x: strum,
  z: shaker,
  a: conga(true),
  b: conga(false),
  l: clave,
};

// ---------- Pitched instruments ----------

interface Patch {
  /** Oscillator detune offsets in cents, one oscillator each. */
  detune: number[];
  /** Extra sine one octave down (bass weight). */
  sub?: number;
  attack: number;
  /** Amp falls to this fraction of the peak over the note… */
  sustain: number;
  /** …taking this long. */
  decay: number;
  release: number;
  /** Filter cutoff starts at cutoff × filterAmount and settles at cutoff. */
  filterAmount: number;
  filterDecay: number;
  q: number;
  /** Vibrato depth in cents, fading in after a moment. */
  vibrato?: number;
  /** A puff of breath noise on the attack. */
  breath?: number;
  send: number;
  level: number;
}

/** The patch a member plays, chosen by role. Waveform, cutoff and level come from the member. */
const PATCHES: Record<string, Patch> = {
  ba: {
    detune: [0],
    sub: 0.5,
    attack: 0.006,
    sustain: 0.55,
    decay: 0.35,
    release: 0.08,
    filterAmount: 2.4,
    filterDecay: 0.12,
    q: 2,
    send: 0.05,
    level: 0.32,
  },
  cp: {
    detune: [-7, 7],
    attack: 0.004,
    sustain: 0.3,
    decay: 0.45,
    release: 0.12,
    filterAmount: 3,
    filterDecay: 0.18,
    q: 1,
    send: 0.22,
    level: 0.16,
  },
  pd: {
    detune: [-12, 0, 12],
    attack: 0.35,
    sustain: 0.9,
    decay: 1,
    release: 0.6,
    filterAmount: 0.6,
    filterDecay: 0.8,
    q: 0.5,
    send: 0.55,
    level: 0.1,
  },
  ld: {
    detune: [0],
    attack: 0.03,
    sustain: 0.8,
    decay: 0.5,
    release: 0.15,
    filterAmount: 1.6,
    filterDecay: 0.15,
    q: 1.5,
    vibrato: 14,
    breath: 0.08,
    send: 0.3,
    level: 0.2,
  },
  hn: {
    detune: [-9, 9],
    attack: 0.025,
    sustain: 0.75,
    decay: 0.3,
    release: 0.1,
    filterAmount: 0.35,
    filterDecay: 0.06,
    q: 1.2,
    send: 0.28,
    level: 0.13,
  },
};

function playVoice(
  t: number,
  v: number,
  midi: number,
  dur: number,
  member: Member,
  pan: number,
) {
  const ac = audioEngine.context;
  if (!ac) return;
  const patch = PATCHES[member.role] ?? PATCHES.cp;
  const [type, cutoff, attackHint, gainHint] = member.waveform ?? [
    "triangle",
    2000,
    patch.attack,
    0.6,
  ];
  const out = output(ac, pan, patch.send);
  if (!out) return;

  const attack = Math.max(patch.attack, attackHint);
  const peak = Math.max(0.0002, vel(v) * gainHint * patch.level);
  const noteEnd = t + Math.max(dur, attack + 0.02);
  const stop = noteEnd + patch.release + 0.05;
  const freq = midiToFreq(midi);

  // Filter: opens on the attack, then settles (a "pluck" or a "swell").
  const filter = ac.createBiquadFilter();
  filter.type = "lowpass";
  filter.Q.value = patch.q;
  const fStart = Math.min(16000, cutoff * patch.filterAmount);
  filter.frequency.setValueAtTime(fStart, t);
  filter.frequency.exponentialRampToValueAtTime(
    Math.max(80, cutoff),
    t + attack + patch.filterDecay,
  );

  // Amp: attack → decay toward sustain → hold → release.
  const amp = ac.createGain();
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(peak, t + attack);
  amp.gain.setTargetAtTime(peak * patch.sustain, t + attack, patch.decay / 3);
  amp.gain.setTargetAtTime(0.0001, noteEnd, patch.release / 3);
  filter.connect(amp).connect(out);

  const voices = patch.detune.length + (patch.sub ? 1 : 0);
  const mix = ac.createGain();
  mix.gain.value = 1 / Math.sqrt(voices);
  mix.connect(filter);

  // Vibrato: one LFO shared by the oscillators, fading in after the attack.
  let lfoDepth: GainNode | null = null;
  if (patch.vibrato) {
    const lfo = ac.createOscillator();
    lfo.frequency.value = 5.2;
    lfoDepth = ac.createGain();
    lfoDepth.gain.setValueAtTime(0, t);
    lfoDepth.gain.linearRampToValueAtTime(patch.vibrato, t + 0.25);
    lfo.connect(lfoDepth);
    lfo.start(t);
    lfo.stop(stop);
  }

  for (const cents of patch.detune) {
    const o = ac.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    o.detune.value = cents;
    if (lfoDepth) lfoDepth.connect(o.detune);
    o.connect(mix);
    o.start(t);
    o.stop(stop);
  }

  if (patch.sub) {
    const s = ac.createOscillator();
    s.type = "sine";
    s.frequency.value = freq / 2;
    const g = ac.createGain();
    g.gain.value = patch.sub;
    s.connect(g).connect(mix);
    s.start(t);
    s.stop(stop);
  }

  if (patch.breath) {
    bufferHit(
      t,
      audioEngine.noise,
      [["bandpass", Math.min(8000, freq * 3), 2]],
      peak * patch.breath * 6,
      0.09,
      pan,
      patch.send,
    );
  }
}

/** Play one sequencer event for a band member at audio time `t`. */
export function playEvent(
  ev: AudioEvent,
  t: number,
  member: Member,
  volume: number,
  secPerTick: number,
  pan = 0,
): void {
  const v = ev.velocity * volume;
  const hit = HITS[ev.type];
  if (hit) {
    // Drummers keep the kit's own stereo layout; percussionists use their spot.
    hit(t, v, member.role === "dr" ? undefined : pan);
    return;
  }
  if (ev.note == null) return;

  const notes = Array.isArray(ev.note) ? ev.note : [ev.note];
  // Chords share the level so they don't clip, and roll slightly like real hands.
  const share = notes.length > 1 ? 1 / Math.sqrt(notes.length) : 1;
  const roll = member.role === "cp" && notes.length > 1 ? 0.008 : 0;
  const dur = ev.duration * secPerTick;
  notes.forEach((n, i) =>
    playVoice(t + i * roll, v * share, n, dur, member, pan),
  );
}

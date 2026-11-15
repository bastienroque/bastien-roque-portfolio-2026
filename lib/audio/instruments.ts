import { audioEngine } from "./context";

/*
 * A five-piece drum kit, synthesised on the fly from oscillators and the
 * engine's shared noise/metal buffers. Each hit builds a tiny graph:
 *   source → filter(s) → envelope → panner → dry bus (+ reverb send)
 * Every hit varies pitch and level a touch, so fast playing sounds human.
 */

/** Velocity feels more natural on a curve: soft notes get softer. */
const curve = (v: number) => Math.pow(Math.max(0, Math.min(1.2, v)), 1.4);
/** ±amount random variation around 1. */
const vary = (amount: number) => 1 + (Math.random() * 2 - 1) * amount;

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

/** Fast attack, exponential decay. */
function envelope(ac: AudioContext, t: number, peak: number, attack: number, decay: number) {
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  return g;
}

/** A tone that glides from f0 to f1: drum bodies and shells. */
function tone(
  out: AudioNode,
  t: number,
  type: OscillatorType,
  f0: number,
  f1: number,
  glide: number,
  peak: number,
  decay: number,
) {
  const ac = audioEngine.context!;
  const o = ac.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(f1, t + glide);
  o.connect(envelope(ac, t, peak, 0.002, decay)).connect(out);
  o.start(t);
  o.stop(t + decay + 0.05);
}

/** A filtered burst of the noise or metal buffer: wires, cymbals, clicks. */
function burst(
  out: AudioNode,
  t: number,
  buffer: AudioBuffer | null,
  filters: [BiquadFilterType, number, number][],
  peak: number,
  decay: number,
  attack = 0.001,
  rate = 1,
) {
  const ac = audioEngine.context!;
  if (!buffer) return;
  const src = ac.createBufferSource();
  src.buffer = buffer;
  src.loop = true;
  src.playbackRate.value = rate;
  let node: AudioNode = src;
  for (const [type, f, q] of filters) {
    const bq = ac.createBiquadFilter();
    bq.type = type;
    bq.frequency.value = f;
    bq.Q.value = q;
    node = node.connect(bq);
  }
  node.connect(envelope(ac, t, peak, attack, decay)).connect(out);
  // Random start point so repeated hits never sound like the same sample.
  src.start(t, Math.random() * 0.5);
  src.stop(t + attack + decay + 0.05);
}

const kick = (t: number, v: number) => {
  const ac = audioEngine.context;
  const out = ac && output(ac, 0, 0.03);
  if (!out) return;
  const a = curve(v) * vary(0.06);
  const p = vary(0.03);
  tone(out, t, "sine", 115 * p, 46 * p, 0.07, a * 1.15, 0.5); // body
  tone(out, t, "triangle", 230 * p, 60 * p, 0.03, a * 0.3, 0.06); // punch
  burst(out, t, audioEngine.noise, [["highpass", 1500, 0.7], ["lowpass", 5000, 0.7]], a * 0.16, 0.006); // beater
};

const snare = (t: number, v: number) => {
  const ac = audioEngine.context;
  const out = ac && output(ac, 0, 0.18);
  if (!out) return;
  const a = curve(v) * vary(0.08);
  const p = vary(0.03);
  tone(out, t, "sine", 212 * p, 185 * p, 0.02, a * 0.5, 0.09); // shell
  tone(out, t, "sine", 380 * p, 330 * p, 0.02, a * 0.25, 0.06); // shell overtone
  burst(out, t, audioEngine.noise, [["highpass", 1800, 0.7], ["peaking", 5000, 0.9]], a * 0.7, 0.22); // wires
};

const hat = (t: number, v: number) => {
  const ac = audioEngine.context;
  const out = ac && output(ac, 0.25, 0.06);
  if (!out) return;
  burst(out, t, audioEngine.metal, [["highpass", 7500, 0.7], ["bandpass", 10500, 0.9]], curve(v) * 0.75 * vary(0.1), 0.06 * vary(0.15));
};

const tom = (t: number, v: number) => {
  const ac = audioEngine.context;
  const out = ac && output(ac, -0.2, 0.12);
  if (!out) return;
  const a = curve(v) * vary(0.06);
  const p = vary(0.03);
  tone(out, t, "sine", 150 * p, 95 * p, 0.25, a * 0.95, 0.5); // body
  tone(out, t, "triangle", 300 * p, 190 * p, 0.12, a * 0.12, 0.15); // overtone
  burst(out, t, audioEngine.noise, [["lowpass", 1200, 0.7]], a * 0.12, 0.03); // stick
};

const crash = (t: number, v: number) => {
  const ac = audioEngine.context;
  const out = ac && output(ac, -0.3, 0.3);
  if (!out) return;
  const a = curve(v) * vary(0.06);
  burst(out, t, audioEngine.metal, [["highpass", 5000, 0.7]], a * 0.32, 2, 0.008, 0.95 * vary(0.02));
  burst(out, t, audioEngine.noise, [["highpass", 7000, 0.7]], a * 0.18, 1.4, 0.008);
};

export const DRUMS = [
  { name: "Kick", key: "A", color: "#1DD37B", play: kick },
  { name: "Snare", key: "S", color: "#B6F7D4", play: snare },
  { name: "Hat", key: "D", color: "#F2EFE9", play: hat },
  { name: "Tom", key: "F", color: "#2DD4B6", play: tom },
  { name: "Crash", key: "G", color: "#E8E36B", play: crash },
];

/** Play drum `index` now. */
export function hitDrum(index: number, velocity = 0.85) {
  const ac = audioEngine.context;
  if (ac) DRUMS[index]?.play(ac.currentTime, velocity);
}

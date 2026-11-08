import { audioEngine } from "./context";
import { generateBarEvents } from "./sequencer";
import { playEvent } from "./instruments";
import { addRing, flashMember } from "./visuals";
import { BANDS, METERS } from "../data/bands";

export interface MixState {
  bpm: number;
  meter: string;
  humanized: boolean;
  activeBands: boolean[];
  mutedMembers: boolean[][];
  volumes: number[];
}

export interface Position {
  bar: number;
  beat: number;
}

/**
 * Stereo seat for each player: drums and bass in the centre, everyone else
 * alternating left and right, a little wider each time, like a stage.
 */
const panFor = (role: string, memberIndex: number) => {
  if (role === "dr" || role === "ba") return 0;
  const side = memberIndex % 2 === 0 ? -1 : 1;
  return side * Math.min(0.65, 0.25 + 0.12 * Math.floor(memberIndex / 2));
};

const LOOKAHEAD = 0.2; // seconds of audio queued ahead of the clock
const TICK_MS = 25;
const TICKS_PER_QUARTER = 24;

/**
 * Lookahead scheduler: a cheap timer wakes up every 25 ms and queues whole
 * bars on the audio clock just before they're due. Sounds are timed by the
 * AudioContext, not by the timer, so a busy main thread can't make the
 * band drag. Mix changes apply from the next bar.
 */
export class Scheduler {
  private timer: ReturnType<typeof setInterval> | null = null;
  private bar = 0;
  private nextBarTime = 0;
  private bars: { start: number; secPerPulse: number; pulses: number }[] = [];

  constructor(private getMix: () => MixState) {}

  start() {
    const ac = audioEngine.context;
    if (!ac || this.timer) return;
    this.bar = 0;
    this.bars = [];
    this.nextBarTime = ac.currentTime + 0.08;
    this.timer = setInterval(() => this.tick(), TICK_MS);
    this.tick();
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.bars = [];
  }

  get running() {
    return this.timer !== null;
  }

  /** Where the band is right now, for the transport display. */
  position(): Position | null {
    const ac = audioEngine.context;
    if (!ac || !this.running) return null;
    const now = ac.currentTime;
    for (let i = this.bars.length - 1; i >= 0; i--) {
      const b = this.bars[i];
      if (now >= b.start) {
        const beat = Math.min(
          b.pulses - 1,
          Math.floor((now - b.start) / b.secPerPulse),
        );
        return { bar: this.barNumberAt(i), beat: beat + 1 };
      }
    }
    return { bar: 1, beat: 1 };
  }

  private barNumberAt(i: number) {
    return this.bar - (this.bars.length - 1 - i);
  }

  private tick() {
    const ac = audioEngine.context;
    if (!ac) return;
    while (this.nextBarTime < ac.currentTime + LOOKAHEAD) {
      this.scheduleBar(this.nextBarTime);
    }
  }

  private scheduleBar(start: number) {
    const mix = this.getMix();
    const M = METERS[mix.meter] ?? METERS["4/4"];
    const secPerTick = 60 / mix.bpm / TICKS_PER_QUARTER;
    const barTicks = M.Pulse * M.Units;
    const ac = audioEngine.context!;

    BANDS.forEach((band, b) => {
      if (!mix.activeBands[b]) return;
      band.members.forEach((member, m) => {
        if (mix.mutedMembers[b]?.[m]) return;
        const events = generateBarEvents(member, mix.meter, this.bar, this.bar * 31 + m);
        for (const ev of events) {
          const drift = mix.humanized ? (Math.random() - 0.5) * 0.018 : 0;
          const vel = mix.humanized ? 0.85 + Math.random() * 0.3 : 1;
          const t = Math.max(ac.currentTime, start + ev.time * secPerTick + drift);
          playEvent({ ...ev, velocity: ev.velocity * vel }, t, member, mix.volumes[b] ?? 0.8, secPerTick, panFor(member.role, m));

          // Visuals, timed to the moment the note sounds: the member's chip
          // flashes, and the drummer's kick and snare ripple the logo.
          if (document.hidden) continue;
          const ripple = member.role === "dr" && (ev.type === "k" || ev.type === "s");
          const delay = Math.max(0, (t - ac.currentTime) * 1000);
          setTimeout(() => {
            flashMember(b, m);
            if (ripple) addRing(ev.type === "k" ? 0 : 1, ev.velocity * 0.6);
          }, delay);
        }
      });
    });

    this.bars.push({ start, secPerPulse: secPerTick * M.Units, pulses: M.Pulse });
    if (this.bars.length > 4) this.bars.shift();
    this.bar += 1;
    this.nextBarTime = start + barTicks * secPerTick;
  }
}

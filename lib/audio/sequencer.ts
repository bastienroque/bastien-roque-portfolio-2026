import { AudioEvent, Member } from "../types";
import { METERS } from "../data/bands";

const CHORDS = [
  { r: 0, t: [0, 3, 7, 10] },
  { r: 5, t: [0, 3, 7, 10] },
  { r: -2, t: [0, 4, 7, 10] },
  { r: 3, t: [0, 4, 7, 11] },
];

const chordMapping = (c: (typeof CHORDS)[0], o?: number) =>
  c.t.map((x) => 57 + c.r + x + (o || 0));

function pseudoRng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateBarEvents(
  member: Member,
  meterKey: string,
  bar: number,
  seed: number,
): AudioEvent[] {
  const M = METERS[meterKey] || METERS["4/4"];
  const Pulse = M.Pulse;
  const Units = M.Units;
  const E: AudioEvent[] = [];
  const c = CHORDS[bar % 4];
  const nx = CHORDS[(bar + 1) % 4];
  const baseNote = 33 + c.r;
  const role = member.role;
  const style = member.style;
  const rng = pseudoRng(seed);
  const ch = chordMapping(c);
  const all =
    Units === 24 ? Array.from({ length: Pulse }, (_, i) => i) : M.grid;

  const addEv = (
    time: number,
    velocity: number,
    type: string,
    duration?: number,
    note?: number | number[],
  ) => {
    const rt = Math.round(time);
    if (rt >= 0 && rt < Pulse * Units) {
      E.push({
        time: rt,
        velocity,
        type,
        duration: duration || Units * 0.5,
        note,
      });
    }
  };

  const nextGrid = (j: number) =>
    M.grid[j + 1] != null ? M.grid[j + 1] : Pulse;

  if (role === "dr") {
    if (style === "jazz") {
      for (let p = 0; p < Pulse; p++) {
        addEv(p * Units, 0.5, "r");
        if (p % 2) addEv(p * Units + (Units * 2) / 3, 0.35, "r");
      }
      M.kick.forEach((p) => addEv(p * Units, 0.2, "k"));
      M.snare.forEach((p) => addEv(p * Units, 0.3, "h"));
    } else if (style === "funk") {
      for (let p = 0; p < Pulse; p++) {
        [0, 0.25, 0.5, 0.75].forEach((f, j) =>
          addEv(p * Units + f * Units, [0.6, 0.28, 0.45, 0.3][j], "h"),
        );
      }
      M.kick.forEach((p) => addEv(p * Units, 1, "k"));
      addEv((Pulse - 1) * Units + Units * 0.5, 0.7, "k");
      M.snare.forEach((p) => {
        addEv(p * Units, 1, "s");
        addEv(p * Units - Units * 0.25, 0.2, "s");
        addEv(p * Units + Units * 0.75, 0.2, "s");
      });
    } else if (style === "lofi") {
      // Boom-bap: kicks plus a pushed off-beat kick, a snare that lands a
      // hair late, and soft swung hats. Sitting behind the beat is the feel.
      M.kick.forEach((p) => addEv(p * Units, 0.9, "k"));
      addEv(M.kick[0] * Units + Units * 1.5, 0.55, "k");
      M.snare.forEach((p) => addEv(p * Units + Units * 0.08, 0.7, "s"));
      for (let p = 0; p < Pulse; p++) {
        addEv(p * Units, 0.32, "h");
        addEv(p * Units + (Units * 2) / 3, 0.18, "h");
      }
    } else if (style === "elec") {
      all.forEach((p) => addEv(p * Units, 1, "k"));
    } else {
      all.forEach((p) => addEv(p * Units, 0.95, "k"));
      M.snare.forEach((p) => addEv(p * Units, 0.8, "p"));
      for (let p = 0; p < Pulse; p++) addEv(p * Units + Units / 2, 0.5, "o");
    }
  } else if (role === "ba") {
    if (style === "jazz") {
      const w = [0, 2, 1, 3];
      for (let p = 0; p < Pulse; p++)
        addEv(
          p * Units,
          0.85,
          "n",
          Units * 0.95,
          p === Pulse - 1 ? 32 + nx.r : baseNote + c.t[w[p % 4]],
        );
    } else if (style === "funk") {
      M.kick.forEach((p) => addEv(p * Units, 1, "n", Units * 0.4, baseNote));
      addEv(M.kick[0] * Units + Units * 0.75, 0.7, "n", Units * 0.2, baseNote);
      M.snare.forEach((p) =>
        addEv(p * Units + Units * 0.5, 0.6, "n", Units * 0.2, baseNote + 7),
      );
      addEv(
        (Pulse - 1) * Units + Units * 0.75,
        0.7,
        "n",
        Units * 0.2,
        baseNote + 12,
      );
    } else if (style === "elec") {
      for (let p = 0; p < Pulse; p++)
        addEv(p * Units, 0.9, "n", Units * 0.5, baseNote + 12);
      M.grid.forEach((p) =>
        addEv(p * Units + Units * 0.75, 0.6, "n", Units * 0.2, baseNote + 12),
      );
    } else if (style === "disco") {
      for (let p = 0; p < Pulse; p++) {
        addEv(p * Units, 0.9, "n", Units * 0.45, baseNote);
        addEv(p * Units + Units / 2, 0.8, "n", Units * 0.4, baseNote + 12);
      }
    } else {
      M.grid.forEach((p, j) => {
        addEv(p * Units, 0.9, "n", Units * 0.8, baseNote);
        addEv(
          nextGrid(j) * Units - Units * 0.5,
          0.85,
          "n",
          Units * 0.4,
          baseNote + 7,
        );
      });
    }
  } else if (role === "cp") {
    if (style === "jazz") {
      M.grid.forEach((g) => {
        addEv(g * Units, 0.5, "c", Units * 0.7, ch);
        if (g + 1 < Pulse)
          addEv((g + 1) * Units + Units * 0.5, 0.45, "c", Units * 0.5, ch);
      });
    } else if (style === "funkG") {
      for (let p = 0; p < Pulse; p++) {
        addEv(p * Units + Units * 0.25, 0.3, "x");
        addEv(p * Units + Units * 0.75, 0.25, "x");
      }
      M.snare.forEach((p) =>
        addEv(p * Units + Units * 0.5, 0.5, "c", Units * 0.2, ch),
      );
    } else if (style === "funkK") {
      M.snare.forEach((p) =>
        addEv(p * Units + Units * 0.5, 0.55, "c", Units * 0.2, ch),
      );
      addEv(M.kick[0] * Units + Units * 0.75, 0.5, "c", Units * 0.2, ch);
    } else if (style === "elecArp") {
      for (let s = 0; s < Pulse * 4; s++)
        addEv(
          (s * Units) / 4,
          0.4,
          "n",
          Units * 0.2,
          ch[s % 4] + 12 + (s % 8 > 3 ? 12 : 0),
        );
    } else if (style === "discoG") {
      for (let p = 0; p < Pulse; p++) {
        addEv(p * Units + Units / 2, 0.5, "c", Units * 0.2, ch);
        addEv(p * Units + Units * 0.25, 0.18, "x");
      }
    } else {
      M.grid.forEach((g) => {
        addEv(g * Units + Units * 0.5, 0.5, "c", Units * 0.35, ch);
        if (g + 1 < Pulse) addEv((g + 1) * Units, 0.45, "c", Units * 0.35, ch);
      });
    }
  } else if (role === "pd") {
    if (style === "elec") addEv(0, 0.4, "c", Pulse * Units, ch);
    else
      M.grid.forEach((g, j) =>
        addEv(
          g * Units,
          0.4,
          "c",
          (nextGrid(j) - g) * Units,
          chordMapping(c, 12),
        ),
      );
  } else if (role === "ld") {
    const tone = () => 57 + c.r + 12 + c.t[Math.floor(rng() * 4)];
    const pen = () => 69 + [0, 3, 5, 7, 10, 12, 15][Math.floor(rng() * 7)];
    if (style === "jazz") {
      for (let j = 0; j < 3; j++)
        addEv(
          Math.floor(rng() * Pulse) * Units +
            [0, 0.5, 2 / 3][Math.floor(rng() * 3)] * Units,
          0.6,
          "n",
          Units * 0.8,
          tone(),
        );
    } else if (style === "elec") {
      for (let j = 0; j < 4; j++)
        addEv(
          Math.floor(rng() * Pulse) * Units +
            [0, 0.25, 0.5, 0.75][Math.floor(rng() * 4)] * Units,
          0.5,
          "n",
          Units * 0.4,
          pen(),
        );
    } else if (style === "disco") {
      M.grid.forEach((g, j) => {
        if (j % 2 === 0)
          addEv(g * Units, 0.5, "v", (nextGrid(j) - g) * Units * 0.95, tone());
      });
    } else {
      for (let j = 0; j < 4; j++)
        addEv(
          Math.floor(rng() * Pulse) * Units + Units / 2,
          0.5,
          "n",
          Units * 0.4,
          pen(),
        );
    }
  } else if (role === "hn") {
    if (style === "funk")
      M.snare.forEach((p) =>
        addEv(
          p * Units + Units * 0.75,
          0.6,
          "H",
          Units * 0.25,
          chordMapping(c, 12),
        ),
      );
    else
      M.grid.forEach((g) =>
        addEv(
          g * Units + Units * 0.5,
          0.55,
          "H",
          Units * 0.3,
          chordMapping(c, 12),
        ),
      );
  } else {
    if (style === "elecH") {
      for (let p = 0; p < Pulse; p++) {
        addEv(p * Units + Units * 0.25, 0.25, "z");
        addEv(p * Units + Units * 0.75, 0.2, "z");
        addEv(p * Units + Units / 2, 0.35, "o");
      }
    } else if (style === "elecC") {
      M.snare.forEach((p) => addEv(p * Units, 0.8, "p"));
      addEv((Pulse - 1) * Units + Units * 0.75, 0.3, "p");
    } else if (style === "latinC") {
      for (let p = 0; p < Pulse; p++) {
        addEv(
          p * Units,
          M.grid.includes(p) ? 0.8 : 0.4,
          M.grid.includes(p) ? "a" : "b",
        );
        addEv(p * Units + Units / 2, 0.35, "b");
      }
    } else if (style === "latinB") {
      const n = Pulse * 2;
      const k = Math.round((n * 7) / 12);
      for (let s = 0; s < n; s++)
        if ((s * k) % n < k) addEv((s * Units) / 2, 0.5, "l");
    } else {
      for (let p = 0; p < Pulse; p++)
        [0, 0.25, 0.5, 0.75].forEach((f, j) =>
          addEv(p * Units + f * Units, j % 2 ? 0.12 : 0.25, "z"),
        );
    }
  }
  return E;
}

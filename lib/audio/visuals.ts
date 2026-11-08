/**
 * Tiny bridge between audio and the hero canvas. The canvas registers a
 * handler; anything (pads, keys, the scheduler) can send a ripple.
 * x/y are optional: without them the canvas picks a spot for that drum.
 */
type RingHandler = (index: number, velocity: number, x?: number, y?: number) => void;

let handler: RingHandler | null = null;

export const setRingHandler = (fn: RingHandler | null) => {
  handler = fn;
};

export const addRing: RingHandler = (index, velocity, x, y) => {
  handler?.(index, velocity, x, y);
};

/**
 * Flash a band member's chip when it plays a note. This goes straight to
 * the DOM with the Web Animations API instead of through React state:
 * a full mix fires hundreds of notes per bar.
 */
const lastFlash = new Map<string, number>();

export const flashMember = (band: number, member: number) => {
  const key = `${band}-${member}`;
  const now = performance.now();
  if (now - (lastFlash.get(key) ?? 0) < 90) return;
  lastFlash.set(key, now);

  const chip = document.querySelector<HTMLElement>(`[data-member="${key}"]`);
  if (!chip || chip.getAttribute("aria-pressed") === "false") return;
  const color = chip.dataset.color ?? "currentColor";
  chip.animate(
    [{ boxShadow: `0 0 0 3px ${color}` }, { boxShadow: `0 0 0 0 transparent` }],
    { duration: 260, easing: "ease-out" },
  );
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  chip.querySelector("i")?.animate(
    [{ transform: "scale(1.7)" }, { transform: "scale(1)" }],
    { duration: 200, easing: "ease-out" },
  );
};

/**
 * Tiny bridge between audio and the hero canvas. The canvas registers a
 * handler; anything (pads, keys) can send a ripple.
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

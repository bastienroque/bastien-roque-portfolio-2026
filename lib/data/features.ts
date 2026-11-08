import { Feature } from "../types";

/** Jam mode's "How to play" cards, each pointing at the control it explains. */
export const FEATURES: Feature[] = [
  {
    title: "Hit hard or soft",
    description:
      "Not every event deserves the same volume. Good interfaces, like good drummers, know what to accent. Hold Shift for a ghost note.",
    target: { href: "#drum-pads", label: "Play the pads" },
  },
  {
    title: "Left note, right note",
    description:
      "One input, many outcomes. Tap the left of the hero section for a kick, the right for a snare: routing turns one surface into a kit.",
    target: { href: "#top", label: "Tap the logo", demo: "left-right" },
  },
  {
    title: "Watch the ripple",
    description:
      "A strike travels through the whole surface and fades, like data moving through a system.",
    target: { href: "#top", label: "See it ripple", demo: "ripple" },
  },
  {
    title: "Change the time signature",
    description:
      "The same band feels different in 7/8 than in 4/4. Like refactoring to a new interface, every part has to adapt.",
    target: { href: "#time-signature", label: "Change the meter" },
  },
  {
    title: "Quantized or humanized",
    description:
      "Perfect timing is correct, but a little drift is what feels human. Context decides which one wins.",
    target: { href: "#feel", label: "Switch the feel" },
  },
];

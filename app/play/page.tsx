import type { Metadata } from "next";
import { DrumKit } from "@/components/audio/DrumKit";

export const metadata: Metadata = {
  title: "Play the kit",
  description: "A small drum kit in the browser: tap the pads or the logo, or play with your keyboard.",
  alternates: { canonical: "/play" },
};

export default function PlayPage() {
  return <DrumKit />;
}

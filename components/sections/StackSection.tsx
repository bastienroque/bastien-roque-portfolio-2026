import React from "react";
import { Eyebrow, Heading, Lead, Section } from "../ui/Section";
import { ModeGate } from "../providers/ModeProvider";
import { MixerControls } from "../audio/MixerControls";
import { StackBoard } from "./StackBoard";
import { bandCount, bandCountTitle } from "@/lib/data/bands";

export const StackSection: React.FC = () => (
  <Section alt id="stack">
    <Eyebrow>Tech stack as {bandCount} bands</Eyebrow>
    <Heading>
      {bandCountTitle} bands,
      <br />
      one bar line.
    </Heading>

    <ModeGate show="quick">
      <Lead>
        Every category of my stack is a band in its own style, and every tool is a player: HTML on
        brushes, CSS on upright bass, TypeScript on sax. Switch to jam mode to hear them.
      </Lead>
    </ModeGate>
    <ModeGate show="jam">
      <Lead>
        Bring bands in, tap players to mute them, then change the time signature and hear every band
        rearrange itself. Changes land on the next bar.
      </Lead>
      <MixerControls />
    </ModeGate>

    <StackBoard />
  </Section>
);

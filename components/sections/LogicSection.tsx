import React from "react";
import { FEATURES } from "@/lib/data/features";
import { BANDS } from "@/lib/data/bands";
import { FeatureCard } from "../modules/FeatureCard";
import { Eyebrow, Heading, Lead, Section } from "../ui/Section";

const ACCENTS = BANDS.map((b) => b.color);

/** Jam mode only: how to play the page, and why each control maps to dev work. */
export const LogicSection: React.FC = () => (
  <Section id="logic">
    <Eyebrow>How to play this page</Eyebrow>
    <Heading>
      Every hit
      <br />
      has a reason.
    </Heading>
    <Lead>
      Developing and drumming both come down to timing, dynamics and knowing what to accent.
      Each control on this page is a small lesson in both.
    </Lead>
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4 mt-10">
      {FEATURES.map((f, i) => (
        <FeatureCard key={f.title} {...f} accentColor={ACCENTS[i % ACCENTS.length]} />
      ))}
    </div>
  </Section>
);

import React from "react";
import { ABOUT } from "@/lib/data/profile";
import { Eyebrow, Section } from "../ui/Section";

export const AboutSection: React.FC = () => (
  <Section alt id="about">
    <Eyebrow>about</Eyebrow>
    <p className="mt-5 max-w-[34ch] text-[clamp(24px,4vw,40px)] font-semibold tracking-[-0.03em] leading-[1.2] text-balance">
      {ABOUT}
    </p>
  </Section>
);

import React from "react";
import { STAGE } from "@/lib/data/stack";
import { StagePosition } from "@/lib/types";
import { Eyebrow, Heading, Lead, Section } from "../ui/Section";

const label = "font-mono text-[11px] uppercase tracking-[0.1em] text-muted";

const Position: React.FC<{ pos: StagePosition }> = ({ pos }) => {
  // The drummer sits on a riser; the singer is out front.
  const emphasis =
    pos.id === "drums"
      ? "bg-[color-mix(in_srgb,var(--text)_5%,var(--surface))]"
      : pos.id === "vocals"
        ? "border-accent-fg/60"
        : "";

  return (
    <li
      data-pos={pos.id}
      className={`bg-surface border border-line rounded-2xl p-5 flex flex-col gap-2 ${emphasis}`}
    >
      <span className={`${label} flex items-center gap-2`}>
        <i className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
        {pos.instrument}
        {pos.id === "drums" && (
          <span className="opacity-70">· on the riser</span>
        )}
      </span>
      <h3 className="text-xl font-semibold tracking-tight">{pos.category}</h3>
      <p className="text-sm text-muted">{pos.part}</p>
      <ul
        className="flex flex-wrap gap-1.5 mt-1.5"
        aria-label={`${pos.category} tools`}
      >
        {pos.tools.map((t) => (
          <li
            key={t}
            className="text-sm font-medium rounded-lg border border-line px-2.5 py-1 bg-bg"
          >
            {t}
          </li>
        ))}
      </ul>
    </li>
  );
};

export const StackSection: React.FC = () => (
  <Section id="stack">
    <Eyebrow>Tech stack</Eyebrow>
    <Heading>The band.</Heading>
    <Lead>
      My stack as a funk band on stage: the rhythm section keeps time at the
      back, the frontline delivers out front, and every tool has its part.
    </Lead>

    <figure className="mt-10 rounded-card border border-line bg-[color-mix(in_srgb,var(--text)_3%,var(--background))] p-3 md:p-5">
      <div className={`${label} text-center pb-3`}>Back stage</div>
      <ol
        className="stage-plan grid gap-3"
        aria-label="Stage plan, back to front"
      >
        {STAGE.map((pos) => (
          <Position key={pos.id} pos={pos} />
        ))}
      </ol>
      <figcaption
        className={`${label} text-center pt-4 mt-3 border-t border-dashed border-line`}
      >
        Front stage · Audience
      </figcaption>
    </figure>
  </Section>
);

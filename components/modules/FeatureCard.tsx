import React from "react";
import { Feature } from "@/lib/types";
import { EffectLink } from "./EffectLink";

export const FeatureCard: React.FC<Feature & { accentColor: string }> = ({
  title,
  description,
  target,
  accentColor,
}) => (
  <article className="bg-surface border border-line rounded-card shadow-card p-6 flex flex-col gap-2.5">
    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted flex items-center gap-2">
      <i className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
      Try it
    </span>
    <h3 className="font-semibold text-xl tracking-tight">{title}</h3>
    <p className="text-[15px] text-muted flex-1">{description}</p>
    <EffectLink {...target} />
  </article>
);

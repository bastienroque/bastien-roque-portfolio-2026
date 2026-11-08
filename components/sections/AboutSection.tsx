import React from "react";
import { ABOUT, PROFILE } from "@/lib/data/profile";
import { Eyebrow, Heading, Section } from "../ui/Section";

export const AboutSection: React.FC = () => (
  <Section id="about">
    <Eyebrow>About</Eyebrow>
    <Heading>
      Developer,
      <br />
      drummer.
    </Heading>

    <div className="grid md:grid-cols-[2fr_1fr] gap-10 mt-10">
      <div className="flex flex-col gap-4 text-[clamp(17px,2.2vw,20px)] leading-relaxed max-w-[60ch]">
        {ABOUT.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 self-start border-t border-line pt-4 text-[15px]">
        <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted pt-1">Role</dt>
        <dd>{PROFILE.role}</dd>
        <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted pt-1">Based in</dt>
        <dd>{PROFILE.location}</dd>
        <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted pt-1">Status</dt>
        <dd>{PROFILE.status}</dd>
        <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted pt-1">Elsewhere</dt>
        <dd className="flex gap-3">
          {PROFILE.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="underline underline-offset-4">
              {l.label}
            </a>
          ))}
        </dd>
      </dl>
    </div>
  </Section>
);

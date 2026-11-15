import React from "react";
import Link from "next/link";
import { ABOUT, PROFILE } from "@/lib/data/profile";
import { Eyebrow, Heading, Section } from "../ui/Section";

const term = "font-mono text-xs uppercase tracking-[0.08em] text-muted pt-1";

export const AboutSection: React.FC = () => (
  <Section alt id="about">
    <Eyebrow>About</Eyebrow>
    <Heading>A developer who designs.</Heading>

    <div className="grid md:grid-cols-[2fr_1fr] gap-10 mt-10">
      <div className="flex flex-col gap-4 text-[clamp(17px,2.2vw,20px)] leading-relaxed max-w-[60ch]">
        {ABOUT.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p>
          <Link href="/play" className="font-medium text-accent-fg underline underline-offset-4">
            Play the drum kit →
          </Link>
        </p>
      </div>

      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 self-start border-t border-line pt-4 text-[15px]">
        <dt className={term}>Role</dt>
        <dd>{PROFILE.role}</dd>
        <dt className={term}>Also</dt>
        <dd>Design · Motion design</dd>
        <dt className={term}>Based in</dt>
        <dd>{PROFILE.location}</dd>
        <dt className={term}>Status</dt>
        <dd>{PROFILE.status}</dd>
        <dt className={term}>Elsewhere</dt>
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

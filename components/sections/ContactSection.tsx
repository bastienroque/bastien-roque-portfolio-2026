import React from "react";
import { PROFILE } from "@/lib/data/profile";
import { CopyEmail } from "./CopyEmail";
import { Eyebrow } from "../ui/Section";

export const ContactSection: React.FC = () => (
  <section id="contact" className="scroll-mt-16 px-5 pt-20 pb-16 bg-surface">
    <div className="max-w-290 mx-auto">
      <Eyebrow>contact</Eyebrow>
      <h2 className="mt-3 text-[clamp(32px,6vw,60px)] font-semibold tracking-[-0.04em] leading-none">
        Let&apos;s have a jam.
      </h2>
      <p className="max-w-[56ch] mt-4 text-[clamp(15px,2vw,17px)] text-muted">
        For hiring, freelance projects and collaborations.
      </p>

      <CopyEmail email={PROFILE.email} />

      <ul className="flex flex-wrap gap-3 mt-6">
        {PROFILE.links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center min-h-11 px-5 rounded-md border border-line bg-bg text-sm transition-colors hover:border-accent-deep hover:text-accent-deep"
            >
              {l.label.toLowerCase()} ↗
            </a>
          </li>
        ))}
      </ul>

      <footer className="flex justify-between items-center flex-wrap gap-2.5 mt-16 pt-5 border-t border-line text-xs text-dim">
        <span>
          © {new Date().getFullYear()} {PROFILE.name}
        </span>
        <span>{PROFILE.location}</span>
      </footer>
    </div>
  </section>
);

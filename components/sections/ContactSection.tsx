import React from "react";
import { PROFILE } from "@/lib/data/profile";
import { CopyEmail } from "./CopyEmail";
import { ChangeModeButton } from "../layout/ChangeModeButton";

export const ContactSection: React.FC = () => (
  <section
    id="contact"
    className="scroll-mt-20 px-5 pt-20 pb-32 text-paper bg-[radial-gradient(50%_60%_at_15%_100%,rgba(29,211,123,.26),transparent_70%),radial-gradient(45%_50%_at_90%_0%,rgba(182,247,212,.12),transparent_70%)] bg-ink"
  >
    <div className="max-w-290 mx-auto">
      <div className="font-mono text-xs uppercase tracking-[0.08em] text-paper-muted">
        Contact
      </div>
      <h2 className="mt-3 text-[clamp(36px,8.5vw,80px)] font-semibold tracking-tight leading-none">
        Let&apos;s have a jam.
      </h2>
      <p className="max-w-[56ch] mt-4.5 text-[clamp(16px,2.2vw,19px)] text-paper-muted">
        For hiring, freelance projects and collaborations.
      </p>

      <CopyEmail email={PROFILE.email} />

      <ul className="flex flex-wrap gap-3 mt-8">
        {PROFILE.links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center min-h-12 px-6 rounded-full border border-paper-line hover:border-paper transition font-medium"
            >
              {l.label} ↗
            </a>
          </li>
        ))}
      </ul>

      <footer className="flex justify-between items-center flex-wrap gap-2.5 mt-16 pt-5 border-t border-paper-line">
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-paper-muted">
          © {new Date().getFullYear()} {PROFILE.name}
        </span>
        <ChangeModeButton />
      </footer>
    </div>
  </section>
);

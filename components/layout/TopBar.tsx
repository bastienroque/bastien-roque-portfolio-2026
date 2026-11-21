"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/lib/data/profile";

const NAV = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#stack" },
  { label: "Contact", href: "/#contact" },
];

const box = "rounded-md border border-line bg-bg";

/** Which home-page section is under the reading line (40% down the viewport). */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const ids = ["top", ...NAV.map((n) => n.href.slice(2))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -59% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [enabled]);
  return enabled ? active : null;
}

export const TopBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const active = useActiveSection(pathname === "/");

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 bg-bg border-b border-line">
        <div className="max-w-290 mx-auto h-16 px-5 flex justify-between items-center gap-3">
          <Link
            href="/"
            aria-label={`${PROFILE.name}, home`}
            className="group flex items-center gap-3 min-h-11"
          >
            <span
              aria-hidden="true"
              className="logo-mask block h-5 aspect-135/74 bg-fg transition-colors group-hover:bg-accent-deep"
            />
            <span className="hidden sm:inline text-sm text-muted group-hover:text-fg transition-colors">
              {PROFILE.name.toLowerCase().replace(" ", "-")}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden md:flex gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={
                  active === n.href.slice(2) ? "location" : undefined
                }
                className="text-sm px-3 py-2 rounded-md text-muted hover:text-fg transition-colors aria-[current=location]:text-accent-deep"
              >
                <span className="text-dim">./</span>
                {n.label.toLowerCase()}
              </Link>
            ))}
          </nav>

          <div className="flex gap-2 items-center">
            <a
              href={NAV[3].href}
              className="hidden md:inline-flex items-center min-h-10 px-4 rounded-md bg-accent text-on-accent text-sm font-medium transition-colors hover:bg-accent-deep hover:text-white"
            >
              Let&apos;s talk
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`md:hidden min-h-11 px-4 text-sm ${box}`}
            >
              menu
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-70 bg-bg flex flex-col justify-center gap-1 p-6"
        >
          <button
            type="button"
            autoFocus
            onClick={() => setMenuOpen(false)}
            className={`absolute top-2.5 right-5 min-h-11 px-4 text-sm ${box}`}
          >
            close
          </button>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="font-semibold text-[clamp(32px,10vw,56px)] leading-[1.15] tracking-[-0.04em] py-2 border-b border-line hover:text-accent-deep"
            >
              <span className="text-dim">./</span>
              {n.label.toLowerCase()}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/lib/data/profile";
import { ModeSwitch } from "./ModeSwitch";
import { useMode } from "../providers/ModeProvider";

interface NavItem {
  label: string;
  href: string;
  /** Only shown in jam mode (the section only exists there). */
  jamOnly?: boolean;
}

const NAV: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Logic", href: "/#logic", jamOnly: true },
  { label: "Stack", href: "/#stack" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

const glass =
  "border border-line bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] backdrop-blur-md";

/** Which home-page section is under the reading line (40% down the viewport). */
function useActiveSection(enabled: boolean, items: NavItem[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = items.map((n) => n.href).join();
  useEffect(() => {
    if (!enabled) return;
    const ids = ["top", ...key.split(",").map((href) => href.slice(2))];
    const sections = ids.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -59% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [enabled, key]);
  return enabled ? active : null;
}

export const TopBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { mode } = useMode();
  const items = NAV.filter((n) => !n.jamOnly || mode === "jam");
  const active = useActiveSection(pathname === "/", items);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex justify-between items-center gap-2 p-3.5 pointer-events-none [&>*]:pointer-events-auto">
        <Link
          href="/"
          aria-label={`${PROFILE.name}, home`}
          className={`group rounded-full px-4 min-h-11 flex items-center ${glass}`}
        >
          <span
            aria-hidden="true"
            className="logo-mask block h-5 aspect-135/74 bg-fg transition-colors group-hover:bg-accent-fg"
          />
        </Link>

        <nav aria-label="Main" className={`hidden md:flex gap-1 p-1 rounded-full ${glass}`}>
          {items.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active === n.href.slice(2) ? "location" : undefined}
              className="text-sm font-medium px-4 py-2 rounded-full text-muted hover:text-fg transition-colors aria-[current=location]:bg-fg aria-[current=location]:text-bg"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-2 items-center">
          <ModeSwitch />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`md:hidden min-h-11 px-4 rounded-full text-sm font-medium ${glass}`}
          >
            Menu
          </button>
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
            className={`absolute top-3.5 right-3.5 min-h-11 px-4 rounded-full text-sm font-medium ${glass}`}
          >
            Close
          </button>
          {items.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="font-semibold text-[clamp(40px,12vw,72px)] leading-[1.1] tracking-[-0.04em] py-1.5 border-b border-line hover:text-accent-fg"
            >
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

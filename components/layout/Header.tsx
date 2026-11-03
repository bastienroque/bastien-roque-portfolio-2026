"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navbar_links } from "@/data/header";
import Button from "../ui/Button";
import SocialLabel from "../ui/SocialLabel";

const MENU_ID = "mobile-menu";

// External links open in a new tab; in-site links don't.
const externalProps = (href: string) =>
  href.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  // Escape closes the drawer; the page behind stops scrolling while it's open.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="pointer-events-none sticky top-2 z-5 px-2 md:top-4 md:px-4 my-2 md:m-4">
        <div className="pointer-events-auto mx-auto flex items-center justify-between gap-4 rounded-xl border border-brand-black bg-brand-white/50 backdrop-blur-lg p-2 md:gap-8">
          {/* left: logo */}
          <Link href="/" aria-label="Home" onClick={close}>
            <Button variant="green">
              <Image src="/logo.png" alt="" width={46} height={46} />
            </Button>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navbar_links.map((link) => (
              <a key={link.id} href={link.href} {...externalProps(link.href)}>
                <Button variant={link.isGreen ? "green" : "white"}>
                  <SocialLabel label={link.label} />
                </Button>
              </a>
            ))}
          </div>

          {/* mobile toggle */}
          <Button
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls={MENU_ID}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex aspect-square h-10 w-10 items-center! justify-center! p-0 md:hidden"
          >
            <Image
              src={isOpen ? "/menu-close.svg" : "/menu-open.svg"}
              alt=""
              width={14}
              height={14}
            />
          </Button>
        </div>
      </header>

      {/* mobile drawer: section links AND external links */}
      {isOpen && (
        <nav
          id={MENU_ID}
          aria-label="Mobile"
          className="fixed inset-0 z-4 flex flex-col justify-center gap-2 overflow-y-auto bg-brand-yellow p-2 pt-24 md:hidden"
        >
          {navbar_links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={close}
              {...externalProps(link.href)}
            >
              <Button
                variant={link.isGreen ? "green" : "white"}
                className="w-full justify-center!"
              >
                <SocialLabel label={link.label} />
              </Button>
            </a>
          ))}
        </nav>
      )}
    </>
  );
};

export default Header;

"use client";

import { navbar_content, navbar_links } from "@/data/header";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* desktop */}
      <nav className="z-5 mt-[41.5vh] mb-84 sticky top-0 hidden md:flex items-center justify-center">
        <div className="p-2 md:p-4 flex flex-col items-center gap-2">
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <Link href="/" className="h-full">
              <Button variant="green">
                <Image src="/logo.png" alt="logo" width={46} height={46} />
              </Button>
            </Link>

            {navbar_content.map((link) => {
              return (
                <Link key={link.id} href={link.href}>
                  <Button variant={link.isGreen ? "green" : "white"}>
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>
          <div className="flex gap-2">
            {navbar_links.map((link) => {
              return (
                <Link key={link.id} href={link.href}>
                  <Button variant={link.isGreen ? "green" : "white"}>
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      {/* mobile */}
      <nav className="z-5 sticky top-0 flex md:hidden items-center justify-center">
        <div className="w-full p-2 flex items-center justify-between">
          <Link href="/" className="h-full" onClick={() => setIsOpen(false)}>
            <Button variant="green">
              <Image src="/logo.png" alt="logo" width={46} height={46} />
            </Button>
          </Link>

          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="h-10 w-10 p-0 aspect-square flex items-center justify-center"
          >
            {isOpen ? (
              <Image
                src="/menu-close.svg"
                alt="Icon to close the menu"
                width={14}
                height={14}
              />
            ) : (
              <Image
                src="/menu-open.svg"
                alt="Icon to open the menu"
                width={14}
                height={14}
              />
            )}
          </Button>
        </div>
      </nav>
      {/* drawer */}
      {isOpen && (
        <div className="z-4 fixed p-2 h-full inset-x-0 bottom-0 flex flex-col justify-center gap-2 bg-brand-yellow">
          <div className="flex flex-wrap gap-2">
            {navbar_content.map((link) => {
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant={link.isGreen ? "green" : "white"}>
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            {navbar_links.map((link) => {
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant={link.isGreen ? "green" : "white"}>
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

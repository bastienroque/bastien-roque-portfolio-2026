"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Shape from "../ui/Shape";
import { TechStackProps } from "@/types";

const TechStack = ({ categories }: TechStackProps) => {
  const uid = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const count = categories.length;
  const current = categories[active];

  const goTo = (index: number) => {
    const next = (index + count) % count;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-black uppercase">Tech Stack</span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Previous category"
            className="grid h-7 w-7 place-items-center rounded-full border border-black bg-brand-white font-bold transition-colors hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-pointer"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <path
                d="M10 3 5 8l5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Next category"
            className="grid h-7 w-7 place-items-center rounded-full border border-black bg-brand-white font-bold transition-colors hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-pointer"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <path
                d="m6 3 5 5-5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Tech stack categories"
        className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 flex-wrap scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((cat, i) => {
          const selected = i === active;
          return (
            <button
              key={cat.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${uid}-tab-${cat.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onKeyDown={onKeyDown}
              onClick={() => {
                setActive(i);
              }}
              className={`shrink-0 rounded-full border border-black px-3 py-1 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-pointer ${
                selected
                  ? "bg-black text-white"
                  : "bg-brand-white hover:bg-black/10"
              }`}
            >
              {cat.label}
              <span
                className={`ml-1.5 text-xs font-semibold ${
                  selected ? "text-white/70" : "text-black/50"
                }`}
              >
                {cat.items.length}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${current.id}`}
        className="flex flex-col gap-3 rounded-lg border border-black bg-brand-white/60 p-3"
      >
        <p className="text-sm font-medium">{current.scope}</p>

        <ul key={current.id} className="flex flex-wrap gap-2">
          {current.items.map((tech) => (
            <li key={tech.name}>
              <Shape
                disabled
                className="pointer-events-none border border-black bg-brand-white font-semibold disabled:cursor-default disabled:opacity-100"
              >
                {tech.name}
              </Shape>
            </li>
          ))}
        </ul>

        <div className="flex justify-center gap-1.5" aria-hidden="true">
          {categories.map((cat, i) => (
            <span
              key={cat.id}
              className={`h-1.5 rounded-full bg-black transition-all duration-200 motion-reduce:transition-none ${
                i === active ? "w-5" : "w-1.5 opacity-30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;

import React from "react";
import { STACK } from "@/lib/data/stack";
import { StackGroup } from "@/lib/types";
import { Eyebrow, Heading, Section } from "../ui/Section";

/** One folder of `tree ~/stack`, with tree-drawing characters before each tool. */
const Folder: React.FC<{ group: StackGroup }> = ({ group }) => (
  <li className="bg-surface border border-line rounded-md p-5">
    <h3 className="flex items-baseline justify-between gap-3">
      <span className="text-accent-deep font-semibold">{group.dir}/</span>
      <span className="text-xs text-dim">{group.label}</span>
    </h3>
    <ul className="mt-3 text-sm leading-7" aria-label={`${group.label} tools`}>
      {group.tools.map((tool, i) => (
        <li key={tool} className="text-fg">
          <span aria-hidden="true" className="text-dim">
            {i === group.tools.length - 1 ? "└── " : "├── "}
          </span>
          {tool}
        </li>
      ))}
    </ul>
  </li>
);

const toolCount = STACK.reduce((n, g) => n + g.tools.length, 0);

export const StackSection: React.FC = () => (
  <Section id="stack">
    <Eyebrow>stack</Eyebrow>
    <Heading>Tech stack</Heading>
    <p className="mt-4 text-sm text-dim">
      <span className="text-accent-deep">$</span> tree ~/stack
    </p>

    <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Tech stack by category">
      {STACK.map((g) => (
        <Folder key={g.dir} group={g} />
      ))}
    </ol>

    <p className="mt-4 text-xs text-dim">
      {STACK.length} directories, {toolCount} tools
    </p>
  </Section>
);

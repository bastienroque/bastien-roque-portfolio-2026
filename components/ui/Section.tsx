import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Dark grey background instead of black, to alternate sections. */
  alt?: boolean;
}

export const Section: React.FC<SectionProps> = ({ alt = false, children, className = "", ...props }) => (
  <section
    className={`relative scroll-mt-16 px-5 pt-20 pb-24 border-b border-line ${alt ? "bg-surface" : "bg-bg"} ${className}`}
    {...props}
  >
    <div className="max-w-290 mx-auto">{children}</div>
  </section>
);

/** Section label, written like a code comment: "// about". */
export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`text-xs lowercase tracking-[0.04em] text-dim ${className}`}>
    <span className="text-accent-deep">{"//"}</span> {children}
  </div>
);

export const Heading: React.FC<{ children: React.ReactNode; as?: "h1" | "h2" }> = ({ children, as: Tag = "h2" }) => (
  <Tag className="mt-3 text-[clamp(28px,5vw,48px)] font-semibold tracking-[-0.03em] leading-[1.05] text-balance">
    {children}
  </Tag>
);

export const Lead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="max-w-[60ch] mt-4 text-[clamp(15px,2vw,17px)] leading-relaxed text-muted text-pretty">{children}</p>
);

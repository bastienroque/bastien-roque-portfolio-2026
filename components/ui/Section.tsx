import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  alt?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  alt = false,
  children,
  className = "",
  ...props
}) => (
  <section
    className={`relative scroll-mt-20 px-5 pt-20 pb-24 border-b border-line ${
      alt ? "bg-[color-mix(in_srgb,var(--text)_3.5%,var(--background))]" : ""
    } ${className}`}
    {...props}
  >
    <div className="max-w-290 mx-auto">{children}</div>
  </section>
);

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`font-mono text-xs uppercase tracking-[0.08em] text-muted ${className}`}>
    {children}
  </div>
);

export const Heading: React.FC<{ children: React.ReactNode; as?: "h1" | "h2" }> = ({
  children,
  as: Tag = "h2",
}) => (
  <Tag className="mt-3 text-[clamp(36px,8.5vw,80px)] font-semibold tracking-tight leading-none text-balance">
    {children}
  </Tag>
);

export const Lead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="max-w-[56ch] mt-4.5 text-[clamp(16px,2.2vw,19px)] text-muted text-pretty">
    {children}
  </p>
);

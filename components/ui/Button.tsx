import React from "react";

type Variant = "solid" | "ghost" | "active";

const base =
  "inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-md font-medium text-sm border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-deep disabled:opacity-50";

const variants: Record<Variant, string> = {
  solid: "bg-accent text-on-accent border-accent hover:bg-accent-deep hover:text-white hover:border-accent-deep",
  ghost: "bg-transparent text-fg border-line hover:border-accent-deep hover:text-accent-deep",
  active: "bg-accent-tint text-accent-deep border-accent-deep",
};

export const buttonClass = (variant: Variant = "solid", className = "") =>
  `${base} ${variants[variant]} ${className}`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button: React.FC<ButtonProps> = ({ variant = "solid", className = "", type = "button", ...props }) => (
  <button type={type} className={buttonClass(variant, className)} {...props} />
);

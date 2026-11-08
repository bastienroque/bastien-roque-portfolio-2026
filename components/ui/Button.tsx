import React from "react";

type Variant = "solid" | "ghost" | "active";

const base =
  "inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-full font-medium text-[15px] border transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-fg disabled:opacity-50";

const variants: Record<Variant, string> = {
  solid: "bg-fg text-bg border-fg hover:-translate-y-0.5 hover:shadow-lg",
  ghost: "bg-transparent text-fg border-line hover:border-fg",
  active: "bg-accent text-on-accent border-accent",
};

export const buttonClass = (variant: Variant = "solid", className = "") =>
  `${base} ${variants[variant]} ${className}`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  className = "",
  type = "button",
  ...props
}) => <button type={type} className={buttonClass(variant, className)} {...props} />;

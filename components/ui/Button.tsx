import { ButtonProps } from "@/types";
import clsx from "clsx";

const Button = ({
  variant = "white",
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const isIconOnly =
    className?.includes("p-0") || className?.includes("aspect-square");

  const base =
    "border border-brand-black text-start rounded-xl font-sans text-brand-black cursor-pointer flex items-start justify-start hover:scale-[0.95] active:scale-[0.85] transition-all";

  const paddingBase = isIconOnly ? "h-10 w-10 p-0" : "px-6 py-2 w-fit text-lg";

  const variants = {
    white: "bg-brand-white font-medium",
    green: "bg-brand-green font-black",
  };

  return (
    <button
      disabled={disabled}
      className={clsx(base, paddingBase, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

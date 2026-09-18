import { ButtonProps } from "@/types";
import clsx from "clsx";

const Shape = ({
  variant = "white",
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const base =
    "px-6 py-2 border border-brand-black w-fit text-nowrap rounded-xl font-sans text-lg text-brand-black";

  const variants = {
    white: "bg-brand-white font-medium ",
    green: "bg-brand-yellow font-black",
  };

  return (
    <button
      disabled={disabled}
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Shape;

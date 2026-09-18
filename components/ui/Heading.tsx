import clsx from "clsx";

const sizes = {
  lg: "text-3xl md:text-4xl font-bold",
  md: "text-xl md:text-2xl font-bold",
  sm: "text-lg font-bold",
};

type HeadingProps = {
  level: 1 | 2 | 3 | 4;
  size?: keyof typeof sizes;
  children: React.ReactNode;
  className?: string;
};

export const Heading = ({
  level,
  size = "md",
  children,
  className,
}: HeadingProps) => {
  const Tag = `h${level}` as const;
  return <Tag className={clsx(sizes[size], className)}>{children}</Tag>;
};

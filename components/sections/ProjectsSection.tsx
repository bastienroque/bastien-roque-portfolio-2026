import Link from "next/link";
import Shape from "../ui/Shape";
import { ProjectShowcase } from "@/types";
import LazyVideo from "./projects/components/LazyVideo";

const ProjectsSection = ({
  id,
  href,
  label,
  devType,
  src,
  posterSrc,
  alt,
}: ProjectShowcase) => {
  const hasImage = Boolean(src && src.trim() !== "");
  return (
    <div className="p-2 md:p-4">
      <Link key={id} href={href}>
        <div className="min-h-[60vh] p-2 md:p-4 w-full flex flex-col md:flex-row items-center gap-2 md:gap-4 rounded-xl border border-brand-black bg-brand-yellow hover:bg-brand-green transition-colors">
          <div className="flex flex-col items-center md:items-start">
            <Shape className="font-bold!">{label}</Shape>
            <Shape>{devType}</Shape>
          </div>
          <div
            className={`relative min-h-[60vh] w-full overflow-hidden rounded-xl border border-brand-black transition-colors ${
              hasImage
                ? "bg-brand-white"
                : "bg-brand-yellow flex items-center justify-center p-2 md:p-4 text-center"
            }`}
          >
            {hasImage && (
              <LazyVideo
                src={src}
                poster={posterSrc}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectsSection;

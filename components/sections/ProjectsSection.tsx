import Link from "next/link";
import Pill from "../ui/Pill";
import { ProjectShowcase } from "@/types";

const ProjectsSection = ({
  id,
  href,
  label,
  devType,
  src,
  alt,
}: ProjectShowcase) => {
  const hasImage = Boolean(src && src.trim() !== "");
  return (
    <div id="projects" className="p-2 md:p-4 scroll-mt-30">
      <Link key={id} href={href}>
        <div className="min-h-[60vh] p-2 md:p-4 w-full flex flex-col md:flex-row items-center gap-2 md:gap-4 rounded-xl border border-brand-black bg-brand-yellow hover:bg-brand-green">
          <div className="flex flex-col items-center md:items-start">
            <Pill className="font-bold!">{label}</Pill>
            <Pill>{devType}</Pill>
          </div>
          <div
            className={`relative min-h-[60vh] w-full overflow-hidden rounded-xl border border-brand-black transition-colors ${
              hasImage
                ? "bg-brand-white"
                : "bg-brand-yellow flex items-center justify-center p-2 md:p-4 text-center"
            }`}
          >
            {hasImage && (
              // <img
              //   src={src}
              //   alt={alt || "Project showcase preview"}
              //   className="h-full w-full object-fill"
              // />
              <video
                src={src}
                autoPlay
                loop
                muted
                playsInline
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

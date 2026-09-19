import Link from "next/link";
import { ProjectShowcase } from "@/types";
import LazyVideo from "../ui/LazyVideo";
import Button from "../ui/Button";

const ProjectsSection = ({
  id,
  href,
  label,
  devType,
  shortDesc,
  desktopSrc,
  posterDesktopSrc,
  mobileSrc,
  posterMobileSrc,
  alt,
}: ProjectShowcase) => {
  const hasImage = Boolean(desktopSrc && desktopSrc.trim() !== "");
  return (
    <div className="p-2 md:p-4">
      <Link key={id} href={href}>
        <div className="min-h-[60vh] p-2 md:p-4 w-full flex flex-col md:flex-row items-center gap-2 md:gap-4 rounded-xl border border-brand-black bg-brand-white hover:bg-brand-yellow transition-colors">
          <div className="w-full md:w-1/4 flex flex-col items-center md:items-start justify-between self-stretch gap-8 md:gap-2">
            <div className="flex flex-col gap-2">
              <Button variant="green" className="font-bold! w-full">
                {label}
              </Button>
              <Button className="w-full">{devType}</Button>
              {shortDesc && <Button className="w-full">{shortDesc}</Button>}
            </div>
            {shortDesc && (
              <Button variant="green" className="w-full justify-center!">
                Open Project
              </Button>
            )}
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
                desktopSrc={desktopSrc}
                mobileSrc={mobileSrc}
                posterDesktopSrc={posterDesktopSrc}
                posterMobileSrc={posterMobileSrc}
                alt={alt}
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

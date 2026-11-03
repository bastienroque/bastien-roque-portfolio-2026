import Link from "next/link";
import { ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import { ProjectShowcase } from "@/types";
import LazyVideo from "../ui/LazyVideo";

const cardClasses =
  "group flex flex-col gap-3 rounded-xl border border-brand-black bg-brand-white p-2 md:flex-row md:gap-4 md:p-4";

const ProjectCard = ({
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
  const hasMedia = Boolean(desktopSrc && desktopSrc.trim() !== "");
  // Replace with an explicit `status: "live" | "soon"` field on ProjectShowcase.
  const isLive = Boolean(href) && href !== "/";

  const content = (
    <>
      <div className="flex flex-col justify-between gap-6 md:w-1/3 md:self-stretch">
        <div className="flex flex-col items-start gap-3">
          <h3 className="text-2xl font-black md:text-3xl">{label}</h3>
          <span className="rounded-full border border-brand-black bg-brand-green px-3 py-1 text-sm font-bold">
            {devType}
          </span>
          {shortDesc && <p className="font-medium">{shortDesc}</p>}
        </div>

        <span className="rounded-full border border-brand-black bg-brand-green inline-flex items-center justify-center gap-2 px-4 py-2 font-bold transition-all group-hover:bg-brand-white hover:scale-[0.95] active:scale-[0.85]">
          {isLive ? (
            <>
              Open project
              <ArrowRight
                size={18}
                weight="bold"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </>
          ) : (
            <>
              Coming soon
              <Clock size={18} weight="bold" aria-hidden="true" />
            </>
          )}
        </span>
      </div>

      <div
        className={`relative aspect-video w-full overflow-hidden rounded-xl border border-brand-black md:aspect-auto md:min-h-[50vh] md:flex-1 ${
          hasMedia
            ? "bg-brand-white"
            : "flex items-center justify-center bg-brand-yellow p-4 text-center font-bold"
        }`}
      >
        {hasMedia ? (
          <LazyVideo
            desktopSrc={desktopSrc}
            mobileSrc={mobileSrc}
            posterDesktopSrc={posterDesktopSrc}
            posterMobileSrc={posterMobileSrc}
            alt={alt}
            className="h-full w-full object-cover"
          />
        ) : (
          "Preview coming soon"
        )}
      </div>
    </>
  );

  return (
    <article className="p-2 md:p-4">
      {isLive ? (
        <Link
          href={href}
          className={`${cardClasses} transition-colors hover:bg-brand-yellow focus-visible:bg-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
        >
          {content}
        </Link>
      ) : (
        <div className={cardClasses}>{content}</div>
      )}
    </article>
  );
};

export default ProjectCard;

import { Heading } from "@/components/ui/Heading";
import Shape from "@/components/ui/Shape";
import { MediaItemData } from "@/types";
import LazyVideo from "../../../ui/LazyVideo";

const MOBILE_BREAKPOINT = "(max-width: 767px)";

const fillClasses = "absolute inset-0 h-full w-full object-cover";

export default function MediaCard(item: MediaItemData) {
  const { alt, badgeTitle, badgeVariant, overlayBadges } = item;

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <div className="flex flex-col items-start justify-center gap-2">
        {badgeTitle && (
          <Heading level={2}>
            <Shape variant={badgeVariant} className="font-bold">
              {badgeTitle}
            </Shape>
          </Heading>
        )}
        {overlayBadges?.map((badge) => (
          <Shape key={badge}>{badge}</Shape>
        ))}
      </div>

      <div className="relative min-h-[60vh] w-full overflow-hidden rounded-xl border border-brand-black bg-brand-white md:min-h-[75vh]">
        {item.kind === "video" ? (
          <LazyVideo
            desktopSrc={item.desktopSrc}
            mobileSrc={item.mobileSrc}
            posterDesktopSrc={item.posterDesktopSrc}
            posterMobileSrc={item.posterMobileSrc}
            alt={alt}
            className={fillClasses}
          />
        ) : (
          <picture>
            <source srcSet={item.mobileSrc} media={MOBILE_BREAKPOINT} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.desktopSrc}
              alt={alt}
              loading="lazy"
              decoding="async"
              className={fillClasses}
            />
          </picture>
        )}
      </div>
    </div>
  );
}

import { Heading } from "@/components/ui/Heading";
import Shape from "@/components/ui/Shape";
import { MediaItemData } from "@/types";
import LazyVideo from "../../../ui/LazyVideo";

const MOBILE_BREAKPOINT = "(max-width: 767px)";

export default function MediaCard(item: MediaItemData) {
  const { alt, badgeTitle, badgeVariant, overlayBadges } = item;

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <div className="flex flex-col items-start justify-center gap-2">
        {badgeTitle && (
          <Heading level={2}>
            <Shape variant={badgeVariant} className="font-bold">
              {badgeTitle}
            </Shape>
          </Heading>
        )}
        {overlayBadges?.map((badge, index) => (
          <Shape key={index}>{badge}</Shape>
        ))}
      </div>

      <div className="relative min-h-[60vh] md:min-h-[75vh] w-full overflow-hidden rounded-xl border border-brand-black transition-colors bg-brand-white">
        {item.kind === "video" ? (
          <LazyVideo
            desktopSrc={item.desktopSrc}
            mobileSrc={item.mobileSrc}
            posterDesktopSrc={item.posterDesktopSrc}
            posterMobileSrc={item.posterMobileSrc}
            alt={alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <picture>
            <source srcSet={item.mobileSrc} media={MOBILE_BREAKPOINT} />
            <img
              src={item.desktopSrc}
              alt={alt}
              className="h-full w-full object-cover"
            />
          </picture>
        )}
      </div>
    </div>
  );
}

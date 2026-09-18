import { Heading } from "@/components/ui/Heading";
import Shape from "@/components/ui/Shape";
import { MediaItemData } from "@/types";
import LazyVideo from "./LazyVideo";

export default function MediaCard({
  src,
  posterSrc,
  alt,
  badgeTitle,
  badgeVariant,
  overlayBadges,
}: MediaItemData) {
  const isVideo = (src: string) => src.endsWith(".mp4");

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
        {isVideo(src) ? (
          <LazyVideo
            src={src}
            poster={posterSrc}
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={src}
            alt={alt || "Project showcase preview"}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

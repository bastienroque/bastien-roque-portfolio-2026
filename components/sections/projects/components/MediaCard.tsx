import Pill from "@/components/ui/Pill";
import { MediaItemData } from "@/types";

export default function MediaCard({
  src,
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
          <Pill variant={badgeVariant} className="font-bold">
            {badgeTitle}
          </Pill>
        )}

        {overlayBadges?.map((badge, index) => (
          <Pill key={index}>{badge}</Pill>
        ))}
      </div>
      <div className="relative min-h-[60vh] md:min-h-[75vh] w-full overflow-hidden rounded-xl border border-brand-black transition-colors bg-brand-white">
        {isVideo(src) ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
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

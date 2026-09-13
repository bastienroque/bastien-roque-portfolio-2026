import { MediaSection } from "@/types";
import MediaCard from "./MediaCard";

export default function MediaCardsGrid({ items }: MediaSection) {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {items.map((item, index) => (
        <MediaCard key={index} {...item} />
      ))}
    </div>
  );
}

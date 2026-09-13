import { FeatureSectionProps } from "@/types";
import FeatureCardsGrid from "./components/FeatureCardsGrid";
import LiveLinkBanner from "./components/LiveLinkBanner";
import DetailsGridTable from "./components/DetailsGridTable";
import DescriptionCard from "./components/DescriptionCard";
import MediaCardsGrid from "./components/MediaCardsGrid";

export default function FeatureSection({ section }: FeatureSectionProps) {
  switch (section.type) {
    case "cards":
      return <FeatureCardsGrid section={section} />;

    case "media":
      return <MediaCardsGrid {...section} />;

    case "link":
      return <LiveLinkBanner {...section} />;

    case "description":
      return <DescriptionCard {...section} />;

    case "details":
      return <DetailsGridTable {...section} />;

    default:
      return null;
  }
}

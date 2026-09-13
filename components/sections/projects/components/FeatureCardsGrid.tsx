import { FeatureCardsGridProps } from "@/types";
import FeatureCard from "./FeatureCard";

export default function FeatureCardsGrid({ section }: FeatureCardsGridProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {section.cards.map((card, index) => (
        <FeatureCard key={index} {...card} />
      ))}
    </div>
  );
}

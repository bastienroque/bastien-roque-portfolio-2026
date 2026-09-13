import Pill from "@/components/ui/Pill";
import { FeatureCardItem } from "@/types";

export default function FeatureCard({
  badgeTitle,
  badgeVariant,
  items,
}: FeatureCardItem) {
  return (
    <div className="relative h-fit w-full p-4 md:p-8 flex items-start justify-center rounded-xl border border-brand-black bg-brand-white">
      <div className="flex flex-col gap-4">
        <div className="self-center">
          <Pill variant={badgeVariant}>{badgeTitle}</Pill>
        </div>

        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <Pill className="font-bold!">{item.label}</Pill>
            <Pill>{item.value}</Pill>
          </div>
        ))}
      </div>
    </div>
  );
}

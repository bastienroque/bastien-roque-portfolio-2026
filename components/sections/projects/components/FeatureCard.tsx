import { Heading } from "@/components/ui/Heading";
import Shape from "@/components/ui/Shape";
import { FeatureCardItem } from "@/types";

export default function FeatureCard({
  badgeTitle,
  badgeVariant,
  items,
}: FeatureCardItem) {
  return (
    <div className="relative h-fit w-full p-2 md:p-4 flex items-start justify-center rounded-xl border border-brand-black bg-brand-white">
      <div className="flex flex-col gap-4">
        <div className="self-center">
          <Heading level={2}>
            <Shape variant={badgeVariant}>{badgeTitle}</Shape>
          </Heading>
        </div>

        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <Shape className="font-bold!">{item.label}</Shape>
            <Shape>{item.value}</Shape>
          </div>
        ))}
      </div>
    </div>
  );
}

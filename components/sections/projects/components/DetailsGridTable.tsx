import { Heading } from "@/components/ui/Heading";
import Shape from "@/components/ui/Shape";
import { DetailsSection } from "@/types";

export default function DetailsGridTable({
  id,
  items,
  badgeTitle,
  badgeVariant,
}: DetailsSection) {
  return (
    <div className="w-full flex flex-col items-start gap-2">
      {badgeTitle && (
        <Heading level={2}>
          <Shape variant={badgeVariant}>{badgeTitle}</Shape>
        </Heading>
      )}

      <div className="relative p-4 md:p-8 w-full flex flex-col lg:flex-row items-center justify-center gap-2 md:gap-4 rounded-xl border border-brand-black bg-brand-white">
        {items.map((item, index) => (
          <Shape key={index} className="flex flex-col gap-1 text-center">
            <span className="font-light">{item.label}</span>
            <span className="font-bold text-brand-black">{item.value}</span>
          </Shape>
        ))}
      </div>
    </div>
  );
}

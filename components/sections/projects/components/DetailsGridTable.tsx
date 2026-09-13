import Pill from "@/components/ui/Pill";
import { DetailsSection } from "@/types";

export default function DetailsGridTable({
  id,
  items,
  badgeTitle,
  badgeVariant,
}: DetailsSection) {
  return (
    <div
      id={id}
      className="w-full flex flex-col items-start gap-2 scroll-mt-48"
    >
      {badgeTitle && (
        <Pill variant={badgeVariant} className="font-bold">
          {badgeTitle}
        </Pill>
      )}

      <div className="relative p-4 md:p-8 w-full flex flex-col lg:flex-row items-center justify-center gap-2 md:gap-4 rounded-xl border border-brand-black bg-brand-white">
        {items.map((item, index) => (
          <Pill key={index} className="flex flex-col gap-1 text-center">
            <span className="font-light">{item.label}</span>
            <span className="font-bold text-brand-black">{item.value}</span>
          </Pill>
        ))}
      </div>
    </div>
  );
}

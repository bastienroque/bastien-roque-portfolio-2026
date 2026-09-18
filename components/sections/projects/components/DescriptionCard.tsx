import { Heading } from "@/components/ui/Heading";
import Shape from "@/components/ui/Shape";
import { DescriptionSection } from "@/types";

export default function DescriptionCard({
  content,
  badgeTitle,
  badgeVariant,
}: DescriptionSection) {
  return (
    <div className="relative w-full p-4 md:p-8 flex flex-col items-center gap-4 md:gap-4 rounded-xl border border-brand-black bg-brand-white">
      {badgeTitle && (
        <Heading level={2}>
          <Shape variant={badgeVariant}>{badgeTitle}</Shape>
        </Heading>
      )}

      <div className="prose text-brand-black text-start text-base md:text-lg">
        <p className="whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
}

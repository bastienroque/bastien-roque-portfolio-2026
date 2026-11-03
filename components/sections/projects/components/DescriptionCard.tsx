import { Heading } from "@/components/ui/Heading";
import Shape from "@/components/ui/Shape";
import { DescriptionSection } from "@/types";

export default function DescriptionCard({
  content,
  badgeTitle,
  badgeVariant,
}: DescriptionSection) {
  const paragraphs = content.split(/\n{2,}/);

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-xl border border-brand-black bg-brand-white p-4 md:p-8">
      {badgeTitle && (
        <Heading level={2}>
          <Shape variant={badgeVariant}>{badgeTitle}</Shape>
        </Heading>
      )}

      <div className="flex max-w-prose flex-col gap-4 text-start text-base text-brand-black md:text-lg">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

import { LinkSection } from "@/types";

export default function LiveLinkBanner({
  url,
  githubUrl,
  badgeTitle,
  githubTitle,
  badgeVariant,
}: LinkSection) {
  return (
    <div className="relative w-full p-4 md:p-8 flex flex-col md:flex-row items-center justify-center gap-4 rounded-xl border border-brand-black bg-brand-green">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="z-1 inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-black text-brand-white font-medium hover:scale-[0.95] transition-all"
      >
        <div className="z-1 relative flex items-center gap-3">{badgeTitle}</div>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </a>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="z-1 inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-black text-brand-white font-medium hover:scale-[0.95] transition-all"
      >
        <div className="z-1 relative flex items-center gap-3">
          {githubTitle}
        </div>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </a>
      <div className="hidden md:block absolute left-0 h-full aspect-square bg-brand-yellow border rounded-full" />
      <div className="hidden md:block absolute right-0 h-full aspect-square bg-brand-yellow border rounded-full" />
    </div>
  );
}

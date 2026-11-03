import { LinkSection } from "@/types";

const linkClasses =
  "relative z-1 inline-flex items-center gap-2 rounded-xl bg-brand-black px-8 py-3 font-medium text-brand-white transition-transform hover:scale-[0.95] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black motion-reduce:transition-none motion-reduce:hover:scale-100";

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={linkClasses}
  >
    <span>{children}</span>
    <span className="sr-only">(opens in a new tab)</span>
    {/* diagonal arrow = leaves the site */}
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 17 17 7M7 7h10v10"
      />
    </svg>
  </a>
);

export default function LiveLinkBanner({
  url,
  githubUrl,
  badgeTitle,
  githubTitle,
}: LinkSection) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-4 rounded-xl border border-brand-black bg-brand-green p-4 md:flex-row md:p-8">
      <ExternalLink href={url}>{badgeTitle}</ExternalLink>
      {/* private/client projects may have no repo: don't render a dead link */}
      {githubUrl && <ExternalLink href={githubUrl}>{githubTitle}</ExternalLink>}

      <div
        aria-hidden="true"
        className="absolute left-0 hidden aspect-square h-full rounded-full border border-brand-black bg-brand-yellow md:block"
      />
      <div
        aria-hidden="true"
        className="absolute right-0 hidden aspect-square h-full rounded-full border border-brand-black bg-brand-yellow md:block"
      />
    </div>
  );
}

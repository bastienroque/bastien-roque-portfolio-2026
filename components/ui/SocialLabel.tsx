import {
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";

// All Phosphor icons share one component type, so we reuse it instead of
// importing a separate `Icon` type (that export isn't in the ssr entry).
type IconComponent = typeof LinkedinLogo;

// Picks an icon from the link's label, so data/header.ts and data/footer.ts
// don't need to change. Unknown labels just render without an icon.
const icons: Record<string, IconComponent> = {
  linkedin: LinkedinLogo,
  github: GithubLogo,
  email: EnvelopeSimple,
  mail: EnvelopeSimple,
};

const SocialLabel = ({ label }: { label: string }) => {
  const key = Object.keys(icons).find((k) => label.toLowerCase().includes(k));
  const IconComponent = key ? icons[key] : null;

  return (
    <span className="inline-flex items-center gap-2">
      {IconComponent && (
        <IconComponent size={18} weight="fill" aria-hidden="true" />
      )}
      {label}
    </span>
  );
};

export default SocialLabel;

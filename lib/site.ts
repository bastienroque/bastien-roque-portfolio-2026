/**
 * The public URL of the site, used for canonical links, the sitemap and
 * social previews. TODO(hosting): set NEXT_PUBLIC_SITE_URL once there's a domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

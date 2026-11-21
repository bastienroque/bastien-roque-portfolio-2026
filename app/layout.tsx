import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { PROFILE } from "@/lib/data/profile";
import { SITE_URL } from "@/lib/site";

// One typeface for the whole site: monospace, terminal style.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: PROFILE.name },
  title: {
    default: `${PROFILE.name} · ${PROFILE.role}`,
    template: `%s · ${PROFILE.name}`,
  },
  description: `${PROFILE.name} is a full-stack developer in ${PROFILE.location} who also does design and motion design. Selected projects and case studies.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variable must sit on <html>: Tailwind resolves --font-mono at the
    // root, so a variable defined lower down (on <body>) silently falls back.
    <html lang="en" className={geistMono.variable}>
      <body className="font-mono antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-80 focus:bg-accent focus:text-on-accent focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <TopBar />
        {children}
      </body>
    </html>
  );
}

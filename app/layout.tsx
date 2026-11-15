import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { PROFILE } from "@/lib/data/profile";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: PROFILE.name },
  title: {
    default: `${PROFILE.name} · ${PROFILE.tagline.replace(/\.$/, "")}`,
    template: `%s · ${PROFILE.name}`,
  },
  description: `${PROFILE.name} is a full-stack developer in ${PROFILE.location} who also does design and motion design. Selected projects and case studies.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#02180e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-80 focus:bg-fg focus:text-bg focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to content
        </a>
        <TopBar />
        {children}
      </body>
    </html>
  );
}

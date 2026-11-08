import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModeProvider } from "@/components/providers/ModeProvider";
import { JamProvider } from "@/components/providers/JamProvider";
import { TopBar } from "@/components/layout/TopBar";
import { ArrivalChooser } from "@/components/layout/ArrivalChooser";
import { PROFILE } from "@/lib/data/profile";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: PROFILE.name },
  title: {
    default: `${PROFILE.name} · ${PROFILE.role} & drummer`,
    template: `%s · ${PROFILE.name}`,
  },
  description: `${PROFILE.name} is a ${PROFILE.role.toLowerCase()} in ${PROFILE.location}. Portfolio, case studies and a page you can play like a drum kit.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#02180e",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-80 focus:bg-fg focus:text-bg focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to content
        </a>
        <ModeProvider>
          <JamProvider>
            <TopBar />
            <ArrivalChooser />
            {children}
          </JamProvider>
        </ModeProvider>
      </body>
    </html>
  );
}

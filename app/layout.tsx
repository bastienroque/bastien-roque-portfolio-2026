import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://bastien-roque-portfolio-2026.vercel.app"),
  title: {
    default: "Bastien Roque - 2026 Portfolio",
    template: "%s | Bastien Roque - Portfolio",
  },
  description: "Bastien Roque - 2026 Portfolio",
  openGraph: {
    title: "Bastien Roque - 2026 Portfolio",
    description: "Bastien Roque - 2026 Portfolio",
    url: "https://bastien-roque-portfolio-2026.vercel.app",
    siteName: "Bastien Roque - Portfolio",
    locale: "en_EN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrumentSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

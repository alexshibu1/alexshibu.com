// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConditionalSidebar from "./components/ConditionalSidebar";
import { Inter, Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { DEFAULT_OG_IMAGE, SITE_URL } from "./lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alex Shibu",
    template: "%s | Alex Shibu",
  },
  description:
    "Alex Shibu is a Toronto-based full-stack developer, growth engineer, and student at University of Toronto sharing projects, writing, lore, books, and experiments.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Alex Shibu",
    description:
      "Toronto based developer, growth engineer, and student at University of Toronto sharing projects, writing, lore, books, and experiments.",
    url: SITE_URL,
    siteName: "Alex Shibu",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Alex Shibu",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Shibu",
    description:
      "Toronto based engineer, and student at University of Toronto sharing projects, writing, lore, books, and experiments.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${plexSans.variable}`}
    >
      <head>
        <script
          async
          src="https://alexshibustats.vercel.app/script.js"
          data-website-id="ee9bbb18-6cf5-4341-8228-010f8f7b4245"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ConditionalSidebar>{children}</ConditionalSidebar>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

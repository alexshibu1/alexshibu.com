// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConditionalSidebar from "./components/ConditionalSidebar";
import { Inter, Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

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
  title: "Alex Shibu",
  description: "Builder",
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

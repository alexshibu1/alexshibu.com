// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Sidebar from "./components/sidebar";
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
          src="https://cloud.umami.is/script.js"
          data-website-id="5f0d2a32-d312-45a8-a58e-351cf6190d79"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Sidebar />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

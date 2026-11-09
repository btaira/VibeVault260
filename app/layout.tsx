import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VibeVault 260 — 260 AI Project Ideas from the Vibe Coding Community",
  description:
    "260 curated AI-generated project ideas across SaaS, Creative, Utility, Social, and Deep Tech — filtered, liked, and surprise-picked with a slot machine.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="antialiased">
        {/* SVG filter for vertical motion blur */}
        <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
          <defs>
            <filter id="vbVertical" x="0" y="-50%" width="100%" height="200%">
              <feGaussianBlur stdDeviation="0 6" />
            </filter>
          </defs>
        </svg>
        <div className="cyber-grid" aria-hidden />
        {children}
      </body>
    </html>
  );
}

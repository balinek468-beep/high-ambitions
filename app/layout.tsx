import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { CinematicBackground } from "@/components/layout/cinematic-background";
import { CustomCursor } from "@/components/layout/custom-cursor";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "High Ambitions Studio",
  description:
    "Premium game industry support and consulting for ambitious teams building with discipline, clarity, and momentum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} bg-[#050505] text-[#f3f1ea] antialiased`}>
        <CinematicBackground />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

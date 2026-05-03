import type { Metadata, Viewport } from "next";
import { Public_Sans, Lexend } from "next/font/google";
import "./globals.css";
import { VoterModeProvider } from "@/context/VoterModeContext";
import { AIAssistant } from "@/components/ai/AIAssistant";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | CivicGuide",
    default: "CivicGuide - Empowering Indian Citizens Through Knowledge",
  },
  description: "An institutional-grade electoral education platform designed to foster civic literacy and transparency in the Indian democratic process.",
  keywords: ["Election India", "Civic Education", "Voter Rights", "Polling Day", "Constituency Finder"],
  authors: [{ name: "CivicGuide Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://civicguide.in",
    title: "CivicGuide - Election Education",
    description: "Learn about the Indian electoral process with interactive 3D simulations and verified data.",
    siteName: "CivicGuide",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${publicSans.variable} ${lexend.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-body-md antialiased">
        <VoterModeProvider>
          {children}
          <AIAssistant />
        </VoterModeProvider>
      </body>
    </html>
  );
}

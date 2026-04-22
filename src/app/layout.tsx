import type { Metadata } from "next";
import { Public_Sans, Lexend } from "next/font/google";
import "./globals.css";
import { VoterModeProvider } from "@/context/VoterModeContext";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CivicGuide - Election Process Education",
  description: "An intelligent civic-education assistant.",
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
        </VoterModeProvider>
      </body>
    </html>
  );
}

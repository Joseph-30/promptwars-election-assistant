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
      className={`${publicSans.variable} ${lexend.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-slate-900 font-body">
        <VoterModeProvider>
          {children}
        </VoterModeProvider>
      </body>
    </html>
  );
}

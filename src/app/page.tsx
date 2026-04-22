"use client";

import React, { useState } from "react";
import { InteractiveTimeline } from "@/components/timeline/InteractiveTimeline";
import { GuidedProcessNavigator } from "@/components/navigator/GuidedProcessNavigator";
import { SmartFAQ } from "@/components/faq/SmartFAQ";
import { MicroQuiz } from "@/components/quiz/MicroQuiz";
import { WelcomeOnboarding } from "@/components/welcome/WelcomeOnboarding";

const sidebarLinks = [
  { id: "navigator", label: "Registration", icon: "how_to_reg" },
  { id: "timeline", label: "Primaries", icon: "campaign" },
  { id: "faq", label: "Campaigns", icon: "groups" },
  { id: "quiz", label: "General Election", icon: "how_to_vote" },
  { id: "glossary", label: "Certification", icon: "verified" },
];

const topNavLinks: Record<string, { items: { label: string; target: string }[] }> = {
  welcome:   { items: [] },
  timeline:  { items: [{ label: "Registration", target: "navigator" }, { label: "Primaries", target: "timeline" }, { label: "Campaigns", target: "faq" }] },
  navigator: { items: [{ label: "Learn", target: "navigator" }, { label: "Participate", target: "quiz" }, { label: "Impact", target: "timeline" }] },
  quiz:      { items: [{ label: "Learning", target: "navigator" }, { label: "Resources", target: "faq" }, { label: "Community", target: "faq" }] },
  faq:       { items: [{ label: "Dashboard", target: "timeline" }, { label: "Elections", target: "quiz" }, { label: "Resources", target: "faq" }] },
};

// Pages that show the sidebar
const sidebarPages = new Set(["timeline", "navigator", "faq"]);

export default function Home() {
  const [activeSection, setActiveSection] = useState("welcome");

  const hasSidebar = sidebarPages.has(activeSection);
  const navConfig = topNavLinks[activeSection] || topNavLinks.welcome;

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased flex flex-col">
      {/* ─── TopAppBar ─── */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white border-b border-slate-200 shadow-sm shadow-blue-900/5 font-['Public_Sans'] font-medium">
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveSection("welcome")} className="text-xl font-bold text-primary tracking-tight cursor-pointer">CivicTrack</button>
          {navConfig.items.length > 0 && (
            <>
              <div className="h-6 w-px bg-slate-200 ml-2"></div>
              <nav className="hidden md:flex gap-6 items-center h-full ml-4">
                {navConfig.items.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSection(item.target)}
                    className={`h-full flex items-center px-2 transition-all duration-150 cursor-pointer ${item.target === activeSection ? "text-primary border-b-2 border-primary" : "text-slate-500 hover:bg-slate-50"}`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined text-lg">public</span>
            <span className="text-sm">Select Region</span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary text-xs font-bold">JD</div>
        </div>
      </header>

      {/* ─── Body ─── */}
      <div className={`flex flex-1 pt-16 ${hasSidebar ? "" : ""}`}>
        {/* ─── Left Sidebar (Dashboard Mode) ─── */}
        {hasSidebar && (
          <aside className="hidden md:flex flex-col w-56 border-r border-slate-200 bg-white sticky top-16 h-[calc(100vh-64px)] p-4 gap-2 shrink-0">
            <div className="mb-4 px-3">
              <p className="text-sm font-semibold text-primary">Election Guide</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Institutional Learning</p>
            </div>
            <nav className="flex-1 flex flex-col gap-1">
              {sidebarLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveSection(link.id)}
                  className={`flex items-center gap-3 p-3 rounded-md text-sm font-semibold transition-all text-left ${
                    activeSection === link.id
                      ? "text-primary bg-primary/5 border-l-2 border-primary"
                      : "text-slate-500 hover:bg-slate-50 hover:translate-x-1"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{link.icon}</span>
                  {link.label}
                </button>
              ))}
            </nav>
            <button
              onClick={() => setActiveSection("quiz")}
              className="bg-primary text-on-primary py-3 px-4 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
            >
              Check Progress
            </button>
            <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-1">
              <button onClick={() => setActiveSection("faq")} className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-md text-sm font-semibold">
                <span className="material-symbols-outlined">menu_book</span>
                Glossary
              </button>
              <button className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-md text-sm font-semibold">
                <span className="material-symbols-outlined">help_outline</span>
                Help
              </button>
            </div>
          </aside>
        )}

        {/* ─── Main Content Area ─── */}
        <main className={`flex-1 min-h-[calc(100vh-64px)] ${hasSidebar ? "max-w-7xl px-6 py-12" : ""}`}>
          {activeSection === "welcome" && <WelcomeOnboarding setActiveSection={setActiveSection} />}
          {activeSection === "timeline" && <InteractiveTimeline setActiveSection={setActiveSection} />}
          {activeSection === "navigator" && <GuidedProcessNavigator setActiveSection={setActiveSection} />}
          {activeSection === "quiz" && <MicroQuiz setActiveSection={setActiveSection} />}
          {activeSection === "faq" && <SmartFAQ setActiveSection={setActiveSection} />}
          {activeSection === "glossary" && <SmartFAQ setActiveSection={setActiveSection} />}
        </main>
      </div>

      {/* ─── Mobile Bottom Nav ─── */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-around items-center h-16 z-50">
        {sidebarLinks.slice(0, 4).map((link) => (
          <button key={link.id} onClick={() => setActiveSection(link.id)} className={`flex flex-col items-center gap-1 ${activeSection === link.id ? "text-primary font-bold" : "text-slate-400"}`}>
            <span className="material-symbols-outlined" style={activeSection === link.id ? { fontVariationSettings: "'FILL' 1" } : {}}>{link.icon}</span>
            <span className="text-[10px]">{link.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

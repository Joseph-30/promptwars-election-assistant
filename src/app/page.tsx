"use client";

import React, { useState } from "react";
import { InteractiveTimeline } from "@/components/timeline/InteractiveTimeline";
import { GuidedProcessNavigator } from "@/components/navigator/GuidedProcessNavigator";
import { SmartFAQ } from "@/components/faq/SmartFAQ";
import { MicroQuiz } from "@/components/quiz/MicroQuiz";
import { WelcomeOnboarding } from "@/components/welcome/WelcomeOnboarding";

const sidebarLinks = [
  { id: 0, label: "Registration",     icon: "how_to_reg"  },
  { id: 1, label: "Primaries",        icon: "campaign"    },
  { id: 2, label: "Campaigns",        icon: "groups"      },
  { id: 3, label: "General Election", icon: "how_to_vote" },
  { id: 4, label: "Certification",    icon: "verified"    },
];

// These views show the persistent left sidebar
const SIDEBAR_VIEWS = new Set(["dashboard", "navigator", "faq", "quiz"]);

// Top-nav is the SAME across every sidebar view — no more per-page switching
const GLOBAL_NAV = [
  { label: "Dashboard", target: "dashboard" },
  { label: "Learning",  target: "navigator" },
  { label: "Quiz",      target: "quiz"      },
  { label: "Resources", target: "faq"       },
];

export default function Home() {
  const [activeView,        setActiveView]        = useState("welcome");
  const [activeModule,      setActiveModule]      = useState(0);
  // completedModules tracks which module indices have been finished
  // Module N is unlocked only if N === 0 or N-1 is in completedModules
  const [completedModules,  setCompletedModules]  = useState<number[]>([]);

  const hasSidebar = SIDEBAR_VIEWS.has(activeView);

  /** Navigate to a top-level view */
  const goToView = (view: string) => setActiveView(view);

  /** Navigate to a specific learning module */
  const goToModule = (index: number) => {
    setActiveModule(index);
    setActiveView("navigator");
  };

  /** Mark a module as complete and unlock the next */
  const completeModule = (index: number) => {
    setCompletedModules((prev) =>
      prev.includes(index) ? prev : [...prev, index]
    );
  };

  /** Whether a module is unlocked (0 is always unlocked; N unlocked if N-1 is complete) */
  const isUnlocked = (index: number) =>
    index === 0 || completedModules.includes(index - 1);

  const isModuleActive = (id: number) =>
    activeView === "navigator" && activeModule === id;

  // The "current" module for the hero banner = first non-completed unlocked module
  const currentProgressModule =
    sidebarLinks.find((l) => !completedModules.includes(l.id) && isUnlocked(l.id))?.id ?? 0;

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased flex flex-col">

      {/* ─── Top App Bar ─── */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white border-b border-slate-200 shadow-sm font-['Public_Sans'] font-medium">
        <div className="flex items-center">
          {/* Logo */}
          <button
            onClick={() => goToView("welcome")}
            className="text-xl font-bold text-primary tracking-tight mr-6"
          >
            CivicTrack
          </button>

          {/* Consistent global nav — only shown when inside the app (not on welcome) */}
          {hasSidebar && (
            <>
              <div className="h-6 w-px bg-slate-200 mr-6" />
              <nav className="hidden md:flex items-center h-16">
                {GLOBAL_NAV.map((item) => (
                  <button
                    key={item.target}
                    onClick={() => goToView(item.target)}
                    className={`h-full flex items-center px-4 text-sm transition-all border-b-2 ${
                      item.target === activeView
                        ? "text-primary border-primary font-semibold"
                        : "border-transparent text-slate-500 hover:text-primary hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm">
            <span className="material-symbols-outlined text-lg">public</span>
            Select Region
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
            JD
          </div>
        </div>
      </header>

      {/* ─── Body ─── */}
      <div className="flex flex-1 pt-16">

        {/* ─── Persistent Left Sidebar ─── */}
        {hasSidebar && (
          <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-slate-200 bg-white sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">

            {/* Header */}
            <div className="px-4 py-4 border-b border-slate-100">
              <p className="text-sm font-semibold text-primary">Election Guide</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">
                {completedModules.length} / {sidebarLinks.length} modules done
              </p>
            </div>

            {/* Module nav */}
            <nav className="flex-1 flex flex-col gap-0.5 p-3">
              {sidebarLinks.map((link) => {
                const locked    = !isUnlocked(link.id);
                const completed = completedModules.includes(link.id);
                const active    = isModuleActive(link.id);

                return (
                  <button
                    key={link.id}
                    disabled={locked}
                    onClick={() => !locked && goToModule(link.id)}
                    title={locked ? "Complete the previous module first" : link.label}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left w-full border-l-[3px] ${
                      locked
                        ? "text-slate-300 cursor-not-allowed border-transparent"
                        : active
                        ? "text-primary bg-primary/5 border-primary font-semibold"
                        : completed
                        ? "text-secondary border-transparent hover:bg-slate-50"
                        : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-primary"
                    }`}
                  >
                    {/* Status icon */}
                    {locked ? (
                      <span className="material-symbols-outlined text-base text-slate-300">lock</span>
                    ) : completed ? (
                      <span className="material-symbols-outlined text-base text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    ) : (
                      <span className={`material-symbols-outlined text-base ${active ? "text-primary" : "text-slate-400"}`}>{link.icon}</span>
                    )}
                    <span className="truncate">{link.label}</span>
                    {completed && !active && (
                      <span className="ml-auto text-[9px] font-bold text-secondary uppercase tracking-wider">Done</span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bottom actions */}
            <div className="p-3 border-t border-slate-100 flex flex-col gap-1.5">
              <button
                onClick={() => goToView("quiz")}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-opacity shadow-sm ${
                  activeView === "quiz"
                    ? "bg-primary/90 text-white"
                    : "bg-primary text-on-primary hover:opacity-90"
                }`}
              >
                Take Quiz
              </button>
              <button
                onClick={() => goToView("faq")}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
                  activeView === "faq"
                    ? "text-primary bg-primary/5 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-base">menu_book</span>
                Glossary &amp; FAQ
              </button>
            </div>
          </aside>
        )}

        {/* ─── Main Content ─── */}
        <main className={`flex-1 min-h-[calc(100vh-64px)] overflow-x-hidden ${hasSidebar ? "px-6 py-10 max-w-[calc(100vw-224px)]" : ""}`}>
          {activeView === "welcome"   && (
            <WelcomeOnboarding setActiveSection={goToView} />
          )}
          {activeView === "dashboard" && (
            <InteractiveTimeline
              setActiveSection={goToView}
              setActiveModule={goToModule}
              completedModules={completedModules}
              currentProgressModule={currentProgressModule}
            />
          )}
          {activeView === "navigator" && (
            <GuidedProcessNavigator
              setActiveSection={goToView}
              activeModule={activeModule}
              setActiveModule={setActiveModule}
              completedModules={completedModules}
              completeModule={completeModule}
            />
          )}
          {activeView === "quiz"      && (
            <MicroQuiz
              setActiveSection={goToView}
              completeModule={completeModule}
            />
          )}
          {activeView === "faq"       && (
            <SmartFAQ setActiveSection={goToView} />
          )}
        </main>
      </div>

      {/* ─── Mobile Bottom Nav ─── */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-around items-center h-14 z-50">
        {[
          { label: "Timeline", view: "dashboard", icon: "dashboard" },
          { label: "Learn",    view: "navigator", icon: "school"    },
          { label: "Quiz",     view: "quiz",      icon: "quiz"      },
          { label: "Help",     view: "faq",       icon: "menu_book" },
        ].map((item) => (
          <button
            key={item.view}
            onClick={() => goToView(item.view)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 ${activeView === item.view ? "text-primary" : "text-slate-400"}`}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={activeView === item.view ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="text-[9px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

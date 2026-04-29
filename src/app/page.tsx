"use client";

import React, { useState } from "react";
import { InteractiveTimeline }    from "@/components/timeline/InteractiveTimeline";
import { GuidedProcessNavigator } from "@/components/navigator/GuidedProcessNavigator";
import { SmartFAQ }               from "@/components/faq/SmartFAQ";
import { MicroQuiz }              from "@/components/quiz/MicroQuiz";
import { WelcomeOnboarding }      from "@/components/welcome/WelcomeOnboarding";
import { ConstituencyFinder }     from "@/components/constituency/ConstituencyFinder";
import { MythBuster }             from "@/components/myths/MythBuster";
import { LanguageProvider, useLanguage, LANGUAGES } from "@/context/LanguageContext";

const sidebarLinks = [
  { id: 0, label: "Registration",     icon: "how_to_reg"  },
  { id: 1, label: "Primaries",        icon: "campaign"    },
  { id: 2, label: "Campaigns",        icon: "groups"      },
  { id: 3, label: "General Election", icon: "how_to_vote" },
  { id: 4, label: "Certification",    icon: "verified"    },
];

const SIDEBAR_VIEWS = new Set(["dashboard", "navigator", "faq", "quiz", "constituency", "myths"]);

function AppShell() {
  const { t, lang, setLang } = useLanguage();
  const [activeView,       setActiveView]       = useState("welcome");
  const [activeModule,     setActiveModule]     = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [langOpen,         setLangOpen]         = useState(false);

  const hasSidebar = SIDEBAR_VIEWS.has(activeView);

  const goToView   = (view: string) => setActiveView(view);
  const goToModule = (index: number) => { setActiveModule(index); setActiveView("navigator"); };

  const completeModule = (index: number) =>
    setCompletedModules((prev) => prev.includes(index) ? prev : [...prev, index]);

  const isUnlocked = (index: number) =>
    index === 0 || completedModules.includes(index - 1);

  const isModuleActive = (id: number) =>
    activeView === "navigator" && activeModule === id;

  const currentProgressModule =
    sidebarLinks.find((l) => !completedModules.includes(l.id) && isUnlocked(l.id))?.id ?? 0;

  const GLOBAL_NAV = [
    { label: t.dashboard,       target: "dashboard"    },
    { label: t.learning,        target: "navigator"    },
    { label: t.quiz,            target: "quiz"         },
    { label: t.constituency,    target: "constituency" },
    { label: "Myth Buster",     target: "myths"        },
    { label: t.resources,       target: "faq"          },
  ];

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased flex flex-col">

      {/* ─── Top App Bar ─── */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white border-b border-slate-200 shadow-sm font-['Public_Sans'] font-medium">
        <div className="flex items-center">
          <button onClick={() => goToView("welcome")} className="text-xl font-bold text-primary tracking-tight mr-6">
            {t.appName}
          </button>

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

        <div className="flex items-center gap-3 relative">
          {/* Language Switcher */}
          <div className="relative">
            <button
              id="lang-switcher-btn"
              onClick={() => setLangOpen((o) => !o)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-lg">translate</span>
              <span>{LANGUAGES.find((l) => l.code === lang)?.nativeLabel}</span>
              <span className="material-symbols-outlined text-base text-slate-400">expand_more</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1 min-w-[160px]">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 flex items-center justify-between gap-3 ${lang === l.code ? "text-primary font-semibold" : "text-slate-700"}`}
                  >
                    <span>{l.nativeLabel}</span>
                    <span className="text-xs text-slate-400">{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

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
            <div className="px-4 py-4 border-b border-slate-100">
              <p className="text-sm font-semibold text-primary">{t.learning}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">
                {completedModules.length} / {sidebarLinks.length} modules done
              </p>
            </div>

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
                      locked    ? "text-slate-300 cursor-not-allowed border-transparent"
                      : active   ? "text-primary bg-primary/5 border-primary font-semibold"
                      : completed? "text-secondary border-transparent hover:bg-slate-50"
                      :            "text-slate-600 border-transparent hover:bg-slate-50 hover:text-primary"
                    }`}
                  >
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

            <div className="p-3 border-t border-slate-100 flex flex-col gap-1.5">
              <button
                onClick={() => goToView("quiz")}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-opacity shadow-sm ${
                  activeView === "quiz" ? "bg-primary/90 text-white" : "bg-primary text-on-primary hover:opacity-90"
                }`}
              >
                {t.takeQuiz}
              </button>
              <button
                onClick={() => goToView("constituency")}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
                  activeView === "constituency" ? "text-primary bg-primary/5 font-semibold" : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-base">place</span>
                {t.constituency}
              </button>
              <button
                onClick={() => goToView("myths")}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
                  activeView === "myths" ? "text-primary bg-primary/5 font-semibold" : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-base">fact_check</span>
                Myth Buster
              </button>
              <button
                onClick={() => goToView("faq")}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
                  activeView === "faq" ? "text-primary bg-primary/5 font-semibold" : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-base">menu_book</span>
                {t.glossary}
              </button>
            </div>
          </aside>
        )}

        {/* ─── Main Content ─── */}
        <main className={`flex-1 min-h-[calc(100vh-64px)] overflow-x-hidden ${hasSidebar ? "px-6 py-10 max-w-[calc(100vw-224px)]" : ""}`}>
          {activeView === "welcome"      && <WelcomeOnboarding      setActiveSection={goToView} />}
          {activeView === "dashboard"    && (
            <InteractiveTimeline
              setActiveSection={goToView}
              setActiveModule={goToModule}
              completedModules={completedModules}
              currentProgressModule={currentProgressModule}
            />
          )}
          {activeView === "navigator"    && (
            <GuidedProcessNavigator
              setActiveSection={goToView}
              activeModule={activeModule}
              setActiveModule={setActiveModule}
              completedModules={completedModules}
              completeModule={completeModule}
            />
          )}
          {activeView === "quiz"         && <MicroQuiz setActiveSection={goToView} completeModule={completeModule} />}
          {activeView === "faq"          && <SmartFAQ  setActiveSection={goToView} />}
          {activeView === "constituency" && <ConstituencyFinder />}
          {activeView === "myths"        && <MythBuster />}
        </main>
      </div>

      {/* ─── Mobile Bottom Nav ─── */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-around items-center h-14 z-50">
        {[
          { label: t.dashboard,    view: "dashboard",    icon: "dashboard"  },
          { label: t.learning,     view: "navigator",    icon: "school"     },
          { label: t.quiz,         view: "quiz",         icon: "quiz"       },
          { label: t.constituency, view: "constituency", icon: "place"      },
          { label: "Myths",        view: "myths",        icon: "fact_check" },
        ].map((item) => (
          <button
            key={item.view}
            onClick={() => goToView(item.view)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 ${activeView === item.view ? "text-primary" : "text-slate-400"}`}
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

export default function Home() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  );
}

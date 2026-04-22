"use client";

import React, { useState } from "react";
import { InteractiveTimeline } from "@/components/timeline/InteractiveTimeline";
import { GuidedProcessNavigator } from "@/components/navigator/GuidedProcessNavigator";
import { SmartFAQ } from "@/components/faq/SmartFAQ";
import { MicroQuiz } from "@/components/quiz/MicroQuiz";
import { useVoterMode } from "@/context/VoterModeContext";
import { BookOpen, UserCircle2 } from "lucide-react";
import { GlossaryTooltip } from "@/components/glossary/GlossaryTooltip";

export default function Home() {
  const [activeSection, setActiveSection] = useState("quiz");
  const { isFirstTimeVoter, toggleFirstTimeVoterMode } = useVoterMode();

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface antialiased flex flex-col">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white border-b border-slate-200 shadow-sm shadow-blue-900/5 font-heading font-medium">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-primary">CivicTrack</span>
          <div className="h-6 w-px bg-slate-200 ml-2"></div>
          <nav className="hidden md:flex gap-6 items-center h-full ml-4">
            <button onClick={() => setActiveSection("navigator")} className={`h-full flex items-center px-2 transition-all duration-150 ${activeSection === "navigator" ? "text-primary border-b-2 border-primary" : "text-slate-500 hover:bg-slate-50"}`}>Navigator</button>
            <button onClick={() => setActiveSection("timeline")} className={`h-full flex items-center px-2 transition-all duration-150 ${activeSection === "timeline" ? "text-primary border-b-2 border-primary" : "text-slate-500 hover:bg-slate-50"}`}>Timeline</button>
            <button onClick={() => setActiveSection("quiz")} className={`h-full flex items-center px-2 transition-all duration-150 ${activeSection === "quiz" ? "text-primary border-b-2 border-primary" : "text-slate-500 hover:bg-slate-50"}`}>Quiz</button>
            <button onClick={() => setActiveSection("faq")} className={`h-full flex items-center px-2 transition-all duration-150 ${activeSection === "faq" ? "text-primary border-b-2 border-primary" : "text-slate-500 hover:bg-slate-50"}`}>FAQ</button>
            <button onClick={() => setActiveSection("glossary")} className={`h-full flex items-center px-2 transition-all duration-150 ${activeSection === "glossary" ? "text-primary border-b-2 border-primary" : "text-slate-500 hover:bg-slate-50"}`}>Glossary</button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleFirstTimeVoterMode} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
            <UserCircle2 className="w-4 h-4" />
            <span className="text-sm">{isFirstTimeVoter ? "First-Time Mode: ON" : "First-Time Mode: OFF"}</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary text-xs font-bold">JD</div>
        </div>
      </header>

      <main className="pt-24 pb-24 px-6 max-w-[1200px] mx-auto min-h-screen w-full">
        {activeSection === "navigator" && <GuidedProcessNavigator />}
        {activeSection === "timeline" && <InteractiveTimeline />}
        {activeSection === "faq" && <SmartFAQ />}
        {activeSection === "quiz" && <MicroQuiz />}
        {activeSection === "glossary" && (
          <div className="max-w-3xl mx-auto py-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight font-heading text-primary">Full Glossary</h2>
              <p className="text-slate-500 mt-2 font-body">Explore common election terminology.</p>
            </div>
            <div className="bg-surface rounded-xl border border-primary/10 p-8 shadow-quiz-card font-body">
              <p className="text-slate-700 leading-loose">
                Understanding elections can be tough with complex terms like <GlossaryTooltip text="Constituency" />, <GlossaryTooltip text="Electoral Roll" />, and the <GlossaryTooltip text="Model Code of Conduct" />. Hover over these highlighted terms anywhere in the app to see their definitions.
              </p>
            </div>
          </div>
        )}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-around items-center h-16 z-50">
        <button onClick={() => setActiveSection("navigator")} className={`flex flex-col items-center gap-1 ${activeSection === "navigator" ? "text-primary font-bold" : "text-slate-400"}`}>
          <span className="material-symbols-outlined">how_to_reg</span>
          <span className="text-[10px]">Registration</span>
        </button>
        <button onClick={() => setActiveSection("timeline")} className={`flex flex-col items-center gap-1 ${activeSection === "timeline" ? "text-primary font-bold" : "text-slate-400"}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_vote</span>
          <span className="text-[10px]">Election</span>
        </button>
        <button onClick={() => setActiveSection("quiz")} className={`flex flex-col items-center gap-1 ${activeSection === "quiz" ? "text-primary font-bold" : "text-slate-400"}`}>
          <span className="material-symbols-outlined">campaign</span>
          <span className="text-[10px]">Quiz</span>
        </button>
        <button onClick={() => setActiveSection("glossary")} className={`flex flex-col items-center gap-1 ${activeSection === "glossary" ? "text-primary font-bold" : "text-slate-400"}`}>
          <span className="material-symbols-outlined">menu_book</span>
          <span className="text-[10px]">Glossary</span>
        </button>
      </nav>
    </div>
  );
}

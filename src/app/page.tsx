"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { InteractiveTimeline } from "@/components/timeline/InteractiveTimeline";
import { GuidedProcessNavigator } from "@/components/navigator/GuidedProcessNavigator";
import { SmartFAQ } from "@/components/faq/SmartFAQ";
import { MicroQuiz } from "@/components/quiz/MicroQuiz";
import { useVoterMode } from "@/context/VoterModeContext";
import { BookOpen, UserCircle2 } from "lucide-react";
import { GlossaryTooltip } from "@/components/glossary/GlossaryTooltip";

export default function Home() {
  const [activeSection, setActiveSection] = useState("navigator");
  const { isFirstTimeVoter, toggleFirstTimeVoterMode } = useVoterMode();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:hidden">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-primary font-heading">CivicGuide</span>
          </div>
          <div className="hidden md:block">
            {/* Breadcrumbs or section title could go here */}
          </div>
          
          <div className="flex items-center gap-4 bg-primary/5 px-4 py-2 rounded-full shadow-sm ml-auto">
            <UserCircle2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary font-body">First-Time Voter Mode</span>
            <button 
              onClick={toggleFirstTimeVoterMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${isFirstTimeVoter ? 'bg-primary' : 'bg-slate-300'}`}
            >
              <span className="sr-only">Toggle First-Time Voter Mode</span>
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isFirstTimeVoter ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="mx-auto w-full max-w-5xl h-full">
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
                <div className="bg-surface rounded-xl border border-primary/10 p-8 shadow-ambient font-body">
                  <p className="text-slate-700 leading-loose">
                    Understanding elections can be tough with complex terms like <GlossaryTooltip text="Constituency" />, <GlossaryTooltip text="Electoral Roll" />, and the <GlossaryTooltip text="Model Code of Conduct" />. Hover over these highlighted terms anywhere in the app to see their definitions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

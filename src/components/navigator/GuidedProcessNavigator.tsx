"use client";

import React, { useState } from "react";
import { timelineData } from "@/data/mockData";
import { useVoterMode } from "@/context/VoterModeContext";
import { motion, AnimatePresence } from "framer-motion";
import { GlossaryTooltip } from "@/components/glossary/GlossaryTooltip";

interface GuidedProcessNavigatorProps {
  setActiveSection?: (s: string) => void;
  activeModule?:     number;
  setActiveModule?:  (i: number) => void;
  completedModules?: number[];
  completeModule?:   (i: number) => void;
}

export function GuidedProcessNavigator({
  setActiveSection,
  activeModule  = 0,
  setActiveModule,
  completedModules = [],
  completeModule,
}: GuidedProcessNavigatorProps) {
  const { isFirstTimeVoter } = useVoterMode();
  const [expandedSection, setExpandedSection] = useState<string | null>("why");

  const currentStage = timelineData[activeModule];
  const isCompleted  = completedModules.includes(activeModule);
  const isLast       = activeModule === timelineData.length - 1;

  const toggleSection = (id: string) =>
    setExpandedSection(expandedSection === id ? null : id);

  const handleNext = () => {
    // Mark current module as complete
    if (completeModule) completeModule(activeModule);

    if (!isLast) {
      if (setActiveModule) setActiveModule(activeModule + 1);
    } else {
      // All modules done — go to quiz
      if (setActiveSection) setActiveSection("quiz");
    }
  };

  const handlePrev = () => {
    if (activeModule > 0 && setActiveModule) setActiveModule(activeModule - 1);
  };

  return (
    <div className="max-w-4xl mx-auto">

      {/* Module Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <span className="material-symbols-outlined text-sm">school</span>
          <span className="font-bold tracking-widest uppercase">
            Module {String(activeModule + 1).padStart(2, "0")} of {timelineData.length} — Core Civics
          </span>
          {isCompleted && (
            <span className="ml-2 inline-flex items-center gap-1 text-secondary font-bold">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Completed
            </span>
          )}
        </div>
        <h1 className="font-h1 text-h1 text-primary mb-2">{currentStage.title}</h1>
        <p className="text-on-surface-variant text-body-md max-w-2xl">{currentStage.description}</p>
      </div>

      {/* Module Progress bar */}
      <div className="bg-white rounded-xl p-5 shadow-quiz-card border border-slate-100 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-primary">Module Progress</span>
            <div className="flex gap-1 mt-1">
              {timelineData.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    completedModules.includes(i)
                      ? "bg-secondary"
                      : i === activeModule
                      ? "bg-primary"
                      : "bg-slate-100"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-secondary">{Math.round((completedModules.length / timelineData.length) * 100)}%</p>
            <p className="text-xs text-slate-500">Complete</p>
          </div>
        </div>
      </div>

      {/* Content Cards */}
      <div className="space-y-5">

        {/* Why It Matters */}
        <div className={`bg-white rounded-xl shadow-quiz-card border-2 transition-all ${expandedSection === "why" ? "border-primary" : "border-slate-100"}`}>
          <button
            onClick={() => toggleSection("why")}
            className="w-full flex items-center justify-between p-6 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">description</span>
              </div>
              <h3 className="font-h3 text-h3 text-primary">Why {currentStage.title} Matters</h3>
            </div>
            <span className={`material-symbols-outlined text-slate-400 transition-transform shrink-0 ${expandedSection === "why" ? "rotate-180" : ""}`}>
              expand_more
            </span>
          </button>
          <AnimatePresence>
            {expandedSection === "why" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <p className="text-on-surface-variant mb-4">{currentStage.whyItMatters}</p>
                  <blockquote className="border-l-4 border-primary pl-4 italic text-slate-600 text-sm">
                    &quot;Without a clean register, the integrity of the ballot box is at risk.&quot; — Institutional Motto
                  </blockquote>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Steps & Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl p-6 shadow-quiz-card border border-slate-100">
            <h4 className="font-h3 text-quiz-option text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">how_to_reg</span>
              {isFirstTimeVoter ? "Your Checklist" : "Action Steps"}
            </h4>
            <ul className="space-y-3">
              {currentStage.actionSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span
                    className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="text-on-surface text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-quiz-card border border-slate-100">
            <h4 className="font-h3 text-quiz-option text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-error">event_busy</span>
              Advanced Details
            </h4>
            <p className="text-on-surface-variant text-sm mb-4">
              <GlossaryTooltip text={currentStage.advancedDetails} />
            </p>
            <button className="flex items-center gap-2 text-xs text-slate-500 hover:text-primary transition-colors font-label-caps uppercase">
              <span className="material-symbols-outlined text-sm">info</span>
              Check your local state laws
            </button>
          </div>
        </div>

        {/* Constitutional Deep-Dive */}
        {currentStage.constitutionArticles?.length > 0 && (
          <div className={`bg-white rounded-xl shadow-quiz-card border-2 transition-all ${expandedSection === "constitution" ? "border-amber-400" : "border-slate-100"}`}>
            <button
              onClick={() => toggleSection("constitution")}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-amber-600">gavel</span>
                </div>
                <div>
                  <h3 className="font-h3 text-h3 text-primary">Constitutional Basis</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{currentStage.constitutionArticles.length} articles � Constitution of India</p>
                </div>
              </div>
              <span className={`material-symbols-outlined text-slate-400 transition-transform shrink-0 ${expandedSection === "constitution" ? "rotate-180" : ""}`}>
                expand_more
              </span>
            </button>
            <AnimatePresence>
              {expandedSection === "constitution" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 space-y-4">
                    {currentStage.constitutionArticles.map((a, idx) => (
                      <div key={idx} className="flex gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="shrink-0">
                          <span className="inline-block bg-amber-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg whitespace-nowrap">
                            {a.article}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-primary text-sm mb-1">{a.title}</p>
                          <p className="text-slate-600 text-sm leading-relaxed">{a.summary}</p>
                        </div>
                      </div>
                    ))}
                    <a
                      href="https://www.legislative.gov.in/constitution-of-india/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-amber-700 hover:text-amber-900 font-semibold transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                      Read full Constitution of India (legislative.gov.in)
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
        <button
          onClick={handlePrev}
          disabled={activeModule === 0}
          className="px-6 py-3 rounded-xl font-semibold text-primary border border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Previous
        </button>

        <span className="text-sm text-slate-500">
          <span className="font-bold text-primary">{activeModule + 1}</span>
          <span> / {timelineData.length}</span>
        </span>

        <button
          onClick={handleNext}
          className="px-6 py-3 rounded-xl font-semibold bg-primary text-on-primary hover:opacity-90 flex items-center gap-2 transition-opacity shadow-sm"
        >
          {isLast ? "Finish & Take Quiz" : isCompleted ? "Next Module" : "Complete & Continue"}
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

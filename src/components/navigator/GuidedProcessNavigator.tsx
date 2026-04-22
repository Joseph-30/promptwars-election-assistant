"use client";

import React, { useState } from "react";
import { timelineData } from "@/data/mockData";
import { useVoterMode } from "@/context/VoterModeContext";
import { motion, AnimatePresence } from "framer-motion";
import { GlossaryTooltip } from "@/components/glossary/GlossaryTooltip";

interface GuidedProcessNavigatorProps {
  setActiveSection?: (s: string) => void;
}

export function GuidedProcessNavigator({ setActiveSection }: GuidedProcessNavigatorProps) {
  const { isFirstTimeVoter } = useVoterMode();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>("why");

  const currentStage = timelineData[currentIndex];

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Module Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <span className="material-symbols-outlined text-sm">school</span>
          <span className="font-label-caps text-label-caps">MODULE 0{currentIndex + 1}: CORE CIVICS</span>
        </div>
        <h1 className="font-h1 text-h1 text-primary mb-3">{currentStage.title}</h1>
        <p className="text-on-surface-variant text-body-md max-w-2xl">
          {currentStage.description}
        </p>
      </div>

      {/* Module Progress */}
      <div className="bg-white rounded-xl p-6 shadow-quiz-card border border-slate-100 mb-8 flex items-center justify-between">
        <div className="flex-1 mr-6">
          <div className="flex justify-between mb-2">
            <span className="font-label-caps text-label-caps text-primary">YOUR MODULE PROGRESS</span>
            <span className="text-sm font-bold text-secondary">35% Complete</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-[35%] rounded-full transition-all"></div>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
        </div>
      </div>

      {/* Content Cards */}
      <div className="space-y-6">
        {/* The "Why" Card */}
        <div className={`bg-white rounded-xl shadow-quiz-card border-2 transition-all ${expandedSection === "why" ? "border-primary" : "border-slate-100"}`}>
          <button
            onClick={() => toggleSection("why")}
            className="w-full flex items-center justify-between p-6 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">description</span>
              </div>
              <h3 className="font-h3 text-h3 text-primary">The &quot;Why&quot; Behind {currentStage.title}</h3>
            </div>
            <span className={`material-symbols-outlined text-slate-400 transition-transform ${expandedSection === "why" ? "rotate-180" : ""}`}>expand_more</span>
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

        {/* Action Steps & Details in 2-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Eligibility / Action Steps */}
          <div className="bg-white rounded-xl p-6 shadow-quiz-card border border-slate-100">
            <h4 className="font-h3 text-quiz-option text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">how_to_reg</span>
              {isFirstTimeVoter ? "Your Checklist" : "Eligibility"}
            </h4>
            <ul className="space-y-3">
              {currentStage.actionSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-sm mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-on-surface text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deadlines / Advanced Details */}
          <div className="bg-white rounded-xl p-6 shadow-quiz-card border border-slate-100">
            <h4 className="font-h3 text-quiz-option text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-error">event_busy</span>
              Deadlines
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
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
        <button
          onClick={() => { if (currentIndex > 0) setCurrentIndex(currentIndex - 1); }}
          disabled={currentIndex === 0}
          className="px-6 py-3 rounded-xl font-semibold text-primary border border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Previous Module
        </button>
        <span className="text-sm font-bold text-slate-500">
          Module {currentIndex + 1} of {timelineData.length}
        </span>
        <button
          onClick={() => {
            if (currentIndex < timelineData.length - 1) {
              setCurrentIndex(currentIndex + 1);
            } else {
              setActiveSection && setActiveSection("quiz");
            }
          }}
          className="px-6 py-3 rounded-xl font-semibold bg-primary text-on-primary hover:opacity-90 flex items-center gap-2 transition-opacity shadow-sm"
        >
          {currentIndex < timelineData.length - 1 ? "Next Module" : "Take Quiz"}
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

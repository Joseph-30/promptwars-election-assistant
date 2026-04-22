"use client";

import React, { useState } from "react";
import { timelineData } from "@/data/mockData";
import { useVoterMode } from "@/context/VoterModeContext";
import { motion, AnimatePresence } from "framer-motion";
import { GlossaryTooltip } from "@/components/glossary/GlossaryTooltip";

export function GuidedProcessNavigator({ setActiveSection }: { setActiveSection?: (s: string) => void }) {
  const { isFirstTimeVoter } = useVoterMode();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const currentStage = timelineData[currentIndex];

  const handleNext = () => {
    if (currentIndex < timelineData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowAdvanced(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowAdvanced(false);
    }
  };

  const images = ['/reg_img.png', '/primaries_img.png', '/cert_img.png', '/reg_img.png'];
  const imageSrc = images[currentIndex] || images[0];

  return (
    <section className="max-w-5xl mx-auto py-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-h2 text-h2 text-primary">Guided Educational Path</h2>
          <p className="text-on-surface-variant mt-2 font-body-md">Master the mechanisms of governance step-by-step.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm font-bold text-secondary bg-blue-50 px-3 py-1 rounded">
            Step 0{currentIndex + 1} of 0{timelineData.length}
          </div>
          <button 
            onClick={() => setActiveSection && setActiveSection("timeline")}
            className="text-secondary font-semibold text-sm flex items-center gap-1 hover:underline"
          >
            View Full Timeline
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-quiz-card flex flex-col overflow-hidden">
        <div className="h-48 overflow-hidden relative border-b border-slate-100">
          <img src={imageSrc} alt={currentStage.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <h3 className="text-3xl font-bold text-white tracking-tight">{currentStage.title}</h3>
          </div>
        </div>

        <div className="p-8 flex-1 grid md:grid-cols-2 gap-8 font-body-md">
          <div className="space-y-6">
            <div>
              <h4 className="font-h3 text-h3 text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                {isFirstTimeVoter ? "Your Checklist" : "Action Steps"}
              </h4>
              <ul className="space-y-3">
                {currentStage.actionSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-surface-container-low border border-slate-200 rounded-lg p-4 shadow-sm hover:border-secondary transition-colors">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary text-sm font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-on-surface leading-snug">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Why this matters
              </h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {currentStage.whyItMatters}
              </p>
            </div>

            {!isFirstTimeVoter && (
              <div>
                <button 
                  className="w-full flex justify-between items-center px-4 py-3 bg-surface-container-low hover:bg-surface-container rounded-lg text-primary font-semibold transition-colors"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  Advanced Details
                  <span className={`material-symbols-outlined transition-transform ${showAdvanced ? "rotate-180" : ""}`}>
                    expand_more
                  </span>
                </button>
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-slate-50 text-sm text-slate-600 rounded-md mt-2 border border-slate-200">
                        <GlossaryTooltip text={currentStage.advancedDetails} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center p-6 bg-surface-container-lowest border-t border-slate-100">
          <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            className="px-6 py-2 rounded-lg font-semibold text-primary border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Previous
          </button>
          <button 
            onClick={handleNext} 
            disabled={currentIndex === timelineData.length - 1}
            className="px-6 py-2 rounded-lg font-semibold bg-primary text-on-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-opacity shadow-sm"
          >
            Next Stage
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}

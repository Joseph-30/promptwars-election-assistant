"use client";

import React, { useState } from "react";
import { timelineData } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

export function InteractiveTimeline({ setActiveSection }: { setActiveSection?: (s: string) => void }) {
  const [activeStage, setActiveStage] = useState(1); // 0-indexed, so 1 is active (Registration)

  return (
    <div className="xl:col-span-8 bg-white rounded-2xl p-8 shadow-quiz-card relative overflow-hidden max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="font-h2 text-h2 text-primary">Interactive Timeline Explorer</h2>
          <p className="text-on-surface-variant">The chronological path from eligibility to certification</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-surface-container rounded-lg hover:bg-slate-200 transition-colors" onClick={() => setActiveStage(prev => Math.min(prev + 1, timelineData.length - 1))}><span className="material-symbols-outlined">zoom_in</span></button>
          <button className="p-2 bg-surface-container rounded-lg hover:bg-slate-200 transition-colors" onClick={() => setActiveStage(0)}><span className="material-symbols-outlined">restart_alt</span></button>
        </div>
      </div>
      
      <div className="relative pl-8 timeline-spine">
        {timelineData.map((stage, index) => {
          const isActive = index === activeStage;

          let iconBg = "bg-primary ring-4 ring-primary/10";
          let iconColor = "text-white";
          let cardClass = "bg-white border-2 border-primary ml-4 shadow-xl shadow-primary/5";
          let titleClass = "text-primary";
          let badgeText = "ACTIVE";
          let badgeClass = "bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight";

          if (!isActive) {
            iconBg = "bg-slate-200";
            iconColor = "text-slate-500";
            cardClass = "bg-white border border-slate-200 ml-4 hover:-translate-y-1";
            titleClass = "text-slate-700";
            badgeText = "ACCESSIBLE";
            badgeClass = "bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight";
          }

          return (
            <div key={index} className={`relative ${index !== timelineData.length - 1 ? 'mb-16' : ''}`}>
              <div className={`absolute -left-[45px] top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md z-10 ${iconBg}`}>
                <span className={`material-symbols-outlined ${iconColor} text-lg`}>
                  edit_note
                </span>
              </div>
              <div 
                className={`rounded-xl p-6 cursor-pointer transition-all duration-300 ${cardClass}`}
                onClick={() => setActiveStage(index)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-h3 text-h3 ${titleClass}`}>
                    0{index + 1}. {stage.title}
                  </h3>
                  <span className={badgeClass}>{badgeText}</span>
                </div>
                <p className={"text-on-surface-variant mb-4"}>
                  {stage.description}
                </p>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-primary/5 rounded-md p-4 mt-4 border border-primary/10">
                        <span className="font-semibold text-primary block mb-2 font-h3 text-sm">Why it matters:</span>
                        <p className="text-on-surface-variant text-sm leading-relaxed">
                          {stage.whyItMatters}
                        </p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (setActiveSection) {
                            setActiveSection("quiz");
                          } else {
                            setActiveStage((prev) => Math.min(prev + 1, timelineData.length - 1));
                          }
                        }}
                        className="mt-6 w-full bg-primary text-on-primary py-3 rounded-lg font-semibold hover:opacity-90 transition-colors"
                      >
                        Continue Module
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

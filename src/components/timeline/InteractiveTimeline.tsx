"use client";

import React, { useState } from "react";
import { timelineData } from "@/data/mockData";

export function InteractiveTimeline() {
  const [activeStage, setActiveStage] = useState(1); // 0-indexed, so 1 is active (Registration)

  return (
    <div className="xl:col-span-8 bg-white rounded-2xl p-8 shadow-quiz-card relative overflow-hidden max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="font-h2 text-h2 text-primary">Interactive Timeline Explorer</h2>
          <p className="text-on-surface-variant">The chronological path from eligibility to certification</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-surface-container rounded-lg"><span className="material-symbols-outlined">zoom_in</span></button>
          <button className="p-2 bg-surface-container rounded-lg"><span className="material-symbols-outlined">filter_list</span></button>
        </div>
      </div>
      
      <div className="relative pl-8 timeline-spine">
        {timelineData.map((stage, index) => {
          const isActive = index === activeStage;
          const isCompleted = index < activeStage;
          const isLocked = index > activeStage;

          let iconBg = "bg-slate-200";
          let iconColor = "text-slate-500";
          let cardClass = "bg-white border border-slate-200 ml-4 opacity-60 grayscale-[40%]";
          let titleClass = "text-slate-500";
          let badgeText = "LOCKED";
          let badgeClass = "text-slate-400 text-xs font-bold uppercase";

          if (isCompleted) {
            iconBg = "bg-secondary";
            iconColor = "text-white";
            cardClass = "bg-surface-container-low border-t-4 border-secondary ml-4";
            titleClass = "text-primary";
            badgeText = "COMPLETED";
            badgeClass = "text-secondary font-bold text-sm";
          } else if (isActive) {
            iconBg = "bg-primary ring-4 ring-primary/10";
            iconColor = "text-white";
            cardClass = "bg-white border-2 border-primary ml-4 shadow-xl shadow-primary/5";
            titleClass = "text-primary";
            badgeText = "ACTIVE";
            badgeClass = "bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight";
          }

          return (
            <div key={index} className={`relative ${index !== timelineData.length - 1 ? 'mb-16' : ''}`}>
              <div className={`absolute -left-[45px] top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md z-10 ${iconBg}`}>
                <span className={`material-symbols-outlined ${iconColor} text-lg`} style={isCompleted ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {isCompleted ? "check" : isActive ? "edit_note" : "lock"}
                </span>
              </div>
              <div 
                className={`rounded-xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${cardClass}`}
                onClick={() => !isLocked && setActiveStage(index)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-h3 text-h3 ${titleClass}`}>
                    0{index + 1}. {stage.title}
                  </h3>
                  <span className={badgeClass}>{badgeText}</span>
                </div>
                <p className={isLocked ? "text-slate-400" : "text-on-surface-variant mb-4"}>
                  {stage.description}
                </p>
                {isActive && (
                  <button className="mt-6 w-full bg-primary text-on-primary py-3 rounded-lg font-semibold hover:opacity-90 transition-colors">
                    Continue Module
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

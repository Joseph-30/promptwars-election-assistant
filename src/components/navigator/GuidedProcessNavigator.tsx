"use client";

import React from "react";
import { timelineData } from "@/data/mockData";
import { useVoterMode } from "@/context/VoterModeContext";

export function GuidedProcessNavigator() {
  const { isFirstTimeVoter } = useVoterMode();

  return (
    <section className="max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-h2 text-h2 text-primary">Educational Path</h2>
          <p className="text-on-surface-variant text-sm">Master the mechanisms of governance through structured modules.</p>
        </div>
        <button className="text-secondary font-semibold text-sm flex items-center gap-1 hover:underline">
          View All Modules
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {timelineData.map((stage, index) => {
          const isLocked = index > 1; // Just simulating locked state
          const isCompleted = index === 0;

          return (
            <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-quiz-card group cursor-pointer hover:border-secondary transition-all flex flex-col">
              <div className={`h-40 overflow-hidden relative ${isLocked ? 'grayscale group-hover:grayscale-0 transition-all duration-500' : ''}`}>
                <div className="w-full h-full bg-slate-200 group-hover:scale-105 transition-transform duration-500"></div>
                {isLocked && (
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-4xl">lock</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${isLocked ? 'bg-slate-100 text-slate-600' : 'bg-blue-50 text-blue-700'}`}>
                    Step 0{index + 1}
                  </span>
                  <span className={`material-symbols-outlined ${isLocked ? 'text-slate-300' : 'text-slate-300 group-hover:text-secondary transition-colors'}`}>
                    {isLocked ? 'workspace_premium' : 'assignment'}
                  </span>
                </div>
                <h4 className={`font-semibold mb-2 ${isLocked ? 'text-slate-400' : 'text-primary'}`}>{stage.title}</h4>
                <p className="text-xs text-on-surface-variant mb-4 flex-1">
                  {stage.description}
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    {!isLocked && <div className={`h-full ${isCompleted ? 'w-full bg-blue-600' : 'w-2/3 bg-amber-500'}`}></div>}
                  </div>
                  <span className={`text-[10px] font-bold ${isLocked ? 'text-slate-400' : isCompleted ? 'text-blue-700' : 'text-amber-700'}`}>
                    {isLocked ? 'Locked' : isCompleted ? 'Completed' : '65% Progress'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

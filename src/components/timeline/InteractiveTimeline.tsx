"use client";

import React, { useState } from "react";
import { timelineData } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

interface InteractiveTimelineProps {
  setActiveSection?: (s: string) => void;
}

export function InteractiveTimeline({ setActiveSection }: InteractiveTimelineProps) {
  const [activeStage, setActiveStage] = useState(1);

  return (
    <div className="flex flex-col lg:flex-row gap-gutter">
      {/* ─── Left: Hero + Timeline ─── */}
      <div className="flex-1">
        {/* Hero Banner */}
        <div className="bg-white rounded-2xl shadow-quiz-card overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-8">
              <span className="inline-block bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full mb-4">Current Stage: Registration</span>
              <h1 className="font-h1 text-h1 text-primary mb-4">Your Civic Journey Awaits</h1>
              <p className="text-on-surface-variant mb-6">You&apos;ve completed 40% of the institutional learning track. Next up: Navigating the Voter Eligibility Framework.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveSection && setActiveSection("navigator")}
                  className="px-6 py-3 bg-primary text-on-primary rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  Resume Learning
                  <span className="material-symbols-outlined text-sm">play_circle</span>
                </button>
                <button
                  onClick={() => setActiveSection && setActiveSection("quiz")}
                  className="px-6 py-3 bg-white border border-slate-300 text-primary rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  View Curriculum
                </button>
              </div>
            </div>
            <div className="w-full md:w-64 h-48 md:h-auto">
              <img src="/hero_building.png" alt="Government building" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Timeline Explorer */}
        <div className="bg-white rounded-2xl p-8 shadow-quiz-card">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-h2 text-h2 text-primary">Interactive Timeline Explorer</h2>
              <p className="text-on-surface-variant text-sm">The chronological path from eligibility to certification</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setActiveStage((p) => Math.max(0, p - 1))} className="p-2 bg-surface-container rounded-lg hover:bg-slate-200 transition-colors">
                <span className="material-symbols-outlined">search</span>
              </button>
              <button onClick={() => setActiveStage(0)} className="p-2 bg-surface-container rounded-lg hover:bg-slate-200 transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>
          </div>

          {/* Timeline Spine */}
          <div className="relative pl-8" style={{ borderLeft: "2px solid #e0e3e5" }}>
            {timelineData.map((stage, index) => {
              const isActive = index === activeStage;
              const isCompleted = index < activeStage;

              let dotBg = "bg-slate-200";
              let dotIcon = "lock";
              let dotIconColor = "text-slate-400";
              let cardBorder = "border border-slate-200 opacity-60";
              let titleColor = "text-slate-500";
              let badge = <span className="text-slate-400 text-xs font-bold uppercase">LOCKED</span>;

              if (isCompleted) {
                dotBg = "bg-secondary";
                dotIcon = "check";
                dotIconColor = "text-white";
                cardBorder = "border-t-4 border-secondary bg-surface-container-low";
                titleColor = "text-primary";
                badge = <span className="text-secondary font-bold text-sm">COMPLETED</span>;
              } else if (isActive) {
                dotBg = "bg-primary ring-4 ring-primary/10";
                dotIcon = "edit_note";
                dotIconColor = "text-white";
                cardBorder = "border-2 border-primary shadow-xl shadow-primary/5";
                titleColor = "text-primary";
                badge = <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">ACTIVE</span>;
              }

              return (
                <div key={index} className={`relative ${index !== timelineData.length - 1 ? "pb-12" : ""}`}>
                  {/* Dot */}
                  <div className={`absolute -left-[21px] top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md z-10 ${dotBg}`}>
                    <span className={`material-symbols-outlined ${dotIconColor} text-lg`} style={isCompleted ? { fontVariationSettings: "'FILL' 1" } : {}}>
                      {dotIcon}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-6 rounded-xl p-6 bg-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5 ${cardBorder}`}
                    onClick={() => setActiveStage(index)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-h3 text-h3 ${titleColor}`}>0{index + 1}. {stage.title}</h3>
                      {badge}
                    </div>
                    <p className="text-on-surface-variant text-sm mb-3">{stage.description}</p>

                    {isActive && (
                      <>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2 mt-4">
                          <span className="font-label-caps">CURRENT MODULE: SYSTEM AUTHENTICATION</span>
                          <span className="font-bold text-primary">40%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                          <div className="h-full bg-primary w-[40%]"></div>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); setActiveSection && setActiveSection("navigator"); }}
                          className="w-full bg-primary text-on-primary py-3 rounded-lg font-semibold hover:opacity-90 transition-colors"
                        >
                          Continue Module
                        </button>
                      </>
                    )}

                    {isCompleted && (
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">library_books</span> 3 Modules</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 15m</span>
                      </div>
                    )}

                    {!isCompleted && !isActive && (
                      <p className="text-xs text-slate-400 mt-1">DEPENDENCY: STAGE 0{index}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Right Sidebar Widgets ─── */}
      <aside className="hidden lg:block w-72 space-y-gutter shrink-0">
        {/* Learning Progress */}
        <div className="bg-white rounded-xl p-md shadow-quiz-card border border-slate-100">
          <h3 className="font-label-caps text-label-caps text-slate-500 mb-md uppercase tracking-widest">Learning Progress</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full border-4 border-secondary flex items-center justify-center text-secondary font-bold text-lg">75%</div>
            <div>
              <p className="text-sm font-bold text-primary">Phase 1 Status</p>
              <p className="text-xs text-slate-500">3 of 4 Modules Complete</p>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span className="font-label-caps">COURSE CONTENT</span>
            <span>12 / 30 hrs</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-secondary w-[40%]"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">14</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Modules Done</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">2</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Certificates</p>
            </div>
          </div>
        </div>

        {/* Institutional Resources */}
        <div className="bg-white rounded-xl p-md shadow-quiz-card border border-slate-100">
          <h3 className="font-label-caps text-label-caps text-slate-500 mb-md uppercase tracking-widest">Institutional Resources</h3>
          <div className="space-y-4">
            {[
              { icon: "description", title: "Voter Rights Act (2024)", sub: "Legislative framework summary" },
              { icon: "play_circle", title: "Election Integrity Seminar", sub: "Archived institutional video" },
              { icon: "article", title: "Polling Station Logistics", sub: "Technical documentation" },
            ].map((r, i) => (
              <button key={i} className="flex items-start gap-3 w-full text-left hover:bg-slate-50 p-2 rounded-lg transition-colors">
                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-sm">{r.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary leading-tight">{r.title}</p>
                  <p className="text-xs text-slate-500">{r.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Critical Deadlines */}
        <div className="bg-slate-800 text-white rounded-xl p-md shadow-quiz-card overflow-hidden relative">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <span className="material-symbols-outlined text-[100px]">event_note</span>
          </div>
          <h3 className="text-xs font-bold tracking-widest uppercase text-slate-300 mb-md">Critical Deadlines</h3>
          <div className="space-y-3 relative z-10">
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-[10px] font-bold text-green-400 uppercase">OCT 15, 2024</p>
              <p className="text-sm font-semibold text-white">Final Registration Verification</p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-[10px] font-bold text-green-400 uppercase">NOV 05, 2024</p>
              <p className="text-sm font-semibold text-white">Certification Module Submission</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

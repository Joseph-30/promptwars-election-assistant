"use client";

import React, { useState } from "react";
import { timelineData } from "@/data/mockData";

interface InteractiveTimelineProps {
  setActiveSection?:    (s: string) => void;
  setActiveModule?:     (i: number) => void;
  completedModules?:    number[];
  currentProgressModule?: number;
}

export function InteractiveTimeline({
  setActiveSection,
  setActiveModule,
  completedModules      = [],
  currentProgressModule = 0,
}: InteractiveTimelineProps) {
  const [simOpen, setSimOpen] = useState(false);

  const pct          = Math.round((completedModules.length / timelineData.length) * 100);
  const currentStage = timelineData[currentProgressModule];

  const goToModule = (i: number) => {
    if (setActiveModule) setActiveModule(i);
    if (setActiveSection) setActiveSection("navigator");
  };

  return (
    <>
      {/* ─── Full-screen Simulation Modal ─── */}
      {simOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black"
          aria-label="Voting simulation overlay"
        >
          {/* Close bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-slate-700 shrink-0">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-white text-lg">model_training</span>
              <span className="text-white font-semibold text-sm">3D Voting Process Simulation</span>
              <span className="bg-secondary/20 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Interactive</span>
            </div>
            <button
              onClick={() => setSimOpen(false)}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white text-sm font-medium transition-colors bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg"
            >
              <span className="material-symbols-outlined text-base">close</span>
              Close
            </button>
          </div>

          {/* Iframe */}
          <iframe
            src="/voting-simulation.html"
            className="flex-1 w-full border-0"
            title="Voting Process 3D Simulation"
            allow="accelerometer"
          />
        </div>
      )}

      {/* ─── Dashboard Layout ─── */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ─── Left Column ─── */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* Hero Banner */}
          <div className="bg-white rounded-2xl shadow-quiz-card overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-8">
                <span className="inline-block bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                  Current Stage: {currentStage.title}
                </span>
                <h1 className="font-h1 text-h1 text-primary mb-3">Your Civic Journey</h1>
                <p className="text-on-surface-variant mb-2 text-sm max-w-2xl">
                  {completedModules.length === 0
                    ? "Start with Registration — the foundation of your democratic participation."
                    : `You've completed ${completedModules.length} of ${timelineData.length} modules. Keep going!`}
                </p>

                {/* Progress bar */}
                <div className="mb-6 max-w-md">
                  <div className="flex justify-between text-xs text-slate-500 mb-1 gap-4">
                    <span className="font-semibold uppercase tracking-wider whitespace-nowrap">Overall Progress</span>
                    <span className="font-bold text-primary whitespace-nowrap">{pct}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => goToModule(currentProgressModule)}
                    className="px-6 py-3 bg-primary text-on-primary rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 whitespace-nowrap"
                  >
                    {completedModules.length === 0 ? "Start Learning" : "Resume Learning"}
                    <span className="material-symbols-outlined text-sm">play_circle</span>
                  </button>
                  <button
                    onClick={() => setActiveSection && setActiveSection("quiz")}
                    className="px-6 py-3 bg-white border border-slate-300 text-primary rounded-xl font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap"
                  >
                    Take Quiz
                  </button>
                </div>
              </div>

              <div className="w-full md:w-64 h-48 md:h-auto shrink-0">
                <img
                  src="/hero_building.png"
                  alt="Government building"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* ─── 3D Simulation Card ─── */}
          <div className="bg-white rounded-2xl shadow-quiz-card overflow-hidden border border-slate-100">
            {/* Thumbnail preview area */}
            <div
              className="relative h-52 bg-gradient-to-br from-slate-900 via-slate-800 to-primary cursor-pointer group"
              onClick={() => setSimOpen(true)}
            >
              {/* Decorative sketchy characters */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Simplified SVG sketch preview */}
                  <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                    {/* Floor */}
                    <line x1="10" y1="120" x2="210" y2="120" stroke="#aaa" strokeWidth="1.5" strokeDasharray="4 3"/>
                    {/* Wall */}
                    <rect x="70" y="40" width="80" height="80" stroke="#ccc" strokeWidth="1.5" fill="none" rx="2"/>
                    {/* Door gap */}
                    <line x1="90" y1="120" x2="90" y2="40" stroke="#ccc" strokeWidth="1.5"/>
                    <line x1="130" y1="120" x2="130" y2="40" stroke="#ccc" strokeWidth="1.5"/>
                    {/* Stickmen */}
                    <circle cx="50" cy="75" r="7" stroke="white" strokeWidth="1.5" fill="none"/>
                    <line x1="50" y1="82" x2="50" y2="100" stroke="white" strokeWidth="1.5"/>
                    <line x1="50" y1="92" x2="40" y2="98" stroke="white" strokeWidth="1.5"/>
                    <line x1="50" y1="92" x2="60" y2="98" stroke="white" strokeWidth="1.5"/>
                    <line x1="50" y1="100" x2="42" y2="112" stroke="white" strokeWidth="1.5"/>
                    <line x1="50" y1="100" x2="58" y2="112" stroke="white" strokeWidth="1.5"/>
                    {/* Queue */}
                    <circle cx="25" cy="78" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
                    <line x1="25" y1="83" x2="25" y2="96" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
                    <circle cx="10" cy="78" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
                    <line x1="10" y1="83" x2="10" y2="96" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                    {/* EVM inside */}
                    <rect x="140" y="70" width="20" height="12" stroke="#88aaff" strokeWidth="1.5" fill="none" rx="2"/>
                    <circle cx="150" cy="76" r="3" stroke="#88aaff" strokeWidth="1" fill="rgba(136,170,255,0.3)"/>
                    {/* Arrow pointers */}
                    <text x="155" y="35" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="sans-serif">Polling Station</text>
                    <line x1="158" y1="38" x2="110" y2="45" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 2"/>
                  </svg>
                </div>
              </div>

              {/* Overlay play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-200 shadow-xl">
                  <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">3d_rotation</span>
                  3D Interactive Simulation
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Live Demo</span>
              </div>
            </div>

            {/* Card body */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="font-h2 text-2xl text-primary font-bold mb-1">How Voting Works</h2>
                  <p className="text-on-surface-variant text-sm max-w-2xl">
                    Walk through the complete polling station experience — from ID check to casting your EVM vote — in this hand-drawn 3D walkthrough. Use orbit controls to explore the scene from any angle.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 mb-5">
                {["ID Verification", "Indelible Ink", "EVM Voting", "VVPAT Receipt", "Exit Procedure"].map((tag) => (
                  <span key={tag} className="bg-surface-container text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSimOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20 text-sm"
              >
                <span className="material-symbols-outlined text-base">model_training</span>
                Launch Simulation
              </button>
            </div>
          </div>

          {/* ─── Learning Modules Quick-Link Card ─── */}
          <div className="bg-white rounded-2xl shadow-quiz-card border border-slate-100">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="font-h2 text-xl text-primary font-bold">Learning Modules</h2>
                <p className="text-on-surface-variant text-sm mt-0.5">
                  {completedModules.length} of {timelineData.length} modules completed
                </p>
              </div>
              <button
                onClick={() => goToModule(currentProgressModule)}
                className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                View All
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {timelineData.map((stage, i) => {
                const done     = completedModules.includes(i);
                const locked   = i !== 0 && !completedModules.includes(i - 1);
                const isCurrent = i === currentProgressModule && !done;

                return (
                  <button
                    key={i}
                    disabled={locked}
                    onClick={() => !locked && goToModule(i)}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors ${
                      locked ? "cursor-not-allowed opacity-50" : "hover:bg-slate-50"
                    }`}
                  >
                    {/* Status dot */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      done    ? "bg-secondary/15"
                      : isCurrent ? "bg-primary ring-4 ring-primary/10"
                      : locked ? "bg-slate-100"
                      : "bg-slate-100"
                    }`}>
                      {done ? (
                        <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      ) : locked ? (
                        <span className="material-symbols-outlined text-slate-400 text-base">lock</span>
                      ) : (
                        <span className={`material-symbols-outlined text-base ${isCurrent ? "text-white" : "text-slate-400"}`}>
                          {isCurrent ? "edit_note" : "radio_button_unchecked"}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm truncate ${done ? "text-secondary" : locked ? "text-slate-400" : "text-primary"}`}>
                        {String(i + 1).padStart(2, "0")}. {stage.title}
                      </p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{stage.description}</p>
                    </div>

                    <div className="shrink-0">
                      {done ? (
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Done</span>
                      ) : isCurrent ? (
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full">Active</span>
                      ) : locked ? null : (
                        <span className="material-symbols-outlined text-slate-400 text-base">chevron_right</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Right Sidebar Widgets ─── */}
        <aside className="hidden lg:block w-72 space-y-5 shrink-0">

          {/* Learning Progress */}
          <div className="bg-white rounded-xl p-5 shadow-quiz-card border border-slate-100">
            <h3 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-4">Learning Progress</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full border-4 border-secondary flex items-center justify-center text-secondary font-bold text-lg">
                {pct}%
              </div>
              <div>
                <p className="text-sm font-bold text-primary">Overall Status</p>
                <p className="text-xs text-slate-500">{completedModules.length} of {timelineData.length} complete</p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase">Course Content</span>
              <span>{completedModules.length * 6} / {timelineData.length * 6} hrs</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Institutional Resources */}
          <div className="bg-white rounded-xl p-5 shadow-quiz-card border border-slate-100">
            <h3 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-4">Institutional Resources</h3>
            <div className="space-y-3">
              {[
                { icon: "description", title: "Voter Rights Act (2024)",   sub: "Legislative framework summary" },
                { icon: "play_circle", title: "Election Integrity Seminar", sub: "Archived institutional video" },
                { icon: "article",     title: "Polling Station Logistics", sub: "Technical documentation" },
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
          <div className="bg-slate-800 text-white rounded-xl p-5 shadow-quiz-card overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="material-symbols-outlined text-[100px]">event_note</span>
            </div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-slate-300 mb-4">Critical Deadlines</h3>
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

          {/* Quick link to simulation */}
          <button
            onClick={() => setSimOpen(true)}
            className="w-full bg-gradient-to-br from-primary to-tertiary text-white rounded-xl p-5 text-left hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-lg">3d_rotation</span>
              <span className="text-xs font-bold uppercase tracking-widest">Simulation</span>
            </div>
            <p className="font-semibold text-sm mb-1">3D Polling Station Tour</p>
            <p className="text-xs text-white/70">Explore the complete voting process in an interactive hand-drawn 3D scene.</p>
            <div className="flex items-center gap-1 mt-3 text-xs font-bold text-white/80 group-hover:text-white transition-colors">
              Launch now <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </button>
        </aside>
      </div>
    </>
  );
}

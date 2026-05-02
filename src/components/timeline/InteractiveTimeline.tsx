"use client";

import React, { useState } from "react";
import Image from "next/image";
import { timelineData } from "@/data/mockData";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();
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
              <span className="text-white font-semibold text-sm">3D {t.howVotingWorks}</span>
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
                  {t.currentStageLabel}: {currentStage.title}
                </span>
                <h1 className="font-h1 text-h1 text-primary mb-3">Your Civic Journey</h1>
                <p className="text-on-surface-variant mb-2 text-sm max-w-2xl leading-relaxed">
                  {completedModules.length === 0
                    ? "Start with Registration — the foundation of your democratic participation."
                    : `You've completed ${completedModules.length} of ${timelineData.length} modules. Keep going!`}
                </p>

                {/* Progress bar */}
                <div className="mb-6 max-w-lg">
                  <div className="flex justify-between text-xs text-slate-500 mb-2 gap-6">
                    <span className="font-semibold uppercase tracking-wider whitespace-nowrap">{t.overallProgress}</span>
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
                    {completedModules.length === 0 ? t.startLearning : t.resumeLearning}
                    <span className="material-symbols-outlined text-sm">play_circle</span>
                  </button>
                  <button
                    onClick={() => setActiveSection && setActiveSection("quiz")}
                    className="px-6 py-3 bg-white border border-slate-300 text-primary rounded-xl font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap"
                  >
                    {t.takeQuiz}
                  </button>
                </div>
              </div>

              <div className="w-full md:w-64 h-48 md:h-auto shrink-0 relative">
                <Image
                  src="/The-new-Parliament.webp"
                  alt="Indian Parliament"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>

          {/* ─── 3D Simulation Card ─── */}
          <div className="bg-white rounded-2xl shadow-quiz-card overflow-hidden border border-slate-100">
            {/* Thumbnail preview area with stick figure diagram */}
            <div
              className="relative h-56 bg-gradient-to-br from-slate-900 via-slate-800 to-primary cursor-pointer group overflow-hidden"
              onClick={() => setSimOpen(true)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSimOpen(true);
                }
              }}
            >
              {/* Stick figure SVG scene */}
              <svg
                className="absolute inset-0 w-full h-full opacity-40 group-hover:opacity-55 transition-opacity duration-300"
                viewBox="0 0 480 220"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Floor */}
                <line x1="20" y1="200" x2="460" y2="200" stroke="#94a3b8" strokeWidth="2" />
                {/* Polling booth structure */}
                <rect x="60" y="100" width="70" height="100" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 2" rx="2" />
                <text x="95" y="155" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">BOOTH</text>
                {/* EVM machine */}
                <rect x="200" y="130" width="36" height="50" rx="3" fill="none" stroke="#6366f1" strokeWidth="1.5" />
                <rect x="205" y="135" width="26" height="18" rx="1" fill="none" stroke="#6366f1" strokeWidth="1" />
                <circle cx="218" cy="170" r="5" fill="none" stroke="#10b981" strokeWidth="1.5" />
                <text x="218" y="195" textAnchor="middle" fill="#6366f1" fontSize="7" fontFamily="monospace">EVM</text>
                {/* VVPAT */}
                <rect x="248" y="140" width="24" height="36" rx="2" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                <rect x="252" y="146" width="16" height="10" rx="1" fill="none" stroke="#f59e0b" strokeWidth="1" />
                <text x="260" y="193" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">VVPAT</text>
                {/* Queue line */}
                <line x1="340" y1="200" x2="460" y2="200" stroke="#475569" strokeWidth="2" strokeDasharray="6 3" />
                {/* Stick figure 1 — at EVM voting */}
                <circle cx="218" cy="115" r="9" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
                <line x1="218" y1="124" x2="218" y2="148" stroke="#e2e8f0" strokeWidth="1.5" />
                <line x1="218" y1="130" x2="205" y2="140" stroke="#e2e8f0" strokeWidth="1.5" />
                <line x1="218" y1="130" x2="231" y2="136" stroke="#e2e8f0" strokeWidth="1.5" />
                <line x1="218" y1="148" x2="210" y2="165" stroke="#e2e8f0" strokeWidth="1.5" />
                <line x1="218" y1="148" x2="226" y2="165" stroke="#e2e8f0" strokeWidth="1.5" />
                {/* Stick figure 2 — in queue */}
                <circle cx="350" cy="175" r="8" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="350" y1="183" x2="350" y2="198" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="350" y1="188" x2="340" y2="196" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="350" y1="188" x2="360" y2="196" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="350" y1="198" x2="344" y2="210" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="350" y1="198" x2="356" y2="210" stroke="#94a3b8" strokeWidth="1.5" />
                {/* Stick figure 3 — in queue behind */}
                <circle cx="390" cy="175" r="8" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="390" y1="183" x2="390" y2="198" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="390" y1="188" x2="380" y2="196" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="390" y1="188" x2="400" y2="196" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="390" y1="198" x2="384" y2="210" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="390" y1="198" x2="396" y2="210" stroke="#94a3b8" strokeWidth="1.5" />
                {/* Polling Officer desk */}
                <rect x="300" y="160" width="30" height="10" rx="2" fill="none" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="315" cy="148" r="7" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="315" y1="155" x2="315" y2="170" stroke="#94a3b8" strokeWidth="1.5" />
                {/* Arrow indicating flow */}
                <path d="M 440 160 L 320 160" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow)" strokeDasharray="5 3" fill="none" />
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                  </marker>
                </defs>
                {/* Labels */}
                <text x="315" y="142" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">OFFICER</text>
                <text x="218" y="110" textAnchor="middle" fill="#e2e8f0" fontSize="7" fontFamily="monospace">VOTER</text>
              </svg>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-200 shadow-xl">
                  <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">3d_rotation</span>
                  3D Interactive {t.simulation}
                </span>
              </div>

              {/* Step indicators bottom */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                {["Queue", "ID Check", "Ink", "Vote", "VVPAT"].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span className="text-[9px] text-white/60 font-bold uppercase tracking-wide hidden sm:block">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card body */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="font-h2 text-2xl text-primary font-bold mb-1">{t.howVotingWorks}</h2>
                  <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
                    Walk through the complete polling station experience — from ID check to casting your EVM vote — in this hand-drawn 3D walkthrough. Use orbit controls to explore the scene from any angle.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSimOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20 text-sm mt-4"
              >
                <span className="material-symbols-outlined text-base">model_training</span>
                {t.launchSimulation}
              </button>
            </div>
          </div>

          {/* ─── Learning Modules Quick-Link Card ─── */}
          <div className="bg-white rounded-2xl shadow-quiz-card border border-slate-100">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="font-h2 text-xl text-primary font-bold">{t.learningModules}</h2>
                <p className="text-on-surface-variant text-sm mt-0.5">
                  {completedModules.length} of {timelineData.length} {t.doneLabel}
                </p>
              </div>
              <button
                onClick={() => goToModule(currentProgressModule)}
                className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                {t.viewAll}
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
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">{t.doneLabel}</span>
                      ) : isCurrent ? (
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full">{t.active}</span>
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
            <h3 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-4">{t.overallProgress}</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full border-4 border-secondary flex items-center justify-center text-secondary font-bold text-lg">
                {pct}%
              </div>
              <div>
                <p className="text-sm font-bold text-primary">{t.overallStatus}</p>
                <p className="text-xs text-slate-500">{completedModules.length} of {timelineData.length} {t.doneLabel}</p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase">{t.courseContent}</span>
              <span>{completedModules.length * 6} / {timelineData.length * 6} {t.hrs}</span>
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

          {/* Quick link to simulation */}
          <button
            onClick={() => setSimOpen(true)}
            className="w-full bg-gradient-to-br from-primary to-tertiary text-white rounded-xl p-5 text-left hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-lg">3d_rotation</span>
              <span className="text-xs font-bold uppercase tracking-widest">{t.simulation}</span>
            </div>
            <p className="font-semibold text-sm mb-1">{t.howVotingWorks}</p>
            <p className="text-xs text-white/70">Explore the complete voting process in an interactive hand-drawn 3D scene.</p>
            <div className="flex items-center gap-1 mt-3 text-xs font-bold text-white/80 group-hover:text-white transition-colors">
              {t.launchNow} <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </button>
        </aside>
      </div>
    </>
  );
}

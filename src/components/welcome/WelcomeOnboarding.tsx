"use client";

import React, { useState } from "react";

interface WelcomeOnboardingProps {
  setActiveSection: (s: string) => void;
}

export function WelcomeOnboarding({ setActiveSection }: WelcomeOnboardingProps) {
  const [region, setRegion] = useState("IN");

  return (
    <div className="flex flex-col items-center pt-16 pb-12 px-6">
      {/* ── Welcome Hero ── */}
      <section className="max-w-[720px] w-full text-center mb-xl">
        <div className="inline-flex items-center justify-center bg-primary-container/10 p-4 rounded-full mb-md">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
        </div>
        <h1 className="font-h1 text-h1 text-primary mb-md">Welcome to Civic Assistant</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">
          Your trusted guide to democratic participation. We provide a clear, institutional path to understanding and engaging with your government.
        </p>

        {/* Region Selection */}
        <div className="bg-white p-lg rounded-xl shadow-quiz-card mb-xl text-left border-l-4 border-primary">
          <label className="font-label-caps text-label-caps text-primary block mb-sm">CURRENT FOCUS AREA</label>
          <div className="relative">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full h-14 pl-md pr-xl bg-surface border border-outline-variant rounded-lg font-body-md focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              <option value="IN">India</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="EU">European Union</option>
            </select>
            <div className="absolute right-md top-1/2 -translate-y-1/2 pointer-events-none">
              <span className="material-symbols-outlined text-slate-400">expand_more</span>
            </div>
          </div>
          <p className="mt-sm text-xs text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">info</span>
            Resources will be tailored to this specific electoral system.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => setActiveSection("dashboard")}
          className="w-full md:w-auto px-12 py-4 bg-primary text-white font-h3 text-quiz-option rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          Get Started
        </button>
      </section>

      {/* ── Educational Path Bento ── */}
      <section className="max-w-[1000px] w-full mt-xl">
        <div className="text-center mb-xl">
          <h2 className="font-h2 text-h2 text-primary mb-xs">Your Educational Path</h2>
          <div className="h-1 w-24 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Registration */}
          <button onClick={() => setActiveSection("navigator")} className="bg-white p-6 rounded-xl shadow-quiz-card border-t-4 border-secondary/20 hover:border-secondary transition-all group text-left">
            <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-colors">
              <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-colors">how_to_reg</span>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Registration</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">Master the prerequisites. Learn about eligibility, verification, and the foundational requirements of the franchise.</p>
          </button>

          {/* Step 2: Primaries & Campaigns (Visual Focus) */}
          <button onClick={() => setActiveSection("dashboard")} className="md:col-span-1 bg-primary-container text-white p-6 rounded-xl shadow-quiz-card relative overflow-hidden flex flex-col justify-end min-h-[280px] text-left">
            <div className="absolute inset-0 opacity-30">
              <img alt="Government building" className="w-full h-full object-cover" src="/primaries_img.png" />
            </div>
            <div className="relative z-10">
              <span className="text-xs font-bold tracking-widest uppercase opacity-90 mb-1 block">INSTITUTIONAL CORE</span>
              <h3 className="text-xl font-semibold mb-1">Primaries &amp; Campaigns</h3>
              <p className="text-white/80 text-sm">Understanding the mechanics of choice before the final ballot is cast.</p>
            </div>
          </button>

          {/* Step 3: Certification */}
          <button onClick={() => setActiveSection("quiz")} className="bg-white p-6 rounded-xl shadow-quiz-card border-t-4 border-secondary/20 hover:border-secondary transition-all group text-left">
            <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-colors">
              <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-colors">verified</span>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Certification</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">Complete the journey. Gain institutional recognition of your civic literacy and preparedness.</p>
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="mt-xl bg-white p-lg rounded-xl shadow-quiz-card flex items-center justify-between gap-md">
          <div className="flex-1">
            <div className="flex justify-between mb-sm">
              <span className="font-label-caps text-primary">LEARNING MILESTONES</span>
              <span className="font-label-caps text-secondary">0% READY</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-0 transition-all duration-1000"></div>
            </div>
          </div>
          <div className="hidden md:flex gap-4">
            {["ballot", "campaign", "how_to_vote"].map((icon) => (
              <div key={icon} className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-300">
                <span className="material-symbols-outlined">{icon}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-xl flex flex-wrap justify-center gap-xl text-slate-500 font-label-caps">
        <button onClick={() => setActiveSection("faq")} className="flex items-center gap-2 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-md">menu_book</span> Glossary
        </button>
        <button className="flex items-center gap-2 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-md">help_outline</span> Help Center
        </button>
        <button className="flex items-center gap-2 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-md">verified_user</span> Data Privacy
        </button>
      </footer>
    </div>
  );
}

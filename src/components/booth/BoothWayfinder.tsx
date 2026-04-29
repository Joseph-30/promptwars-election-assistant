"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BoothWayfinderProps {
  district?: string;
  state?: string;
}

const CHECKLIST_ITEMS = [
  {
    category: "What to Carry",
    icon: "backpack",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    headerColor: "bg-blue-600",
    items: [
      { id: "eid", label: "Voter ID Card (EPIC)", required: true, detail: "Your Electors Photo Identity Card issued by ECI" },
      { id: "passport", label: "Passport (if EPIC unavailable)", required: false, detail: "Valid Indian passport as alternative ID" },
      { id: "dl", label: "Driving Licence", required: false, detail: "Valid DL with photo as alternative ID" },
      { id: "pan", label: "PAN Card", required: false, detail: "Accepted as photo identity proof at booths" },
      { id: "aadhaar", label: "Aadhaar Card", required: false, detail: "Aadhaar accepted as voter ID alternate" },
      { id: "water", label: "Water bottle", required: false, detail: "Stay hydrated while waiting in queue" },
    ],
  },
  {
    category: "What to Expect",
    icon: "info",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    headerColor: "bg-amber-600",
    items: [
      { id: "queue", label: "Join the queue at your assigned booth", required: true, detail: "Your booth number is on your Voter Slip" },
      { id: "ink", label: "Indelible ink mark on left index finger", required: true, detail: "This prevents double voting — it's painless and wears off in 2–3 weeks" },
      { id: "evm", label: "Cast vote on EVM", required: true, detail: "Press the blue button next to your chosen candidate's name and symbol" },
      { id: "vvpat", label: "Verify your vote on VVPAT screen", required: true, detail: "A paper slip showing your vote appears for 7 seconds behind a glass panel" },
      { id: "slip", label: "Collect signed voter slip from officer", required: false, detail: "Keep this as proof you voted" },
    ],
  },
  {
    category: "Your Rights",
    icon: "gavel",
    color: "bg-green-50 border-green-200 text-green-700",
    headerColor: "bg-green-600",
    items: [
      { id: "nota", label: "Right to vote NOTA", required: false, detail: "'None of the Above' is available on all EVMs — your right under Rule 49-O" },
      { id: "secret", label: "Right to secret ballot", required: true, detail: "No one can see or compel you to reveal your vote — this is constitutionally protected" },
      { id: "pwd", label: "Priority queue for PwD & senior citizens", required: false, detail: "Persons with disabilities and citizens over 80 get priority access at every booth" },
      { id: "companion", label: "Right to a companion if needed", required: false, detail: "Voters with physical disability can bring a companion of their choice" },
      { id: "tender", label: "Right to tender vote if name is missing", required: false, detail: "If your name is missing but you're registered, you can cast a Tender Vote" },
      { id: "grievance", label: "On-site grievance redressal", required: false, detail: "Each booth has a Presiding Officer — you can report any issue to them or call 1950" },
    ],
  },
];

const BOOTH_STEPS = [
  { step: 1, title: "Arrive & Queue", icon: "directions_walk", desc: "Find your polling booth using your Voter Slip or the Voter Helpline App. Join the designated queue — separate queues may exist for women, PwD, and senior citizens.", time: "5–30 min" },
  { step: 2, title: "ID Verification", icon: "badge", desc: "A Polling Officer checks your ID against the Electoral Roll. Show your EPIC card or one of the 12 alternate photo IDs accepted by ECI.", time: "1–2 min" },
  { step: 3, title: "Indelible Ink", icon: "edit", desc: "Ink is applied to your left index finger. A second officer signs your Voter Slip and hands it to you. This prevents duplicate voting.", time: "< 1 min" },
  { step: 4, title: "Enter Voting Compartment", icon: "meeting_room", desc: "You enter the curtained voting compartment alone. The EVM shows all candidate names, photos, and party symbols. Take your time.", time: "1–2 min" },
  { step: 5, title: "Cast Your Vote", icon: "how_to_vote", desc: "Press the blue button next to your chosen candidate. The EVM beeps to confirm. A VVPAT slip is generated — watch for it behind the glass panel.", time: "< 1 min" },
  { step: 6, title: "Verify & Exit", icon: "verified", desc: "The VVPAT slip shows your vote for 7 seconds. If it's correct, you're done! If not, immediately report to the Presiding Officer.", time: "7 sec" },
];

export function BoothWayfinder({ district, state }: BoothWayfinderProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"walkthrough" | "checklist">("walkthrough");

  const toggleItem = (id: string) =>
    setCheckedItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const totalItems = CHECKLIST_ITEMS.flatMap(c => c.items).length;
  const checkedCount = checkedItems.size;
  const pct = Math.round((checkedCount / totalItems) * 100);

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-quiz-card border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-tertiary p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-white/80 text-sm">location_on</span>
          <span className="text-xs font-bold uppercase tracking-widest text-white/70">Booth Wayfinder</span>
          {district && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{district}{state ? `, ${state}` : ""}</span>}
        </div>
        <h3 className="text-xl font-bold mb-1">Polling Day Guide</h3>
        <p className="text-white/80 text-sm">Everything you need to know before, during, and after voting.</p>
      </div>

      {/* Tab Toggle */}
      <div className="flex border-b border-slate-100">
        <button
          onClick={() => setActiveTab("walkthrough")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === "walkthrough" ? "text-primary border-b-2 border-primary bg-primary/5" : "text-slate-500 hover:text-primary"}`}
        >
          <span className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">route</span>Booth Walkthrough
          </span>
        </button>
        <button
          onClick={() => setActiveTab("checklist")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === "checklist" ? "text-primary border-b-2 border-primary bg-primary/5" : "text-slate-500 hover:text-primary"}`}
        >
          <span className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">checklist</span>Personal Checklist
            {checkedCount > 0 && <span className="bg-secondary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{pct}%</span>}
          </span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "walkthrough" ? (
          <motion.div key="walkthrough" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
            <div className="space-y-4">
              {BOOTH_STEPS.map((step, i) => (
                <div key={step.step} className="flex gap-4">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg shadow-primary/20">
                      {step.step}
                    </div>
                    {i < BOOTH_STEPS.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 my-1" />}
                  </div>
                  {/* Content */}
                  <div className={`flex-1 pb-4 ${i < BOOTH_STEPS.length - 1 ? "" : ""}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-primary text-sm">{step.icon}</span>
                      <span className="font-bold text-primary text-sm">{step.title}</span>
                      <span className="ml-auto text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{step.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ECI Resources */}
            <div className="mt-6 p-4 bg-surface-container-low rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Official Resources</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Voter Helpline", sub: "1950 (toll free)", icon: "call", url: "tel:1950" },
                  { label: "Voter Portal", sub: "voters.eci.gov.in", icon: "language", url: "https://voters.eci.gov.in" },
                  { label: "Booth Finder", sub: "Know your booth #", icon: "location_on", url: "https://electoralsearch.eci.gov.in" },
                  { label: "cVIGIL App", sub: "Report violations", icon: "report", url: "https://cvigil.eci.gov.in" },
                ].map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    target={r.url.startsWith("tel") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-white transition-colors group"
                  >
                    <span className="material-symbols-outlined text-primary text-sm">{r.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-primary group-hover:underline">{r.label}</p>
                      <p className="text-[10px] text-slate-500">{r.sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="checklist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
            {/* Progress */}
            <div className="mb-5 p-4 bg-surface-container-low rounded-xl">
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-2">
                <span>Preparation Progress</span>
                <span className="text-primary">{checkedCount}/{totalItems} items</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-secondary rounded-full"
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              {pct === 100 && (
                <p className="text-xs text-secondary font-bold mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  You&apos;re ready to vote!
                </p>
              )}
            </div>

            {/* Checklist sections */}
            <div className="space-y-5">
              {CHECKLIST_ITEMS.map((cat) => (
                <div key={cat.category}>
                  <div className={`flex items-center gap-2 mb-3 p-2 rounded-lg ${cat.color} border`}>
                    <span className="material-symbols-outlined text-base">{cat.icon}</span>
                    <span className="font-bold text-sm">{cat.category}</span>
                  </div>
                  <div className="space-y-2 pl-1">
                    {cat.items.map((item) => {
                      const checked = checkedItems.has(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${checked ? "bg-secondary/8" : "hover:bg-slate-50"}`}
                        >
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${checked ? "bg-secondary border-secondary" : "border-slate-300"}`}>
                            {checked && <span className="material-symbols-outlined text-white text-xs" style={{ fontVariationSettings: "'FILL' 1", fontSize: "12px" }}>check</span>}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className={`text-sm font-medium ${checked ? "text-secondary line-through" : "text-slate-700"}`}>
                                {item.label}
                              </p>
                              {item.required && (
                                <span className="text-[9px] font-bold text-red-500 uppercase bg-red-50 px-1.5 py-0.5 rounded">Required</span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.detail}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

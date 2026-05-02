"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Myth {
  id: number;
  myth: string;
  reality: string;
  category: "EVM" | "VVPAT" | "Fraud" | "Media" | "Process";
  source: string;
  sourceUrl: string;
  severity: "low" | "medium" | "high";
  icon: string;
}

const MYTHS: Myth[] = [
  {
    id: 1,
    myth: "EVMs can be hacked remotely via Bluetooth or Wi-Fi",
    reality: "EVMs are standalone devices with no wireless connectivity — no Wi-Fi, Bluetooth, or internet chip. They use a one-time programmable chip that can never be reprogrammed. Independent committees including IIT professors have certified this.",
    category: "EVM",
    source: "Election Commission of India",
    sourceUrl: "https://eci.gov.in/evm/faqs-on-evms",
    severity: "high",
    icon: "wifi_off",
  },
  {
    id: 2,
    myth: "Votes cast on EVM can be changed or manipulated after voting",
    reality: "Once a vote is cast, it is stored in a tamper-proof memory chip. The memory cannot be altered even if power is disconnected. Totals are sealed by all candidate agents at the end of polling.",
    category: "EVM",
    source: "ECI Technical Committee Report",
    sourceUrl: "https://eci.gov.in/evm",
    severity: "high",
    icon: "lock",
  },
  {
    id: 3,
    myth: "VVPAT slips don't match the votes cast on EVM",
    reality: "A VVPAT slip is generated simultaneously with every EVM vote — visible to the voter for 7 seconds. The Supreme Court ordered cross-verification of 5 VVPAT slips per constituency in 2019. All matched 100%.",
    category: "VVPAT",
    source: "Supreme Court of India Order (2019)",
    sourceUrl: "https://eci.gov.in/evm/vvpat",
    severity: "high",
    icon: "receipt_long",
  },
  {
    id: 4,
    myth: "Booth capturing still happens widely in Indian elections",
    reality: "With EVMs, central security forces, webcasting at sensitive booths, and mandatory documentation, booth capturing incidents have dropped over 95% since 1999. All polling stations are now monitored.",
    category: "Fraud",
    source: "ECI Annual Report 2024",
    sourceUrl: "https://eci.gov.in",
    severity: "medium",
    icon: "videocam",
  },
  {
    id: 5,
    myth: "Viral videos showing 'EVM hacking demos' are real proof",
    reality: "These videos show modified replicas or entirely different devices — not certified EVMs. Real EVMs use proprietary chips and cannot run third-party code. The ECI has challenged anyone to demonstrate tampering on a real EVM — no one has succeeded.",
    category: "Media",
    source: "ECI Press Release 2019",
    sourceUrl: "https://eci.gov.in/press-release",
    severity: "high",
    icon: "fact_check",
  },
  {
    id: 6,
    myth: "WhatsApp forwards claiming your name was deleted from voter rolls are always true",
    reality: "This is a common pre-election scare tactic. Verify your registration instantly at voters.eci.gov.in or call the 1950 helpline. Legitimate ECI notifications come via SMS to your registered mobile — not WhatsApp.",
    category: "Media",
    source: "Voters.ECI.gov.in",
    sourceUrl: "https://voters.eci.gov.in",
    severity: "medium",
    icon: "sms",
  },
  {
    id: 7,
    myth: "Results are pre-loaded into EVMs before voting begins",
    reality: "EVMs are set to zero before every election via a 'Mock Poll' — conducted on 5% of EVMs randomly on polling day, in the presence of all candidate agents. This is mandatory by law.",
    category: "Process",
    source: "ECI Returning Officer Handbook",
    sourceUrl: "https://eci.gov.in",
    severity: "high",
    icon: "published_with_changes",
  },
  {
    id: 8,
    myth: "Deepfake videos of politicians making inflammatory statements are real",
    reality: "Deepfakes can convincingly mimic any public figure. Before sharing any video, verify on PIB Fact Check (pib.gov.in/factcheck), check if credible news sources reported it, and look for unnatural blinking or lip-sync issues.",
    category: "Media",
    source: "PIB Fact Check, MeitY Guidelines 2024",
    sourceUrl: "https://pib.gov.in/factcheck",
    severity: "high",
    icon: "psychology",
  },
];

const MEDIA_LITERACY_TIPS = [
  { icon: "search",         tip: "Before sharing, search the headline + 'fact check'" },
  { icon: "link",           tip: "Check the URL — fake sites often use .co or misspelled domains" },
  { icon: "person_search",  tip: "Verify the author and publication — is it a real journalist?" },
  { icon: "calendar_today", tip: "Check the date — old news often resurfaces as 'new'" },
  { icon: "videocam",       tip: "Use InVID or FotoForensics to check if images are doctored" },
  { icon: "hub",            tip: "Cross-check on at least 2 credible sources before believing" },
];

const CATEGORY_COLORS: Record<string, string> = {
  EVM:     "bg-blue-100 text-blue-700",
  VVPAT:   "bg-purple-100 text-purple-700",
  Fraud:   "bg-red-100 text-red-700",
  Media:   "bg-orange-100 text-orange-700",
  Process: "bg-green-100 text-green-700",
};

const SEVERITY_COLORS: Record<string, string> = {
  high:   "text-red-500",
  medium: "text-orange-500",
  low:    "text-green-500",
};

export function MythBuster() {
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [mediaTab, setMediaTab] = useState(false);

  const categories = ["All", "EVM", "VVPAT", "Fraud", "Media", "Process"];
  const filtered = MYTHS.filter(m => activeCategory === "All" || m.category === activeCategory);

  const toggle = (id: number) =>
    setRevealedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-bold tracking-widest uppercase">
          <span className="material-symbols-outlined text-sm">fact_check</span>
          Combating Misinformation
        </div>
        <h1 className="font-h1 text-h1 text-primary mb-2">Myth vs. Reality</h1>
        <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
          Common myths about India&apos;s electoral process — debunked with verified facts from the Election Commission of India. Click any card to reveal the truth.
        </p>

        {/* Tab Switch */}
        <div className="flex gap-2 mt-5 flex-wrap">
          <button
            onClick={() => setMediaTab(false)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${!mediaTab ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary"}`}
          >
            <span className="material-symbols-outlined text-base">fact_check</span>EVM &amp; Voting Myths
          </button>
          <button
            onClick={() => setMediaTab(true)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${mediaTab ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary"}`}
          >
            <span className="material-symbols-outlined text-base">psychology</span>Media Literacy
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!mediaTab ? (
          <motion.div key="myths" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap mb-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activeCategory === cat ? "bg-primary text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-primary"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Stats Banner */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { value: `${revealedIds.size}/${MYTHS.length}`, label: "Myths Explored", icon: "explore" },
                { value: "100%", label: "ECI Verified", icon: "verified" },
                { value: `${MYTHS.length}`, label: "Common Myths", icon: "warning" },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-quiz-card border border-slate-100 text-center">
                  <span className="material-symbols-outlined text-primary mb-1">{s.icon}</span>
                  <p className="text-xl font-bold text-primary">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Myth Cards */}
            <div className="space-y-4">
              {filtered.map((myth) => {
                const revealed = revealedIds.has(myth.id);
                return (
                  <div
                    key={myth.id}
                    className="relative rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => toggle(myth.id)}
                    tabIndex={0}
                    role="button"
                    aria-expanded={revealed}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle(myth.id);
                      }
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {!revealed ? (
                        <motion.div
                          key="myth"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0, x: -40 }}
                          className="bg-white border-2 border-red-100 rounded-2xl shadow-quiz-card p-6"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-red-400 text-xl">warning</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600 uppercase tracking-wide">Myth</span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[myth.category]}`}>{myth.category}</span>
                                <span className={`text-xs font-bold flex items-center gap-1 ${SEVERITY_COLORS[myth.severity]}`}>
                                  <span className="material-symbols-outlined text-sm">emergency</span>
                                  {myth.severity === "high" ? "Highly Viral" : myth.severity === "medium" ? "Common" : "Occasional"}
                                </span>
                              </div>
                              <p className="font-semibold text-slate-800 leading-relaxed">{myth.myth}</p>
                              <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
                                <span className="material-symbols-outlined text-sm">touch_app</span>
                                <span>Click to reveal the verified truth</span>
                              </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-red-400 text-base">chevron_right</span>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="reality"
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-quiz-card p-6"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-green-600 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 uppercase tracking-wide">✓ Reality</span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[myth.category]}`}>{myth.category}</span>
                              </div>
                              <p className="text-slate-700 text-sm leading-relaxed mb-4">{myth.reality}</p>
                              <a
                                href={myth.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 hover:text-green-900 transition-colors bg-white px-3 py-1.5 rounded-lg border border-green-200"
                              >
                                <span className="material-symbols-outlined text-sm">open_in_new</span>
                                Source: {myth.source}
                              </a>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-green-600 text-base">close</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Reveal All */}
            {revealedIds.size < MYTHS.length && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setRevealedIds(new Set(MYTHS.map(m => m.id)))}
                  className="px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                >
                  Reveal All Facts
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div key="media" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {/* Hero Banner */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary rounded-2xl p-8 mb-6 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <span className="material-symbols-outlined text-[160px] text-white">psychology</span>
              </div>
              <div className="relative z-10">
                <span className="inline-block bg-orange-400/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide border border-orange-400/30">
                  Media Literacy Module
                </span>
                <h2 className="text-2xl font-bold text-white mb-3">Deepfakes &amp; Viral Messages</h2>
                <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                  In the age of AI-generated content and WhatsApp forwards, knowing how to verify political information is a civic skill. Learn to spot fakes before you share.
                </p>
              </div>
            </div>

            {/* Warning Signs */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-600">warning</span>
                Red Flags: Signs a Political Video May Be a Deepfake
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Unnatural blinking or no blinking at all",
                  "Lip movements don't perfectly match audio",
                  "Skin texture looks unnaturally smooth or waxy",
                  "Hair and glasses edges appear blurry or glitchy",
                  "Background has warping or strange artifacts",
                  "Audio has robotic quality or wrong accent",
                  "Posted without credible news coverage",
                  "Shared only via WhatsApp, not any news channel",
                ].map((flag, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-orange-500 text-sm mt-0.5 shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
                    <span className="text-sm text-orange-900">{flag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="bg-white rounded-2xl shadow-quiz-card border border-slate-100 p-6 mb-6">
              <h3 className="font-bold text-primary mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">checklist</span>
                6-Step Verification Checklist
              </h3>
              <div className="space-y-3">
                {MEDIA_LITERACY_TIPS.map((tip, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-base">{tip.icon}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed flex-1">{tip.tip}</p>
                    <div className="w-7 h-7 rounded-full border-2 border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                      {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trusted Resources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "PIB Fact Check", desc: "Government of India official fact-checking portal", url: "https://pib.gov.in/factcheck", icon: "gavel", color: "bg-blue-50 border-blue-200" },
                { name: "ECI Portal", desc: "Official Election Commission of India clarifications", url: "https://eci.gov.in", icon: "account_balance", color: "bg-green-50 border-green-200" },
                { name: "Boom Live", desc: "Independent fact-checking organisation for Indian content", url: "https://www.boomlive.in", icon: "fact_check", color: "bg-purple-50 border-purple-200" },
              ].map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-xl p-4 border-2 ${r.color} hover:shadow-md transition-all block group`}
                >
                  <span className="material-symbols-outlined text-slate-600 mb-2">{r.icon}</span>
                  <p className="font-bold text-slate-800 text-sm mb-1 group-hover:text-primary transition-colors">{r.name}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{r.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Visit <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

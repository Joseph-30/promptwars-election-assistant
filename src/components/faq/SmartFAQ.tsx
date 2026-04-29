"use client";

import React, { useState } from "react";
import { faqData, glossaryData } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface SmartFAQProps {
  setActiveSection?: (s: string) => void;
}

export function SmartFAQ({ setActiveSection }: SmartFAQProps) {
  const { t } = useLanguage();
  const [searchQuery,    setSearchQuery]    = useState("");
  const [selectedFaq,    setSelectedFaq]    = useState<number | null>(0);
  const [glossaryFilter, setGlossaryFilter] = useState("");
  const [letterFilter,   setLetterFilter]   = useState("");

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGlossary = glossaryData.filter((term) => {
    const matchesText   = term.term.toLowerCase().includes(glossaryFilter.toLowerCase());
    const matchesLetter = letterFilter === "" || term.term.toUpperCase().startsWith(letterFilter);
    return matchesText && matchesLetter;
  });

  // Build which letters actually have entries in the data
  const availableLetters = Array.from(
    new Set(glossaryData.map((t) => t.term[0].toUpperCase()))
  ).sort();

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="text-center mb-8 px-4">
        <h1 className="font-h1 text-h1 text-primary mb-3">{t.howCanWeHelp}</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-body-md">
          Ask any question about the voting process or election terminology to get instant, verified guidance.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              type="text"
              placeholder="e.g., 'Am I eligible to vote?' or 'What is a constituency?'"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white shadow-sm font-body-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => { if(searchQuery) alert(`Searching for: ${searchQuery}`); }}
            className="px-6 py-4 bg-primary text-on-primary font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            {t.askNow}
          </button>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-gutter">
        {/* Left: FAQ */}
        <div className="flex-1">
          {/* FAQ Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-h2 text-h2 text-primary">{t.faqTitle}</h2>
            <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">Updated 1h ago</span>
          </div>

          {/* FAQ Cards */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-xl p-6 shadow-quiz-card border-2 cursor-pointer transition-all ${
                    selectedFaq === idx ? "border-primary" : "border-transparent hover:border-slate-200"
                  }`}
                  onClick={() => setSelectedFaq(selectedFaq === idx ? null : idx)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-h3 text-quiz-option text-primary font-semibold mb-2">{faq.question}</h3>
                      <AnimatePresence>
                        {selectedFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-3">{faq.answer}</p>
                            <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                              Learn more about {faq.question.toLowerCase().includes("nota") ? "NOTA" : "registration"}
                              <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-on-surface-variant bg-white rounded-xl shadow-quiz-card">
                No results found for &quot;{searchQuery}&quot;. Try a different keyword.
              </div>
            )}
          </div>

          {/* Quick Check Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white rounded-xl p-6 shadow-quiz-card border-t-4 border-secondary">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-label-caps text-label-caps text-secondary">{t.quickCheck}</span>
              </div>
              <h4 className="font-semibold text-primary mb-2">Registration Deadline</h4>
              <p className="text-xs text-on-surface-variant">The final date to update your details is <strong>October 15th</strong>. Check your status now to avoid last-minute issues.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-quiz-card border-t-4 border-primary">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary">info</span>
                <span className="font-label-caps text-label-caps text-primary">{t.proTip}</span>
              </div>
              <h4 className="font-semibold text-primary mb-2">Acceptable ID Proofs</h4>
              <p className="text-xs text-on-surface-variant">Voter ID is primary, but Passport, Driving License, or Government Employee IDs are also valid at the booth.</p>
            </div>
          </div>

          {/* Visual Guide Banner */}
          <div className="mt-6 rounded-xl overflow-hidden relative h-48">
            <img src="/polling_station.png" alt="Polling station" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Visual Guide: At the Polling Station</h3>
                <p className="text-sm text-white/80">See exactly what happens from the moment you enter until you cast your vote.</p>
              </div>
            </div>
          </div>

          {/* Still Have Questions */}
          <div className="mt-8 bg-surface-container-low rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-h3 text-h3 text-primary mb-2">{t.stillHaveQuestions}</h3>
              <p className="text-on-surface-variant text-sm">Our community ambassadors are ready to help you navigate the process. Connect with a live guide for specific regional queries.</p>
            </div>
          <button 
            onClick={() => alert("Ambassador connection is coming soon!")}
            className="px-8 py-3 bg-error text-on-error rounded-xl font-semibold hover:opacity-90 transition-colors whitespace-nowrap shadow-sm"
          >
            {t.speakToAmbassador}
          </button>
          </div>
        </div>

        {/* Right: Glossary Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="bg-white rounded-xl p-md shadow-quiz-card border border-slate-100 sticky top-24">
            <h3 className="font-h3 text-quiz-option text-primary font-semibold mb-md">{t.terminologyGlossary}</h3>
            {/* Filter */}
            <div className="relative mb-3">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">filter_list</span>
              <input
                type="text"
                placeholder={t.filterTerms}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={glossaryFilter}
                onChange={(e) => { setGlossaryFilter(e.target.value); setLetterFilter(""); }}
              />
            </div>
            {/* Letter Filters – only show letters that exist in glossaryData */}
            <div className="flex gap-1.5 mb-3 flex-wrap">
              <button
                onClick={() => { setLetterFilter(""); setGlossaryFilter(""); }}
                className={`px-2.5 h-7 rounded-full text-xs font-bold transition-colors ${
                  letterFilter === "" ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                All
              </button>
              {availableLetters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => { setLetterFilter(letter === letterFilter ? "" : letter); setGlossaryFilter(""); }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    letterFilter === letter ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
            {/* Terms */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredGlossary.length > 0 ? (
                filteredGlossary.map((term, idx) => (
                  <div key={idx}>
                    <h4 className="text-sm font-bold text-primary">{term.term}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{term.definition}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-4">No terms found.</p>
              )}
            </div>
            <button 
              onClick={() => alert("Glossary PDF generation is coming soon!")}
              className="w-full mt-md text-sm font-bold text-primary border-t border-slate-100 pt-md hover:underline"
            >
              {t.downloadPdf}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

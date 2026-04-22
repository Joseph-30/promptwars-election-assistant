"use client";

import React, { useState } from "react";
import { faqData } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

export function SmartFAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const filteredFaqs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto py-8 h-full flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="font-h2 text-h2 text-primary">Smart Civic FAQ</h2>
        <p className="text-on-surface-variant mt-2 font-body-md">Ask a question to understand the election process better.</p>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-quiz-card flex flex-col overflow-hidden">
        <div className="bg-surface border-b border-slate-200 p-lg">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text" 
              placeholder="E.g., What is NOTA?" 
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="p-0 flex-1 overflow-y-auto bg-surface-container-low">
          <div className="divide-y divide-slate-200">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <div key={idx} className="p-6 hover:bg-white transition-colors cursor-pointer" onClick={() => setSelectedFaq(selectedFaq === idx ? null : idx)}>
                  <div className="flex gap-4">
                    <div className="mt-1 shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-lg">chat_bubble</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-h3 text-quiz-option text-primary">{faq.question}</h4>
                      <AnimatePresence>
                        {selectedFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-white border border-slate-200 rounded-lg text-on-surface-variant shadow-sm text-body-md leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-on-surface-variant font-body-md">
                No results found for "{searchQuery}". Try a different keyword.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

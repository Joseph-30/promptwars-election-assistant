"use client";

import React, { useState } from "react";
import { faqData } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MessageCircle } from "lucide-react";
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
        <h2 className="text-3xl font-bold tracking-tight font-heading text-primary">Smart Civic FAQ</h2>
        <p className="text-slate-500 mt-2 font-body">Ask a question to understand the election process better.</p>
      </div>

      <Card className="flex-1 shadow-ambient border-primary/10 flex flex-col overflow-hidden font-body">
        <CardHeader className="bg-surface border-b p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="E.g., What is NOTA?" 
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-y-auto bg-slate-50/50">
          <div className="divide-y divide-slate-100">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <div key={idx} className="p-4 hover:bg-white transition-colors cursor-pointer" onClick={() => setSelectedFaq(selectedFaq === idx ? null : idx)}>
                  <div className="flex gap-4">
                    <div className="mt-1 shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-primary font-medium font-heading">{faq.question}</h4>
                      <AnimatePresence>
                        {selectedFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-3 bg-white border border-slate-100 rounded-lg text-slate-600 shadow-ambient text-sm">
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
              <div className="p-8 text-center text-slate-500">
                No results found for "{searchQuery}". Try a different keyword.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timelineData } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

export function InteractiveTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(timelineData[0].id);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Election Timeline</h2>
        <p className="text-slate-500 mt-2">Explore the chronological stages of the election process.</p>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        {timelineData.map((item, index) => {
          const isExpanded = expandedId === item.id;
          
          return (
            <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Timeline marker */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                {index + 1}
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4">
                <Card 
                  className={`cursor-pointer transition-colors ${isExpanded ? 'border-blue-500 ring-1 ring-blue-500' : 'hover:border-slate-400'}`}
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </CardHeader>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <CardContent className="p-4 pt-2">
                          <CardDescription className="text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                            {item.description}
                          </CardDescription>
                          <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-3 text-sm border border-slate-100 dark:border-slate-800">
                            <span className="font-semibold text-blue-700 dark:text-blue-400 block mb-1">Why it matters:</span>
                            {item.whyItMatters}
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

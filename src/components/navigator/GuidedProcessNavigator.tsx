"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timelineData } from "@/data/mockData";
import { useVoterMode } from "@/context/VoterModeContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Info, CheckCircle2 } from "lucide-react";
import { GlossaryTooltip } from "@/components/glossary/GlossaryTooltip";

export function GuidedProcessNavigator() {
  const { isFirstTimeVoter } = useVoterMode();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const currentStage = timelineData[currentIndex];

  const handleNext = () => {
    if (currentIndex < timelineData.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAdvanced(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowAdvanced(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Guided Process Navigator</h2>
          <p className="text-slate-500 mt-2">Step-by-step guide through the election process.</p>
        </div>
        <div className="text-sm font-medium text-slate-400">
          Step {currentIndex + 1} of {timelineData.length}
        </div>
      </div>

      <Card className="min-h-[400px] flex flex-col border-2 shadow-md">
        <CardHeader className="bg-slate-50 border-b pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-blue-900">{currentStage.title}</CardTitle>
          </div>
          <CardDescription className="text-base text-slate-600 mt-2">
            {currentStage.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 p-6 flex flex-col">
          <div className="grid md:grid-cols-2 gap-8 flex-1">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  {isFirstTimeVoter ? "Your Checklist" : "Action Steps"}
                </h4>
                <ul className="space-y-3">
                  {currentStage.actionSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-white border rounded-lg p-3 shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 text-sm font-medium">
                        {idx + 1}
                      </div>
                      <span className="text-slate-700 leading-snug">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Why this matters
                </h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  {currentStage.whyItMatters}
                </p>
              </div>

              {!isFirstTimeVoter && (
                <div>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between" 
                    onClick={() => setShowAdvanced(!showAdvanced)}
                  >
                    Advanced Details
                    <ChevronRight className={cn("w-4 h-4 transition-transform", showAdvanced && "rotate-90")} />
                  </Button>
                  <AnimatePresence>
                    {showAdvanced && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-slate-50 text-sm text-slate-600 rounded-md mt-2 border">
                          <GlossaryTooltip text={currentStage.advancedDetails} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={currentIndex === timelineData.length - 1}
            >
              Next Stage <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Inline utility for cn since we don't import it at the top to keep it simple, wait, I can just import it
import { cn } from "@/lib/utils";

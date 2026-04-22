"use client";

import React, { useState } from "react";
import { quizData, timelineData } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

interface MicroQuizProps {
  setActiveSection?: (s: string) => void;
}

export function MicroQuiz({ setActiveSection }: MicroQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6">
        <div className="bg-white text-center p-12 border-2 border-primary/10 shadow-quiz-card rounded-xl">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <span className="material-symbols-outlined text-secondary text-7xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              <div className="absolute -bottom-2 -right-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white shadow-sm">
                {score}/{quizData.length}
              </div>
            </div>
          </div>
          <h2 className="font-h2 text-h2 text-primary mb-2">Civic Literacy Badge Earned!</h2>
          <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
            Great job! You answered {score} out of {quizData.length} questions correctly.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={handleRestart} className="px-6 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined">refresh</span> Retake Quiz
            </button>
            <button onClick={() => setActiveSection && setActiveSection("timeline")} className="px-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
              View Timeline <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-12 px-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-gutter">
        {/* ─── Left: Quiz Content ─── */}
        <div className="flex-1 max-w-[720px]">
          {/* Progress Header */}
          <div className="mb-xl">
            <div className="flex justify-between items-end mb-sm">
              <div>
                <span className="font-label-caps text-label-caps text-primary opacity-60">CIVIC LITERACY MODULE</span>
                <h1 className="font-h1 text-h1 text-primary mt-1">Election Fundamentals Quiz</h1>
              </div>
              <div className="text-right">
                <span className="font-quiz-option text-primary font-bold">Question {currentQuestionIndex + 1} of {quizData.length}</span>
              </div>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-secondary-container transition-all duration-500" style={{ width: `${((currentQuestionIndex) / quizData.length) * 100}%` }} />
            </div>
          </div>

          {/* Quiz Card */}
          <div className="bg-white rounded-xl p-lg shadow-quiz-card border-t-4 border-secondary">
            <div className="mb-lg">
              <h2 className="font-h3 text-h3 text-primary mb-md">{currentQuestion.question}</h2>
            </div>

            {/* Options */}
            <div className="space-y-md">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctAnswerIndex;
                const letter = String.fromCharCode(65 + idx);

                let buttonClass = "border-slate-200 hover:border-primary-container bg-white";
                let iconClass = "border-slate-300 text-slate-400 group-hover:border-primary-container group-hover:text-primary-container";
                let textClass = "";

                if (isSelected && !isSubmitted) {
                  buttonClass = "border-primary bg-primary-fixed/30";
                  iconClass = "bg-primary text-white border-primary";
                  textClass = "font-semibold";
                }
                if (isSubmitted) {
                  if (isCorrect) {
                    buttonClass = "border-secondary bg-secondary-fixed/30";
                    iconClass = "bg-secondary text-white border-secondary";
                    textClass = "font-semibold";
                  } else if (isSelected && !isCorrect) {
                    buttonClass = "border-error bg-error/10";
                    iconClass = "bg-error text-white border-error";
                  } else {
                    buttonClass = "border-slate-200 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full flex items-center gap-md p-md border-2 rounded-lg transition-all text-left group relative overflow-hidden ${buttonClass}`}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold shrink-0 ${iconClass}`}>{letter}</div>
                    <span className={`font-quiz-option text-quiz-option text-on-surface ${textClass}`}>{option}</span>
                    {isSubmitted && isCorrect && (
                      <span className="material-symbols-outlined absolute right-4 text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <span className="material-symbols-outlined absolute right-4 text-error" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-lg p-lg bg-secondary-fixed/10 border border-secondary/20 rounded-lg">
                  <div className="flex items-start gap-md">
                    <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <div>
                      <h4 className="font-h3 text-quiz-option text-secondary font-bold mb-1">
                        {selectedOption === currentQuestion.correctAnswerIndex ? "Correct!" : "Not quite."}
                      </h4>
                      <p className="text-body-md text-on-surface-variant">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-xl flex flex-col sm:flex-row justify-between items-center gap-md">
              <button
                onClick={() => setActiveSection && setActiveSection("timeline")}
                className="w-full sm:w-auto px-lg py-md border-2 border-primary text-primary font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">close</span> Finish Quiz
              </button>
              <div className="flex flex-col sm:flex-row gap-md w-full sm:w-auto">
                <button className="w-full sm:w-auto px-lg py-md text-slate-500 font-bold hover:text-primary transition-colors">
                  Skip for now
                </button>
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                    className="w-full sm:w-auto px-lg py-md bg-primary text-on-primary font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto px-lg py-md bg-primary text-on-primary font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    {currentQuestionIndex < quizData.length - 1 ? "Next Question" : "View Results"}
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Right Sidebar ─── */}
        <aside className="hidden lg:block w-72 space-y-gutter shrink-0">
          {/* Election Guide Progress */}
          <div className="bg-white rounded-xl p-md shadow-quiz-card border border-slate-100">
            <h3 className="font-label-caps text-label-caps text-slate-500 mb-md uppercase tracking-widest">Election Guide Progress</h3>
            <div className="space-y-md">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-secondary-fixed/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_reg</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400">STAGE 01</p>
                  <p className="text-sm font-semibold text-primary">Registration</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-secondary text-sm">check_circle</span>
              </div>
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_vote</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-primary">STAGE 02</p>
                  <p className="text-sm font-semibold text-primary">General Election</p>
                </div>
                <span className="ml-auto flex items-center justify-center h-5 w-5 bg-primary rounded-full text-[10px] text-white">{currentQuestionIndex + 1}/{quizData.length}</span>
              </div>
              <div className="flex items-center gap-md opacity-40">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400">STAGE 03</p>
                  <p className="text-sm font-semibold text-slate-400">Certification</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveSection && setActiveSection("timeline")}
              className="w-full mt-lg py-sm text-sm font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
            >
              View Full Curriculum
            </button>
          </div>

          {/* Glossary Corner */}
          <div className="bg-slate-800 text-white rounded-xl p-md shadow-quiz-card overflow-hidden relative">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-slate-300 mb-2">menu_book</span>
              <h4 className="text-base font-semibold mb-2">Glossary Corner</h4>
              <p className="text-sm text-slate-300 mb-md">Stuck on a term? Certification refers to the formal process of validating election results by authorized boards.</p>
              <button
                onClick={() => setActiveSection && setActiveSection("faq")}
                className="inline-flex items-center gap-2 text-sm font-bold text-green-400"
              >
                Explore Glossary
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="material-symbols-outlined text-[120px]">account_balance</span>
            </div>
          </div>

          {/* Study Tip */}
          <div className="bg-surface-container-high rounded-xl p-md border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-lg">lightbulb</span>
              <h4 className="text-sm font-bold text-primary">Study Tip</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">Certification isn&apos;t just a formality—it&apos;s a critical legal step that confirms every valid ballot has been counted correctly and lawfully.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

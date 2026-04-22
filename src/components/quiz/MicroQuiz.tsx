"use client";

import React, { useState } from "react";
import { quizData } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MicroQuiz() {
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
      <div className="max-w-2xl mx-auto py-12">
        <Card className="text-center p-8 border-2 border-primary/10 shadow-ambient bg-surface">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <Award className="w-24 h-24 text-secondary" />
              <div className="absolute -bottom-2 -right-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white shadow-sm">
                {score}/{quizData.length}
              </div>
            </div>
          </motion.div>
          <CardTitle className="text-3xl font-bold text-primary mb-2 font-heading">
            Civic Literacy Badge Earned!
          </CardTitle>
          <p className="text-slate-600 mb-8 max-w-md mx-auto font-body">
            Great job! You've successfully completed the election process module. You answered {score} out of {quizData.length} questions correctly.
          </p>
          <Button onClick={handleRestart} className="gap-2">
            <RotateCcw className="w-4 h-4" /> Retake Quiz
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading text-primary">Micro-Quiz</h2>
          <p className="text-slate-500 mt-2 font-body">Test your knowledge of the election process.</p>
        </div>
        <Badge variant="outline" className="text-sm border-primary/20 bg-primary/5 text-primary font-body">
          Question {currentQuestionIndex + 1}/{quizData.length}
        </Badge>
      </div>

      <Card className="border-2 shadow-ambient font-body">
        <CardHeader className="bg-surface border-b pb-6">
          <CardTitle className="text-xl leading-relaxed text-primary">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctAnswerIndex;
              
              let optionClass = "border-slate-200 hover:border-primary/40 hover:bg-primary/5 text-slate-700";
              if (isSelected && !isSubmitted) optionClass = "border-primary bg-primary/5 text-primary ring-1 ring-primary";
              if (isSubmitted) {
                if (isCorrect) optionClass = "border-secondary bg-secondary/10 text-secondary font-semibold";
                else if (isSelected && !isCorrect) optionClass = "border-slate-400 bg-slate-100 text-slate-500 opacity-80";
                else optionClass = "border-slate-200 text-slate-400 opacity-50";
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center ${optionClass}`}
                >
                  <span className="text-[16px] leading-[1.4]">{option}</span>
                  {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10"
              >
                <p className="text-sm text-primary font-bold font-heading">Explanation:</p>
                <p className="text-sm text-primary-container mt-1">{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="bg-surface border-t p-4 flex justify-end">
          {!isSubmitted ? (
            <Button onClick={handleSubmit} disabled={selectedOption === null}>
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {currentQuestionIndex < quizData.length - 1 ? "Next Question" : "View Results"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

"use client";

import React from "react";
import { CheckSquare, BookOpen, Clock, HelpCircle, Map } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "navigator", label: "Process Navigator", icon: Map },
  { id: "timeline", label: "Election Timeline", icon: Clock },
  { id: "faq", label: "Smart FAQ", icon: HelpCircle },
  { id: "quiz", label: "Micro-Quiz", icon: CheckSquare },
  { id: "glossary", label: "Glossary", icon: BookOpen },
];

export function Sidebar({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (id: string) => void;
}) {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white min-h-screen p-4 flex flex-col hidden md:flex">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2 font-heading">
          <BookOpen className="h-6 w-6" />
          CivicGuide
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-body">Election Process Assistant</p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors font-body",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-slate-400")} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto border-t pt-4">
        <div className="px-3 py-2 rounded-md bg-slate-50 text-xs text-slate-500">
          <p>Mock Mode: ON</p>
          <p className="mt-1">Google Cloud Run Ready</p>
        </div>
      </div>
    </aside>
  );
}

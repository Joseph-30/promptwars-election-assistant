"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const FALLBACK_RESPONSES: Record<string, string> = {
  "default": "I'm the CivicGuide AI assistant. I can help you with questions about voter registration, EVMs, or finding your constituency. How can I help today?",
  "register": "To register to vote in India, you must be 18+ and a resident. You can apply online at voters.eci.gov.in using Form 6.",
  "evm": "Electronic Voting Machines (EVMs) are standalone, non-networked devices. They are technically robust and cannot be hacked via Bluetooth or Wi-Fi.",
  "id": "You can use your Voter ID (EPIC card). If you don't have it, you can use Aadhaar, PAN, Passport, or Driving License if your name is in the electoral roll.",
};

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your CivicGuide AI. How can I help you navigate the democratic process today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        throw new Error("API Fallback");
      }
    } catch (err) {
      // Intelligent fallback logic
      let reply = FALLBACK_RESPONSES["default"];
      const lower = userMsg.toLowerCase();
      if (lower.includes("register")) reply = FALLBACK_RESPONSES["register"];
      else if (lower.includes("evm") || lower.includes("hack")) reply = FALLBACK_RESPONSES["evm"];
      else if (lower.includes("id") || lower.includes("document")) reply = FALLBACK_RESPONSES["id"];
      
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "assistant", content: reply + " (Offline Mode)" }]);
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">smart_toy</span>
                <span className="font-bold">CivicGuide AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === "user" 
                      ? "bg-primary text-white rounded-br-none" 
                      : "bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-none"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                placeholder="Ask about voting..."
                className="flex-1 border-none focus:ring-0 text-sm py-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="text-primary hover:scale-110 transition-transform disabled:opacity-50"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all"
      >
        <span className="material-symbols-outlined text-2xl">
          {isOpen ? "chat_bubble" : "smart_toy"}
        </span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}

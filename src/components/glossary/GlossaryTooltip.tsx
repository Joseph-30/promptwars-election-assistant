"use client";

import React, { useState } from "react";
import { glossaryData } from "@/data/mockData";

export function GlossaryTooltip({ text }: { text: string }) {
  // Simple implementation: replace known terms with a span that shows a tooltip on hover
  // In a real app, this would use a more robust parser.
  
  let parts: { type: 'text' | 'term', content: string, definition?: string }[] = [{ type: 'text', content: text }];

  glossaryData.forEach(termObj => {
    const newParts: typeof parts = [];
    const regex = new RegExp(`\\b(${termObj.term})\\b`, 'gi');
    
    parts.forEach(part => {
      if (part.type === 'term') {
        newParts.push(part);
        return;
      }
      
      const splitText = part.content.split(regex);
      splitText.forEach((chunk, idx) => {
        if (chunk.toLowerCase() === termObj.term.toLowerCase()) {
          newParts.push({ type: 'term', content: chunk, definition: termObj.definition });
        } else if (chunk) {
          newParts.push({ type: 'text', content: chunk });
        }
      });
    });
    parts = newParts;
  });

  return (
    <span className="leading-relaxed">
      {parts.map((part, i) => {
        if (part.type === 'term') {
          return (
            <Tooltip key={i} content={part.definition!}>
              <span className="underline decoration-blue-400 decoration-dashed underline-offset-4 cursor-help text-blue-800 font-medium">
                {part.content}
              </span>
            </Tooltip>
          );
        }
        return <span key={i}>{part.content}</span>;
      })}
    </span>
  );
}

function Tooltip({ children, content }: { children: React.ReactNode, content: string }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <span className="absolute z-50 w-64 p-2 text-sm text-white bg-slate-900 rounded-md shadow-lg -top-2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none before:absolute before:border-4 before:border-transparent before:border-t-slate-900 before:-bottom-2 before:left-1/2 before:-translate-x-1/2">
          {content}
        </span>
      )}
    </span>
  );
}

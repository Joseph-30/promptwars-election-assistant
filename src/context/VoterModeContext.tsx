"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface VoterModeContextType {
  isFirstTimeVoter: boolean;
  toggleFirstTimeVoterMode: () => void;
}

const VoterModeContext = createContext<VoterModeContextType | undefined>(undefined);

export function VoterModeProvider({ children }: { children: ReactNode }) {
  const [isFirstTimeVoter, setIsFirstTimeVoter] = useState(false);

  const toggleFirstTimeVoterMode = () => {
    setIsFirstTimeVoter((prev) => !prev);
  };

  return (
    <VoterModeContext.Provider value={{ isFirstTimeVoter, toggleFirstTimeVoterMode }}>
      {children}
    </VoterModeContext.Provider>
  );
}

export function useVoterMode() {
  const context = useContext(VoterModeContext);
  if (context === undefined) {
    throw new Error("useVoterMode must be used within a VoterModeProvider");
  }
  return context;
}

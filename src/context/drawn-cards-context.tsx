import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";

import { TacOpsCardData } from "../types/card";

type DrawnCardsContextValues = {
  drawnCards: TacOpsCardData[];
  setDrawnCards: Dispatch<SetStateAction<TacOpsCardData[]>>;
};

type DrawnCardsProviderProperties = {
  children: React.ReactNode;
};

const DrawnCardsContext = createContext<DrawnCardsContextValues | null>(null);

export function useDrawnCards() {
  const context = useContext(DrawnCardsContext);
  if (!context) {
    throw new Error("useDrawnCards must be used within an DrawnCardsContext");
  }
  return context;
}

export function DrawnCardsProvider({ children }: DrawnCardsProviderProperties) {
  const [drawnCards, setDrawnCards] = useState<TacOpsCardData[] | null>([]);
  return (
    <DrawnCardsContext.Provider value={{ drawnCards, setDrawnCards }}>
      {children}
    </DrawnCardsContext.Provider>
  );
}

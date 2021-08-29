import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";

import { TacOpsCard } from "../types/card";

type SelectedCardsContextValues = {
  selectedCards: string[];
  setSelectedCards: Dispatch<SetStateAction<string[]>>;
};

type SelectedCardsProviderProperties = {
  children: React.ReactNode;
};

const SelectedCardsContext = createContext<SelectedCardsContextValues | null>(
  null
);

export function useSelectedCards() {
  const context = useContext(SelectedCardsContext);
  if (!context) {
    throw new Error(
      "useSelectedCards must be used within an SelectedCardsContext"
    );
  }
  return context;
}

export function SelectedCardsProvider({
  children,
}: SelectedCardsProviderProperties) {
  const [selectedCards, setSelectedCards] = useState<string[] | null>([]);
  return (
    <SelectedCardsContext.Provider value={{ selectedCards, setSelectedCards }}>
      {children}
    </SelectedCardsContext.Provider>
  );
}

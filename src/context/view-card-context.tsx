import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";

import { TacOpsCard } from "../types/card";

type ViewedCardContextValues = {
  viewedCard: TacOpsCard | null;
  setViewedCard: Dispatch<SetStateAction<TacOpsCard | null>>;
};

type ViewedCardProviderProperties = {
  children: React.ReactNode;
};

const ViewedCardContext = createContext<ViewedCardContextValues | null>(null);

export function useViewedCard() {
  const context = useContext(ViewedCardContext);
  if (!context) {
    throw new Error("useViewedCard must be used within an ViewedCardContext");
  }
  return context;
}

export function ViewedCardProvider({ children }: ViewedCardProviderProperties) {
  const [viewedCard, setViewedCard] = useState<TacOpsCard | null>(null);
  return (
    <ViewedCardContext.Provider value={{ viewedCard, setViewedCard }}>
      {children}
    </ViewedCardContext.Provider>
  );
}

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";

import { TacOpsCardData } from "../types/card";

type ViewedCardContextValues = {
  viewedCard: TacOpsCardData | null;
  setViewedCard: Dispatch<SetStateAction<TacOpsCardData | null>>;
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
  const [viewedCard, setViewedCard] = useState<TacOpsCardData | null>(null);
  return (
    <ViewedCardContext.Provider value={{ viewedCard, setViewedCard }}>
      {children}
    </ViewedCardContext.Provider>
  );
}

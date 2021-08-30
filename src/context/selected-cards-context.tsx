import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";

import { TacOpsCardData } from "../types/card";

type SelectedCardsContextValues = {
  selectedCards: TacOpsCardData[];
  setSelectedCards: Dispatch<SetStateAction<TacOpsCardData[]>>;
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
  const [selectedCards, setSelectedCards] = useState<TacOpsCardData[] | null>(
    // []
    [
      {
        title: "HEADHUNTER",
        text: "Reveal this Tac Op when an enemy LEADER operative is incapacitated.",
        points: [
          "You score 1VP.",
          "If it is the first or second Turning Point, you score 1VP.",
        ],
      },
      {
        title: "CHALLENGE",
        text: "Reveal this Tac Op in the Target Reveal step of the first Turning Point. Select one enemy operative and one friendly operative.",
        points: [
          "If that enemy operative is incapacitated by that friendly operative, you score 1VP.",
          "If you achieve the first condition while that enemy operative is within --PENTAGON-- of that friendly operative, you score 1VP.",
        ],
      },
      {
        title: "ROUT",
        text: "You can reveal this Tac Op in the Target Reveal step of any Turning Point.",
        points: [
          "If an enemy operative is incapacitated by a friendly operative that is within --PENTAGON-- of your opponents drop zone, you score 1VP.",
          "If you achieve the first condition in any subsequent Turning Points, you score 1VP.",
        ],
      },
      {
        title: "EXECUTION",
        text: "Reveal this Tac Op at the end of any Turning Point in which more enemy operatives than friendly operatives were incapacitated during that Turning Point.",
        points: [
          "At the end of the battle, if more enemy operatives than friendly operatives were incapacitated during two or more Turning Points, you score 1VP.",
          "At the end of the battle, if more enemy operatives than friendly operatives were incapacitated during three or more Turning Points, you score 1VP.",
        ],
      },
      {
        title: "DEADLY MARKSMAN",
        text: "After selecting this Tac Op, secretly select one friendly operative to be your Marksman. You can reveal this Tac Op when an enemy operative is incapacited by a shooting attack made by your Marksman while your Marksman is wholly within --SQUARE-- of your dropzone.",
        points: [
          "If any other enemy operatives are incapacitated by another shooting attack made by your Marksman, you score 1VP.",
          "At the end of the battle, if you achieved the first condition and your Marksman has not been incapacitated, you score 1VP.",
        ],
      },
      {
        title: "ROB AND RANSACK",
        text: "You can reveal this Tac Op when an enemy operative is incapacitated by a friendly operative within --TRIANGLE-- of it, and that friendly operative is more than --SQUARE-- from other enemy operatives.",
        points: [
          "You score 1VP.",
          "At the end of the battle, if you achieved the first condition and that friendly operative has not been incapacitated, you score 1VP.",
        ],
      },
    ]
  );
  return (
    <SelectedCardsContext.Provider value={{ selectedCards, setSelectedCards }}>
      {children}
    </SelectedCardsContext.Provider>
  );
}

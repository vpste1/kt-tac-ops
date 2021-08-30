import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDrawnCards } from "../../context/drawn-cards-context";
import { Step0Instructions } from "./step-0-instructions";
import { Step1Selection } from "./step-1-selection";
import { Step2DrawCards } from "./step-2-draw-cards";

export function DeckCreationWizard() {
  const history = useHistory();
  const [pageNumber, setPageNumber] = useState(0);
  const { drawnCards } = useDrawnCards();

  const persistDeckAndRoute = () => {
    localStorage.setItem("drawnDeck", JSON.stringify(drawnCards));
    history.push("/");
  };

  const wizardDirectory = [
    Step0Instructions({ onNext: () => setPageNumber(1) }),
    Step1Selection({
      onNext: () => setPageNumber(2),
      onBack: () => setPageNumber(0),
    }),
    Step2DrawCards({
      onNext: () => persistDeckAndRoute(),
    }),
  ];

  return wizardDirectory[pageNumber];
}

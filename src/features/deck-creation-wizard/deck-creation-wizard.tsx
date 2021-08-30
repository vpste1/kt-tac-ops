import React, { useState } from "react";
import { Step0Instructions } from "./step-0-instructions";
import { Step1Selection } from "./step-1-selection";
import { Step2DrawCards } from "./step-2-draw-cards";
import { Step3ViewDeck } from "./step-3-view-deck";

export function DeckCreationWizard() {
  const [pageNumber, setPageNumber] = useState(0);
  const wizardDirectory = [
    Step0Instructions({ onNext: () => setPageNumber(1) }),
    Step1Selection({
      onNext: () => setPageNumber(2),
      onBack: () => setPageNumber(0),
    }),
    Step2DrawCards({
      onNext: () => setPageNumber(3),
    }),
    Step3ViewDeck(),
  ];

  return wizardDirectory[pageNumber];
}

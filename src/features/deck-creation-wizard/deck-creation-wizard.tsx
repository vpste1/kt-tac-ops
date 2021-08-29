import React, { useState } from "react";
import { Step0Instructions } from "./step-0-instructions";
import { Step1Selection } from "./step-1-selection";

export function DeckCreationWizard() {
  const [pageNumber, setPageNumber] = useState(0);
  const wizardDirectory = [
    Step0Instructions({ onNext: () => setPageNumber(1) }),
    Step1Selection({
      onNext: () => setPageNumber(2),
      onBack: () => setPageNumber(0),
    }),
  ];

  return wizardDirectory[pageNumber];
}

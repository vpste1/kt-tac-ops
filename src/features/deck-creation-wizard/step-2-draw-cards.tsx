import React, { useState } from "react";
import { useDrawnCards } from "../../context/drawn-cards-context";
import { useSelectedCards } from "../../context/selected-cards-context";
import { useViewedCard } from "../../context/view-card-context";
import { shuffleArray } from "../../utils/shuffle-array";
import { TacOpsCard } from "../cards/tac-ops-card";
import { WizardStep } from "./wizard-step";

export function Step2DrawCards({ onNext }) {
  const { viewedCard, setViewedCard } = useViewedCard();
  const { selectedCards } = useSelectedCards();
  const { drawnCards, setDrawnCards } = useDrawnCards();
  const [shuffledCards] = useState(shuffleArray([...selectedCards]));

  return viewedCard ? (
    <TacOpsCard
      cardInfo={viewedCard}
      onClose={() => setViewedCard(null)}
      onSetCards={(cards) => setDrawnCards(cards)}
      currentCardSelection={drawnCards}
    />
  ) : (
    <WizardStep onNext={onNext} onNextDisabled={drawnCards.length < 3}>
      <h2>Draw cards</h2>
      {drawnCards.map((card) => (
        <div>{card.title}</div>
      ))}
      {drawnCards.length < 3 ? (
        <div>
          <button
            className="btnSelect"
            onClick={() => setViewedCard(shuffledCards[drawnCards.length * 2])}
          >
            {shuffledCards[drawnCards.length * 2].title}
          </button>
          or
          <button
            className="btnSelect"
            onClick={() =>
              setViewedCard(shuffledCards[drawnCards.length * 2 + 1])
            }
          >
            {shuffledCards[drawnCards.length * 2 + 1].title}
          </button>
        </div>
      ) : (
        <div>Proceed to view your cards</div>
      )}
    </WizardStep>
  );
}
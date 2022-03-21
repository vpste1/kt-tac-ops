import React, { useEffect, useState } from "react";
import styles from "./step-2-draw-cards.module.css";
import { useDrawnCards } from "../../context/drawn-cards-context";
import { useSelectedCards } from "../../context/selected-cards-context";
import { useViewedCard } from "../../context/view-card-context";
import { shuffleArray } from "../../utils/shuffle-array";
import { TacOpsCard } from "../cards/tac-ops-card";
import { WizardStep } from "./wizard-step";
import { TacOpsCardData } from "../../types/card";
import { toggleCardSelection } from '../../utils/toggle-card-selection'

export function Step2DrawCards({ onNext }) {
  const { viewedCard, setViewedCard } = useViewedCard();
  const { selectedCards } = useSelectedCards();
  const { drawnCards, setDrawnCards } = useDrawnCards();
  const [shuffledCards, setShuffledCards] = useState<TacOpsCardData[]>([]);

  useEffect(() => {
    setShuffledCards(shuffleArray([...selectedCards]));
  }, []);

  const onCardToggleSelection = (card) => {
    toggleCardSelection(card, drawnCards, setDrawnCards)
    setViewedCard(null)
  }

  return viewedCard ? (
    <TacOpsCard
      cardInfo={viewedCard}
      onClose={() => setViewedCard(null)}
      onToggleSelect={onCardToggleSelection}
      isSelected={drawnCards.findIndex(c => c.title === viewedCard.title) > -1}
    />
  ) : (
    <WizardStep onNext={onNext} onNextDisabled={drawnCards.length < 3}>
      <h2>Draw cards</h2>
      {drawnCards.length > 0 && (
        <div>
          Previously drawn cards:
          <ul>
            {drawnCards.map((card) => (
              <li key={card.title}>{card.title}</li>
            ))}
          </ul>
        </div>
      )}
      {drawnCards.length < 3 && shuffledCards.length === 6 ? (
        <div className={styles.selectionContainer}>
          <button
            className="btnSelect"
            onClick={() => setViewedCard(shuffledCards[drawnCards.length * 2])}
          >
            {shuffledCards[drawnCards.length * 2].title}
          </button>
          <p>or</p>
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

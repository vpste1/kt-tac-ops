import React from "react";
import tacOps from "../../assets/tac-ops-cards.json";
import { useSelectedCards } from "../../context/selected-cards-context";
import { useViewedCard } from "../../context/view-card-context";
import { TacOpsCard } from "../cards/tac-ops-card";
import { TacOpsList } from "../cards/tac-ops-list";
import { WizardStep } from "./wizard-step";
import { toggleCardSelection } from '../../utils/toggle-card-selection'

export function Step1Selection({ onNext, onBack }) {
  const { viewedCard, setViewedCard } = useViewedCard();
  const { selectedCards, setSelectedCards } = useSelectedCards();

  const onCardToggleSelection = (card) => {
    toggleCardSelection(card, selectedCards, setSelectedCards)
    setViewedCard(null)
  }

  return viewedCard ? (
    <TacOpsCard
      cardInfo={viewedCard}
      onClose={() => setViewedCard(null)}
      onToggleSelect={onCardToggleSelection}
      isSelected={selectedCards.findIndex(c => c.title === viewedCard.title) > -1}
    />
  ) : (
    <WizardStep
      onBack={onBack}
      onNext={onNext}
      onNextDisabled={selectedCards.length < 6}
    >
      {selectedCards.length > 0 && (
        <>
          Currently selected cards (tap to open and remove):
          <ul>
            {selectedCards.map((card) => (
              <li key={card.title}>
                <button
                  className="btnSelect"
                  onClick={() => setViewedCard(card)}
                >
                  {card.title}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      {selectedCards.length < 6 ? (
        <>
          <p>Select 6 cards from the following list:</p>
          <TacOpsList data={tacOps} selectable onCardToggleSelection={onCardToggleSelection} />
        </>
      ) : (
        <p>Please review before committing to the next step!</p>
      )}
    </WizardStep>
  );
}

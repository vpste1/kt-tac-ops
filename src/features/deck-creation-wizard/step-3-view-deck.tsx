import React from "react";
import { useDrawnCards } from "../../context/drawn-cards-context";
import { useViewedCard } from "../../context/view-card-context";
import { TacOpsCard } from "../cards/tac-ops-card";

export function Step3ViewDeck() {
  const { viewedCard, setViewedCard } = useViewedCard();
  const { drawnCards } = useDrawnCards();

  return viewedCard ? (
    <TacOpsCard cardInfo={viewedCard} onClose={() => setViewedCard(null)} />
  ) : (
    <div>
      {drawnCards.map((card) => (
        <button className="btnSelect" onClick={() => setViewedCard(card)}>
          {card.title}
        </button>
      ))}
    </div>
  );
}
